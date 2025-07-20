import { Car } from "@/app/types/car";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const router = useRouter();

  return (
    <div
      className="car-card bg-white rounded-lg shadow-lg overflow-hidden"
      data-aos="fade-up"
    >
      <div className="relative">
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-48 object-cover"
          width={500}
          height={300}
          priority
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              car.is_available
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {car.is_available ? "Available" : "Rented"}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">
          {car.brand} {car.model}
        </h3>
        <p className="text-gray-600 mb-4">{car.year}</p>

        <div className="space-y-2 mb-4">
          {car.features?.map((feature, index) => (
            <span
              key={index}
              className="inline-block bg-gray-100 px-2 py-1 text-sm mr-2 border border-black text-gray-700 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="flex flex-row gap-2 justify-between items-center">
          <span className="text-md lg:text-2xl font-bold text-red-500">
            ${car.price}/day
          </span>
          <div className="flex items-center justify-center">
            <button
              onClick={() => router.push(`/cars/${car.id}`)}
              className={`whitespace-nowrap px-4 py-2 rounded font-semibold transition cursor-pointer ${
                car.is_available
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!car.is_available}
            >
              {car.is_available ? "Rent Now" : "Unavailable"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
