"use client";
import Hero from "@/app/components/Hero";
import FeaturedCars from "@/app/components/FeaturedCars";
import Services from "@/app/components/Services";
import Navbar from "./components/Navbar";
import { useUser } from "./context/UserContext";
import Footer from "./components/Footer";

export default function Home() {
  const { user } = useUser();
  console.log("User:", user);
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
