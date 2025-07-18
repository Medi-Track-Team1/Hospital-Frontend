import React from "react";
import Header from "../Header"; 
import { useNavigate } from "react-router-dom";

const Cardiology = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-lg">
      {/* Header Bar */}
      <Header />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="ml-4 mt-2 px-4 py-2 text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-full shadow-md transition duration-300"
      >
        ← Back
      </button>

     <section className="text-center mt-6 mb-10 px-4 py-6 rounded-md shadow" style={{ backgroundColor: '#2563eb' }}>
  <h1 className="text-4xl font-bold text-white">Cardiology Services</h1>
</section>


      {/* Heart Services Section */}
      <section className="bg-blue-50 py-10 px-6 md:flex items-center gap-8">
        <div
          className="md:w-1/2 min-h-[50vh] bg-cover bg-center rounded-xl shadow-lg"
          style={{ backgroundImage: "url('/ui/heartservice.png')" }}
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
      </section>

      {/* Our Cardiologists */}
      <section className="py-10 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">Our Cardiologists</h2>

        {/* Doctor 1 */}
        <div className="md:flex items-center gap-8 mb-10 text-left">
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/ui/doctor1.png"
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
              src="/ui/doctor2.png"
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
      </section>

      {/* Mission */}
      <section className="py-10 bg-white text-center px-6">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Our Mission</h2>
        <p className="text-gray-800 leading-relaxed max-w-3xl mx-auto text-left text-lg">
          To advance heart health with a holistic, patient-first approach. Through innovation, compassion, and world-class care, we aim to make every beat count.
        </p>
      </section>

      {/* Heart Health Tips */}
      <section className="py-10 bg-blue-50 text-center">
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
      </section>
    </div>
  );
};

export default Cardiology;
