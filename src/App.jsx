import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from "./components/Home/Home";
import Patient from "./components/PatientProfile/Patient"; // now handles sub-routes


import Reception from "./components/Reception/Reception";
<<<<<<< HEAD
import Cardio from "./components/Department/Cardio";

// import Neuro from "./components/Department/Neuro"; 

import Admin from "./components/Admin/Admin";

=======
import DeptRoute from "./components/Department/DeptRoute";
>>>>>>> f5db562675347d832c684b3454fef9cc090f454d

function App() {


return (
<Router>
<Routes>
{/* Homepage */}
<Route path="/" element={<Home />} />
{/* //  <Route path="/cardiology" element={<Cardio />} /> */}
 <Route path="/departments/*" element={<DeptRoute/>} />
    {/* All Patient related routes (e.g., /patient/, /patient/edit-profile) */}
<<<<<<< HEAD
       <Route path="/patient/*" element={<Patient />} />
=======
    <Route path="/patient/*" element={<Patient />} />

>>>>>>> f5db562675347d832c684b3454fef9cc090f454d
       <Route path="/reception/*" element={<Reception/>}></Route>

       {/* Admin Routes*/}
       <Route path="/admin/*" element={<Admin />} />
  </Routes>
</Router>
);


}

export default App;