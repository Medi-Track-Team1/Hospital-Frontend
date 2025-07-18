

// src/components/Home/Home.jsx

import React from "react";
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
      </div>
    </>
  );
};

export default Home;
