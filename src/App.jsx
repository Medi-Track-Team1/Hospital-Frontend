import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home"; // Make sure this path is correct

import PatientProfile from "./components/PatientProfile/PatientProfile"; 


import Reception from "./components/Reception/Reception";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/patient-profile" element={<PatientProfile />} />
        <Route path="/reception/*" element={<Reception/>}></Route>
        

      </Routes>
    </Router>
  );
}

export default App;
