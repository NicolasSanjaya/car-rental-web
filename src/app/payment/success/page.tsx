"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaymentParams {
  order_id: string;
  status_code: string;
  transaction_status: string;
}

interface NotificationResponse {
  success: boolean;
  message?: string;
  data?: unknown;
}

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const processPayment = async () => {
      try {
        // Ambil parameter dari URL
        const order_id = searchParams.get("order_id");
        const status_code = searchParams.get("status_code");
        const transaction_status = searchParams.get("transaction_status");

        // Pastikan semua parameter tersedia
        if (!order_id || !status_code || !transaction_status) {
          setError("Parameter pembayaran tidak lengkap");
          setLoading(false);
          return;
        }

        const paymentParams: PaymentParams = {
          order_id,
          status_code,
          transaction_status,
        };

        // Kirim notification ke backend
        const response = await fetch(
          "http://localhost:4000/api/payment/notification",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentParams),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: NotificationResponse = await response.json();
        console.log("Notification sent successfully:", result);

        setSuccess(true);
        setLoading(false);

        // Redirect ke /bookings setelah 2 detik
        setTimeout(() => {
          router.push("/bookings");
        }, 2000);
      } catch (err) {
        console.error("Error processing payment:", err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat memproses pembayaran";
        setError(errorMessage);
        setLoading(false);
      }
    };

    processPayment();
  }, [searchParams, router]);

  const handleReturnToBookings = () => {
    router.push("/bookings");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            Memproses Pembayaran...
          </h2>
          <p className="text-gray-500 mt-2">Mohon tunggu sebentar</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
          <div className="text-red-600 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Pembayaran Gagal
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleReturnToBookings}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali ke Booking
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
          <div className="text-green-600 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
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
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Pembayaran Berhasil!
          </h2>
          <p className="text-gray-600 mb-4">
            Transaksi Anda telah berhasil diproses.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Anda akan dialihkan ke halaman booking dalam beberapa detik...
          </p>
          <button
            onClick={handleReturnToBookings}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Lanjutkan ke Booking
          </button>
        </div>
      </div>
    );
  }

  return null;
}
