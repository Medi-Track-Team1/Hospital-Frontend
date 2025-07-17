import React from "react";
import {
  Heart,
  Pill,
  UserCheck,
  Dna,
  Armchair as Wheelchair,
  FileText,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: "Cardiology",
      description:
        "Comprehensive heart care with advanced diagnostic and treatment options for all cardiovascular conditions.",
    },
    {
      icon: <Pill className="h-8 w-8 text-green-600" />,
      title: "Pharmacy Services",
      description:
        "Full-service pharmacy with medication management and consultation services available 24/7.",
    },
    {
      icon: <UserCheck className="h-8 w-8 text-blue-600" />,
      title: "Patient Care",
      description:
        "Personalized patient care services with dedicated support staff and care coordinators.",
    },
    {
      icon: <Dna className="h-8 w-8 text-yellow-600" />,
      title: "Genetic Testing",
      description:
        "Advanced genetic testing and counseling services for personalized medicine approaches.",
    },
    {
      icon: <Wheelchair className="h-8 w-8 text-orange-600" />,
      title: "Rehabilitation",
      description:
        "Complete rehabilitation services including physical therapy and occupational therapy.",
    },
    {
      icon: <FileText className="h-8 w-8 text-black-600" />,
      title: "Medical Records",
      description:
        "Secure digital medical records management with easy access and comprehensive documentation.",
    },
  ];

  return (
    <section id="services" className="py-20 bg-blue">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive healthcare services designed to meet all your medical
            needs with excellence and compassion
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 hover:bg-blue-50 transition-all duration-300 group cursor-pointer transform hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
