import React, { useState } from "react";
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
import Login from "../../Pages/Auth/Login";
import Signup from "../../Pages/Auth/Signup";

const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const openLogin = () => {
    setIsSignupOpen(false); // Close Signup if open
    setIsLoginOpen(true);
  };

  const openSignup = () => {
    setIsLoginOpen(false); // Close Login if open
    setIsSignupOpen(true);
  };

  const closeModals = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
  };

  return (
    <>
      {/* ✅ Header receives popup control handlers */}
      <Header onLoginClick={openLogin} onSignupClick={openSignup} />

      {/* ✅ Main Content */}
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
      </div>

      {/* ✅ Popup modals */}
      {(isLoginOpen || isSignupOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {isLoginOpen && <Login onClose={closeModals} onSignupClick={openSignup} />}
          {isSignupOpen && <Signup onClose={closeModals} onLoginClick={openLogin} />}
        </div>
      )}
    </>
  );
};

export default Home;
