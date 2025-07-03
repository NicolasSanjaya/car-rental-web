import CarDetail from "@/app/components/CarDetail";

interface CarDetailPageProps {
  params: {
    id: string;
  };
}

export default function CarDetailPage({ params }: CarDetailPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CarDetail carId={params.id} />
    </div>
  );
}
