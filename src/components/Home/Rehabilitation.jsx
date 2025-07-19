import React from "react";
import Header from "./Header";

import { useNavigate } from "react-router-dom";
const Rehabilitation = () => {
  const navigate=useNavigate();
  return (
    <div className="font-sans text-lg"> {/* Header Bar */}
      <Header />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="ml-4 mt-2 px-4 py-2 text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-full shadow-md transition duration-300"
      >
        ← Back
      </button>

      {/* Title Bar */}
      <section className="text-center mt-6 mb-10 px-4 py-6 rounded-md shadow" style={{ backgroundColor: '#2563eb' }}>
  <h1 className="text-4xl font-bold text-white">Rehabilitation</h1>
</section>

      {/* Main Section with Image */}
      <section className="bg-blue-50 py-10 px-6 md:flex items-center gap-8">
        {/* Left: Image */}
        <div
          className="md:w-1/2 min-h-[50vh] bg-cover bg-center rounded-xl shadow-lg"
          style={{ backgroundImage: "url('/ui/rehabilitation.png')" }} // ✅ corrected image path
        ></div>

        {/* Right: Text */}
        <div className="md:w-1/2 mt-6 md:mt-0 max-w-xl">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            Personalized Recovery Programs
          </h3>
          <p className="text-gray-800 mb-4 leading-relaxed">
            Our Rehabilitation Services support patients on their journey to recovery through compassionate care, advanced therapy, and customized treatment plans.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Physical therapy for injury and post-surgical recovery</li>
            <li>Neurological rehabilitation (stroke, spinal injuries)</li>
            <li>Orthopedic rehab for joint and muscle strengthening</li>
            <li>Pain management and mobility improvement</li>
            <li>Occupational therapy for daily life independence</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            We ensure every patient gets the support they need to regain strength, function, and confidence.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-10 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">Why Choose Our Rehab Services?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-blue-50 p-6 rounded-xl shadow-md hover:bg-blue-100 transition">
            <h4 className="text-xl font-semibold text-blue-800 mb-2">Multidisciplinary Team</h4>
            <p className="text-gray-700">
              Collaborations between physiotherapists, neurologists, and occupational therapists ensure holistic recovery.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow-md hover:bg-blue-100 transition">
            <h4 className="text-xl font-semibold text-blue-800 mb-2">Goal-Oriented Plans</h4>
            <p className="text-gray-700">
              We create personalized, progressive goals to help patients improve at every step.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow-md hover:bg-blue-100 transition">
            <h4 className="text-xl font-semibold text-blue-800 mb-2">State-of-the-Art Equipment</h4>
            <p className="text-gray-700">
              From hydrotherapy to electrical stimulation, we offer cutting-edge facilities for faster, effective rehab.
            </p>
          </div>
        </div>
      </section>

      {/* Motivational Tips */}
      <section className="py-10 bg-blue-50 text-center">
        <h2 className="text-2xl font-bold mb-8 text-blue-900">Rehabilitation Wellness Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
          <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center text-left hover:bg-blue-100 transition">
            <div className="text-5xl mb-4">💪</div>
            <p className="text-gray-800">
              Stay consistent with exercises—daily movement can dramatically improve strength and flexibility.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center text-left hover:bg-blue-100 transition">
            <div className="text-5xl mb-4">🧠</div>
            <p className="text-gray-800">
              Maintain a positive mindset—mental wellness is a key part of physical healing.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center text-left hover:bg-blue-100 transition">
            <div className="text-5xl mb-4">🥗</div>
            <p className="text-gray-800">
              Eat nutritious food to fuel your body and support faster tissue regeneration.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center text-left hover:bg-blue-100 transition">
            <div className="text-5xl mb-4">⏳</div>
            <p className="text-gray-800">
              Be patient with your progress—healing takes time, and every small step counts.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rehabilitation;
