import CarListing from "@/app/components/CarListing";
import Footer from "../components/Footer";

export default function CarsPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          Our Sports Car Collection
        </h1>
        <CarListing />
      </div>
      <Footer />
    </div>
  );
}
