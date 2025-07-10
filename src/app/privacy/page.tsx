"use client";

import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Privacy Policy
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Your privacy is important to us. Learn how we collect, use, and
            protect your information.
          </p>
          <p className="text-gray-400">Last updated: July 10, 2025</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Information We Collect
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>
                We collect information you provide directly to us, such as when
                you create an account, make a reservation, or contact us for
                support. This may include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Personal information (name, email address, phone number)
                </li>
                <li>
                  Payment information (credit card details, billing address)
                </li>
                <li>Driver&apos;s license information</li>
                <li>Vehicle preferences and rental history</li>
                <li>Communication preferences</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              How We Use Your Information
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process your car rental reservations and transactions</li>
                <li>Provide customer support and respond to your inquiries</li>
                <li>Send you booking confirmations and important updates</li>
                <li>Improve our services and develop new features</li>
                <li>Comply with legal obligations and enforce our terms</li>
                <li>Send promotional communications (with your consent)</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Information Sharing
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>
                We do not sell, trade, or rent your personal information to
                third parties. We may share your information only in the
                following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With service providers who help us operate our business</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer or acquisition</li>
                <li>With your explicit consent</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Data Security
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and employee training</li>
                <li>Secure payment processing systems</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">Your Rights</h3>
            <div className="space-y-4 text-gray-300">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and review your personal information</li>
                <li>Request corrections to inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of your data in a portable format</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at
                privacy@carrental.com or use the contact information provided
                below.
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Cookies and Tracking
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>
                We use cookies and similar tracking technologies to enhance your
                experience on our website. These technologies help us:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and recommendations</li>
                <li>Improve website performance and functionality</li>
              </ul>
              <p className="mt-4">
                You can control cookies through your browser settings, but some
                features may not work properly if cookies are disabled.
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Contact Us</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="space-y-2">
                <p>
                  <strong>Email:</strong> privacy@carrental.com
                </p>
                <p>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
                <p>
                  <strong>Address:</strong> 123 Main Street, City, State 12345
                </p>
              </div>
              <p className="mt-4">
                We will respond to your inquiry within 30 days of receiving your
                request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            Questions About Our Privacy Policy?
          </h3>
          <p className="text-gray-300 mb-8">
            Our team is here to help you understand how we protect your privacy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-8 rounded-lg transition duration-200"
            >
              Contact Us
            </Link>
            <Link
              href="/terms"
              className="bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-medium py-3 px-8 rounded-lg transition duration-200"
            >
              Terms of Service
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
