import React from "react";
import { Routes, Route } from "react-router-dom";
import Cardio from "./Cardio";
import Header from "../Home/Header"; // Adjust the import path as necessary

function DeptRoute() {
  return (
    <>
    <Header></Header>
    <Routes>
      <Route path="cardiology" element={<Cardio />} />
        </Routes>
    </>
  );
}


export default DeptRoute;
