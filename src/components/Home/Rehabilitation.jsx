import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Make sure to install lucide-react or use any icon lib you prefer

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

const tipsVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3 },
  }),
};

const Rehabilitation = () => {
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
              <h1 className="text-xl font-semibold">Rehabilitation</h1>
              <p className="text-blue-100 text-sm mt-1">
                24/7 services available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <motion.section
        className="bg-blue-50 py-10 px-6 md:flex items-center gap-8"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <motion.div
          className="md:w-1/2 min-h-[50vh] bg-cover bg-center rounded-xl shadow-lg"
          style={{
            backgroundImage: `url('https://revita.bg/img/cms/tazobedrena-stava.jpg')`,
          }}
        ></motion.div>

        <motion.div className="md:w-1/2 mt-6 md:mt-0 max-w-xl">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            Personalized Recovery Programs
          </h3>
          <p className="text-gray-800 mb-4 leading-relaxed">
            Our Rehabilitation Services support patients on their journey to recovery through compassionate care, advanced therapy, and customized treatment plans.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            {[
              "Physical therapy for injury and post-surgical recovery",
              "Neurological rehabilitation (stroke, spinal injuries)",
              "Orthopedic rehab for joint and muscle strengthening",
              "Pain management and mobility improvement",
              "Occupational therapy for daily life independence",
            ].map((item, index) => (
              <motion.li
                key={index}
                custom={index}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        className="py-10 px-6 bg-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-blue-900 mb-8">
          Why Choose Our Rehab Services?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            {
              title: "Multidisciplinary Team",
              desc: "Collaborations between physiotherapists, neurologists, and occupational therapists ensure holistic recovery.",
            },
            {
              title: "Goal-Oriented Plans",
              desc: "We create personalized, progressive goals to help patients improve at every step.",
            },
            {
              title: "State-of-the-Art Equipment",
              desc: "From hydrotherapy to electrical stimulation, we offer cutting-edge facilities for faster, effective rehab.",
            },
          ].map((benefit, i) => (
            <motion.div
              key={i}
              className="bg-blue-50 p-6 rounded-xl shadow-md hover:bg-blue-100 transition"
              custom={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-semibold text-blue-800 mb-2">{benefit.title}</h4>
              <p className="text-gray-700">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Wellness Tips */}
      <motion.section
        className="py-10 bg-blue-50 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-8 text-blue-900">Rehabilitation Wellness Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
          {[
            { icon: "💪", text: "Stay consistent with exercises—daily movement can dramatically improve strength and flexibility." },
            { icon: "🧠", text: "Maintain a positive mindset—mental wellness is a key part of physical healing." },
            { icon: "🥗", text: "Eat nutritious food to fuel your body and support faster tissue regeneration." },
            { icon: "⏳", text: "Be patient with your progress—healing takes time, and every small step counts." },
          ].map((tip, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center text-left hover:bg-blue-100 transition"
              custom={i}
              variants={tipsVariant}
            >
              <div className="text-5xl mb-4">{tip.icon}</div>
              <p className="text-gray-800">{tip.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Rehabilitation;
