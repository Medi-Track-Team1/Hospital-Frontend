import React from "react";
import { Heart } from "lucide-react";
import cardio from "../../assets/Cardio.jpg";
import Sunil from "../../assets/Sunil.jpeg";
// import Mahesh from "../../assets/Mahesh.jpg";
import { motion } from "framer-motion";

const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay
    }
  }),
};


const Cardio = () => {
  return (
    <div className="min-h-screen bg-blue-100 p-6 flex flex-col items-center">
      <div className=" relative overflow-hidden rounded-lg text-white px-8 py-6 flex justify-between items-center w-full max-w-6xl mb-6">
        <div className="relative z-10 flex items-center space-x-4">
          <Heart className="w-10 h-10 text-red-500" />
          
          <div>
            <h2 className="text-4xl font-bold text-black" >Cardiology</h2>
             <p className="text-xl font-bold text-gray-400">Your Heart Matters</p>
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

       <div className="flex flex-col lg:flex-row bg-blue-100 mt-6 p-6 mb-10 w-full max-w-6xl">
  <motion.div
    className="lg:w-1/2 flex justify-center items-center mb-6 lg:mb-0"
    variants={fadeInVariant}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    custom={0}
  >
    <img
      src={cardio}
      alt="Cardiology Department"
      className="rounded-lg w-full h-auto max-h-[320px] object-cover transition duration-500 ease-in-out hover:scale-105"
    />
  </motion.div>

  <motion.div
    className="lg:w-1/2 lg:pl-8 text-black"
    variants={fadeInVariant}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    custom={0.2}
  >
    <motion.h2
      className="text-2xl font-bold text-blue-800 mb-4 hover:text-blue-600 transition-colors duration-300"
      variants={fadeInVariant}
      custom={0.3}
    >
      Department of Adult Cardiology
    </motion.h2>

    <motion.p className="mb-2" variants={fadeInVariant} custom={0.4}>
      The Department of Adult Cardiology with a team of highly skilled cardiologists,
      resident cardiologists, and paramedical staff, provides top-quality heart care.
    </motion.p>

    <motion.p className="mb-2" variants={fadeInVariant} custom={0.5}>
      We have achieved numerous milestones and are known for our innovative medical
      procedures and patient-centered approach. The department offers services in
      HCM, cardio-oncology, heart failure, and amyloidosis.
    </motion.p>

    <motion.p className="mb-2" variants={fadeInVariant} custom={0.6}>
      Rapid lifestyle changes have resulted in a heart disease epidemic. The Amrita
      Team focuses on prevention, management, rehab, and advanced cardiac surgeries.
    </motion.p>
  </motion.div>
</div>



   <div className="h-[90px]"></div>
   
      <h1 className="text-3xl font-bold text-black text-center" id="Doctors">
        Find Your <span className="text-blue-600">Specialist</span>
      </h1>
      <p className="text-md text-gray-800 mt-2 mb-6 text-center max-w-xl">
        Connect with top-rated healthcare professionals and book appointments
        with ease.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
    <div className="bg-white p-4 rounded-xl shadow-md w-[450px] h-[452px] flex flex-col items-center">
  <div className="w-32 h-32 overflow-hidden rounded-full bg-white">
    <img
      src={Sunil}
      alt="Dr. Sunil Kumar"
      className="w-50 h-30 object-contain"
    />
  </div>

  <div className="mt-4 text-center">
    <h2 className="text-xl font-semibold">Dr. Sunil Kumar</h2>
    <p className="text-blue-600 text-sm">Cardiology Specialist</p>
    <div className="flex justify-center items-center text-yellow-500 text-sm mt-1">
      {"★".repeat(4)}☆<span className="text-black ml-2">4.9</span>
    </div>
  </div>

  <div className="text-sm text-gray-700 mt-4 text-left w-full px-6">
    <p><strong>Experience:</strong> 15 years</p>
    <p><strong>Education:</strong> Senthil Medical School</p>
  </div>

  <div className="mt-4 w-full px-6">
    <p className="font-semibold text-sm mb-1">Specializations</p>
    <div className="flex flex-wrap gap-2 text-xs">
      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Heart Surgery</span>
      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Preventive Care</span>
      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Blood Vessel Diseases</span>
    </div>
  </div>

  <div className="mt-6 w-full px-6">
    <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition">
      Book Appointment
    </button>
  </div>

  <p className="text-center text-xs text-gray-500 mt-2">
    Next available: Today, 2:30 PM
  </p>
</div>

      
        <div className="bg-white p-4 rounded-xl shadow-md w-[450px] h-[452px] flex flex-col items-center">
  <div className="w-32 h-32 overflow-hidden rounded-full bg-white">
    <img
      src={Sunil}
      alt="Dr. Mahesh Kumar"
      className="w-50 h-30 object-contain"
    />
  </div>

  <div className="mt-4 text-center">
    <h2 className="text-xl font-semibold">Dr. Mahesh Kumar</h2>
    <p className="text-blue-600 text-sm">Cardiology Specialist</p>
    <div className="flex justify-center items-center text-yellow-500 text-sm mt-1">
      {"★".repeat(4)}☆☆<span className="text-black ml-2">3.5</span>
    </div>
  </div>

  <div className="text-sm text-gray-700 mt-4 text-left w-full px-6">
    <p><strong>Experience:</strong> 10 years</p>
    <p><strong>Education:</strong> Star Medical School</p>
  </div>

  <div className="mt-4 w-full px-6">
    <p className="font-semibold text-sm mb-1">Specializations</p>
    <div className="flex flex-wrap gap-2 text-xs">
      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Heart Surgery</span>
      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Cardic Imaging</span>
    </div>
  </div>

  <div className="mt-6 w-full px-6">
    <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition">
      Book Appointment
    </button>
  </div>

  <p className="text-center text-xs text-gray-500 mt-2">
    Next available: Today, 4:30 PM
  </p>
</div>
      </div>
         <div className="h-[40px]"></div>

    </div>
  );
};

export default Cardio;