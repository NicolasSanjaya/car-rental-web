/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  Search,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Booking } from "../types/booking";
import { Car } from "../types/car";

interface Stats {
  totalBookings: number;
  totalRevenue: number;
  paidBookings: number;
  pendingBookings: number;
  totalCars: number;
  availableCars: number;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    totalRevenue: 0,
    paidBookings: 0,
    pendingBookings: 0,
    totalCars: 0,
    availableCars: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "unpaid">(
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const modalRef = useRef<HTMLDivElement>(null);

  console.log(bookings);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowBookingModal(false);
      }
    }

    if (showBookingModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showBookingModal, modalRef]);

  useEffect(() => {
    if (showBookingModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showBookingModal]);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchBookings(), fetchCars()]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched bookings:", data.bookings);
        setBookings(data.bookings);
        calculateStats(data.bookings);
      } else {
        console.error("Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchCars = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cars`
      );
      if (response.ok) {
        const data = await response.json();
        setCars(data.cars);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const calculateStats = (bookingData: Booking[]) => {
    const totalBookings = bookingData.length;
    const totalRevenue = bookingData.reduce(
      (sum, booking) => sum + (booking.amount || 0),
      0
    );
    const paidBookings = bookingData.filter(
      (booking) => booking.is_paid
    ).length;
    const pendingBookings = bookingData.filter(
      (booking) => !booking.is_paid
    ).length;

    setStats({
      totalBookings,
      totalRevenue,
      paidBookings,
      pendingBookings,
      totalCars: cars.length,
      availableCars: cars.filter((car) => car.available).length,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // const formatDateShort = (dateString: string) => {
  //   return new Date(dateString).toLocaleDateString("id-ID", {
  //     day: "numeric",
  //     month: "short",
  //     year: "numeric",
  //   });
  // };

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const updateBookingStatus = async (bookingId: string, isPaid: boolean) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings/${bookingId}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_paid: isPaid }),
        }
      );

      if (response.ok) {
        await fetchBookings();
        toast.success("Status booking berhasil diupdate");
      } else {
        toast.error("Gagal mengupdate status booking");
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast.error("Error updating booking status");
    }
  };

  const deleteBooking = async (bookingId: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus booking ini?")) {
      return;
    }

    console.log("Deleting booking with ID:", bookingId);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Delete response:", response);
      const data = await response.json();
      console.log("Delete response data:", data);

      if (response.ok) {
        await fetchBookings();
        toast.success("Booking berhasil dihapus");
      } else {
        toast.error("Gagal menghapus booking");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Error deleting booking");
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.text("Bookings Report", 14, 20);

    const tableColumn = [
      "No",
      "Booking ID",
      "Name",
      "Email",
      "Car",
      "Start",
      "End",
      "Days",
      "Amount",
      "Status",
    ];

    const tableRows: any[] = [];

    filteredBookings.forEach((booking, index) => {
      const rowData = [
        index + 1,
        booking.id,
        booking.full_name,
        booking.email,
        `${booking.car_name || "-"} (${booking.car_brand || "-"})`,
        formatDate(booking.start_date),
        formatDate(booking.end_date),
        calculateDays(booking.start_date, booking.end_date),
        formatCurrency(booking.amount),
        booking.is_paid ? "Paid" : "Unpaid",
      ];
      tableRows.push(rowData);
    });

    // Panggil plugin langsung ke doc
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 8 },
    });

    doc.save("bookings-report.pdf");
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.car_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "paid" && booking.is_paid) ||
      (statusFilter === "unpaid" && !booking.is_paid);

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = filteredBookings.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={fetchData}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={exportToPDF}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Total Bookings
                </h3>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.totalBookings}
                </p>
              </div>
              <Calendar className="w-10 h-10 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Total Revenue
                </h3>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(stats.totalRevenue)}
                </p>
              </div>
              <DollarSign className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Paid Bookings
                </h3>
                <p className="text-2xl font-bold text-green-600">
                  {stats.paidBookings}
                </p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600">
                  Pending Bookings
                </h3>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.pendingBookings}
                </p>
              </div>
              <Clock className="w-10 h-10 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as "all" | "paid" | "unpaid")
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Bookings Management
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Car
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.id}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(booking.created_at)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.full_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.phone_number}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.car_name || "Unknown"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.car_brand}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(booking.start_date)}
                      </div>
                      <div className="text-sm text-gray-500">
                        to {formatDate(booking.end_date)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {calculateDays(booking.start_date, booking.end_date)}{" "}
                        days
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.payment_method === "midtrans" && (
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(booking.amount)}
                        </div>
                      )}
                      <div className="text-sm text-gray-500 capitalize">
                        {booking.payment_method}
                      </div>
                      {booking.tx_hash && (
                        <div className="text-xs text-gray-400 font-mono">
                          {booking.tx_hash.substring(0, 10)}...
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          booking.is_paid
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {booking.is_paid ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowBookingModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            updateBookingStatus(booking.id, !booking.is_paid)
                          }
                          className={`${
                            booking.is_paid
                              ? "text-yellow-600 hover:text-yellow-900"
                              : "text-green-600 hover:text-green-900"
                          }`}
                        >
                          {booking.is_paid ? (
                            <XCircle className="w-4 h-4" />
                          ) : (
                            <CheckCircle className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-6 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, filteredBookings.length)}{" "}
                of {filteredBookings.length} results
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">
                  {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Detail Modal */}
        {showBookingModal && selectedBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div
              className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              ref={modalRef}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Booking Details
                </h3>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Booking ID
                    </label>
                    <p className="mt-1 text-sm text-gray-900 font-mono">
                      {selectedBooking.id}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Created At
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {formatDate(selectedBooking.created_at)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Customer Name
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedBooking.full_name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedBooking.email}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedBooking.phone_number}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Car
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedBooking.car_name} ({selectedBooking.car_brand})
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {formatDate(selectedBooking.start_date)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {formatDate(selectedBooking.end_date)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {selectedBooking.payment_method === "midtrans" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Total Price
                      </label>
                      <p className="mt-1 text-sm text-gray-900 font-bold">
                        {formatCurrency(selectedBooking.amount)}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Payment Method
                    </label>
                    <p className="mt-1 text-sm text-gray-900 capitalize">
                      {selectedBooking.payment_method}
                    </p>
                  </div>
                </div>

                {selectedBooking.tx_hash && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Transaction Hash
                    </label>
                    <p className="mt-1 text-sm text-gray-900 font-mono break-all">
                      {selectedBooking.tx_hash}
                    </p>
                  </div>
                )}

                <div className="flex gap-4 pt-6 border-t">
                  <button
                    onClick={() =>
                      updateBookingStatus(
                        selectedBooking.id,
                        !selectedBooking.is_paid
                      )
                    }
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      selectedBooking.is_paid
                        ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {selectedBooking.is_paid ? (
                      <XCircle className="w-4 h-4" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    Mark as {selectedBooking.is_paid ? "Unpaid" : "Paid"}
                  </button>
                  <button
                    onClick={() => {
                      deleteBooking(selectedBooking.id);
                      setShowBookingModal(false);
                    }}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
