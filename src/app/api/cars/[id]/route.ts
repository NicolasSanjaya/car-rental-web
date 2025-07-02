import { NextRequest, NextResponse } from "next/server";
import { Car } from "@/app/types/car";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = params;

  // Mock single car data - replace with your actual backend API call
  const mockCar: Car = {
    id: parseInt(id),
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    brand: "Ferrari",
    model: "488 GTB",
    year: 2023,
    is_available: true,
    price: 1200,
    features: ["V8 Turbo", "661 HP", "0-60 in 3.0s"],
    description:
      "Experience the ultimate in Italian engineering and design with the Ferrari 488 GTB. This masterpiece combines raw power with refined elegance.",
    specifications: {
      engine: "3.9L Twin-Turbo V8",
      horsepower: "661 HP",
      torque: "561 lb-ft",
      transmission: "7-Speed Dual-Clutch",
      topSpeed: "205 mph",
      acceleration: "0-60 mph in 3.0s",
    },
  };

  return NextResponse.json(mockCar);
}
