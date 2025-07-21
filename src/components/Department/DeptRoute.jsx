import React from "react";
import { Routes, Route } from "react-router-dom";
import Cardio from "./Cardio";
import Header from "../Home/Header"; 
import Hepatology from "./Hepatology";

function DeptRoute() {
  return (
    <>
    <Header></Header>
    <Routes>
      <Route path="cardiology" element={<Cardio />} />
        
      <Route path="hepatology" element={<Hepatology />} />

        </Routes>
    </>
  );
}


export default DeptRoute;
