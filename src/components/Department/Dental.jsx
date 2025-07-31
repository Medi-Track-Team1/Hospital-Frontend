import React from "react";
import { Smile, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import dcare from "../../assets/dcare.jpeg";
import cdr from "../../assets/cdr.png";
import Mahesh from "../../assets/Mahesh.png";
import { useNavigate } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};
const Dental = () => {
  const navigate = useNavigate();

  const handleBookClick = (doctor) => {
    navigate("/departments/appointment", { state: { doctor } });
  };

  const doctors = [
    {
      id: 201,
      name: "Dr. Dravid",
      education: "Karpagam Medical College",
      experience: "10 years",
      specialization: ["Braces", "Aligners", "Smile Design"],
      specialty: "Dentist",
      email: "dravid@medilab.com",
      phone: "+91 98765 11100",
      languages: ["English", "Tamil", "Telugu"],
      image: Mahesh,
      rating: 4.5,
      timing: "Mon - Fri: 9:00 AM - 1:00 PM",
    },
    {
      id: 202,
      name: "Dr. Chandru",
      education: "Karpagam Medical College",
      experience: "12 years",
      specialization: ["Teeth Whitening", "Veneers", "Cosmetic Fillings"],
      specialty: "Dentist",
      email: "chandru@medilab.com",
      phone: "+91 98765 22200",
      languages: ["English", "Tamil"],
      image: cdr,
      rating: 4.7,
      timing: "Mon - Fri: 1:00 AM - 9:00 AM",
    },
  ];

  return (
    <div className="min-h-screen bg-blue-100 pt-28 px-4 sm:px-6 flex flex-col items-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-lg px-4 sm:px-8 py-6 flex flex-col sm:flex-row justify-between items-center w-full max-w-6xl mb-6 bg-gradient-to-r from-blue-200 via-blue-100 to-white shadow-md"
      >
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <Smile className="w-10 h-10 text-blue-600" />
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-black">Dental</h2>
            <p className="text-lg sm:text-xl font-bold text-gray-500">Smile with Confidence</p>
          </div>
        </div>
        <button
          onClick={() => {
            document.getElementById("Doctors")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-blue-600 hover:bg-blue-800 text-white px-5 py-2 rounded-full font-semibold transition"
        >
          Find a Doctor
        </button>
      </motion.div>

      <hr className="w-full max-w-6xl border-t-2 border-black mb-10" />

      {/* Department Info */}
      <motion.div
        className="flex flex-col lg:flex-row bg-blue-100 mt-6 p-4 sm:p-6 mb-10 w-full max-w-6xl items-center gap-6"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={0}
      >
        <div className="lg:w-1/2 flex justify-center items-center transition-transform duration-700 hover:scale-105">
          <img
            src={dcare}
            alt="Dental Department"
            className="rounded-lg w-full h-auto max-h-[320px] object-cover shadow-lg"
          />
        </div>
        <div className="lg:w-1/2 text-black space-y-4 text-sm sm:text-base mb-8">
          <motion.h2 className="text-xl sm:text-2xl font-bold text-blue-800 mb-2 hover:text-blue-600 transition-colors duration-300">
            Department of Dental Care
          </motion.h2>
          {[
            "Our Dental department offers comprehensive oral health services, from regular check-ups and cleanings to complex dental surgeries.",
            "We specialize in restorative dentistry, cosmetic procedures, orthodontics, and pediatric care to ensure confident and healthy smiles.",
            "Using advanced imaging and minimally invasive techniques, our experienced dental professionals deliver pain-free and effective treatments.",
            "We are committed to providing family-centered dental care that prioritizes your comfort and long-term oral wellness.",
            "Let us help you maintain strong teeth and a beautiful smile that lasts a lifetime.",
          ].map((text, i) => (
            <motion.p
              key={i}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={i + 1}
              className="text-justify"
            >
              {text}
            </motion.p>
          ))}
        </div>
      </motion.div>

      {/* Doctor List */}
      <h1 className="text-3xl font-bold text-black text-center scroll-mt-28" id="Doctors">
        Meet Your <span className="text-blue-600">Dentist</span>
      </h1>
      <p className="text-md text-gray-800 mt-2 mb-6 text-center max-w-xl">
        Book appointments with top dental specialists for preventive and cosmetic treatments.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {doctors.map((doc, index) => (
          <motion.div
            key={doc.id}
            className="bg-white p-4 rounded-xl shadow-md w-full sm:w-[450px] h-auto flex flex-col items-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={index + 1}
          >
            <div className="w-28 h-28 overflow-hidden rounded-full bg-white shadow">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold">{doc.name}</h2>
              <p className="text-blue-600 text-sm">{doc.specialty}</p>
              <div className="flex justify-center items-center text-yellow-500 text-sm mt-1">
                ★★★★☆<span className="text-black ml-2">{doc.rating}</span>
              </div>
            </div>

            <div className="text-sm text-gray-700 mt-4 text-left w-full px-4 space-y-1">
              <p><strong>ID:</strong> #{doc.id}</p>
              <p><strong>Experience:</strong> {doc.experience}</p>
              <p><strong>Education:</strong> {doc.education}</p>
              <p><strong>Languages:</strong> {doc.languages.join(", ")}</p>
              <p className="flex items-center"><Phone className="w-4 h-4 mr-1" /> {doc.phone}</p>
              <p className="flex items-center"><Mail className="w-4 h-4 mr-1" /> {doc.email}</p>
            </div>

            <div className="mt-4 w-full px-4">
              <p className="font-semibold text-sm mb-1">Specializations</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {doc.specialization.map((s, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 w-full px-4">
              <button
                onClick={() => handleBookClick(doc)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                Book Appointment
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="h-[40px]" />
    </div>
  );
};

export default Dental;
