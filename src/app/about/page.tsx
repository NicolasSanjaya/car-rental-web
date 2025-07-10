"use client";

import Link from "next/link";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Our Car Rental Service
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Providing premium car rental services with excellence and
            reliability since 2020
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Our Story</h3>
              <p className="text-gray-300 mb-4">
                Founded in 2020, we started with a simple mission: to make car
                rental accessible, affordable, and hassle-free for everyone.
                What began as a small local business has grown into a trusted
                name in the car rental industry.
              </p>
              <p className="text-gray-300 mb-4">
                We understand that every journey is unique, whether it&apos;s a
                business trip, family vacation, or weekend getaway. That&apos;s
                why we&apos;ve built our service around flexibility,
                reliability, and exceptional customer care.
              </p>
              <p className="text-gray-300">
                Today, we&apos;re proud to serve thousands of satisfied
                customers with our diverse fleet of well-maintained vehicles and
                commitment to excellence.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8 shadow-2xl">
              <h4 className="text-2xl font-bold text-white mb-6">
                Why Choose Us?
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-1 mr-3">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold">Premium Fleet</h5>
                    <p className="text-gray-400 text-sm">
                      Modern, well-maintained vehicles for every need
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-1 mr-3">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold">24/7 Support</h5>
                    <p className="text-gray-400 text-sm">
                      Round-the-clock customer assistance
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-1 mr-3">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold">
                      Competitive Pricing
                    </h5>
                    <p className="text-gray-400 text-sm">
                      Best rates with transparent pricing
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-1 mr-3">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold">Easy Booking</h5>
                    <p className="text-gray-400 text-sm">
                      Simple online reservation system
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="bg-gray-800 rounded-xl p-6 text-center shadow-2xl">
              <div className="text-3xl font-bold text-red-500 mb-2">5000+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 text-center shadow-2xl">
              <div className="text-3xl font-bold text-red-500 mb-2">150+</div>
              <div className="text-gray-300">Premium Vehicles</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 text-center shadow-2xl">
              <div className="text-3xl font-bold text-red-500 mb-2">25+</div>
              <div className="text-gray-300">Cities Covered</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 text-center shadow-2xl">
              <div className="text-3xl font-bold text-red-500 mb-2">4.8</div>
              <div className="text-gray-300">Customer Rating</div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-6">Our Team</h3>
            <p className="text-gray-300 mb-8">
              Meet the dedicated professionals who make your car rental
              experience exceptional
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800 rounded-xl p-6 shadow-2xl">
                <div className="w-20 h-20 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">JD</span>
                </div>
                <h4 className="text-white font-semibold mb-2">John Doe</h4>
                <p className="text-gray-400 text-sm mb-2">CEO & Founder</p>
                <p className="text-gray-300 text-sm">
                  Leading the company with vision and passion for excellence
                </p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 shadow-2xl">
                <div className="w-20 h-20 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">JS</span>
                </div>
                <h4 className="text-white font-semibold mb-2">Jane Smith</h4>
                <p className="text-gray-400 text-sm mb-2">Operations Manager</p>
                <p className="text-gray-300 text-sm">
                  Ensuring smooth operations and exceptional service quality
                </p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 shadow-2xl">
                <div className="w-20 h-20 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">MB</span>
                </div>
                <h4 className="text-white font-semibold mb-2">Mike Brown</h4>
                <p className="text-gray-400 text-sm mb-2">
                  Customer Service Lead
                </p>
                <p className="text-gray-300 text-sm">
                  Dedicated to providing outstanding customer support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h3>
          <p className="text-gray-300 mb-8">
            Join thousands of satisfied customers and experience the difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-8 rounded-lg transition duration-200"
            >
              Get in Touch
            </Link>
            <Link
              href="/login"
              className="bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-medium py-3 px-8 rounded-lg transition duration-200"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
