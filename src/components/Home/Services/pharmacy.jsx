import React from "react";
import Header from "../Header"; 
import { useNavigate } from "react-router-dom";

const PharmacyServices = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-50 min-h-screen text-blue-900 font-sans">
      <Header />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="ml-4 mt-4 px-4 py-2 text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-full shadow-md transition duration-300"
      >
        ← Back
      </button>
<section className="text-center mt-6 mb-10 px-4 py-6 rounded-md shadow" style={{ backgroundColor: '#2563eb' }}>
  <h1 className="text-4xl font-bold text-white">Pharmacy Services</h1>
</section>



      {/* Image + Overview */}
      <section className="py-10 px-6 md:flex items-center gap-8">
        {/* Left: Image */}
        <div
          className="md:w-1/2 min-h-[50vh] bg-cover bg-center rounded-xl shadow-lg"
          style={{ backgroundImage: "url('/ui/pharmacyservice.png')" }}
        ></div>

        {/* Right: Text */}
        <div className="md:w-1/2 mt-6 md:mt-0">
          <h2 className="text-2xl font-semibold mb-4">Comprehensive Medication Support</h2>
          <p className="text-blue-800 mb-4">
            Our in-house pharmacy ensures patients receive prescribed medications safely and promptly. With trained pharmacists and a digital inventory system, we ensure that medication distribution is error-free and efficient.
          </p>
          <p className="text-blue-800">
            From prescription fulfillment to patient counseling, our pharmacy team provides accurate guidance on dosage, interactions, and side effects to improve patient outcomes.
          </p>
        </div>
      </section>

      {/* Technology & Safety */}
      <section className="py-12 px-6 bg-blue-50 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          Modern Infrastructure & Technology
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
          <div className="bg-white p-6 rounded-xl shadow-md hover:bg-blue-100 transition duration-300">
            <h4 className="text-xl font-semibold text-blue-800 mb-2">
              Barcode Verification System
            </h4>
            <p className="text-gray-700">
              Reduces errors by verifying prescriptions using barcode scans during dispensing.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:bg-blue-100 transition duration-300">
            <h4 className="text-xl font-semibold text-blue-800 mb-2">
              Real-time Stock Management
            </h4>
            <p className="text-gray-700">
              Automated inventory tracking ensures timely replenishment of critical medications.
            </p>
          </div>
        </div>
      </section>
      

      {/* Testimonials */}
      <section className="py-12 bg-white px-6 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-10">
          Patient Feedback
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-blue-50 p-6 rounded-xl shadow-md hover:bg-blue-100 transition duration-300 text-left">
            <p className="text-gray-800 italic mb-4">
              “I was surprised how fast the pharmacy processed my prescription. The staff explained everything clearly.”
            </p>
            <span className="font-semibold text-blue-800">— Naveen P.</span>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow-md hover:bg-blue-100 transition duration-300 text-left">
            <p className="text-gray-800 italic mb-4">
              “They made sure my medication didn’t interfere with other drugs I was taking. Very professional.”
            </p>
            <span className="font-semibold text-blue-800">— Keerthi M.</span>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow-md hover:bg-blue-100 transition duration-300 text-left">
            <p className="text-gray-800 italic mb-4">
              “Even at midnight, they had what I needed. Truly dependable pharmacy service.”
            </p>
            <span className="font-semibold text-blue-800">— Rajesh K.</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PharmacyServices;
