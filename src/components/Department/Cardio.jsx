// ... same imports
import React, {useState} from "react";
import { Heart, Phone, Mail } from "lucide-react";
import cardio from "../../assets/Cardio.jpg";
import Boo from "../../assets/boo.png";
import Mahesh from "../../assets/Mahesh.png";
import AppointmentModal from "./AppointModal";

const Cardio = () => {
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
  return (
    <div className="min-h-screen bg-blue-100 pt-28 px-6 flex flex-col items-center">
      {/* Header */}
      <div className="relative overflow-hidden rounded-lg px-8 py-6 flex justify-between items-center w-full max-w-6xl mb-6 bg-gradient-to-r from-blue-200 via-blue-100 to-white shadow-md">
        <div className="relative z-10 flex items-center space-x-4 animate-fade-in-down">
          <Heart className="w-10 h-10 text-red-500" />
          <div>
            <h2 className="text-4xl font-bold text-black">Cardiology</h2>
            <p className="text-xl font-bold text-gray-500">Care for Your Heart</p>
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
            src={cardio}
            alt="Cardiology Department"
            className="rounded-lg w-full h-auto max-h-[320px] object-cover shadow-lg"
          />
        </div>
        <div className="lg:w-1/2 lg:pl-8 text-black space-y-4">
          <h2 className="text-2xl font-bold text-blue-800 mb-2 hover:text-blue-600 transition-colors duration-300">
            Department of Cardiology
          </h2>
          <p className="animate-fade-in-up">Our Cardiology department offers expert care for heart conditions by a team of skilled cardiologists.</p>
          <p className="animate-fade-in-up">We provide diagnosis, treatment, and prevention for heart disease, arrhythmias, and heart failure.</p>
          <p className="animate-fade-in-up">From non-invasive testing to complex cardiac interventions, we prioritize patient-centered care.</p>
          <p className="animate-fade-in-up">Advanced imaging, electrophysiology, and rehabilitation support ensure comprehensive treatment.</p>
          <p className="animate-fade-in-up">We are committed to improving cardiovascular health with personalized care and the latest technology.</p>
        </div>
      </div>

      <div className="h-[90px]"></div>

      {/* Doctor List */}
      <h1 className="text-3xl font-bold text-black text-center scroll-mt-28" id="Doctors">
        Find Your <span className="text-blue-600">Specialist</span>
      </h1>
      <p className="text-md text-gray-800 mt-2 mb-6 text-center max-w-xl">
        Connect with experienced cardiologists and book your appointment with ease.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {[
          {
            id: 101,
            name: "Dr. Boopathi",
            education: "Apex Medical University",
            experience: "12 years",
            specialization: ["ECG", "Heart Failure"],
            email: "boopathi@medilab.com",
            phone: "+91 98765 43210",
            languages: ["English", "Tamil"],
            image: Boo,
          },
          {
            id: 102,
            name: "Dr. Mahesh Kumar",
            education: "Karur Medical University",
            experience: "12 years",
            specialization: ["Cardiac Imaging", "Cardiac Surgeons"],
            email: "chandru@medilab.com",
            phone: "+91 98765 09876",
            languages: ["English", "Tamil", "Hindi"],
            image: Mahesh,
          },
        ].map((doc) => (
          <div key={doc.id} className="bg-white p-4 rounded-xl shadow-md w-[450px] h-[520px] flex flex-col items-center animate-fade-in-up">
            <div className="w-32 h-32 overflow-hidden rounded-full bg-white">
              <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top rounded-full" />
            </div>

            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold">{doc.name}</h2>
              <p className="text-blue-600 text-sm">Cardiologist</p>
              <div className="flex justify-center items-center text-yellow-500 text-sm mt-1">
                ★★★★☆<span className="text-black ml-2">4.0</span>
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

      <div className="h-[40px]"></div>
    </div>
  );
};

export default Cardio;
