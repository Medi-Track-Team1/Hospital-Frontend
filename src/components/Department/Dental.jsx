import React from "react";
import { Smile } from "lucide-react";
import dcare from "../../assets/dcare.jpeg";
import Mahesh from "../../assets/Mahesh.png";

const Dental = () => {
  return (
    <div className="min-h-screen bg-amber-100 pt-28 px-6 flex flex-col items-center">
      {/* Header */}
      <div className="relative overflow-hidden rounded-lg px-8 py-6 flex justify-between items-center w-full max-w-6xl mb-6 bg-gradient-to-r from-amber-200 via-amber-100 to-white shadow-md">
        <div className="relative z-10 flex items-center space-x-4 animate-fade-in-down">
          <Smile className="w-10 h-10 text-amber-600" />
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
            className="bg-amber-600 hover:bg-amber-800 text-white px-6 py-2 rounded-full font-semibold transition"
          >
            Find a Doctor
          </button>
        </div>
      </div>

      <hr className="w-full max-w-6xl border-t-2 border-black mb-10" />

      {/* Department Info */}
      <div className="flex flex-col lg:flex-row bg-amber-100 mt-6 p-6 mb-10 w-full max-w-6xl items-center">
        {/* Image */}
        <div className="lg:w-1/2 flex justify-center items-center mb-6 lg:mb-0 transition-transform duration-700 hover:scale-105">
          <img
            src={dcare}
            alt="Dental Department"
            className="rounded-lg w-full h-auto max-h-[320px] object-cover shadow-lg"
          />
        </div>

        {/* Text */}
        <div className="lg:w-1/2 lg:pl-8 text-black space-y-4">
          <h2 className="text-2xl font-bold text-amber-800 mb-2 hover:text-amber-600 transition-colors duration-300">
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

      {/* Doctor List */}
      <h1 className="text-3xl font-bold text-black text-center scroll-mt-28" id="Doctors">
        Find Your <span className="text-amber-600">Dentist</span>
      </h1>
      <p className="text-md text-gray-800 mt-2 mb-6 text-center max-w-xl">
        Book appointments with top dental specialists for preventive and cosmetic treatments.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {/* Doctor 1 */}
        <div className="bg-white p-4 rounded-xl shadow-md w-[450px] h-[452px] flex flex-col items-center animate-fade-in-up">
          <div className="w-32 h-32 overflow-hidden rounded-full bg-white">
                      <img
                        src={Mahesh}
                        alt="Dr. Mahesh Kumar"
                        className="w-50 h-30 object-contain"
                      />
                    </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold">Dr. Aishwarya Rao</h2>
            <p className="text-amber-600 text-sm">Orthodontist</p>
            <div className="flex justify-center items-center text-yellow-500 text-sm mt-1">
              ★★★★☆<span className="text-black ml-2">4.5</span>
            </div>
          </div>
          <div className="text-sm text-gray-700 mt-4 text-left w-full px-6">
            <p><strong>Experience:</strong> 10 years</p>
            <p><strong>Education:</strong> SmileCare Dental College</p>
          </div>
          <div className="mt-4 w-full px-6">
            <p className="font-semibold text-sm mb-1">Specializations</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full">Braces</span>
              <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full">Aligners</span>
            </div>
          </div>
          <div className="mt-6 w-full px-6">
            <button className="w-full bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-800 transition">
              Book Appointment
            </button>
          </div>
          <p className="text-center text-xs text-gray-500 mt-2">Next available: Today, 2:00 PM</p>
        </div>

        {/* Doctor 2 */}
        <div className="bg-white p-4 rounded-xl shadow-md w-[450px] h-[452px] flex flex-col items-center animate-fade-in-up">
          <div className="w-32 h-32 overflow-hidden rounded-full bg-white">
                      <img
                        src={Mahesh}
                        alt="Dr. Mahesh Kumar"
                        className="w-50 h-30 object-contain"
                      />
                    </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold">Dr. Sameer Khan</h2>
            <p className="text-amber-600 text-sm">Cosmetic Dentist</p>
            <div className="flex justify-center items-center text-yellow-500 text-sm mt-1">
              ★★★★☆<span className="text-black ml-2">4.6</span>
            </div>
          </div>
          <div className="text-sm text-gray-700 mt-4 text-left w-full px-6">
            <p><strong>Experience:</strong> 12 years</p>
            <p><strong>Education:</strong> BrightSmile Dental University</p>
          </div>
          <div className="mt-4 w-full px-6">
            <p className="font-semibold text-sm mb-1">Specializations</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full">Teeth Whitening</span>
              <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full">Veneers</span>
            </div>
          </div>
          <div className="mt-6 w-full px-6">
            <button className="w-full bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-800 transition">
              Book Appointment
            </button>
          </div>
          <p className="text-center text-xs text-gray-500 mt-2">Next available: Today, 4:30 PM</p>
        </div>
      </div>

      <div className="h-[40px]"></div>
    </div>
  );
};

export default Dental;
