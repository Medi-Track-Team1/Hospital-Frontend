

import DoctorInfoBar from "../../components/DoctorPanel/DoctorInfoBar";
import DoctorNavbar from "../../components/DoctorPanel/DoctorNavBar";
import { MedicalAppointments } from "../../components/DoctorPanel/MedicalAppointments";

const DoctorPanelPage = () => {
  return<>
  <DoctorNavbar/>
  <DoctorInfoBar
        name="Dr. Sravani"
        qualification="MBBS, MS, MCh (Neurosurgery)"
        imageSrc="/doctor.jpg" // adjust as needed
  />
  <div className="max-w-5xl mx-auto px-4">
  <MedicalAppointments />
  </div>
  </>;
};

export default DoctorPanelPage;
