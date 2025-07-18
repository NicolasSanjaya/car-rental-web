"use client";
import { useState, useEffect, useRef } from "react";
import { Car } from "@/app/types/car";
import MidtransPayment from "@/app/components/MidtransPayment";
import MetaMaskPayment from "@/app/components/MetaMaskPayment";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";
interface BookingFormProps {
  car: Car;
  onClose: () => void;
  isOpen: boolean;
}

export default function BookingForm({
  car,
  onClose,
  isOpen,
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    paymentMethod: "midtrans" as "midtrans" | "metamask",
  });
  const [totalDays, setTotalDays] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<string>("");
  const [showPayment, setShowPayment] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalDays(diffDays);
      setTotalAmount((diffDays * car.price).toString());
    }
  }, [formData.startDate, formData.endDate, car.price]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Optional: cleanup on unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  // Detect click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (totalDays > 0 && formData.customerName && formData.customerEmail) {
      setShowPayment(true);
    }
  };

  const bookingData = {
    car_id: car.id,
    start_date: formData.startDate,
    end_date: formData.endDate,
    total_days: totalDays,
    totalAmount: totalAmount,
    customerName: formData.customerName,
    customerEmail: formData.customerEmail,
    customerPhone: formData.customerPhone,
    payment_method: formData.paymentMethod,
    user_id: user?.id || 0,
    carName: `${car.brand} ${car.model}`,
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        ref={modalRef}
        data-aos="zoom-in"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Book {car.brand} {car.model}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
          >
            ×
          </button>
        </div>

        {!showPayment ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  min={(() => {
                    if (!formData.startDate) return "";
                    const date = new Date(formData.startDate);
                    date.setDate(date.getDate() + 1); // tambah 1 hari
                    return date.toISOString().split("T")[0]; // format ke yyyy-mm-dd
                  })()}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) =>
                  setFormData({ ...formData, customerName: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.customerEmail}
                onChange={(e) =>
                  setFormData({ ...formData, customerEmail: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.customerPhone}
                onChange={(e) =>
                  setFormData({ ...formData, customerPhone: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Payment Method
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="midtrans"
                    checked={formData.paymentMethod === "midtrans"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        paymentMethod: e.target.value as
                          | "midtrans"
                          | "metamask",
                      })
                    }
                    className="mr-2"
                  />
                  <span>Midtrans Payment Gateway</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="metamask"
                    checked={formData.paymentMethod === "metamask"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        paymentMethod: e.target.value as
                          | "midtrans"
                          | "metamask",
                      })
                    }
                    className="mr-2"
                  />
                  <span>MetaMask (Ethereum Sepolia)</span>
                </label>
              </div>
            </div>

            {totalDays > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Booking Summary</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{totalDays} day(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per day:</span>
                    <span>${car.price}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>${totalAmount}</span>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
              disabled={totalDays === 0}
            >
              Proceed to Payment
            </button>
          </form>
        ) : (
          <div>
            {formData.paymentMethod === "midtrans" ? (
              <MidtransPayment
                bookingData={bookingData}
                onError={(error) => {
                  toast.error("Payment failed: " + error);
                  setShowPayment(false);
                  onClose();
                }}
              />
            ) : (
              <MetaMaskPayment
                bookingData={bookingData}
                car={car}
                onSuccess={() => {
                  toast.success("Payment successful!");
                  onClose();
                }}
                onError={(error) => {
                  toast.error("Payment failed: " + error);
                  setShowPayment(false);
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
