import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeIn = {
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

const GeneticTesting = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-lg">
      {/* Header Bar */}
      <Header />
      <br></br>

      {/* Back Button with Heading */}
      <motion.section
        className="flex items-center gap-4 mt-6 mb-10 px-4 py-6 rounded-md shadow"
        style={{ backgroundColor: "#e4e8f0ff" }}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
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
        <h1 className="text-4xl font-bold text-blue-900">Genetic Testing Services</h1>
      </motion.section>

      {/* DNA Services Section */}
      <motion.section
        className="bg-blue-50 py-10 px-6 md:flex items-center gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        {/* Image */}
        <motion.div
          className="md:w-1/2 min-h-[50vh] bg-cover bg-center rounded-xl shadow-lg"
          style={{
            backgroundImage: "url('https://ibcnj.com/wp-content/uploads/2018/04/Fotolia_191955701_XS-e1522697997734.jpg')",
          }}
          role="img"
          aria-label="DNA background"
          whileHover={{ scale: 1.02 }}
        />

        {/* Text */}
        <motion.div className="md:w-1/2 mt-6 md:mt-0 max-w-xl">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            Decode Your DNA, Understand Your Health
          </h3>
          <p className="text-gray-800 mb-4 leading-relaxed">
            Our advanced genetic testing empowers you to take control of your future with early detection,
            personalized treatment, and proactive care planning.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Carrier screening and inherited condition detection</li>
            <li>Hereditary cancer risk assessment</li>
            <li>Pharmacogenomics (drug response testing)</li>
            <li>Prenatal and preconception testing</li>
            <li>Confidential counseling sessions</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Your genes tell a story — let us help you understand it and make informed health choices.
          </p>
        </motion.div>
      </motion.section>

      {/* Our Genetic Experts Section */}
      <motion.section
        className="py-10 px-6 bg-white text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold text-blue-900 mb-8">Our Genetic Experts</h2>

        {/* Expert 1 */}
        <div className="md:flex items-center gap-8 mb-10 text-left">
          <motion.div className="md:w-1/2 flex justify-center">
            <img
              src="data:image/jpeg;base64,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"
              alt="Dr. Meera Nair"
              className="rounded-xl w-72 shadow-lg"
            />
          </motion.div>
          <motion.div className="md:w-1/2 mt-6 md:mt-0">
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Dr. Meera Nair</h3>
            <p className="text-gray-700 mb-2">Medical Geneticist</p>
            <p className="text-gray-800 leading-relaxed">
              Dr. Meera specializes in diagnosing rare genetic disorders and guiding families through genetic risk analysis with compassion and clarity.
            </p>
          </motion.div>
        </div>

        {/* Expert 2 */}
        <motion.div
          className="md:flex items-center gap-8 text-left bg-blue-50 py-10 px-4 rounded-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.BVLxB8CbqkSbBBckNrY6_QHaHa?pid=Api&P=0&h=180"
              alt="Dr. Arjun Menon"
              className="rounded-xl w-72 shadow-lg"
            />
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Dr. Arjun Menon</h3>
            <p className="text-gray-700 mb-2">Genetic Counselor</p>
            <p className="text-gray-800 leading-relaxed">
              With a focus on patient education and emotional support, Dr. Arjun helps individuals and families navigate the impact of genetic findings on their lives.
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* Our Mission */}
      <motion.section
        className="py-10 bg-white text-center px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Our Mission</h2>
        <p className="text-gray-800 leading-relaxed max-w-3xl mx-auto text-left text-lg">
          To empower every individual with genetic knowledge that leads to proactive healthcare,
          personalized decisions, and peace of mind — because knowing your genes can save lives.
        </p>
      </motion.section>

      {/* Genetic Health Tips */}
      <motion.section
        className="py-10 bg-blue-50 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-2xl font-bold mb-8 text-blue-900">Genetic Health Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
          {[
            {
              icon: "🧬",
              text:
                "Get tested if you have a family history of genetic conditions — early knowledge can change outcomes.",
            },
            {
              icon: "👶",
              text:
                "Planning a family? Carrier screening can help ensure a healthy start for the next generation.",
            },
            {
              icon: "💊",
              text:
                "Pharmacogenomics helps you avoid side effects by matching medicine to your genes.",
            },
            {
              icon: "📝",
              text:
                "Share your genetic results with your doctor to build a personalized healthcare plan.",
            },
          ].map((tip, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center text-left"
              custom={i}
              variants={fadeIn}
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

export default GeneticTesting;
