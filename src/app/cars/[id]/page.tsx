import CarDetail from "@/app/components/CarDetail";
import Footer from "@/app/components/Footer";

type CarDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { id } = await params;
  return (
    <div className="min-h-screen">
      <CarDetail carId={id} />
      <Footer />
    </div>
  );
}
