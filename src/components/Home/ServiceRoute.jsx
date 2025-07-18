import React from "react";
import { Routes, Route } from "react-router-dom";

import Cardiology from "./Services/Cardiology";
import PharmacyServices from "./Services/pharmacy";
import PatientCare from "./Services/PatientCare";
import GeneticTesting from "./Services/GeneticTesting";
import Rehabilitation from "./Services/Rehabilitation";
import MedicalRecords from "./Services/MedicalRecords";

const ServiceRoutes = () => {
  return (
    <Routes>
      <Route path="/cardiology" element={<Cardiology />} />
      <Route path="/pharmacy" element={<PharmacyServices />} />
      <Route path="/patient-care" element={<PatientCare />} />
      <Route path="/genetic-testing" element={<GeneticTesting />} />
      <Route path="/rehabilitation" element={<Rehabilitation />} />
      <Route path="/medical-records" element={<MedicalRecords />} />
    </Routes>
  );
};

export default ServiceRoutes;
