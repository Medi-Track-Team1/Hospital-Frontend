import React from "react";
import { Routes, Route } from "react-router-dom";

import PatientProfile from "./PatientProfile";
import EditProfileModel from "./EditProfileModel";
import { PatientHistory } from "./PatientHistory";
//import PatientHistory from "./PatientHistory";

const Patient = () => {
  return (
    <Routes>
      <Route index element={<PatientProfile />} />
      <Route path="edit-profile" element={<EditProfileModel />} />
      <Route path="history" element={<PatientHistory />} /> ✅ Route fixed
    </Routes>
  );
};

export default Patient;
