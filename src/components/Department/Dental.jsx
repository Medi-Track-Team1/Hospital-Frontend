import React, { useState } from "react";
import { Smile, Phone, Mail } from "lucide-react";
import dcare from "../../assets/dcare.jpeg";
import cdr from "../../assets/cdr.png";
import Mahesh from "../../assets/Mahesh.png";
import AppointmentModal from "./AppointModal";

const Dental = () => {
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
      id: 201,
      name: "Dr. Dravid",
      education: "SmileCare Dental College",
      experience: "10 years",
      specialization: ["Braces", "Aligners", "Smile Design"],
      specialty: "Dentist",
      email: "dravid@medilab.com",
      phone: "+91 98765 11100",
      languages: ["English", "Tamil", "Telugu"],
      image: Mahesh,
    },
    {
      id: 202,
      name: "Dr. Chandru",
      education: "BrightSmile Dental University",
      experience: "12 years",
      specialization: ["Teeth Whitening", "Veneers", "Cosmetic Fillings"],
      specialty: "Dentist",
      email: "chandru@medilab.com",
      phone: "+91 98765 22200",
      languages: ["English", "Tamil"],
      image: cdr,
    },
  ];

  return (
    <div className="min-h-screen bg-blue-100 pt-28 px-6 flex flex-col items-center">
      <div className="relative overflow-hidden rounded-lg px-8 py-6 flex justify-between items-center w-full max-w-6xl mb-6 bg-gradient-to-r from-blue-200 via-blue-100 to-white shadow-md">
        <div className="relative z-10 flex items-center space-x-4 animate-fade-in-down">
          <Smile className="w-10 h-10 text-blue-600" />
          <div>
            <h2 className="text-4xl font-bold text-black">Dental</h2>
            <p className="text-xl font-bold text-gray-500">Smile with Confidence</p>
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

      <div className="flex flex-col lg:flex-row bg-blue-100 mt-6 p-6 mb-10 w-full max-w-6xl items-center">
        <div className="lg:w-1/2 flex justify-center items-center mb-6 lg:mb-0 transition-transform duration-700 hover:scale-105">
          <img
            src={dcare}
            alt="Dental Department"
            className="rounded-lg w-full h-auto max-h-[320px] object-cover shadow-lg"
          />
        </div>
        <div className="lg:w-1/2 lg:pl-8 text-black space-y-4">
          <h2 className="text-2xl font-bold text-blue-800 mb-2 hover:text-blue-600 transition-colors duration-300">
            Department of Dental Care
          </h2>
          <p className="animate-fade-in-up">
            Our Dental department offers comprehensive oral health services, from regular check-ups and cleanings to complex dental surgeries.
          </p>
          <p className="animate-fade-in-up">
            We specialize in restorative dentistry, cosmetic procedures, orthodontics, and pediatric care to ensure confident and healthy smiles.
          </p>
          <p className="animate-fade-in-up">
            Using advanced imaging and minimally invasive techniques, our experienced dental professionals deliver pain-free and effective treatments.
          </p>
          <p className="animate-fade-in-up">
            We are committed to providing family-centered dental care that prioritizes your comfort and long-term oral wellness.
          </p>
          <p className="animate-fade-in-up">
            Let us help you maintain strong teeth and a beautiful smile that lasts a lifetime.
          </p>
        </div>
      </div>

      <div className="h-[90px]"></div>

      <h1 className="text-3xl font-bold text-black text-center scroll-mt-28" id="Doctors">
        Find Your <span className="text-blue-600">Dentist</span>
      </h1>
      <p className="text-md text-gray-800 mt-2 mb-6 text-center max-w-xl">
        Book appointments with top dental specialists for preventive and cosmetic treatments.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {doctors.map((doc) => (
          <div key={doc.id} className="bg-white p-4 rounded-xl shadow-md w-[450px] h-auto flex flex-col items-center animate-fade-in-up">
            <div className="w-32 h-32 overflow-hidden rounded-full bg-white">
              <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top rounded-full" />
            </div>

            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold">{doc.name}</h2>
              <p className="text-blue-600 text-sm">Dentist</p>
              <div className="flex justify-center items-center text-yellow-500 text-sm mt-1">
                ★★★★☆<span className="text-black ml-2">4.5</span>
              </div>
            </div>

            <div className="text-sm text-gray-700 mt-4 text-left w-full px-6 space-y-1">
              <p><strong>ID:</strong> #{doc.id}</p>
              <p><strong>Experience:</strong> {doc.experience}</p>
              <p><strong>Education:</strong> {doc.education}</p>
              <p><strong>Languages:</strong> {doc.languages.join(", ")}</p>
              <p className="flex items-center"><Phone className="w-4 h-4 mr-1" /> {doc.phone}</p>
              <p className="flex items-center"><Mail className="w-4 h-4 mr-1" /> {doc.email}</p>
            </div>

            <div className="mt-4 w-full px-6">
              <p className="font-semibold text-sm mb-1">Specializations</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {doc.specialization.map((s, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">{s}</span>
                ))}
              </div>
            </div>

            <div className="mt-4 w-full px-6">
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
                onClick={() => handleBookClick(doc)}
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
        
      {showModal && selectedDoctor && (
        <AppointmentModal
          doctor={selectedDoctor}

          onClose={closeModal}
        />
      )}

      <div className="h-[40px]"></div>
    </div>
  );
};

export default Dental;