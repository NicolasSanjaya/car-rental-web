interface Service {
  icon: string;
  title: string;
  description: string;
}

export default function Services() {
  const services: Service[] = [
    {
      icon: "🏎️",
      title: "Premium Fleet",
      description:
        "Handpicked selection of the world's finest supercars and sports cars",
    },
    {
      icon: "🛡️",
      title: "Full Insurance",
      description: "Comprehensive coverage for your peace of mind",
    },
    {
      icon: "🚗",
      title: "Delivery Service",
      description: "We bring your dream car directly to your location",
    },
    {
      icon: "⚡",
      title: "Instant Booking",
      description: "Quick and easy online reservation system",
    },
  ];

  return (
    <section className="py-16 hero-gradient min-h-screen flex items-center justify-center text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center" data-aos="zoom-in-up">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-white">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
