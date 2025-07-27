import React, { useState } from "react";
import { Brain, Phone, Mail } from "lucide-react";
import neurology from "../../assets/neuro.jpg";
import Sunil from "../../assets/Sunil.jpeg";
import athi from "../../assets/athi.png";
import AppointmentModal from "./AppointModal";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Neuro = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDoctor(null);
  };

  const doctors = [
    {
      id: 601,
      name: "Dr. Sunil Kumar",
      education: "Apex Medical University",
      experience: "12 years",
      specialization: ["Stroke", "Epilepsy"],
      specialty: "Neurologist",
      email: "sunil@medilab.com",
      phone: "+91 90001 12345",
      languages: ["English", "Hindi"],
      image: Sunil,
      rating: 4.2,
       timing: "Mon - Fri: 9:00 AM - 1:00 PM",
    },
    {
      id: 602,
      name: "Dr. Athithyan",
      education: "Vels Medical University",
      experience: "10 years",
      specialization: ["Neurodegenerative Disorders", "Epilepsy"],
      specialty: "Neurologist",
      email: "athithyan@medilab.com",
      phone: "+91 98765 67890",
      languages: ["English", "Tamil"],
      image: athi,
      rating: 4.0,
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
          <Brain className="w-10 h-10 text-red-500" />
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
        className="flex flex-col lg:flex-row items-center lg:items-start bg-blue-100 mt-6 p-4 sm:p-6 mb-10 w-full max-w-6xl"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="w-full lg:w-1/2 mb-6 lg:mb-0 transition-transform duration-700 hover:scale-105">
          <div className="relative w-full h-[240px] sm:h-[300px] lg:h-[320px] rounded-lg overflow-hidden shadow-lg">
            <img
              src={neurology}
              alt="Neurology Department"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:pl-8 text-black space-y-4">
        <motion.h2 className="text-xl sm:text-2xl font-bold text-blue-800 mb-2 hover:text-blue-600 transition-colors duration-300">
                    Department of Dental Care
                  </motion.h2>
          {[
            "Our Neurology department offers advanced diagnostic and treatment services for a broad range of neurological disorders.",
            "We manage conditions like epilepsy, stroke, multiple sclerosis, Parkinson's disease, and migraines.",
            "Our expert neurologists collaborate with radiology, neuro-rehabilitation, and neurosurgery teams to provide holistic care.",
            "We are committed to clinical excellence, continuous innovation, and patient-centric approaches.",
          ].map((text, index) => (
            <motion.p key={index} custom={index + 1} variants={fadeInUp} initial="hidden" animate="visible">
              {text}
            </motion.p>
          ))}
        </div>
      </motion.div>

      <div className="h-[60px] sm:h-[90px]"></div>

      {/* Doctor List */}
      <motion.h1
        className="text-3xl font-bold text-black text-center scroll-mt-28"
        id="Doctors"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        Find Your <span className="text-blue-600">Specialist</span>
      </motion.h1>

      <motion.p
        className="text-md text-gray-800 mt-2 mb-6 text-center max-w-xl"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        Connect with experienced neurologists and book your appointment with ease.
      </motion.p>

      <div className="flex flex-wrap justify-center gap-6">
        {doctors.map((doc, idx) => (
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
                  <span key={idx} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 w-full px-4">
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
                onClick={() => handleBookClick(doc)}
              >
                Book Appointment
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {showModal && selectedDoctor && (
        <AppointmentModal doctor={selectedDoctor} onClose={closeModal} />
      )}

      <div className="h-[40px]"></div>
    </div>
  );
};

export default Neuro;
