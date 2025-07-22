import React, { useState } from "react";
import { Baby, Phone, Mail } from "lucide-react";
import fertility from "../../assets/fertility.jpeg";
import dkr from "../../assets/dkr.jpg";
import xyz from "../../assets/xyz.png";
import AppointmentModal from "./AppointModal";

const Fertility = () => {
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
      id: 401,
      name: "Dr. Raj",
      designation: "Fertility Specialist",
      experience: "12 years",
      education: "Blossom Fertility Institute",
      rating: 4.0,
      image: xyz,
      specialization: ["IVF", "IUI"],
      specialty: "Fertility Specialist",
      nextAvailable: "Today, 5:00 PM",
      languages: ["English", "Hindi", "Tamil"],
      email: "raj@medilab.com",
      phone: "+91 98765 33300",
    },
    {
      id: 402,
      name: "Dr. Kavi Bharathan",
      designation: "Reproductive Endocrinologist",
      experience: "9 years",
      education: "LifeSpring Institute of Reproductive Science",
      rating: 4.2,
      image: dkr,
      specialization: ["Egg Freezing", "Male Infertility"],
      specialty: "Reproductive Endocrinologist",
      nextAvailable: "Today, 6:00 PM",
      languages: ["English", "Tamil"],
      email: "kavi@medilab.com",
      phone: "+91 98765 44400",
    },
  ];

  return (
    <div className="min-h-screen bg-blue-100 pt-28 px-4 sm:px-6 flex flex-col items-center">
      {/* Header */}
      <div className="relative overflow-hidden rounded-lg px-6 py-6 flex flex-col sm:flex-row justify-between items-center w-full max-w-6xl mb-6 bg-gradient-to-r from-blue-200 via-blue-100 to-white shadow-md">
        <div className="relative z-10 flex items-center space-x-4 animate-fade-in-down mb-4 sm:mb-0">
          <Baby className="w-10 h-10 text-pink-600" />
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-black">Fertility</h2>
            <p className="text-lg sm:text-xl font-bold text-gray-500">Hope Starts Here</p>
          </div>
        </div>
        <button
          onClick={() => {
            document.getElementById("Doctors")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-full font-semibold transition"
        >
          Find a Doctor
        </button>
      </div>

      <hr className="w-full max-w-6xl border-t-2 border-black mb-10" />

      {/* Info Section */}
      <div className="flex flex-col lg:flex-row bg-blue-100 mt-6 p-6 mb-10 w-full max-w-6xl items-center">
        <div className="lg:w-1/2 flex justify-center items-center mb-6 lg:mb-0 transition-transform duration-700 hover:scale-105">
          <img
            src={fertility}
            alt="Fertility Department"
            className="rounded-lg w-full h-auto max-h-[320px] object-cover shadow-lg"
          />
        </div>
        <div className="lg:w-1/2 lg:pl-8 text-black space-y-4">
          <h2 className="text-2xl font-bold text-blue-800 mb-2 hover:text-blue-600 transition-colors duration-300">
            Department of Fertility
          </h2>
          <p className="animate-fade-in-up">
            Our Fertility department is dedicated to helping individuals and couples achieve their dream of parenthood through comprehensive reproductive health services.
          </p>
          <p className="animate-fade-in-up">
            We offer personalized treatment plans including IUI, IVF, hormonal therapies, and fertility preservation strategies.
          </p>
          <p className="animate-fade-in-up">
            Our expert team of fertility specialists, embryologists, and counselors support you every step of the journey.
          </p>
          <p className="animate-fade-in-up">
            Equipped with advanced labs and diagnostic tools, we provide accurate assessments and the highest success rates.
          </p>
          <p className="animate-fade-in-up">
            Compassion, science, and support define our approach to fertility care.
          </p>
        </div>
      </div>

      {/* Doctor Section */}
      <div className="h-[60px]" />
      <h1 className="text-3xl font-bold text-black text-center scroll-mt-28" id="Doctors">
        Find Your <span className="text-blue-600">Fertility Expert</span>
      </h1>
      <p className="text-md text-gray-800 mt-2 mb-6 text-center max-w-xl px-4">
        Connect with experienced fertility doctors and take the first step toward your parenthood journey.
      </p>

      <div className="flex flex-wrap justify-center gap-6 w-full px-4">
        {doctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white p-4 rounded-xl shadow-md w-full sm:w-[90%] md:w-[450px] flex flex-col items-center animate-fade-in-up"
          >
            {/* Image */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 overflow-hidden rounded-full bg-white shadow-md">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-full h-full object-cover object-top rounded-full"
              />
            </div>

            {/* Info */}
            <div className="mt-4 text-center">
              <h2 className="text-lg sm:text-xl font-semibold">{doc.name}</h2>
              <p className="text-blue-600 text-sm">{doc.designation}</p>
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
          </div>
        ))}
      </div>

      {showPopup && selectedDoctor && (
        <AppointmentModal doctor={selectedDoctor} onClose={closePopup} />
      )}

      <div className="h-[40px]" />
    </div>
  );
};

export default Fertility;
