"use client";
import { useState, useEffect } from "react";
import { Car } from "@/app/types/car";
import { BookingData } from "@/app/types/booking";
import MidtransPayment from "@/app/components/MidtransPayment";
import MetaMaskPayment from "@/app/components/MetaMaskPayment";
interface BookingFormProps {
  car: Car;
  onClose: () => void;
}

export default function BookingForm({ car, onClose }: BookingFormProps) {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    paymentMethod: "midtrans" as "midtrans" | "metamask",
  });
  const [totalDays, setTotalDays] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [showPayment, setShowPayment] = useState<boolean>(false);

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalDays(diffDays);
      setTotalAmount(diffDays * car.price);
    }
  }, [formData.startDate, formData.endDate, car.price]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalDays > 0 && formData.customerName && formData.customerEmail) {
      setShowPayment(true);
    }
  };

  const bookingData: BookingData = {
    carId: car.id,
    startDate: formData.startDate,
    endDate: formData.endDate,
    totalDays,
    totalAmount,
    customerName: formData.customerName,
    customerEmail: formData.customerEmail,
    customerPhone: formData.customerPhone,
    paymentMethod: formData.paymentMethod,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Book {car.brand} {car.model}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
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
                onSuccess={() => {
                  alert("Payment successful!");
                  onClose();
                }}
                onError={(error) => {
                  alert("Payment failed: " + error);
                  setShowPayment(false);
                }}
              />
            ) : (
              <MetaMaskPayment
                bookingData={bookingData}
                onSuccess={() => {
                  alert("Payment successful!");
                  onClose();
                }}
                onError={(error) => {
                  alert("Payment failed: " + error);
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
