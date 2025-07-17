import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home"; // Make sure this path is correct

import PatientProfile from "./components/PatientProfile/PatientProfile"; 


import Reception from "./components/Reception/Reception";
import Cardio from "./components/Department/Cardio";
// import Neuro from "./components/Department/Neuro"; 


function App() {
  return (
   
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cardiology" element={<Cardio />} />
        {/* <Route path="/neurology" element={<Neuro />} />  */}
        <Route path="/patient-profile" element={<PatientProfile />} />
        <Route path="/reception/*" element={<Reception/>}></Route>

      </Routes>
    </Router>
  );
}

export default App;
