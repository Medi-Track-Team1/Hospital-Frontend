import React from "react";
import { Droplet } from "lucide-react";
import hepatology from "../../assets/hepatology.jpeg";
import seeni from "../../assets/seeni.png";
import Sunil from "../../assets/Sunil.jpeg";

const Hepatology = () => {
  return (
    <div className="min-h-screen bg-blue-100 pt-28 px-6 flex flex-col items-center">
      {/* Header */}
      <div className="relative overflow-hidden rounded-lg px-8 py-6 flex justify-between items-center w-full max-w-6xl mb-6 bg-gradient-to-r from-blue-200 via-blue-100 to-white shadow-md">
        <div className="relative z-10 flex items-center space-x-4 animate-fade-in-down">
          <Droplet className="w-10 h-10 text-red-500" />
          <div>
            <h2 className="text-4xl font-bold text-black">Hepatology</h2>
            <p className="text-xl font-bold text-gray-500">Care for Your Liver</p>
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
            src={hepatology}
            alt="Hepatology Department"
            className="rounded-lg w-full h-auto max-h-[320px] object-cover shadow-lg"
          />
        </div>

        {/* Text */}
        <div className="lg:w-1/2 lg:pl-8 text-black space-y-4">
          <h2 className="text-2xl font-bold text-blue-800 mb-2 hover:text-blue-600 transition-colors duration-300">
            Department of Hepatology
          </h2>
          <p className="animate-fade-in-up">
            Our Hepatology department provides specialized care for liver diseases with a team of
            experienced hepatologists and dedicated support staff.
          </p>
          <p className="animate-fade-in-up">
            We address a wide spectrum of liver-related conditions, including viral hepatitis, liver fibrosis,
            autoimmune liver disease, and hepatocellular carcinoma.
          </p>
          <p className="animate-fade-in-up">
            From early diagnosis to liver transplant evaluation, we ensure personalized treatment paths
            tailored to each patient’s health status.
          </p>
          <p className="animate-fade-in-up">
            The department is equipped with cutting-edge imaging, liver biopsy services, and multidisciplinary
            support to offer holistic care.
          </p>
          <p className="animate-fade-in-up">
            Our mission is to improve liver health outcomes with compassion, advanced science, and continuous support.
          </p>
        </div>
      </div>

      <div className="h-[90px]"></div>

      {/* Doctor List */}
      <h1 className="text-3xl font-bold text-black text-center scroll-mt-28" id="Doctors">
        Find Your <span className="text-blue-600">Specialist</span>
      </h1>
      <p className="text-md text-gray-800 mt-2 mb-6 text-center max-w-xl">
        Connect with top-rated hepatology specialists and book appointments with ease.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {/* Doctor 1 */}
        <div className="bg-white p-4 rounded-xl shadow-md w-[450px] h-[452px] flex flex-col items-center animate-fade-in-up">
                <div className="w-32 h-32 overflow-hidden rounded-full bg-white">
            <img
              src={Sunil}
              alt="Dr. Meganthan"
              className="w-full h-full object-cover object-top rounded-full"
            />
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold">Dr. Meganthan</h2>
            <p className="text-blue-600 text-sm">Hepatology Specialist</p>
            <div className="flex justify-center items-center text-yellow-500 text-sm mt-1">
              ★★★☆☆<span className="text-black ml-2">3.5</span>
            </div>
          </div>
          <div className="text-sm text-gray-700 mt-4 text-left w-full px-6">
            <p><strong>Experience:</strong> 10 years</p>
            <p><strong>Education:</strong> Star Medical School</p>
          </div>
          <div className="mt-4 w-full px-6">
            <p className="font-semibold text-sm mb-1">Specializations</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Hepatitis B & C</span>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Liver Cirrhosis</span>
            </div>
          </div>
          <div className="mt-6 w-full px-6">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition">
              Book Appointment
            </button>
          </div>
          <p className="text-center text-xs text-gray-500 mt-2">Next available: Today, 4:30 PM</p>
        </div>

        {/* Doctor 2 */}
        <div className="bg-white p-4 rounded-xl shadow-md w-[450px] h-[452px] flex flex-col items-center animate-fade-in-up">
               <div className="w-32 h-32 overflow-hidden rounded-full bg-white">
           <img
             src={seeni}
             alt="Dr. Seenivasan"
             className="w-full h-full object-cover object-top rounded-full"
           />
         </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold">Dr. Seenivasan</h2>
            <p className="text-blue-600 text-sm">Hepatology Specialist</p>
            <div className="flex justify-center items-center text-yellow-500 text-sm mt-1">
              ★★★★☆<span className="text-black ml-2">4.5</span>
            </div>
          </div>
          <div className="text-sm text-gray-700 mt-4 text-left w-full px-6">
            <p><strong>Experience:</strong> 14 years</p>
            <p><strong>Education:</strong> Walter Medical School</p>
          </div>
          <div className="mt-4 w-full px-6">
            <p className="font-semibold text-sm mb-1">Specializations</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Liver Biopsy</span>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Fatty Liver</span>
            </div>
          </div>
          <div className="mt-6 w-full px-6">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition">
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

export default Hepatology;
