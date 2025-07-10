// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const { user, logout, loading } = useUser();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   checkAuthStatus().catch((err) => {
  //     console.error("Auth check failed:", err);
  //     router.push("/login");
  //   });
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    setShowUserMenu(false);
    router.push("/");
  };

  return (
    <nav className="bg-black text-white px-4 h-24 fixed w-full top-0 z-50 flex items-center shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={100}
            priority
          />
        </Link>

        <div className="flex items-center space-x-6">
          <Link href="/" className="hover:text-red-500 transition">
            Home
          </Link>
          <Link href="/cars" className="hover:text-red-500 transition">
            Cars
          </Link>
          <Link href="/about" className="hover:text-red-500 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-red-500 transition">
            Contact
          </Link>

          {loading ? (
            <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2  transition"
              >
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">
                    {user.full_name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="hover:text-red-500">{user.full_name}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    showUserMenu ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-black z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/bookings"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    My Bookings
                  </Link>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/login" className="hover:text-red-500 transition">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
