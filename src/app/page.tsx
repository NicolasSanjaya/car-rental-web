import Hero from "@/app/components/Hero";
import FeaturedCars from "@/app/components/FeaturedCars";
import Services from "@/app/components/Services";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.getAll();
  console.log({ token });
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
