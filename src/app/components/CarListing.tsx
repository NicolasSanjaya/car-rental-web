"use client";
import { useState, useEffect, ChangeEvent, useMemo } from "react";
import { CarListApiResponse, CarFilters } from "@/app/types/car";
import CarCard from "./CarCard";

export default function CarListing() {
  const [allCars, setAllCars] = useState<CarListApiResponse["data"]>([]);
  const [cars, setCars] = useState<CarListApiResponse["data"]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<CarFilters>({
    brand: "",
    year: "",
    available: "",
  });

  // Efek untuk fetch semua mobil (hanya sekali)
  useEffect(() => {
    const fetchAllCarsForFilters = async (): Promise<void> => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`);
        const data: CarListApiResponse = await response.json();
        setAllCars(data?.data || []);
      } catch (error) {
        console.error("Error fetching all cars for filters:", error);
      }
    };
    fetchAllCarsForFilters();
  }, []);

  useEffect(() => {
    const fetchCars = async (): Promise<void> => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.brand) params.append("brand", filters.brand);
        if (filters.year) params.append("year", filters.year);
        if (filters.available) params.append("available", filters.available);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/cars?${params}`
        );
        const data: CarListApiResponse = await response.json();
        setCars(data?.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setLoading(false);
      }
    };
    fetchCars();
  }, [filters]);

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

  const availableYears = useMemo(() => {
    if (allCars?.length === 0) return [];

    // 1. Ambil semua tahun dari data `allallCars`
    const years = allCars?.map((car) => car.year);
    // 2. Buat Set untuk menghilangkan duplikat, lalu ubah kembali ke array
    const uniqueYears = [...new Set(years)];
    // 3. Urutkan dari tahun terlama ke terbaru (ascending)
    uniqueYears.sort((a, b) => b - a);
    return uniqueYears;
  }, [allCars]); // <-- Hanya akan dihitung ulang jika `allallCars` berubah

  const availableBrands = useMemo(() => {
    if (allCars?.length === 0) return [];

    // 1. Ambil semua merek
    const brands = allCars?.map((car) => car.brand.toUpperCase());
    // 2. Hilangkan duplikat dan ubah kembali ke array
    const uniqueBrands = [...new Set(brands)];
    // 3. Urutkan berdasarkan abjad
    uniqueBrands.sort();
    return uniqueBrands;
  }, [allCars]); // <-- Hanya dihitung ulang jika `allCars` berubah

  console.log({ filters });

  return (
    <div>
      {/* Filters */}
      <div
        className="bg-white p-6 rounded-lg shadow-md mb-8"
        data-aos="fade-up"
      >
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
              <option value="">All Brand</option>
              {availableBrands?.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
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
              {availableYears?.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
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
          {loading ? "Loading..." : `${cars?.length} cars found`}
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
          {cars?.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}

      {!loading && cars?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No cars found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
