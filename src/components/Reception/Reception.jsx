import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Reception-Header";
import Registration from "../../Pages/Reception/Registration";
import Management from "../../Pages/Reception/Management";
import Appointment from "../../Pages/Reception/Appointment";
import Billing from "../../Pages/Reception/Billing";
import History from "../../Pages/Reception/History";
// import Usage from "../../Pages/Reception/Usage";

export default function Reception() {
  return (
    <>
      {/* Always show Header */}
      <Header onDrawerToggle={() => {}} />

      {/* All child routes are rendered here */}
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="registration" element={<Registration />} />
          <Route path="management" element={<Management />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="generate-bill" element={<Billing />} />
          <Route path="bill-history" element={<History/>} />
          {/* <Route path="/reception/history" element={<History/>}></Route> */}

          {/* Optional: Default fallback page */}
          {/* <Route path="*" element={<div>Not Found</div>} /> */}
        </Routes>
      </main>
    </>
  );
}
