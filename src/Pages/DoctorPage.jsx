
import DoctorInfoBar from "../components/DoctorPanel/DoctorInfoBar";
import DoctorNavbar from "../components/DoctorPanel/DoctorNavBar";
import { MedicalAppointments } from "../components/DoctorPanel/MedicalAppointments";


const DoctorPage = () => {
  return<>
  <DoctorNavbar/>
  <DoctorInfoBar
        name="Dr. Sravani"
        qualification="MBBS, MS, MCh (Neurosurgery)"
        imageSrc="/doctor.jpg"
  />
  <div className="max-w-5xl mx-auto px-4">
  <MedicalAppointments />
  </div>
  </>;
};

export default DoctorPage;
