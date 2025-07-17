import React from "react";
import { Routes, Route } from "react-router-dom";

import PatientProfile from "./PatientProfile";
import EditProfileModel from "./EditProfileModel";

const Patient = () => {
  return (
    <Routes>
      {/* Correct index route for /patient/ */}
      <Route index element={<PatientProfile />} />

      {/* Route for /patient/edit-profile */}
      <Route path="edit-profile" element={<EditProfileModel />} />
    </Routes>
  );
};

export default Patient;
