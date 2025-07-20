import React from "react";
import Header from "./Header";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
    <div className="font-sans text-lg">
      <Header />
<br></br>
      <motion.section
        className="flex items-center gap-4 mt-6 mb-10 px-4 py-6 rounded-md shadow"
        style={{ backgroundColor: "#e4e8f0ff" }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.button
          onClick={() => navigate("/")}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black hover:bg-blue-500 hover:text-white transition duration-300 shadow"
          title="Back to Home"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ←
        </motion.button>
        <h1 className="text-4xl font-bold text-blue-900">Rehabilitation</h1>
      </motion.section>

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
          {/* <p className="text-gray-700 leading-relaxed">
            We ensure every patient gets the support they need to regain strength, function, and confidence.
          </p> */}
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
