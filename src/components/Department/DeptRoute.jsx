import React from "react";
import { Routes, Route } from "react-router-dom";
import Cardio from "./Cardio";
import Header from "../Home/Header"; 
import Hepatology from "./Hepatology";
import Neuro from "./Neuro";

function DeptRoute() {
  return (
    <>
    <Header></Header>
    <Routes>
      <Route path="cardiology" element={<Cardio />} />
      <Route path="neurology" element={<Neuro/>} />
      <Route path="hepatology" element={<Hepatology />} />

        </Routes>
    </>
  );
}


export default DeptRoute;
