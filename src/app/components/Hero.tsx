import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 text-center" data-aos="fade-up">
        <h1 className="text-6xl font-bold mb-6">
          Elite Sports Car <span className="text-red-500">Rental</span>
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Experience the thrill of driving the world&apos;s most prestigious
          supercars. Premium collection, exceptional service, unforgettable
          memories.
        </p>
        <div className="space-x-4">
          <Link
            href={"/cars"}
            className="bg-red-500 hover:bg-red-600 px-8 py-3 rounded-lg font-semibold transition cursor-pointer"
          >
            View Collection
          </Link>
          <button className="border border-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
