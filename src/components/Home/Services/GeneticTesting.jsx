import React from "react";
import Header from "../Header"; 
import { useNavigate } from "react-router-dom";
const GeneticTesting = () => {
  const navigate=useNavigate();
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
      {/* Title Bar */}
     <section className="text-center mt-6 mb-10 px-4 py-6 rounded-md shadow" style={{ backgroundColor: '#2563eb' }}>
  <h1 className="text-4xl font-bold text-white">Genetic Testing</h1>
</section>


      {/* DNA Services Section */}
      <section className="bg-blue-50 py-10 px-6 md:flex items-center gap-8">
        {/* Left: Background image */}
        <div
          className="md:w-1/2 min-h-[50vh] bg-cover bg-center rounded-xl shadow-lg"
          style={{ backgroundImage: "url('/ui/dna.png')" }}
          role="img"
          aria-label="DNA background"
        ></div>

        {/* Right: Text content */}
        <div className="md:w-1/2 mt-6 md:mt-0 max-w-xl">
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
        </div>
      </section>

      {/* Our Genetic Experts Section */}
      <section className="py-10 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">Our Genetic Experts</h2>

        {/* Expert 1 */}
        <div className="md:flex items-center gap-8 mb-10 text-left">
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/ui/geneticdoc1.png"
              alt="Dr. Meera Nair"
              className="rounded-xl w-72 shadow-lg"
            />
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Dr. Meera Nair</h3>
            <p className="text-gray-700 mb-2">Medical Geneticist</p>
            <p className="text-gray-800 leading-relaxed">
              Dr. Meera specializes in diagnosing rare genetic disorders and guiding families through genetic risk analysis with compassion and clarity.
            </p>
          </div>
        </div>

        {/* Expert 2 */}
        <div className="md:flex items-center gap-8 text-left bg-blue-50 py-10 px-4 rounded-xl">
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/ui/geneticdoc2.png"
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
        </div>
      </section>

      {/* Our Mission - Text Only */}
      <section className="py-10 bg-white text-center px-6">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Our Mission</h2>
        <p className="text-gray-800 leading-relaxed max-w-3xl mx-auto text-left text-lg">
          To empower every individual with genetic knowledge that leads to proactive healthcare,
          personalized decisions, and peace of mind — because knowing your genes can save lives.
        </p>
      </section>

      {/* Genetic Health Tips with Emojis */}
      <section className="py-10 bg-blue-50 text-center">
        <h2 className="text-2xl font-bold mb-8 text-blue-900">Genetic Health Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
          {/* Tip 1 */}
          <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center text-left">
            <div className="text-5xl mb-4">🧬</div>
            <p className="text-gray-800">
              Get tested if you have a family history of genetic conditions — early knowledge can change outcomes.
            </p>
          </div>

          {/* Tip 2 */}
          <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center text-left">
            <div className="text-5xl mb-4">👶</div>
            <p className="text-gray-800">
              Planning a family? Carrier screening can help ensure a healthy start for the next generation.
            </p>
          </div>

          {/* Tip 3 */}
          <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center text-left">
            <div className="text-5xl mb-4">💊</div>
            <p className="text-gray-800">
              Pharmacogenomics helps you avoid side effects by matching medicine to your genes.
            </p>
          </div>

          {/* Tip 4 */}
          <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center text-left">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-gray-800">
              Share your genetic results with your doctor to build a personalized healthcare plan.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GeneticTesting;


