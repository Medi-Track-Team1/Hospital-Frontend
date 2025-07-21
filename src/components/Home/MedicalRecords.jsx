import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const MedicalRecords = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const cardHover = {
    whileHover: {
      scale: 1.03,
      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
    },
  };

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
              <h1 className="text-xl font-semibold">Medical Reports</h1>
              <p className="text-blue-100 text-sm mt-1">
                24/7 services available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button + Heading */}
     

      {/* Image and Content */}
      <motion.section
        className="bg-blue-50 py-10 px-6 md:flex items-center gap-8"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={2}
      >
        <motion.div
          className="md:w-1/2 min-h-[50vh] bg-cover bg-center rounded-xl shadow-lg"
          style={{
            backgroundImage:
              "url('https://elitemedicalexperts.com/wp-content/uploads/2017/04/shutterstock_143828728-scaled.jpg')",
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        ></motion.div>

        <motion.div
          className="md:w-1/2 mt-6 md:mt-0 max-w-xl"
          variants={fadeInUp}
          custom={3}
        >
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            Digitally Secured and Organized
          </h3>
          <p className="text-gray-800 mb-4 leading-relaxed">
            Our Medical Records department ensures secure, confidential, and
            streamlined access to patient histories, lab results, prescriptions,
            and imaging reports.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Access previous diagnoses, medications, and procedures</li>
            <li>Downloadable lab reports and prescriptions</li>
            <li>Track appointments and vaccination history</li>
            <li>HIPAA-compliant digital security protocols</li>
            <li>24/7 online access for registered patients</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            We simplify your healthcare journey by keeping your information safe
            and always accessible.
          </p>
        </motion.div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        className="py-10 px-6 bg-white text-center"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={4}
      >
        <h2 className="text-3xl font-bold text-blue-900 mb-8">
          Why Choose Our Medical Records System?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            {
              title: "Real-Time Updates",
              desc: "Records are updated instantly after consultations, ensuring up-to-date information.",
            },
            {
              title: "Remote Accessibility",
              desc: "Patients and healthcare providers can securely access documents from any device.",
            },
            {
              title: "Error-Free Documentation",
              desc: "Digitally maintained records reduce human errors and ensure data integrity.",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              className="bg-blue-50 p-6 rounded-xl shadow-md"
              variants={fadeInUp}
              custom={index + 5}
              {...cardHover}
            >
              <h4 className="text-xl font-semibold text-blue-800 mb-2">
                {card.title}
              </h4>
              <p className="text-gray-700">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Extra Section */}
      <motion.section
        className="py-12 px-6 bg-blue-50 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={6}
      >
        <h2 className="text-3xl font-bold text-blue-900 mb-8">
          What You Can Do With Your Medical Records
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-5xl mx-auto">
          {[
            {
              title: "Easily Share With Specialists",
              desc: "Forward your full medical history to new doctors for second opinions or referrals without repeating tests.",
            },
            {
              title: "Monitor Long-Term Conditions",
              desc: "Track how your chronic health metrics change over time and make informed decisions with your care team.",
            },
            {
              title: "Prepare for Emergencies",
              desc: "Quickly access critical health info such as blood type, allergies, or current medications when needed.",
            },
            {
              title: "Stay Informed & In Control",
              desc: "Empower yourself with knowledge—review reports, treatment plans, and prescriptions anytime.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg"
              variants={fadeInUp}
              custom={index + 7}
              {...cardHover}
            >
              <h4 className="text-xl font-semibold text-blue-800 mb-2">
                {item.title}
              </h4>
              <p className="text-gray-700">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default MedicalRecords;
