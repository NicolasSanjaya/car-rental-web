"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User as UserIcon,
  Mail,
  Lock,
  Edit3,
  Save,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProfilePage() {
  const { user, loading, checkAuthStatus } = useUser();
  const [editing, setEditing] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    email: user?.email || "",
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
    checkAuthStatus
  );

  console.log("data", data);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (field: string) => {
    const newErrors: Record<string, string> = {};

    if (field === "full_name") {
      if (!formData.full_name.trim()) {
        newErrors.full_name = "Full name is required";
      } else if (formData.full_name.length < 2) {
        newErrors.full_name = "Full name must be at least 2 characters";
      }
    }

    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (field === "password") {
      if (!formData.current_password) {
        newErrors.current_password = "Current password is required";
      }
      if (!formData.new_password) {
        newErrors.new_password = "New password is required";
      } else if (formData.new_password.length < 6) {
        newErrors.new_password = "New password must be at least 6 characters";
      }
      if (formData.new_password !== formData.confirm_password) {
        newErrors.confirm_password = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (field: string) => {
    if (!validateForm(field)) return;

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      let endpoint = "";
      let body = {};

      if (field === "full_name") {
        endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/profile/update`;
        body = {
          full_name: formData.full_name,
          email: user?.email,
          id: user?.id,
        };
      } else if (field === "email") {
        endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/profile/update`;
        body = {
          email: formData.email,
          full_name: user?.full_name,
          id: user?.id,
        };
      } else if (field === "password") {
        endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/profile/change-password`;
        body = {
          current_password: formData.current_password,
          new_password: formData.new_password,
          id: user?.id,
        };
      }

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`); // Revalidate the profile data
        toast.success(data.message);
        setEditing(null);
        if (field === "password") {
          setFormData((prev) => ({
            ...prev,
            current_password: "",
            new_password: "",
            confirm_password: "",
          }));
        }
      } else {
        toast.error(data.message || "Update failed");
        setErrors({ [field]: data.message || "Update failed" });
      }
    } catch (error) {
      toast.error("An error occurred while updating your profile.");
      console.error("Error updating profile:", error);
      setErrors({ [field]: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setErrors({});
    if (user) {
      setFormData((prev) => ({
        ...prev,
        full_name: user?.full_name,
        email: user?.email,
        current_password: "",
        new_password: "",
        confirm_password: "",
      }));
    }
  };

  if (loading) {
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
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Profile Settings
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Manage your account information and preferences
          </p>
        </div>
      </section>

      {/* user Form */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* user Picture */}
          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl mb-8 text-center">
            <div className="w-24 h-24 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <UserIcon className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {user?.full_name || "User"}
            </h3>
            <p className="text-gray-400">{user?.email}</p>
          </div>

          {/* Full Name */}
          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <UserIcon className="w-5 h-5 mr-2" />
                Full Name
              </h3>
              {editing !== "full_name" && (
                <button
                  onClick={() => setEditing("full_name")}
                  className="text-red-500 hover:text-red-400 transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              )}
            </div>

            {editing === "full_name" ? (
              <div className="space-y-4">
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                  placeholder="Enter your full name"
                />
                {errors.full_name && (
                  <p className="text-red-500 text-sm">{errors.full_name}</p>
                )}
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleSubmit("full_name")}
                    className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                    disabled={isLoading}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      "Save"
                    )}
                  </button>
                  <button
                    onClick={() => handleCancel()}
                    className="flex items-center bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-300">{user?.full_name}</p>
            )}
          </div>

          {/* Email */}
          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Email Address
              </h3>
              {editing !== "email" && (
                <button
                  onClick={() => setEditing("email")}
                  className="text-red-500 hover:text-red-400 transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              )}
            </div>

            {editing === "email" ? (
              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleSubmit("email")}
                    className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                    disabled={isLoading}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      "Save"
                    )}
                  </button>
                  <button
                    onClick={() => handleCancel()}
                    className="flex items-center bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-300">{user?.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                Password
              </h3>
              {editing !== "password" && (
                <button
                  onClick={() => setEditing("password")}
                  className="text-red-500 hover:text-red-400 transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              )}
            </div>

            {editing === "password" ? (
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="current_password"
                    value={formData.current_password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 pr-12"
                    placeholder="Current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.current_password && (
                  <p className="text-red-500 text-sm">
                    {errors.current_password}
                  </p>
                )}

                <input
                  type="password"
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                  placeholder="New password"
                />
                {errors.new_password && (
                  <p className="text-red-500 text-sm">{errors.new_password}</p>
                )}

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 pr-12"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirm_password && (
                  <p className="text-red-500 text-sm">
                    {errors.confirm_password}
                  </p>
                )}

                <div className="flex space-x-4">
                  <button
                    onClick={() => handleSubmit("password")}
                    className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                    disabled={isLoading}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      "Save"
                    )}
                  </button>
                  <button
                    onClick={() => handleCancel()}
                    className="flex items-center bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-300">••••••••••••</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 px-4">
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
