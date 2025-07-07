import Hero from "@/app/components/Hero";
import FeaturedCars from "@/app/components/FeaturedCars";
import Services from "@/app/components/Services";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedCars />
      <Services />
    </div>
  );
}
