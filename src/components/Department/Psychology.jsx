import React from "react";
import { Brain, Phone, Mail } from "lucide-react";
import psychology from "../../assets/psychology.jpg";
import dr from "../../assets/dr.jpg";
import poovu from "../../assets/poovu.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Psychology = () => {
  const navigate = useNavigate();

  const handleBookClick = (doctor) => {
    navigate("/departments/appointment", { state: { doctor } });
  };

  const doctors = [
    {
      id: 801,
      name: "Dr. Ragavan",
      title: "Clinical Psychologist",
      rating: 4.6,
      experience: "8 years",
      education: "National Institute of Mental Health",
      specializations: ["Anxiety", "Depression"],
      specialty: "Clinical Psychologist",
      image: dr,
      email: "ragavan@hospital.com",
      phone: "+91 98765 11111",
      languages: ["English", "Tamil"],
      timing: "Mon - Fri: 9:00 AM - 1:00 PM",
    },
    {
      id: 802,
      name: "Dr. Poovarasan",
      title: "Behavioral Therapist",
      rating: 4.3,
      experience: "11 years",
      education: "MindCare Academy",
      specializations: ["Cognitive Therapy", "Child Counseling"],
      specialty: "Behavioral Therapist",
      image: poovu,
      email: "poovarasan@hospital.com",
      phone: "+91 98765 22222",
      languages: ["English", "Tamil"],
      timing: "Mon - Fri: 1:00 AM - 9:00 AM",
    },
  ];

  return (
    <div className="min-h-screen bg-blue-100 pt-28 px-4 sm:px-6 flex flex-col items-center relative">
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
            <h2 className="text-3xl sm:text-4xl font-bold text-black">Psychology</h2>
            <p className="text-lg sm:text-xl font-bold text-gray-500">Mind Matters Most</p>
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
            src={psychology}
            alt="Psychology Department"
            className="rounded-lg w-full max-w-[500px] h-auto max-h-[320px] object-cover shadow-lg"
          />
        </div>
        <div className="lg:w-1/2 text-black space-y-4 text-sm sm:text-base mb-10">
          <motion.h2 className="text-xl sm:text-2xl font-bold text-blue-800 mb-2 hover:text-blue-600 transition-colors duration-300">
            Department of Psychology
          </motion.h2>
          {["Our Psychology department provides comprehensive mental health support through individualized therapy, counseling, and psychological assessments.",
            "We specialize in managing stress, anxiety, depression, behavioral issues, and emotional trauma with compassion and professionalism.",
            "Our team includes clinical psychologists, child therapists, and behavioral specialists committed to your emotional well-being.",
            "We offer both in-person and virtual therapy sessions tailored to suit your personal needs.",
            "Let us help you build mental strength and restore emotional balance through evidence-based care."]
            .map((text, i) => (
              <motion.p key={i} variants={fadeInUp} initial="hidden" animate="visible" custom={i + 1} className="text-justify">
                {text}
              </motion.p>
            ))}
        </div>
      </motion.div>

      {/* Doctor List */}
      <h1 className="text-3xl font-bold text-black text-center scroll-mt-28 mt-10" id="Doctors">
        Meet Our <span className="text-blue-600">Therapists</span>
      </h1>
      <p className="text-md text-gray-800 mt-2 mb-6 text-center max-w-xl">
        Connect with licensed psychologists and mental health professionals for personal guidance.
      </p>

      <div className="flex flex-wrap justify-center gap-6 px-2 sm:px-0">
        {doctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            className="bg-white p-4 rounded-xl shadow-md w-full sm:w-[450px] h-auto flex flex-col items-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={index + 1}
          >
            <div className="w-28 h-28 overflow-hidden rounded-full bg-white shadow">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold">{doctor.name}</h2>
              <p className="text-blue-600 text-sm">{doctor.title}</p>
              <div className="flex justify-center items-center text-yellow-500 text-sm mt-1">
                ★★★★☆<span className="text-black ml-2">{doctor.rating}</span>
              </div>
            </div>
            <div className="text-sm text-gray-700 mt-4 text-left w-full px-4 space-y-1">
              <p><strong>ID:</strong> #{doctor.id}</p>
              <p><strong>Experience:</strong> {doctor.experience}</p>
              <p><strong>Education:</strong> {doctor.education}</p>
              <p><strong>Languages:</strong> {doctor.languages.join(", ")}</p>
              <p className="flex items-center"><Phone className="w-4 h-4 mr-1" /> {doctor.phone}</p>
              <p className="flex items-center"><Mail className="w-4 h-4 mr-1" /> {doctor.email}</p>
            </div>
            <div className="mt-4 w-full px-4">
              <p className="font-semibold text-sm mb-1">Specializations</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {doctor.specializations.map((spec, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6 w-full px-4">
              <button
                onClick={() => handleBookClick(doctor)}
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

export default Psychology;
