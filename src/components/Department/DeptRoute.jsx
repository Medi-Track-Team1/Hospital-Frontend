import React from "react";
import { Routes, Route } from "react-router-dom";
import Cardio from "./Cardio";
import Header from "../Home/Header"; 
// import Hepatology from "./Hepatology";
 import Eyecare from "./EyeCare";
// import Fertility from "./Fertility";
// import Psychology from "./Psychology";
// import Pediatrics from "./Pediatrics";
// import Neuro from "./Neuro";
import Dental from "./Dental";
import AppointmentPage from "./AppointmentPage";

function DeptRoute() {

  return (
    <>
    <Header></Header>
    <Routes>
      <Route path="cardiology" element={<Cardio />} />
{/* 
      <Route path="fertility" element={<Fertility />} />
        <Route path="psychology" element={<Psychology />} />
       <Route path="Eyecare" element={<Eyecare/>} />
       <Route path="neurology" element={<Neuro/>} />
       <Route path="Pediatrics" element={<Pediatrics/>} />
        <Route path="dental" element={<Dental/>} />
       <Route path="hepatology" element={<Hepatology />} /> */}
       <Route path="appointment" element={<AppointmentPage />} />
        <Route path="dental" element={<Dental/>} />
 <Route path="Eyecare" element={<Eyecare/>} />

        </Routes>
    </>
  );
}


export default DeptRoute;
