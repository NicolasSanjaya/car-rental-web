"use client";
import { useState, useEffect } from "react";
import { CarApiResponse, Car } from "@/app/types/car";
import BookingForm from "@/app/components/BookingForm";
import Image from "next/image";

interface CarDetailProps {
  carId: string;
}

export default function CarDetail({ carId }: CarDetailProps) {
  const [car, setCar] = useState<Car>();
  const [loading, setLoading] = useState<boolean>(true);
  const [showBooking, setShowBooking] = useState<boolean>(false);

  useEffect(() => {
    fetchCarDetail();
  }, [carId]);

  useEffect(() => {
    if (showBooking) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Optional: cleanup on unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showBooking]);

  const fetchCarDetail = async (): Promise<void> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cars/${carId}`
      );
      const data: CarApiResponse = await response.json();
      setCar(data?.car);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching car detail:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`container mx-auto px-4 py-8`}>
        <div className="bg-gray-200 animate-pulse rounded-lg h-96 mb-8"></div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
          <div className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Car Not Found
          </h1>
          <p className="text-gray-600">
            The car you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-4 py-8 `}>
      {/* Car Image */}
      <div className="relative mb-8">
        <Image
          src={car?.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-96 object-cover rounded-lg shadow-lg"
          width={800}
          height={600}
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              car.is_available
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {car.is_available ? "Available" : "Rented"}
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Car Information */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-2">
            {car.brand} {car.model}
          </h1>
          <p className="text-gray-600 text-lg mb-6">{car.year}</p>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Features</h3>
            <div className="space-y-2">
              {car.features?.map((feature, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-100 px-3 py-2 rounded-full text-sm mr-2 mb-2 border border-black text-gray-700"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* {car.description && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{car.description}</p>
            </div>
          )} */}

          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-black">
              ${car.price}/day
            </span>
            <button
              onClick={() => setShowBooking(true)}
              className={`px-6 py-3 rounded-lg font-semibold transition cursor-pointer ${
                car.is_available
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!car.is_available}
            >
              {car.is_available ? "Book Now" : "Unavailable"}
            </button>
          </div>
        </div>

        {/* Specifications */}
        {/* {car.specifications && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Specifications</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Engine:</span>
                <span className="font-semibold">
                  {car.specifications.engine}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Horsepower:</span>
                <span className="font-semibold">
                  {car.specifications.horsepower}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Torque:</span>
                <span className="font-semibold">
                  {car.specifications.torque}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transmission:</span>
                <span className="font-semibold">
                  {car.specifications.transmission}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Top Speed:</span>
                <span className="font-semibold">
                  {car.specifications.topSpeed}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">0-60 mph:</span>
                <span className="font-semibold">
                  {car.specifications.acceleration}
                </span>
              </div>
            </div>
          </div>
        )} */}
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <BookingForm
          car={car}
          onClose={() => setShowBooking(false)}
          isOpen={showBooking}
        />
      )}
    </div>
  );
}
