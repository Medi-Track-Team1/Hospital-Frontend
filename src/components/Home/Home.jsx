import React from "react";
import { useLocation } from "react-router-dom";

import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Departments from "./Departments";
import Doctors from "./Doctors";
import Appointment from "./Appointment";
import Stats from "./Stats";
import Gallery from "./Gallery";
import FAQ from "./FAQ";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import Footer from "./Footer";

// import Cardiology from "./Cardiology";
// import Pharmacy from "./Pharmacy";
// import PatientCare from "./PatientCare";
// import GeneticTesting from "./GeneticTesting";
// import Rehabilitation from "./Rehabilitation";
// import MedicalRecords from "./MedicalRecords";


const Home = () => {
  return (
    <>
      <Header />
      {/* pt-16 matches the navbar height: h-16 = 4rem = 64px */}
      <div className="pt-16">
        <Hero />
        <About />
        <Services />
        <Departments />
        <Doctors />
        <Appointment />
        <Stats />
        <Gallery />
        <FAQ />
        <Testimonials />
        <Contact />
        <Footer />
        
        {/* <Router>
      <Routes>
        
        <Route path="/cardiology" element={<Cardiology />} />
        <Route path="/pharmacy" element={<Pharmacy />} />
        <Route path="/patient-care" element={<PatientCare />} />
        <Route path="/genetic-testing" element={<GeneticTesting />} />
        <Route path="/rehabilitation" element={<Rehabilitation />} />
        <Route path="/medical-records" element={<MedicalRecords />} />
      </Routes>
    </Router> */}


      </div>
    </>
  );
};

export default Home;

