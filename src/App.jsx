import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Patient from "./components/PatientProfile/Patient"; // now handles sub-routes

function App() {
return (
<Router>
<Routes>
{/* Homepage */}
<Route path="/" element={<Home />} />


    {/* All Patient related routes (e.g., /patient/, /patient/edit-profile) */}
    <Route path="/patient/*" element={<Patient />} />
  </Routes>
</Router>
);
}

export default App;