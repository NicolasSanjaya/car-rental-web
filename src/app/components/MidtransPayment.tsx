/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { BookingData } from "@/app/types/booking";

interface MidtransPaymentProps {
  bookingData: BookingData;
  onSuccess: () => void;
  onError: (error: string) => void;
}

declare global {
  interface Window {
    snap: any;
  }
}

export default function MidtransPayment({
  bookingData,
  onSuccess,
  onError,
}: MidtransPaymentProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [snapToken, setSnapToken] = useState<string>("");

  useEffect(() => {
    // Load Midtrans Snap script
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ||
        "SB-Mid-client-your-client-key"
    );
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const createPayment = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/payment/midtrans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (data.token) {
        setSnapToken(data.token);

        // Open Midtrans popup
        window.snap.pay(data.token, {
          onSuccess: function (result: any) {
            console.log("Payment success:", result);
            onSuccess();
          },
          onPending: function (result: any) {
            console.log("Payment pending:", result);
          },
          onError: function (result: any) {
            console.log("Payment error:", result);
            onError("Payment failed");
          },
          onClose: function () {
            console.log("Payment popup closed");
          },
        });
      } else {
        onError("Failed to create payment token");
      }
    } catch (error) {
      console.error("Payment error:", error);
      onError("Payment processing error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-4">Midtrans Payment</h3>
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-600 mb-2">
          You will be redirected to Midtrans payment page
        </p>
        <p className="text-lg font-semibold">
          Total: ${bookingData.totalAmount}
        </p>
      </div>

      <button
        onClick={createPayment}
        disabled={loading}
        className={`w-full py-3 rounded-lg font-semibold transition ${
          loading
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {loading ? "Processing..." : "Pay with Midtrans"}
      </button>
    </div>
  );
}
