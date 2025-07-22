import React, { useState } from "react";
import { Brain, Phone, Mail, X } from "lucide-react";
import psychology from "../../assets/psychology.jpg";
import dr from "../../assets/dr.jpg";
import poovu from "../../assets/poovu.png";
import AppointmentModal from "./AppointModal";

const Psychology = () => {
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
      languages: ["English", "Tamil"]
    },
  ];

  return (
    <div className="min-h-screen bg-blue-100 pt-28 px-6 flex flex-col items-center relative">
      {/* Header */}
      <div className="relative overflow-hidden rounded-lg px-8 py-6 flex justify-between items-center w-full max-w-6xl mb-6 bg-gradient-to-r from-blue-200 via-blue-100 to-white shadow-md">
        <div className="relative z-10 flex items-center space-x-4 animate-fade-in-down">
          <Brain className="w-10 h-10 text-purple-600" />
          <div>
            <h2 className="text-4xl font-bold text-black">Psychology</h2>
            <p className="text-xl font-bold text-gray-500">Mind Matters Most</p>
          </div>
        </div>
        <div className="relative z-10">
          <button
            onClick={() => {
              document.getElementById("Doctors")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-full font-semibold transition"
          >
            Find a Doctor
          </button>
        </div>
      </div>

      <hr className="w-full max-w-6xl border-t-2 border-black mb-10" />

      {/* Department Info */}
      <div className="flex flex-col lg:flex-row bg-blue-100 mt-6 p-6 mb-10 w-full max-w-6xl items-center">
        <div className="lg:w-1/2 flex justify-center items-center mb-6 lg:mb-0 transition-transform duration-700 hover:scale-105">
          <img
            src={psychology}
            alt="Psychology Department"
            className="rounded-lg w-full h-auto max-h-[320px] object-cover shadow-lg"
          />
        </div>
        <div className="lg:w-1/2 lg:pl-8 text-black space-y-4">
          <h2 className="text-2xl font-bold text-blue-800 mb-2 hover:text-blue-600 transition-colors duration-300">
            Department of Psychology
          </h2>
          <p className="animate-fade-in-up">
            Our Psychology department provides comprehensive mental health support through individualized therapy, counseling, and psychological assessments.
          </p>
          <p className="animate-fade-in-up">
            We specialize in managing stress, anxiety, depression, behavioral issues, and emotional trauma with compassion and professionalism.
          </p>
          <p className="animate-fade-in-up">
            Our team includes clinical psychologists, child therapists, and behavioral specialists committed to your emotional well-being.
          </p>
          <p className="animate-fade-in-up">
            We offer both in-person and virtual therapy sessions tailored to suit your personal needs.
          </p>
          <p className="animate-fade-in-up">
            Let us help you build mental strength and restore emotional balance through evidence-based care.
          </p>
        </div>
      </div>

      <div className="h-[90px]"></div>

      {/* Doctor List */}
      <h1 className="text-3xl font-bold text-black text-center scroll-mt-28" id="Doctors">
        Find Your <span className="text-blue-600">Therapist</span>
      </h1>
      <p className="text-md text-gray-800 mt-2 mb-6 text-center max-w-xl">
        Connect with licensed psychologists and mental health professionals for personal guidance.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow-md w-[450px] h-auto flex flex-col items-center animate-fade-in-up"
          >
            <div className="w-32 h-32 overflow-hidden rounded-full bg-white">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-50 h-30 object-contain"
              />
            </div>
            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold">{doctor.name}</h2>
              <p className="text-blue-600 text-sm">{doctor.title}</p>
              <div className="flex justify-center items-center text-yellow-500 text-sm mt-1">
                ★★★★☆<span className="text-black ml-2">{doctor.rating}</span>
              </div>
            </div>
            <div className="text-sm text-gray-700 mt-4 text-left w-full px-6 space-y-1">
               <p><strong>ID:</strong> #{doctor.id}</p>
              <p><strong>Experience:</strong> {doctor.experience}</p>
              <p><strong>Education:</strong> {doctor.education}</p>
              <p><strong>Languages:</strong> {doctor.languages.join(", ")}</p>
              <p className="flex items-center"><Phone className="w-4 h-4 mr-1" /> {doctor.email}</p>
              <p className="flex items-center"><Mail className="w-4 h-4 mr-1" />  {doctor.phone}</p>
            </div>
            <div className="mt-4 w-full px-6">
              <p className="font-semibold text-sm mb-1">Specializations</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {doctor.specializations.map((spec, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6 w-full px-6">
              <button
                onClick={() => handleBookClick(doctor)}
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
      <div className="h-[40px]"></div>
    </div>
  );
};

export default Psychology;