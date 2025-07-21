import React from "react";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

const Doctors = () => {
  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Chief Medical Officer",
      description:
        "Leading expert in internal medicine with over 20 years of experience in patient care and medical administration.",
      image:
        "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      social: {
        twitter: "#",
        facebook: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Cardiologist",
      description:
        "Renowned cardiovascular specialist with expertise in interventional cardiology and heart disease prevention.",
      image:
        "https://images.pexels.com/photos/5327689/pexels-photo-5327689.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      social: {
        twitter: "#",
        facebook: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      name: "Dr. Emily Rodriguez",
      specialty: "Neurologist",
      description:
        "Expert in neurological disorders with specialized training in stroke treatment and neurodegenerative diseases.",
      image:
        "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      social: {
        twitter: "#",
        facebook: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      name: "Dr. James Wilson",
      specialty: "Orthopedic Surgeon",
      description:
        "Specialized in joint replacement surgery and sports medicine with focus on minimally invasive techniques.",
      image:
        "https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      social: {
        twitter: "#",
        facebook: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
  ];

  return (
    <section id="doctors" className="py-20 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Doctors</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our team of experienced medical professionals dedicated to
            providing exceptional care
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start space-x-6">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full object-cover shadow-md"
                />

                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">
                    {doctor.name}
                  </h4>
                  <p className="text-blue-600 font-medium mb-3">
                    {doctor.specialty}
                  </p>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {doctor.description}
                  </p>

                  <div className="flex space-x-3">
                    <a
                      href={doctor.social.twitter}
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href={doctor.social.facebook}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a
                      href={doctor.social.instagram}
                      className="text-gray-400 hover:text-pink-600 transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href={doctor.social.linkedin}
                      className="text-gray-400 hover:text-blue-700 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
