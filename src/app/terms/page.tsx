"use client";

import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Terms of Service
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Please read these terms carefully before using our car rental
            services.
          </p>
          <p className="text-gray-400">Last updated: July 10, 2025</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              1. Acceptance of Terms
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>
                By accessing and using our car rental services, you accept and
                agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by the above, please do not use
                this service.
              </p>
              <p>
                These terms apply to all users of the service, including without
                limitation users who are browsers, vendors, customers,
                merchants, and/or contributors of content.
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              2. Rental Requirements
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>To rent a vehicle from us, you must:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Be at least 21 years old (25 for premium vehicles)</li>
                <li>Hold a valid driver&apos;s license for at least 2 years</li>
                <li>Provide a valid credit card in your name</li>
                <li>Present valid identification</li>
                <li>Meet our insurance requirements</li>
                <li>Pass our verification process</li>
              </ul>
              <p className="mt-4">
                Additional restrictions may apply based on your location,
                driving record, or the type of vehicle requested.
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              3. Booking and Payment
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>
                All bookings are subject to availability and confirmation. We
                reserve the right to cancel or modify reservations at our
                discretion.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment is due at the time of booking or vehicle pickup</li>
                <li>
                  A security deposit may be required and will be held on your
                  credit card
                </li>
                <li>
                  Cancellations must be made at least 24 hours before pickup
                </li>
                <li>Late cancellations may incur fees</li>
                <li>No-shows will be charged the full rental amount</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              4. Vehicle Use and Restrictions
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>When using our vehicles, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the vehicle only for lawful purposes</li>
                <li>Not exceed the maximum number of passengers</li>
                <li>
                  Not use the vehicle for racing, testing, or off-road driving
                </li>
                <li>Not transport hazardous materials</li>
                <li>Not smoke or allow smoking in the vehicle</li>
                <li>Return the vehicle in the same condition as received</li>
                <li>Report any accidents or damage immediately</li>
              </ul>
              <p className="mt-4">
                Violation of these restrictions may result in additional charges
                and termination of the rental agreement.
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              5. Insurance and Liability
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>
                You are responsible for all damage to the vehicle during the
                rental period, regardless of fault. We offer various insurance
                options:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Collision Damage Waiver (CDW)</li>
                <li>Theft Protection</li>
                <li>Liability Insurance</li>
                <li>Personal Accident Insurance</li>
              </ul>
              <p className="mt-4">
                You may decline our insurance if you have adequate coverage
                through your personal auto insurance or credit card. However,
                you will be fully responsible for any damages.
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              6. Fuel Policy
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>
                Our standard fuel policy is &quot;Full-to-Full.&quot; This
                means:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You will receive the vehicle with a full tank of fuel</li>
                <li>You must return the vehicle with a full tank of fuel</li>
                <li>Failure to refuel will result in refueling charges</li>
                <li>Use only the recommended fuel type for the vehicle</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              7. Additional Fees
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>Additional fees may apply for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Additional drivers</li>
                <li>Young driver surcharge (under 25)</li>
                <li>GPS navigation system</li>
                <li>Child safety seats</li>
                <li>One-way rentals</li>
                <li>Late return fees</li>
                <li>Cleaning fees</li>
                <li>Traffic violations and parking tickets</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              8. Limitation of Liability
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>
                To the maximum extent permitted by law, we shall not be liable
                for any indirect, incidental, special, consequential, or
                punitive damages, including without limitation, loss of profits,
                data, use, goodwill, or other intangible losses.
              </p>
              <p>
                Our total liability to you for any damages arising from or
                related to this agreement shall not exceed the total amount paid
                by you for the rental.
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              9. Termination
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>
                We may terminate this agreement and repossess the vehicle at any
                time without notice if:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You violate any terms of this agreement</li>
                <li>The vehicle is abandoned or used for illegal purposes</li>
                <li>You provide false information</li>
                <li>You fail to make required payments</li>
                <li>The vehicle is not returned as scheduled</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">
              10. Contact Information
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>
                If you have any questions about these Terms of Service, please
                contact us:
              </p>
              <div className="space-y-2">
                <p>
                  <strong>Email:</strong> legal@carrental.com
                </p>
                <p>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
                <p>
                  <strong>Address:</strong> 123 Main Street, City, State 12345
                </p>
              </div>
              <p className="mt-4">
                These terms are governed by the laws of [Your State/Country] and
                any disputes will be resolved in the courts of [Your
                Jurisdiction].
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Rent With Confidence?
          </h3>
          <p className="text-gray-300 mb-8">
            Now that you understand our terms, start your rental journey with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-8 rounded-lg transition duration-200"
            >
              Start Booking
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-medium py-3 px-8 rounded-lg transition duration-200"
            >
              Have Questions?
            </Link>
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
