"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Car,
  Home,
  ArrowLeft,
  Search,
  MapPin,
  AlertTriangle,
} from "lucide-react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col">
      {/* Navigation */}
      <nav className="py-4 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Car className="w-8 h-8 text-red-500" />
            <span className="text-2xl font-bold text-white">CarRental</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/cars"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Browse Cars
            </Link>
            <Link
              href="/bookings"
              className="text-gray-300 hover:text-white transition-colors"
            >
              My Bookings
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Animation */}
          <div className="relative mb-8">
            <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 animate-pulse">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-500/20 rounded-full p-4 animate-bounce">
                <AlertTriangle className="w-12 h-12 text-red-500" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Oops! Page Not Found
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              Looks like you took a wrong turn
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The page you&apos;re looking for doesn&apos;t exist. It might have
              been moved, deleted, or you entered the wrong URL. Don&apos;t
              worry, even the best drivers sometimes miss their exit!
            </p>
          </div>

          {/* Car Animation */}
          <div className="mb-12 overflow-hidden">
            <div className="flex items-center justify-center">
              <div className="relative">
                <Car className="w-16 h-16 text-red-500 animate-bounce" />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg transition-colors font-semibold"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
            <Link
              href="/cars"
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg transition-colors font-semibold"
            >
              <Car className="w-5 h-5" />
              Browse Cars
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-4 rounded-lg transition-colors font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>

          {/* Search Suggestion */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-semibold text-white">
                Looking for something specific?
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <Link
                href="/cars"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Car className="w-4 h-4" />
                Available Cars
              </Link>
              <Link
                href="/bookings"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <MapPin className="w-4 h-4" />
                My Bookings
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                Contact Support
              </Link>
            </div>
          </div>

          {/* Fun Message */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Error Code: 404 - Route Not Found 🚗💨
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-gray-400 mb-4">
            <p>&copy; 2024 CarRental. All rights reserved.</p>
          </div>
          <div className="flex justify-center space-x-6">
            <Link
              href="/about"
              className="text-gray-400 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
