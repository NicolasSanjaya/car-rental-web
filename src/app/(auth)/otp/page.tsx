/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { useForm } from "@/app/context/RegisterContext";
import { useUser } from "@/app/context/UserContext";
import { registerAction } from "./actions";

const initialState = {
  success: false,
  message: "",
  error: false,
  data: null,
};

export default function OTPPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const router = useRouter();
  const { formData } = useForm();
  const { setUser } = useUser();

  useEffect(() => {
    const data = localStorage.getItem("form-data");
    const email = data ? JSON.parse(data).email : null;
    if (!email) {
      router.push("/register");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [formData?.email]);

  useEffect(() => {
    // Fokus input pertama setelah render
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      (inputRefs.current[index - 1] ?? {}).focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);

    try {
      const verifyOtp = await fetch(
        `${process.env.NEXT_PUBLIC_API_OTP_AUTH_URL}/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData?.email,
            otp: otpCode,
          }),
        }
      );
      const verifyOtpData = await verifyOtp.json();

      if (verifyOtp.ok) {
        toast.success("OTP verified successfully!");

        const newFormData = new FormData();
        if (formData) {
          Object.entries(formData as Record<string, string>).forEach(
            ([key, value]) => {
              newFormData.append(key, value);
            }
          );
        }

        // Register the user after OTP verification
        const status = await registerAction(initialState, newFormData);
        console.log("register status submit", status);
        if (status) {
          setUser({
            id: status?.data?.data?.user.id,
            full_name: status?.data?.data?.user.full_name,
            email: status?.data?.data?.user.email,
            role: status?.data?.data?.user.role,
          });
          if (status?.success === false && status?.message !== "") {
            toast.error(status?.message);
          } else if (status?.success === true && status?.message !== "") {
            toast.success(status?.message);
          }
          if (status?.data?.data?.user.role === "admin") {
            router.push("/dashboard");
          } else if (status?.data?.data?.user.role === "user") {
            router.push("/");
          }
        }
      } else {
        toast.error(verifyOtpData.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setIsLoading(true);

    try {
      const response = await fetch("/request-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData?.email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("OTP sent successfully!");
        setTimeLeft(300);
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
      } else {
        toast.error(data.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Verify Your Email
          </h2>
          <p className="text-gray-400 mb-2">
            We&apos;ve sent a 6-digit code to
          </p>
          <p className="text-white font-semibold">{formData?.email}</p>
        </div>

        <div
          className="bg-gray-800 rounded-xl p-8 shadow-2xl"
          data-aos="zoom-in"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4 text-center">
                Enter verification code
              </label>
              <div className="flex justify-center space-x-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      if (el) {
                        inputRefs.current[index] = el;
                      }
                    }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-bold bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="0"
                  />
                ))}
              </div>
            </div>

            <div className="text-center">
              {timeLeft > 0 ? (
                <p className="text-gray-400">
                  Code expires in{" "}
                  <span className="text-red-500 font-semibold">
                    {formatTime(timeLeft)}
                  </span>
                </p>
              ) : (
                <p className="text-gray-400">Code has expired</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.some((digit) => !digit)}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Verify Email"
              )}
            </button>

            <div className="text-center">
              <p className="text-gray-400 mb-2">
                Didn&apos;t receive the code?
              </p>
              <button
                type="button"
                onClick={handleResend}
                disabled={!canResend || isLoading}
                className="text-red-500 hover:text-red-400 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {canResend
                  ? "Resend Code"
                  : `Resend in ${formatTime(timeLeft)}`}
              </button>
            </div>

            <div className="text-center">
              <Link
                href="/register"
                className="text-gray-400 hover:text-white text-sm"
              >
                ← Back to Registration
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
