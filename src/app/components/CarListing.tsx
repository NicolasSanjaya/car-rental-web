"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { Car, CarFilters } from "@/app/types/car";
import CarCard from "./CarCard";

export default function CarListing() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<CarFilters>({
    brand: "",
    year: "",
    available: "",
  });

  useEffect(() => {
    fetchCars();
  }, [filters]);

  const fetchCars = async (): Promise<void> => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.brand) params.append("brand", filters.brand);
      if (filters.year) params.append("year", filters.year);
      if (filters.available) params.append("available", filters.available);

      const response = await fetch(`/api/cars?${params}`);
      const data: Car[] = await response.json();
      setCars(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof CarFilters, value: string): void => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = (): void => {
    setFilters({
      brand: "",
      year: "",
      available: "",
    });
  };

  return (
    <div>
      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">Filter Cars</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Brand</label>
            <select
              value={filters.brand}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleFilterChange("brand", e.target.value)
              }
              className="w-full p-2 border rounded-lg"
            >
              <option value="">All Brands</option>
              <option value="Ferrari">Ferrari</option>
              <option value="Lamborghini">Lamborghini</option>
              <option value="McLaren">McLaren</option>
              <option value="Porsche">Porsche</option>
              <option value="Aston Martin">Aston Martin</option>
              <option value="Bugatti">Bugatti</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Year</label>
            <select
              value={filters.year}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleFilterChange("year", e.target.value)
              }
              className="w-full p-2 border rounded-lg"
            >
              <option value="">All Years</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Availability
            </label>
            <select
              value={filters.available}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleFilterChange("available", e.target.value)
              }
              className="w-full p-2 border rounded-lg"
            >
              <option value="">All</option>
              <option value="true">Available</option>
              <option value="false">Rented</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-6">
        <p className="text-gray-600">
          {loading ? "Loading..." : `${cars.length} cars found`}
        </p>
      </div>

      {/* Car Grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-gray-200 animate-pulse rounded-lg h-80"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}

      {!loading && cars.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No cars found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
