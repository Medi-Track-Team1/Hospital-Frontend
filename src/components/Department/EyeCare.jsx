import React, { useState } from "react";
import { Eye, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import eyecare from "../../assets/EyeCare.jpeg";
import ds from "../../assets/ds.png";
import rakesh from "../../assets/rakesh.png";
import AppointmentModal from "./AppointModal";

// Animation Variants
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

const Eyecare = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedDoctor(null);
  };

  const doctors = [
    {
      id: 301,
      name: "Dr. Rakesh Kumar",
      title: "Ophthalmologist",
      rating: 4.7,
      experience: "15 years",
      education: "Retina Vision Institute",
      specializations: ["Cataract Surgery", "Glaucoma Care"],
      specialty: "Ophthalmology",
      image: rakesh,
      email: "rakesh@hospital.com",
      phone: "+91 98765 43210",
      languages: ["English", "Tamil"],
       timing: "Mon - Fri: 1:00 AM - 9:00 AM",
    },
    {
      id: 302,
      name: "Dr. Sakthivel",
      title: "Eye Surgeon",
      rating: 4.4,
      experience: "10 years",
      education: "ClearVision Eye Institute",
      specializations: ["LASIK", "Diabetic Retinopathy"],
      specialty: "Eye Surgery",
      image: ds,
      email: "sakthivel@hospital.com",
      phone: "+91 98765 09876",
      languages: ["English", "Tamil", "Hindi"],
       timing: "Mon - Fri: 9:00 AM - 1:00 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-blue-100 pt-28 px-4 sm:px-6 flex flex-col items-center relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-lg px-4 sm:px-8 py-6 flex flex-col sm:flex-row justify-between items-center w-full max-w-6xl mb-6 bg-gradient-to-r from-blue-200 via-blue-100 to-white shadow-md"
      >
        <div className="relative z-10 flex items-center space-x-4 mb-4 sm:mb-0">
          <Eye className="w-10 h-10 text-blue-600" />
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-black">Eyecare</h2>
            <p className="text-lg sm:text-xl font-bold text-gray-500">Vision You Can Trust</p>
          </div>
        </div>
        <div className="relative z-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document.getElementById("Doctors")?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-blue-600 hover:bg-blue-800 text-white px-5 py-2 rounded-full font-semibold transition"
          >
            Find a Doctor
          </motion.button>
        </div>
      </motion.div>

      <hr className="w-full max-w-6xl border-t-2 border-black mb-10" />

      {/* Department Info */}
      <motion.div
        className="flex flex-col lg:flex-row bg-blue-100 mt-6 p-4 sm:p-6 mb-10 w-full max-w-6xl items-center gap-6"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <div className="w-full lg:w-1/2 flex justify-center items-center transition-transform duration-700 hover:scale-105">
          <img
            src={eyecare}
            alt="Eyecare Department"
            className="rounded-lg w-full max-w-md h-auto object-cover shadow-lg"
          />
        </div>
        <div className="w-full lg:w-1/2 text-black space-y-4">
          <motion.h2 className="text-xl sm:text-2xl font-bold text-blue-800 mb-2 hover:text-blue-600 transition-colors duration-300">
            Department of Eye Care
          </motion.h2>
          {[
            "Our Eyecare department is committed to preserving and enhancing your vision through advanced diagnostic and treatment services.",
            "We treat a wide range of conditions including cataracts, glaucoma, diabetic retinopathy, and dry eye syndrome.",
            "Our ophthalmologists and optometrists use cutting-edge tools to ensure precise vision correction and routine eye health monitoring.",
            "We offer both medical and surgical solutions, as well as pediatric and elderly eye care.",
            "Clear vision is our priority—delivered with care, clarity, and commitment.",
          ].map((text, idx) => (
            <motion.p
              key={idx}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={idx + 1}
              className="text-justify"
            >
              {text}
            </motion.p>
          ))}
        </div>
      </motion.div>

      <div className="h-[60px] sm:h-[90px]"></div>

      {/* Doctor Header */}
      <motion.h1
        className="text-2xl sm:text-3xl font-bold text-black text-center scroll-mt-28"
        id="Doctors"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={6}
      >
        Find Your <span className="text-blue-600">Eye Specialist</span>
      </motion.h1>

      <motion.p
        className="text-sm sm:text-md text-gray-800 mt-2 mb-6 text-center max-w-md sm:max-w-xl px-2"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={7}
      >
        Book an appointment with our trusted ophthalmologists for advanced eye care and vision clarity.
      </motion.p>

      {/* Doctor Cards */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6">
        {doctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            className="bg-white p-4 rounded-xl shadow-md w-full sm:w-[450px] flex flex-col items-center"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={index + 8}
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 overflow-hidden rounded-full bg-white">
              <img
                loading="lazy"
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover object-top rounded-full"
              />
            </div>

            <div className="mt-4 text-center">
              <h2 className="text-lg sm:text-xl font-semibold">{doctor.name}</h2>
              <p className="text-blue-600 text-sm">{doctor.title}</p>
              <div className="flex justify-center items-center text-yellow-500 text-sm mt-1">
                ★★★★☆<span className="text-black ml-2">{doctor.rating}</span>
              </div>
            </div>

            <div className="text-sm text-gray-700 mt-4 text-left w-full px-2 sm:px-6 space-y-1 break-words">
              <p><strong>ID:</strong> #{doctor.id}</p>
              <p><strong>Experience:</strong> {doctor.experience}</p>
              <p><strong>Education:</strong> {doctor.education}</p>
              <p><strong>Languages:</strong> {doctor.languages.join(", ")}</p>
              <p className="flex items-center"><Phone className="w-4 h-4 mr-1" /> {doctor.phone}</p>
              <p className="flex items-center"><Mail className="w-4 h-4 mr-1" /> {doctor.email}</p>
            </div>

            <div className="mt-4 w-full px-2 sm:px-6">
              <p className="font-semibold text-sm mb-1">Specializations</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {doctor.specializations.map((spec, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 w-full px-2 sm:px-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBookClick(doctor)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                Book Appointment
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {showPopup && selectedDoctor && (
        <AppointmentModal doctor={selectedDoctor} onClose={closePopup} />
      )}

      <div className="h-[40px]"></div>
    </div>
  );
};

export default Eyecare;
