"use client";
import { useState, useEffect } from "react";
import { CarListApiResponse } from "@/app/types/car";
import CarCard from "@/app/components/CarCard";

export default function FeaturedCars() {
  const [cars, setCars] = useState<CarListApiResponse["cars"]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchFeaturedCars();
  }, []);

  const fetchFeaturedCars = async (): Promise<void> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cars?available=true`
      );
      const data: CarListApiResponse = await response.json();
      setCars(data?.cars?.slice(0, 3)); // Show only first 3 cars as featured
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 featured-cars-gradient">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Featured Cars
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-200 animate-pulse rounded-lg h-80"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 featured-cars-gradient">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Featured Cars
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {cars?.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="/cars"
            className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            View All Cars
          </a>
        </div>
      </div>
    </section>
  );
}
