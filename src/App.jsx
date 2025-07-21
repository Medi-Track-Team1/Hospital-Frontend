import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from "./components/Home/Home";
import Patient from "./components/PatientProfile/Patient";
import Reception from "./components/Reception/Reception";
import Cardio from "./components/Department/Cardio";
import DoctorPage from "./Pages/DoctorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctor-panel" element={<DoctorPage />} />
        <Route path="/cardiology" element={<Cardio />} />
        <Route path="/patient/*" element={<Patient />} />
        <Route path="/reception/*" element={<Reception />} />
      </Routes>
    </Router>
  );
}

export default App;
