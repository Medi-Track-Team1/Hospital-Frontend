import React from "react";
import { Brain } from "lucide-react";
import neurology from "../../assets/neuro.jpg";
import Sunil from "../../assets/Sunil.jpeg";
import athi from "../../assets/athi.png";

const Neuro = () => {
  return (
    <div className="min-h-screen bg-blue-100 pt-28 px-6 flex flex-col items-center">
      {/* Header */}
      <div className="relative overflow-hidden rounded-lg px-8 py-6 flex justify-between items-center w-full max-w-6xl mb-6 bg-gradient-to-r from-blue-200 via-blue-100 to-white shadow-md">
        <div className="relative z-10 flex items-center space-x-4 animate-fade-in-down">
          <Brain className="w-10 h-10 text-purple-600" />
          <div>
            <h2 className="text-4xl font-bold text-black">Neurology</h2>
            <p className="text-xl font-bold text-gray-500">Expert Care for Brain & Nerves</p>
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
            src={neurology}
            alt="Neurology Department"
            className="rounded-lg w-full h-auto max-h-[320px] object-cover shadow-lg"
          />
        </div>
        <div className="lg:w-1/2 lg:pl-8 text-black space-y-4">
          <h2 className="text-2xl font-bold text-blue-800 mb-2 hover:text-blue-600 transition-colors duration-300">
            Department of Neurology
          </h2>
          <p>
            Our Neurology department offers advanced diagnostic and treatment services for a broad
            range of neurological disorders.
          </p>
          <p>
            We manage conditions like epilepsy, stroke, multiple sclerosis, Parkinson's disease,
            and migraines.
          </p>
          <p>
            Our expert neurologists work with radiology, neuro-rehabilitation, and neurosurgery
            teams to ensure holistic care.
          </p>
          <p>
            We are committed to clinical excellence, continuous innovation, and patient-centric
            approaches.
          </p>
        </div>
      </div>

      {/* Doctor List */}
      <h1 className="text-3xl font-bold text-black text-center scroll-mt-28" id="Doctors">
        Find Your <span className="text-blue-600">Specialist</span>
      </h1>
      <p className="text-md text-gray-800 mt-2 mb-6 text-center max-w-xl">
        Connect with our top neurology consultants and book your appointments with ease.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {/* Doctor Card */}
        <div className="bg-white p-4 rounded-xl shadow-md w-[450px] h-[452px] flex flex-col items-center animate-fade-in-up">
          <div className="w-32 h-32 overflow-hidden rounded-full bg-white">
            <img src={Sunil} alt="Dr. Sunil Kumar" className="w-full h-full object-cover object-top rounded-full" />
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold">Dr. Sunil Kumar</h2>
            <p className="text-blue-600 text-sm">Neurologist</p>
            <div className="flex justify-center items-center text-yellow-500 text-sm mt-1">
              ★★★★☆<span className="text-black ml-2">4.2</span>
            </div>
          </div>
          <div className="text-sm text-gray-700 mt-4 text-left w-full px-6">
            <p><strong>Experience:</strong> 12 years</p>
            <p><strong>Education:</strong> Apex Medical University</p>
          </div>
          <div className="mt-4 w-full px-6">
            <p className="font-semibold text-sm mb-1">Specializations</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Stroke</span>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Epilepsy</span>
            </div>
          </div>
          <div className="mt-6 w-full px-6">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition">
              Book Appointment
            </button>
          </div>
          <p className="text-center text-xs text-gray-500 mt-2">Next available: Today, 3:00 PM</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md w-[450px] h-[452px] flex flex-col items-center animate-fade-in-up">
          <div className="w-32 h-32 overflow-hidden rounded-full bg-white">
            <img src={athi} alt="Dr. Seenivasan" className="w-full h-full object-cover object-top rounded-full" />
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold">Dr. Athithyan</h2>
            <p className="text-blue-600 text-sm">Neurologist</p>
            <div className="flex justify-center items-center text-yellow-500 text-sm mt-1">
              ★★★★☆<span className="text-black ml-2">4.0</span>
            </div>
          </div>
          <div className="text-sm text-gray-700 mt-4 text-left w-full px-6">
            <p><strong>Experience:</strong> 10 years</p>
            <p><strong>Education:</strong> Vels Medical University</p>
          </div>
          <div className="mt-4 w-full px-6">
            <p className="font-semibold text-sm mb-1">Specializations</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Neurodegenerative Disorders</span>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Epilepsy</span>
            </div>
          </div>
          <div className="mt-6 w-full px-6">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition">
              Book Appointment
            </button>
          </div>
          <p className="text-center text-xs text-gray-500 mt-2">Next available: Today, 5:00 PM</p>
        </div>
      </div>

      <div className="h-[40px]"></div>
    </div>
  );
};

export default Neuro;
