import React from "react";
import Header from "./Header"; 
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Cardiology = () => {
  const navigate = useNavigate();

  return (
    <motion.div className="font-sans text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      {/* Header Bar */}
      <Header />
      <br></br>

      {/* Back Button */}
      <motion.section
        className="flex items-center gap-4 mt-6 mb-10 px-4 py-6 rounded-md shadow"
        style={{ backgroundColor: '#e4e8f0ff' }}
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
        <h1 className="text-4xl font-bold text-blue-900">Cardiology Services</h1>
      </motion.section>

      {/* Heart Services Section */}
      <motion.section className="bg-blue-50 py-10 px-6 md:flex items-center gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <div
          className="md:w-1/2 min-h-[50vh] bg-cover bg-center rounded-xl shadow-lg"
          style={{
            backgroundImage: "url('https://southdenver.com/wp-content/uploads/2022/08/heart-specialist.jpg')",
          }}
        ></div>

        <div className="md:w-1/2 mt-6 md:mt-0 max-w-xl">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            Personalized Cardiac Care
          </h3>
          <p className="text-gray-800 mb-4 leading-relaxed">
            At our facility, heart care means more than tests—it means trust. We specialize in:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Advanced imaging (2D/3D Echo, ECG, Cardiac MRI)</li>
            <li>Non-invasive rhythm monitoring</li>
            <li>Stress tests and pre-op evaluations</li>
            <li>Lifestyle support and cardiac rehab planning</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Whether you're seeking diagnosis or recovery guidance, our personalized care pathways ensure clarity, comfort, and continuity for every heartbeat.
          </p>
        </div>
      </motion.section>

      {/* Our Cardiologists */}
      <motion.section className="py-10 px-6 bg-white text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <h2 className="text-3xl font-bold text-blue-900 mb-8">Our Cardiologists</h2>

        {/* Doctor 1 */}
        <div className="md:flex items-center gap-8 mb-10 text-left">
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.BVLxB8CbqkSbBBckNrY6_QHaHa?pid=Api&P=0&h=180"
              alt="Dr. Kavita Sharma"
              className="rounded-xl w-72 shadow-lg"
            />
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Dr. Kavita Sharma</h3>
            <p className="text-gray-700 mb-2">Cardiac Imaging Specialist</p>
            <p className="text-gray-800 leading-relaxed">
              Dr. Kavita leads our imaging diagnostics team, offering clarity and precision in cardiovascular evaluations. Her empathetic approach ensures patients feel at ease through each step.
            </p>
          </div>
        </div>

        {/* Doctor 2 */}
        <div className="md:flex items-center gap-8 text-left bg-blue-50 py-10 px-4 rounded-xl">
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://st.depositphotos.com/2234518/3930/i/950/depositphotos_39307949-stock-photo-doctor.jpg"
              alt="Dr. Rohan Das"
              className="rounded-xl w-72 shadow-lg"
            />
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Dr. Rohan Das</h3>
            <p className="text-gray-700 mb-2">Heart Failure Specialist</p>
            <p className="text-gray-800 leading-relaxed">
              With over a decade of experience in cardiac care, Dr. Rohan focuses on long-term treatment plans for chronic heart conditions. His mission: to help every patient live confidently and comfortably.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Mission */}
      <motion.section className="py-10 bg-white text-center px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Our Mission</h2>
        <p className="text-gray-800 leading-relaxed max-w-3xl mx-auto text-left text-lg">
          To advance heart health with a holistic, patient-first approach. Through innovation, compassion, and world-class care, we aim to make every beat count.
        </p>
      </motion.section>

      {/* Heart Health Tips */}
      <motion.section className="py-10 bg-blue-50 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <h2 className="text-2xl font-bold mb-8 text-blue-900">Heart Health Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
          <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center text-left">
            <div className="text-5xl mb-4">🥗</div>
            <p className="text-gray-800">
              Eat a heart-smart diet with leafy greens, fresh fruits, and whole grains. Nutrition is your first line of defense!
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center text-left">
            <div className="text-5xl mb-4">🏃‍♀️</div>
            <p className="text-gray-800">
              Exercise daily for at least 30 minutes to strengthen your cardiovascular system and reduce stress.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center text-left">
            <div className="text-5xl mb-4">🧘‍♂️</div>
            <p className="text-gray-800">
              Practice yoga and deep breathing to manage anxiety and boost heart resilience.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center text-left">
            <div className="text-5xl mb-4">🩺</div>
            <p className="text-gray-800">
              Schedule regular heart checkups, especially if you have a family history or existing health conditions.
            </p>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Cardiology;
