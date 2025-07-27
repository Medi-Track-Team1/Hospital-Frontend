import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PatientProfile from "./PatientProfile";
import EditProfileModel from "./EditProfileModel";
import PatientHistory from "./PatientHistory"; // ✅ default import

const Patient = () => {
  return (
    <Routes>
      <Route index element={<PatientProfile />} />
      <Route path="edit-profile" element={<EditProfileModel />} />
      <Route path="history" element={<PatientHistory />} />
    </Routes>
  );
};

export default Patient;
