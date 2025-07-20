import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const PatientCare = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-50 min-h-screen text-blue-900 font-sans text-lg">
      {/* ✅ Sticky Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="bg-blue-600 text-white px-6 py-4">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center p-3 rounded-lg border border-transparent hover:border-blue-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-blue-600"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Patient Care</h1>
              <p className="text-blue-100 text-sm mt-1">
                24/7 patient care services available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <section className="py-10 px-6 md:flex items-center gap-8">
        <motion.div
          className="md:w-1/2 min-h-[50vh] bg-cover bg-center rounded-xl shadow-lg"
          style={{
            backgroundImage:
              "url('https://www.generalmedicine.com/wp-content/uploads/2015/02/Dollarphotoclub_52420796.jpg')"
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        ></motion.div>

        <motion.div
          className="md:w-1/2 mt-6 md:mt-0 max-w-xl"
          {...fadeInUp}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            Compassionate Care at Every Step
          </h3>
          <p className="text-gray-800 mb-4 leading-relaxed">
            Our hospital is dedicated to providing personalized care that respects the needs of every patient...
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>24/7 nursing support & bedside care</li>
            <li>In-room call systems and quick response teams</li>
            <li>Nutritious meals with dietary planning</li>
            <li>Medical interpretation & patient advocacy services</li>
            <li>Support for elderly and differently-abled patients</li>
          </ul>
        </motion.div>
      </section>

      {/* Services */}
      <section className="py-10 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">
          How We Support Your Wellness
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            {
              title: "Personalized Treatment Plans",
              text: "Care tailored to your diagnosis, lifestyle, and recovery goals."
            },
            {
              title: "Integrated Care Teams",
              text: "Collaboration between doctors, nurses, therapists, and case managers."
            },
            {
              title: "Mental & Emotional Support",
              text: "Trained counselors and wellness programs for emotional healing."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-blue-50 hover:bg-blue-100 p-6 rounded-xl shadow-md transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-semibold text-blue-800 mb-2">{item.title}</h4>
              <p className="text-gray-700">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <motion.section
        className="py-12 px-6 bg-blue-50 text-center"
        {...fadeInUp}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          Our Patient-Centered Philosophy
        </h2>
        <p className="max-w-3xl mx-auto text-gray-800 leading-relaxed">
          Every decision we make is based on what’s best for our patients...
        </p>
      </motion.section>

      {/* Tech & Safety */}
      <section className="py-12 px-6 bg-white text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          Advanced Technology & Safety First
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-5xl mx-auto">
          {[
            {
              title: "Smart Monitoring Systems",
              text: "Real-time tracking of patient vitals and automated alerts..."
            },
            {
              title: "Infection Control Protocols",
              text: "Rigorous sterilization, PPE usage, and air purification..."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-blue-50 p-6 rounded-xl shadow-md hover:bg-blue-100 transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-semibold text-blue-800 mb-2">{item.title}</h4>
              <p className="text-gray-700">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-blue-50 px-6 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-10">
          What Our Patients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              quote: "The nurses were incredibly kind and attentive. I felt safe and cared for every single day.",
              name: "— Ananya R."
            },
            {
              quote: "Excellent service. From the food to the medical care, everything was well-organized and thoughtful.",
              name: "— Suresh M."
            },
            {
              quote: "I recovered faster than I expected thanks to their customized therapy and constant encouragement.",
              name: "— Priya K."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl shadow-md hover:bg-blue-100 transition duration-300 text-left"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-800 italic mb-4">“{item.quote}”</p>
              <span className="font-semibold text-blue-800">{item.name}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PatientCare;
