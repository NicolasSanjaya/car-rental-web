import CarDetail from "@/app/components/CarDetail";
import Footer from "@/app/components/Footer";

interface CarDetailPageProps {
  params: {
    id: string;
  };
}

export default function CarDetailPage({ params }: CarDetailPageProps) {
  return (
    <div className="min-h-screen">
      <CarDetail carId={params.id} />
      <Footer />
    </div>
  );
}
