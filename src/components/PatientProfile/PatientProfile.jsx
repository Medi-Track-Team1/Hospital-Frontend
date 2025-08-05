import React, { useState, useEffect } from "react";
import EditProfileModal from "./EditProfileModel";
import Header from "../Home/Header";
import { useNavigate, useParams } from "react-router-dom";
import {
  User,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Heart,
  History,
  Users,
  Edit,
  Clock,
  X,
  RefreshCw,
  MoreVertical,
  Stethoscope,
  UserCheck,
} from "lucide-react";

const PatientProfile = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();
    // const patientId = localStorage.getItem("currentUser").userid; 

  const [patientData, setPatientData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const [upcomingAppointments, setUpcomingAppointments] = useState([
    {
      id: 1,
      date: "Jan 15, 2025",
      time: "10:30 AM",
      provider: "Dr. Johnson",
      department: "Endocrinology",
      type: "Follow-up",
      status: "Confirmed",
    },
    {
      id: 2,
      date: "Feb 2, 2025",
      time: "2:15 PM",
      provider: "Dr. Wilson",
      department: "Primary Care",
      type: "Routine Check-up",
      status: "Pending",
    },
    {
      id: 3,
      date: "Feb 10, 2025",
      time: "9:00 AM",
      provider: "Dr. Smith",
      department: "Cardiology",
      type: "Consultation",
      status: "Pending",
    },
  ]);

  useEffect(() => {
    if (!patientId) return;
    fetch(`https://patient-service-ntk0.onrender.com/api/patient/${patientId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (data.success && data.data) {
          setPatientData(data.data);
        } else {
          alert(data.message || "Patient not found");
        }
      })
      .catch((error) => {
        alert(`Error fetching patient data: ${error.message}`);
      });
  }, [patientId]);

  const formatAddress = (address) => {
    if (!address) return "";
    const parts = [];
    if (address.street) parts.push(address.street);
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.zipCode) parts.push(address.zipCode);
    return parts.join(", ");
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "active":
        return "text-blue-600 bg-blue-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "confirmed":
        return "text-green-600 bg-green-100";
      case "scheduled":
        return "text-blue-600 bg-blue-100";
      case "rescheduled":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const emergencyContacts = patientData?.emergencyContacts?.length
    ? patientData.emergencyContacts
    : [
        {
          name: "Emergency Contact",
          relationship: "N/A",
          phone: "N/A",
          email: "",
          address: "",
        },
      ];

  const handleSaveProfile = (updatedData) => {
    setPatientData((prev) => ({ ...prev, ...updatedData }));
    setShowEditModal(false);
  };

  const handleRescheduleAppointment = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowRescheduleModal(true);
  };

  const handleConfirmReschedule = (appointmentId, newDate, newTime) => {
    setUpcomingAppointments((prev) =>
      prev.map((a) =>
        a.id === appointmentId
          ? { ...a, date: newDate, time: newTime, status: "Rescheduled" }
          : a
      )
    );
    setShowRescheduleModal(false);
    setSelectedAppointmentId(null);
  };

  const handleCancelAppointment = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = (appointmentId, reason) => {
    setUpcomingAppointments((prev) =>
      prev.filter((a) => a.id !== appointmentId)
    );
    setShowCancelModal(false);
    setSelectedAppointmentId(null);
    console.log("Appointment cancelled with reason:", reason);
  };

  if (!patientData) {
    return (
      <div className="min-h-screen font-sans">
        <Header />
        <div className="flex items-center justify-center mt-40">
          <p className="text-lg font-medium text-gray-600">
            Loading patient data...
          </p>
        </div>
      </div>
    );
  }

  const {
    patientName = "",
    age = "",
    gender = "",
    dateOfBirth = "",
    patientId: id = patientId,
    contactNumber = "",
    patientEmail = "",
    bloodGroup = "",
    maritalStatus = "",
    city = "",
    state = "",
    zipCode = "",
    address = "",
  } = patientData;

  const addressObj = { street: address, city, state, zipCode };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <div className="pt-20 px-4 sm:px-8 lg:px-12 space-y-8">
        <div className="bg-white p-6 rounded-xl shadow border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
              <div className="text-sm text-gray-600 mt-1">
                <span>{patientName}</span>
                <span className="mx-2">•</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {id}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/patient/history")}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg shadow"
              >
                <History className="inline-block w-4 h-4 mr-2" />
                Medical History
              </button>
              <button
                onClick={() => setShowEditModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow"
              >
                <Edit className="inline-block w-4 h-4 mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <div className="flex gap-6 items-center">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              <User className="w-12 h-12" />
            </div>
            <div className="text-gray-800 space-y-1">
              <p>
                <strong>Patient ID:</strong> {id}
              </p>
              <p>
                <strong>DOB:</strong>{" "}
                {new Date(dateOfBirth).toLocaleDateString()} ({age} years old)
              </p>
              <p>
                <strong>Gender:</strong> {gender}
              </p>
              <p>
                <strong>Blood Group:</strong>{" "}
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded-lg">
                  {bloodGroup}
                </span>
              </p>
              <p>
                <strong>Phone:</strong> {contactNumber}
              </p>
              <p>
                <strong>Email:</strong> {patientEmail}
              </p>
              <p>
                <strong>Address:</strong> {formatAddress(addressObj)}
              </p>
              <p>
                <strong>Marital Status:</strong> {maritalStatus || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="text-cyan-600" /> Emergency Contacts
          </h2>
          {emergencyContacts.map((contact, i) => (
            <div key={i} className="p-4 border rounded-lg mb-4">
              <h3 className="text-lg font-bold">{contact.name}</h3>
              <p>
                <strong>Relationship:</strong> {contact.relationship}
              </p>
              <p>
                <strong>Phone:</strong> {contact.phone}
              </p>
              {contact.email && (
                <p>
                  <strong>Email:</strong> {contact.email}
                </p>
              )}
              {contact.address && (
                <p>
                  <strong>Address:</strong> {contact.address}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <EditProfileModal
        patient={patientData}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default PatientProfile;
