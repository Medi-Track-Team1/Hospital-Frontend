import React, { useState } from "react";
import { Droplet, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion"; // ✅ Import Framer Motion
import Pedia from "../../assets/Pedia.png";
import Sunil from "../../assets/Sunil.jpeg";
import Naveen from "../../assets/Naveen.png";
import AppointmentModal from "./AppointModal";

// Animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const Pediatrics = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleBookClick = (doc) => {
    setSelectedDoctor(doc);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedDoctor(null);
  };

  const doctors = [
    {
      id: 701,
      name: "Dr. Naveen",
      education: "Namakkal Medical College",
      experience: "12 years",
      specialization: ["Neonatal Care", "Child Nutrition", "Immunizations"],
      specialty: "Pediatrician Specialist",
      email: "naveen@medilab.com",
      phone: "+91 98765 43210",
      languages: ["English", "Tamil"],
      image: Naveen,
      rating: 4.8,
      available: "Tomorrow, 10:00 AM",
             timing: "Mon - Fri: 9:00 AM - 1:00 PM",

    },
    {
      id: 702,
      name: "Dr. Saranesh Pandian",
      education: "Perambalur Medical Institute",
      experience: "8 years",
      specialization: ["Pediatric Allergies", "Growth Disorders"],
      specialty: "Pediatrician Specialist",
      email: "saranesh@medilab.com",
      phone: "+91 98765 09876",
      languages: ["English", "Tamil", "Hindi"],
      image: Sunil,
      rating: 4.3,
      available: "Tomorrow, 3:00 PM",
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
          <Droplet className="w-10 h-10 text-red-500" />
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-black">Neurology</h2>
            <p className="text-lg sm:text-xl font-bold text-gray-500">Expert Care for Brain & Nerves</p>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              document.getElementById("Doctors")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-blue-600 hover:bg-blue-800 text-white px-5 py-2 rounded-full font-semibold transition"
          >
            Find a Doctor
          </button>
        </div>
      </motion.div>

      <hr className="w-full max-w-6xl border-t-2 border-black mb-10" />

      {/* Department Info */}
      <motion.div
        className="flex flex-col lg:flex-row bg-blue-100 mt-6 p-4 sm:p-6 mb-10 w-full max-w-6xl items-center"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <div className="lg:w-1/2 flex justify-center items-center mb-6 lg:mb-0 transition-transform duration-700 hover:scale-105">
          <img
            src={Pedia}
            alt="Pediatrics Department"
            className="rounded-lg w-full h-auto max-h-[320px] object-cover shadow-lg"
          />
        </div>
        <div className="lg:w-1/2 lg:pl-8 text-black space-y-4">
          <motion.h2 className="text-xl sm:text-2xl font-bold text-blue-800 mb-2 hover:text-blue-600 transition-colors duration-300">
            Department of Pediatrics
          </motion.h2>
          {[
            "Our Pediatrics department offers comprehensive healthcare services for infants, children, and adolescents.",
            "We specialize in preventive care, immunizations, growth monitoring, and treatment of childhood illnesses.",
            "From newborn screenings to adolescent wellness, our team ensures personalized and compassionate care.",
            "Equipped with child-friendly facilities and experienced pediatricians, we focus on your child's health and development.",
            "Our mission is to nurture healthy children with expert guidance and supportive care at every stage.",
          ].map((text, i) => (
            <motion.p key={i} custom={i} variants={fadeInUp} initial="hidden" animate="visible">
              {text}
            </motion.p>
          ))}
        </div>
      </motion.div>

      <div className="h-12 sm:h-[90px]"></div>

      {/* Doctor List */}
      <motion.h1
        className="text-2xl sm:text-3xl font-bold text-black text-center scroll-mt-28"
        id="Doctors"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        Find Your <span className="text-blue-600">Specialist</span>
      </motion.h1>
      <motion.p
        className="text-sm sm:text-md text-gray-800 mt-2 mb-6 text-center max-w-xl"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        Connect with top-rated pediatric specialists and book appointments with ease.
      </motion.p>

      <div className="flex flex-wrap justify-center gap-6">
        {doctors.map((doc, index) => (
          <motion.div
            key={doc.id}
            className="bg-white p-4 rounded-xl shadow-md w-full sm:w-[450px] h-auto flex flex-col items-center"
          >
            <div className="w-28 h-28 overflow-hidden rounded-full bg-white shadow">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="mt-4 text-center">
              <h2 className="text-lg sm:text-xl font-semibold">{doc.name}</h2>
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

            <div className="mt-4 w-full px-4">
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

      {showPopup && selectedDoctor && (
        <AppointmentModal doctor={selectedDoctor} onClose={closePopup} />
      )}

      <div className="h-10"></div>
    </div>
  );
};

export default Pediatrics;
