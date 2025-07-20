import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Cardiology from "./Cardiology";
import Pharmacy from "./pharmacy";
import PatientCare from "./PatientCare";
import GeneticTesting from "./GeneticTesting";
import Rehabilitation from "./Rehabilitation";
import MedicalRecords from "./MedicalRecords";

const HomeRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="cardiology" element={<Cardiology />} />
      <Route path="pharmacy" element={<Pharmacy />} />
      <Route path="patient-care" element={<PatientCare />} />
      <Route path="genetic-testing" element={<GeneticTesting />} />
      <Route path="rehabilitation" element={<Rehabilitation />} />
      <Route path="medical-records" element={<MedicalRecords />} />
    </Routes>
  );
};

export default HomeRoutes;
