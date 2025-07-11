"use client";
import { useEffect } from "react";

interface BookingSuccessProps {
  bookingId: string;
  onClose: () => void;
}

export default function BookingSuccess({
  bookingId,
  onClose,
}: BookingSuccessProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-600">Your booking has been confirmed</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-600">Booking ID</p>
          <p className="font-semibold">{bookingId}</p>
        </div>

        <div className="text-sm text-gray-600 mb-6">
          <p>You will receive a confirmation email shortly.</p>
          <p>Thank you for choosing Elite Sports Cars!</p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
