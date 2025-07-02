import CarListing from "@/app/components/CarListing";

export default function CarsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Our Sports Car Collection
        </h1>
        <CarListing />
      </div>
    </div>
  );
}
