import React from "react";
import { Droplet } from "lucide-react";
import Pedia from "../../assets/Pedia.png"; 
import Sunil from "../../assets/Sunil.jpeg"; 

const Pediatrics = () => {
  return (
    <div className="min-h-screen bg-blue-100 pt-28 px-6 flex flex-col items-center">
      {/* Header */}
      <div className="relative overflow-hidden rounded-lg px-8 py-6 flex justify-between items-center w-full max-w-6xl mb-6 bg-gradient-to-r from-blue-200 via-blue-100 to-white shadow-md">
        <div className="relative z-10 flex items-center space-x-4 animate-fade-in-down">
          <Droplet className="w-10 h-10 text-blue-500" />
          <div>
            <h2 className="text-4xl font-bold text-black">Pediatrics</h2>
            <p className="text-xl font-bold text-gray-500">Care for Your Child</p>
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
        {/* Image */}
        <div className="lg:w-1/2 flex justify-center items-center mb-6 lg:mb-0 transition-transform duration-700 hover:scale-105">
          <img
            src={Pedia}
            alt="Pediatrics Department"
            className="rounded-lg w-full h-auto max-h-[320px] object-cover shadow-lg"
          />
        </div>

        {/* Text */}
        <div className="lg:w-1/2 lg:pl-8 text-black space-y-4">
          <h2 className="text-2xl font-bold text-blue-800 mb-2 hover:text-blue-600 transition-colors duration-300">
            Department of Pediatrics
          </h2>
          <p className="animate-fade-in-up">
            Our Pediatrics department offers comprehensive healthcare services for infants, children, and adolescents.
          </p>
          <p className="animate-fade-in-up">
            We specialize in preventive care, immunizations, growth monitoring, and treatment of childhood illnesses.
          </p>
          <p className="animate-fade-in-up">
            From newborn screenings to adolescent wellness, our team ensures personalized and compassionate care.
          </p>
          <p className="animate-fade-in-up">
            Equipped with child-friendly facilities and experienced pediatricians, we focus on your child's health and development.
          </p>
          <p className="animate-fade-in-up">
            Our mission is to nurture healthy children with expert guidance and supportive care at every stage.
          </p>
        </div>
      </div>

      <div className="h-[90px]"></div>

      {/* Doctor List */}
      <h1 className="text-3xl font-bold text-black text-center scroll-mt-28" id="Doctors">
        Find Your <span className="text-blue-600">Specialist</span>
      </h1>
      <p className="text-md text-gray-800 mt-2 mb-6 text-center max-w-xl">
        Connect with top-rated pediatric specialists and book appointments with ease.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {/* Doctor 1 */}
        <div className="bg-white p-4 rounded-xl shadow-md w-[450px] h-[452px] flex flex-col items-center animate-fade-in-up">
          <div className="w-32 h-32 overflow-hidden rounded-full bg-white">
                     <img
                       src={Sunil}
                       alt="Dr. Naveen"
                       className="w-50 h-30 object-contain"
                     />
                   </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold">Dr. Naveen</h2>
            <p className="text-blue-600 text-sm">Pediatrics Specialist</p>
            <div className="flex justify-center items-center text-yellow-500 text-sm mt-1">
              ★★★★★<span className="text-black ml-2">4.8</span>
            </div>
          </div>
          <div className="text-sm text-gray-700 mt-4 text-left w-full px-6">
            <p><strong>Experience:</strong> 12 years</p>
            <p><strong>Education:</strong> Namakkal Medical College</p>
          </div>
          <div className="mt-4 w-full px-6">
            <p className="font-semibold text-sm mb-1">Specializations</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Neonatal Care</span>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Child Nutrition</span>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Immunizations</span>
            </div>
          </div>
          <div className="mt-6 w-full px-6">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition">
              Book Appointment
            </button>
          </div>
          <p className="text-center text-xs text-gray-500 mt-2">Next available: Tomorrow, 10:00 AM</p>
        </div>

        {/* Doctor 2 */}
        <div className="bg-white p-4 rounded-xl shadow-md w-[450px] h-[452px] flex flex-col items-center animate-fade-in-up">
           <div className="w-32 h-32 overflow-hidden rounded-full bg-white">
                      <img
                        src={Sunil}
                        alt="Dr. Saranesh Pandian"
                        className="w-50 h-30 object-contain"
                      />
                    </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold">Dr. Saranesh Pandian</h2>
            <p className="text-blue-600 text-sm">Pediatrics Specialist</p>
            <div className="flex justify-center items-center text-yellow-500 text-sm mt-1">
              ★★★★☆<span className="text-black ml-2">4.3</span>
            </div>
          </div>
          <div className="text-sm text-gray-700 mt-4 text-left w-full px-6">
            <p><strong>Experience:</strong> 8 years</p>
            <p><strong>Education:</strong> Perambalur Medical Institute</p>
          </div>
          <div className="mt-4 w-full px-6">
            <p className="font-semibold text-sm mb-1">Specializations</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Pediatric Allergies</span>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Growth Disorders</span>
            </div>
          </div>
          <div className="mt-6 w-full px-6">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition">
              Book Appointment
            </button>
          </div>
          <p className="text-center text-xs text-gray-500 mt-2">Next available: Tomorrow, 3:00 PM</p>
        </div>
      </div>

      <div className="h-[40px]"></div>
    </div>
  );
};

export default Pediatrics;