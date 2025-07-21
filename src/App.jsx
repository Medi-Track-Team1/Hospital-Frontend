import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// import Home from "./components/Home/Home";
import HomeRoutes from "./components/Home/HomeRoutes";
import Patient from "./components/PatientProfile/Patient"; // now handles sub-routes


import Reception from "./components/Reception/Reception";



// import Neuro from "./components/Department/Neuro"; 

import Admin from "./components/Admin/Admin";

import DeptRoute from "./components/Department/DeptRoute";
import DoctorPanelPage from "./Pages/DoctorPanel/DoctorPanelPage";


function App() {


return (
<Router>
<Routes>
{/* Homepage */}
{/* <Route path="/*" element={<Home />} /> */}
 <Route path="/*" element={<HomeRoutes />} />
 <Route path="/doctor-panel" element={<DoctorPanelPage/>}/>
     
{/* //  <Route path="/cardiology" element={<Cardio />} /> */}
 <Route path="/departments/*" element={<DeptRoute/>} />
    {/* All Patient related routes (e.g., /patient/, /patient/edit-profile) */}

    <Route path="/patient/*" element={<Patient />} />
       <Route path="/reception/*" element={<Reception/>}></Route>

       {/* Admin Routes*/}
       <Route path="/admin/*" element={<Admin />} />
  </Routes>
</Router>
);


}

export default App;