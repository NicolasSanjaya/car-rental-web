/* eslint-disable react-hooks/exhaustive-deps */
// app/components/Navbar.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import { logoutAction } from "../(auth)/login/actions";
import { toast } from "react-toastify";

const initialState = {
  success: false,
  message: "",
  error: false,
  data: null,
};

export default function Navbar() {
  const { user, loading, setUser } = useUser();
  const [showUserMenu, setShowUserMenu] = useState(false);
  // State baru untuk mengontrol visibilitas menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [state, formAction] = useActionState(logoutAction, initialState);

  console.log("navbar user", user);
  console.log("loading user context", loading);

  useEffect(() => {
    console.log("navbar state", state);
    if (state?.success === true) {
      setShowUserMenu(false);
      setIsMenuOpen(false);
      toast.success(state?.data?.message);
      setUser(null);
      router.push("/");
    } else {
      if (state?.message !== "") {
        toast.error(state?.message);
      }
    }
  }, [state?.success]);

  // useEffect(() => {
  //   if (user !== null) {
  //     setUser(user);
  //   }
  // }, [user]);

  // Fungsi untuk menutup semua menu, berguna saat navigasi
  const closeAllMenus = () => {
    setShowUserMenu(false);
    setIsMenuOpen(false);
  };

  // Komponen link navigasi untuk menghindari duplikasi kode
  const NavLinks = () => (
    <>
      {user?.role === "admin" ? (
        <>
          <Link
            href="/dashboard"
            className="hover:text-red-500 transition"
            onClick={closeAllMenus}
          >
            Dashboard
          </Link>
          <Link
            href="/cars-management"
            className="hover:text-red-500 transition"
            onClick={closeAllMenus}
          >
            Cars Management
          </Link>
        </>
      ) : (
        <>
          <Link
            href="/"
            className="hover:text-red-500 transition"
            onClick={closeAllMenus}
          >
            Home
          </Link>
          <Link
            href="/cars"
            className="hover:text-red-500 transition"
            onClick={closeAllMenus}
          >
            Cars
          </Link>
          <Link
            href="/about"
            className="hover:text-red-500 transition"
            onClick={closeAllMenus}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-red-500 transition"
            onClick={closeAllMenus}
          >
            Contact
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav
      className="bg-black text-white px-4 h-24 fixed w-full top-0 z-50 flex items-center shadow-lg"
      data-aos="fade-down"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" onClick={closeAllMenus}>
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={100}
            priority
          />
        </Link>

        {/* Navigasi Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLinks />
        </div>

        {/* Bagian Kanan: Auth & Menu Toggler */}
        <div className="flex items-center space-x-4" data-aos="fade-left">
          {/* User/Auth Section */}
          <div className="hidden md:flex">
            {loading ? (
              <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            ) : user?.email ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 transition"
                >
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">
                      {user?.full_name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hover:text-red-500">{user?.full_name}</span>
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
                      onClick={closeAllMenus}
                    >
                      Profile
                    </Link>
                    {user?.role === "user" && (
                      <Link
                        href="/bookings"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={closeAllMenus}
                      >
                        My Bookings
                      </Link>
                    )}
                    <hr className="my-2" />
                    <form action={formAction}>
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                        type="submit"
                      >
                        Logout
                      </button>
                    </form>
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

          {/* Hamburger Menu Toggler (hanya tampil di mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none cursor-pointer duration-500 transition ease-in-out"
              aria-label="Toggle menu"
              data-aos="zoom-in"
            >
              {isMenuOpen ? (
                // Ikon 'X' (Close)
                <svg
                  className={`w-8 h-8 ${
                    isMenuOpen ? "opacity-100" : "opacity-0"
                  } transition duration-500 ease-in-out`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Ikon Hamburger
                <svg
                  className={`w-8 h-8 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  } transition duration-500 ease-in-out`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile (Dropdown) */}
      {isMenuOpen && (
        <div
          className={`md:hidden absolute top-24 left-0 w-full bg-black shadow-lg`}
          data-aos={`${isMenuOpen ? "fade-down" : "fade-up"}`}
        >
          <div className="flex flex-col items-center space-y-4 py-4">
            <NavLinks />
            {/* Tampilkan Auth section di mobile menu juga */}
            <div className="pt-4 border-t border-gray-700 w-full flex flex-col items-center space-y-4">
              {loading ? (
                <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              ) : user?.email ? (
                <>
                  <Link
                    href="/profile"
                    className="hover:text-red-500 transition"
                    onClick={closeAllMenus}
                  >
                    Profile ({user.full_name})
                  </Link>
                  {user?.role === "user" && (
                    <Link
                      href="/bookings"
                      className="hover:text-red-500 transition"
                      onClick={closeAllMenus}
                    >
                      My Bookings
                    </Link>
                  )}
                  <form action={formAction}>
                    <button
                      className="w-full text-center py-2 text-red-500"
                      type="submit"
                    >
                      Logout
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hover:text-red-500 transition"
                    onClick={closeAllMenus}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                    onClick={closeAllMenus}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
