"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { toast } from "react-toastify";

// Zod schema for contact form validation
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number must be less than 15 characters"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters"),
  serviceType: z.enum(["rental", "support", "feedback", "other"], {
    error: "Please select a service type",
  }),
  agreeToTerms: z
    .boolean()
    .refine(
      (val) => val === true,
      "You must agree to the terms and conditions"
    ),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success(
          result.message ||
            "Message sent successfully! We'll get back to you soon."
        );
        return { success: true, data: result.data };
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Contact form submission error:", error);

      let errorMessage = "Failed to send message. Please try again.";

      if (error instanceof Error) {
        if (error.message.includes("Failed to fetch")) {
          errorMessage =
            "Unable to connect to server. Please check your internet connection.";
        } else if (error.message.includes("429")) {
          errorMessage =
            "Too many requests. Please wait a moment before trying again.";
        } else if (error.message.includes("400")) {
          errorMessage = "Please check your form data and try again.";
        } else {
          errorMessage = error.message;
        }
      }
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
      reset(); // Reset form fields after submission
    }
  };

  return (
    <div className="min-h-screen">
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-300">
              We&apos;d love to hear from you. Send us a message and we&apos;ll
              respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8" data-aos="fade-right">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Address</h4>
                      <p className="text-gray-300">
                        123 Main Street, City, State 12345
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Phone</h4>
                      <p className="text-gray-300">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
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
                    <div>
                      <h4 className="text-white font-semibold">Email</h4>
                      <p className="text-gray-300">info@carrental.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">
                        Business Hours
                      </h4>
                      <p className="text-gray-300">
                        Monday - Friday: 8:00 AM - 8:00 PM
                      </p>
                      <p className="text-gray-300">
                        Saturday - Sunday: 9:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div
                className="bg-gray-800 rounded-xl p-6 shadow-2xl"
                data-aos="fade-right"
              >
                <h4 className="text-xl font-bold text-white mb-4">
                  Emergency Support
                </h4>
                <p className="text-gray-300 mb-4">
                  Need immediate assistance? Our 24/7 emergency support team is
                  here to help.
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="text-red-500 font-semibold">
                      Emergency: +1 (555) 911-HELP
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className="bg-gray-800 rounded-xl p-8 shadow-2xl"
              data-aos="fade-left"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                    {errors?.email?.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors?.email?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                    {errors?.phone?.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors?.phone?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Service Type *
                    </label>
                    <select
                      {...register("serviceType")}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Select service type</option>
                      <option value="rental">Car Rental Inquiry</option>
                      <option value="support">Customer Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.serviceType && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.serviceType.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    {...register("subject")}
                    type="text"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter message subject"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    placeholder="Enter your message"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div className="flex items-start">
                  <input
                    {...register("agreeToTerms")}
                    type="checkbox"
                    className="w-4 h-4 text-red-500 bg-gray-700 border-gray-600 rounded focus:ring-red-500 mt-1"
                  />
                  <label className="ml-2 text-sm text-gray-300">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-red-500 hover:text-red-400"
                    >
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-red-500 hover:text-red-400"
                    >
                      Privacy Policy
                    </Link>
                    *
                  </label>
                </div>
                {errors.agreeToTerms && (
                  <p className="text-sm text-red-500">
                    {errors.agreeToTerms.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16" data-aos="fade-up">
            <h3 className="text-3xl font-bold text-white text-center mb-12">
              Frequently Asked Questions
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-800 rounded-xl p-6 shadow-2xl">
                <h4 className="text-xl font-bold text-white mb-3">
                  What documents do I need to rent a car?
                </h4>
                <p className="text-gray-300">
                  You&apos;ll need a valid driver&apos;s license, credit card,
                  and proof of insurance. International visitors may need an
                  International Driving Permit.
                </p>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 shadow-2xl">
                <h4 className="text-xl font-bold text-white mb-3">
                  Can I modify or cancel my reservation?
                </h4>
                <p className="text-gray-300">
                  Yes, you can modify or cancel your reservation up to 24 hours
                  before pickup without any charges. Contact our support team
                  for assistance.
                </p>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 shadow-2xl">
                <h4 className="text-xl font-bold text-white mb-3">
                  What is your fuel policy?
                </h4>
                <p className="text-gray-300">
                  We operate on a full-to-full policy. You&apos;ll receive the
                  car with a full tank and should return it with a full tank to
                  avoid additional charges.
                </p>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 shadow-2xl">
                <h4 className="text-xl font-bold text-white mb-3">
                  Do you offer roadside assistance?
                </h4>
                <p className="text-gray-300">
                  Yes, we provide 24/7 roadside assistance for all our rental
                  vehicles. Call our emergency hotline if you need help during
                  your rental period.
                </p>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16" data-aos="zoom-in">
            <h3 className="text-3xl font-bold text-white text-center mb-8">
              Visit Our Location
            </h3>
            <div className="bg-gray-800 rounded-xl p-8 shadow-2xl">
              <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-white font-semibold mb-2">
                    Our Main Office
                  </h4>
                  <p className="text-gray-300">
                    123 Main Street, City, State 12345
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Interactive map would be integrated here with Google Maps or
                    similar service
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">CarRental</h4>
              <p className="text-gray-400 text-sm">
                Your trusted partner for premium car rental services.
              </p>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-white"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-gray-400 hover:text-white"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="text-gray-400">Car Rental</span>
                </li>
                <li>
                  <span className="text-gray-400">Long-term Lease</span>
                </li>
                <li>
                  <span className="text-gray-400">Corporate Fleet</span>
                </li>
                <li>
                  <span className="text-gray-400">Airport Pickup</span>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Contact Info</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>+1 (555) 123-4567</li>
                <li>info@carrental.com</li>
                <li>
                  123 Main Street
                  <br />
                  City, State 12345
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 CarRental. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
