"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Calendar,
  Car,
  User,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Filter,
  Search,
} from "lucide-react";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import Image from "next/image";

interface Booking {
  id: string;
  car_id: string;
  start_date: string;
  end_date: string;
  full_name: string;
  email: string;
  phone_number: string;
  payment_method: "metamask" | "midtrans";
  is_paid: boolean;
  tx_hash: string | null;
  created_at: string;
  car_name?: string;
  car_brand?: string;
  car_image?: string;
  total_price?: number;
}

export default function BookingPage() {
  const { user, loading } = useUser();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<"all" | "paid" | "unpaid">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const fetchBookings = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/user/${user?.id}`,
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBookings(data.data);
      } else {
        toast.error("Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Error fetching bookings");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user, fetchBookings]);

  useEffect(() => {
    const filterBookings = () => {
      let filtered = bookings;

      // Filter by payment status
      if (filter === "paid") {
        filtered = filtered.filter((booking) => booking.is_paid);
      } else if (filter === "unpaid") {
        filtered = filtered.filter((booking) => !booking.is_paid);
      }

      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(
          (booking) =>
            booking.car_name
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            booking.car_brand
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            booking.id.includes(searchTerm.toLowerCase())
        );
      }

      setFilteredBookings(filtered);
    };

    filterBookings();
  }, [bookings, filter, searchTerm, setFilteredBookings]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
      }
    }

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, modalRef]);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Optional: cleanup on unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showModal]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (isPaid: boolean) => {
    return isPaid ? "text-green-400" : "text-red-400";
  };

  const getStatusIcon = (isPaid: boolean) => {
    return isPaid ? (
      <CheckCircle className="w-5 h-5" />
    ) : (
      <XCircle className="w-5 h-5" />
    );
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            My Bookings
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Manage and track your car rental bookings
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by car name, brand, or booking ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value as "all" | "paid" | "unpaid")
                }
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
              >
                <option value="all">All Bookings</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Bookings List */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-16">
              <Car className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No bookings found
              </h3>
              <p className="text-gray-400 mb-6">
                {bookings.length === 0
                  ? "You haven't made any bookings yet."
                  : "No bookings match your current filters."}
              </p>
              <Link
                href="/cars"
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Browse Cars
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Car Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                        {booking.car_image ? (
                          <Image
                            src={booking.car_image}
                            alt={booking.car_name || "Car Image"}
                            className="w-full h-full object-cover rounded-lg"
                            width={64}
                            height={64}
                          />
                        ) : (
                          <Car className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {booking.car_name || "Unknown Car"}
                        </h3>
                        <p className="text-gray-400">{booking.car_brand}</p>
                        <p className="text-sm text-gray-500">
                          ID: {booking.id}
                        </p>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="flex flex-col sm:flex-row gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {formatDate(booking.start_date)} -{" "}
                          {formatDate(booking.end_date)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Clock className="w-4 h-4" />
                        <span>
                          {calculateDays(booking.start_date, booking.end_date)}{" "}
                          days
                        </span>
                      </div>
                    </div>

                    {/* Status and Actions */}
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex items-center gap-2 ${getStatusColor(
                          booking.is_paid
                        )}`}
                      >
                        {getStatusIcon(booking.is_paid)}
                        <span className="font-medium">
                          {booking.is_paid ? "Paid" : "Unpaid"}
                        </span>
                      </div>
                      <button
                        onClick={() => handleViewDetails(booking)}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Details
                      </button>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>Payment: {booking.payment_method}</span>
                        {booking.total_price && (
                          <span className="text-white font-semibold">
                            {formatCurrency(booking.total_price)}
                          </span>
                        )}
                      </div>
                      {booking.tx_hash && (
                        <div className="text-sm text-gray-400">
                          <span>TX: {booking.tx_hash.substring(0, 10)}...</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            ref={modalRef}
            data-aos="zoom-in"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Booking Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Car Information */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  Car Information
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Name:</span>
                    <p className="text-white">
                      {selectedBooking.car_name || "Unknown"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400">Brand:</span>
                    <p className="text-white">
                      {selectedBooking.car_brand || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking Information */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Booking Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Booking ID:</span>
                    <p className="text-white font-mono">{selectedBooking.id}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Duration:</span>
                    <p className="text-white">
                      {calculateDays(
                        selectedBooking.start_date,
                        selectedBooking.end_date
                      )}{" "}
                      days
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400">Start Date:</span>
                    <p className="text-white">
                      {formatDate(selectedBooking.start_date)}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400">End Date:</span>
                    <p className="text-white">
                      {formatDate(selectedBooking.end_date)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Customer Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Full Name:</span>
                    <p className="text-white">{selectedBooking.full_name}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Email:</span>
                    <p className="text-white">{selectedBooking.email}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Phone:</span>
                    <p className="text-white">{selectedBooking.phone_number}</p>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Payment Method:</span>
                    <p className="text-white capitalize">
                      {selectedBooking.payment_method}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400">Status:</span>
                    <div
                      className={`flex items-center gap-2 ${getStatusColor(
                        selectedBooking.is_paid
                      )}`}
                    >
                      {getStatusIcon(selectedBooking.is_paid)}
                      <span className="font-medium">
                        {selectedBooking.is_paid ? "Paid" : "Unpaid"}
                      </span>
                    </div>
                  </div>
                  {selectedBooking.total_price && (
                    <div>
                      <span className="text-gray-400">Total Price:</span>
                      <p className="text-white font-semibold">
                        {formatCurrency(selectedBooking.total_price)}
                      </p>
                    </div>
                  )}
                  {selectedBooking.tx_hash && (
                    <div>
                      <span className="text-gray-400">Transaction Hash:</span>
                      <p className="text-white font-mono text-xs break-all">
                        {selectedBooking.tx_hash}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 py-8 px-4 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-gray-400 mb-4">
            <p>&copy; 2024 CarRental. All rights reserved.</p>
          </div>
          <div className="flex justify-center space-x-6">
            <Link href="/about" className="text-gray-400 hover:text-white">
              About
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white">
              Contact
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
