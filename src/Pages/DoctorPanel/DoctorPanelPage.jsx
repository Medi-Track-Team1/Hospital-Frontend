

import DoctorInfoBar from "../../components/DoctorPanel/DoctorInfoBar";
import DoctorNavbar from "../../components/DoctorPanel/DoctorNavBar";
import { MedicalAppointments } from "../../components/DoctorPanel/MedicalAppointments";

const DoctorPanelPage = () => {
  return<>
  <DoctorNavbar/>
<div className="flex justify-center pt-6">
  <h1 className="text-2xl font-extrabold tracking-tight font-serif text-black-600">
    Doctor Panel
  </h1>
</div>



  <div className="max-w-5xl mx-auto px-4">
  <DoctorInfoBar
        name="Dr. Sravani"
        qualification="MBBS, MS, MCh (Neurosurgery)"
        imageSrc="/doctor.jpg" // adjust as needed
  />
  <MedicalAppointments />
  </div>
  </>;
};

export default DoctorPanelPage;
