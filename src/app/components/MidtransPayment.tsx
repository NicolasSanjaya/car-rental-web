/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface MidtransPaymentProps {
  bookingData: any;
  onError: (error: string) => void;
}

declare global {
  interface Window {
    snap: any;
  }
}

export default function MidtransPayment({
  bookingData,
  onError,
}: MidtransPaymentProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [snapToken, setSnapToken] = useState<string>("");
  const router = useRouter();

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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/midtrans`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookingData }),
        }
      );

      const data = await response.json();

      console.log("midtrans data", data);

      if (data.token) {
        setSnapToken(data.token);

        // Open Midtrans popup
        window.snap.pay(data.token, {
          onSuccess: function (result: any) {
            console.log("Payment success:", result);
            toast.success("Payment successful!");
            router.push(
              `/payment/success?order_id=${data.order_id}&status_code=${data.status_code}&transaction_status=${data.transaction_status}`
            );
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
      {loading && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="text-white text-xl">Loading...</div>
        </div>
      )}
    </div>
  );
}
