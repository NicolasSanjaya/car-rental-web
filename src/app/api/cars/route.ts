// import { NextRequest, NextResponse } from "next/server";
// import { Car } from "@/app/types/car";

// Mock data - replace with your actual backend API calls
// const mockCars: Car[] = [
//   {
//     id: 1,
//     image:
//       "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
//     brand: "Ferrari",
//     model: "488 GTB",
//     year: 2023,
//     is_available: true,
//     price: 1200,
//     features: ["V8 Turbo", "661 HP", "0-60 in 3.0s"],
//   },
//   {
//     id: 2,
//     image:
//       "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
//     brand: "Lamborghini",
//     model: "Huracán",
//     year: 2023,
//     is_available: true,
//     price: 1500,
//     features: ["V10 Engine", "631 HP", "0-60 in 2.9s"],
//   },
//   {
//     id: 3,
//     image:
//       "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80",
//     brand: "McLaren",
//     model: "720S",
//     year: 2022,
//     is_available: false,
//     price: 1800,
//     features: ["Twin Turbo V8", "710 HP", "0-60 in 2.8s"],
//   },
//   {
//     id: 4,
//     image:
//       "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
//     brand: "Porsche",
//     model: "911 Turbo S",
//     year: 2023,
//     is_available: true,
//     price: 900,
//     features: ["Twin Turbo H6", "640 HP", "0-60 in 2.6s"],
//   },
//   {
//     id: 5,
//     image:
//       "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
//     brand: "Aston Martin",
//     model: "DB11",
//     year: 2023,
//     is_available: true,
//     price: 1100,
//     features: ["Twin Turbo V8", "503 HP", "0-60 in 3.9s"],
//   },
//   {
//     id: 6,
//     image:
//       "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
//     brand: "Bugatti",
//     model: "Chiron",
//     year: 2022,
//     is_available: false,
//     price: 3000,
//     features: ["Quad Turbo W16", "1479 HP", "0-60 in 2.3s"],
//   },
// ];

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const brand = searchParams.get("brand");
//   const year = searchParams.get("year");
//   const available = searchParams.get("available");

//   let filteredCars = mockCars;

//   if (brand) {
//     filteredCars = filteredCars.filter((car) =>
//       car.brand.toLowerCase().includes(brand.toLowerCase())
//     );
//   }

//   if (year) {
//     filteredCars = filteredCars.filter((car) => car.year.toString() === year);
//   }

//   if (available !== null) {
//     filteredCars = filteredCars.filter(
//       (car) => car.is_available === (available === "true")
//     );
//   }

//   return NextResponse.json(filteredCars);
// }
