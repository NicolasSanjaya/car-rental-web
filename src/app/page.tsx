"use client";
import Hero from "@/app/components/Hero";
import FeaturedCars from "@/app/components/FeaturedCars";
import Services from "@/app/components/Services";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedCars />
      <Services />
      <Footer />
    </div>
  );
}
