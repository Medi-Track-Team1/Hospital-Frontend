// AppointmentPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AppointmentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;

  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    specialty: "",
    doctor: "",
    doctorId: "",
    date: "",
    time: "",
    emergency: false,
    reason: "",
    notes: "",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (doctor) {
      console.log("Doctor from location:", doctor);
      localStorage.setItem("selectedDoctor", JSON.stringify(doctor));
      setForm((prev) => ({
        ...prev,
        doctor: doctor.name || doctor.doctorName || "",
        specialty: doctor.specialty || "",
        doctorId: doctor.doctorId || "",
      }));
    } else {
      const storedDoctor = JSON.parse(localStorage.getItem("selectedDoctor"));
      if (storedDoctor) {
        setForm((prev) => ({
          ...prev,
          doctor: storedDoctor.name || storedDoctor.doctorName || "",
          specialty: storedDoctor.specialty || "",
          doctorId: storedDoctor.doctorId || "",
        }));
      }
    }
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      setForm({ ...form, phone: numericValue });
    } else if (name === "age") {
      const numericValue = value.replace(/\D/g, "").slice(0, 3);
      setForm({ ...form, age: numericValue });
    } else {
      setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.date || !form.time || !form.reason || !form.doctorId) {
      toast.error("Please fill in all required fields.", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }
localStorage.setItem('pat','PAT-1002')
    const appointmentDateTime = `${form.date}T${form.time}`;
    const patientId = localStorage.getItem("pat");

    if (!patientId) {
      toast.error("Patient not logged in. Please login again.", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    const appointmentData = {
      patientId: patientId,
      doctorId: form.doctorId,
      patientName: form.name,
      department: form.specialty,
      patientEmail: form.email,
      appointmentDateTime,
      duration: 30, // default or fixed duration in minutes
      reason: form.reason,
      symptoms: form.reason,
      additionalNotes: form.notes,
      emergency: form.emergency
    };

    console.log("Submitting appointment data:", appointmentData);

    try {
      setIsSubmitting(true);
      const response = await axios.post("https://appointment-backend.onrender.com/api/appointments", appointmentData);

      if (response.status === 201 || response.status === 200) {
        toast.success("Appointment booked successfully!", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
        setShowConfirmation(true);
      } else {
        throw new Error("Unexpected server response");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error(
        error.response?.data?.message || "Failed to book appointment. Please try again later.",
        {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmClose = () => {
    localStorage.removeItem("selectedDoctor");
    setShowConfirmation(false);
    navigate("/departments/appointment");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-6 mt-12">
      <div className="bg-white max-w-5xl mx-auto shadow-xl rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold pb-4">
          Appointment with {form.doctor || "Doctor"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-blue-100 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-4">👤 Patient Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <input name="name" required placeholder="Full name" value={form.name} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg" />
              <input name="age" required type="text" inputMode="numeric" maxLength={3} placeholder="Age" value={form.age} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg" />
              <input name="phone" required type="tel" placeholder="+91" value={form.phone} onChange={handleChange} maxLength={10} pattern="[0-9]{10}" className="w-full border px-4 py-2 rounded-lg" />
              <input name="email" required type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg" />
            </div>
          </div>

          <div className="bg-blue-100 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-4">Doctor Appointment Details – <span className="text-blue-600 font-normal">{new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span></h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <input type="text" value={form.doctor} readOnly className="w-full border px-4 py-2 rounded-lg" />
              <input type="text" value={form.specialty} readOnly className="w-full border px-4 py-2 rounded-lg" />
              <input type="text" value={form.doctorId} readOnly className="w-full border px-4 py-2 rounded-lg" />
              <input type="date" name="date" value={form.date} onChange={handleChange} min={new Date().toISOString().split("T")[0]} className="w-full border px-4 py-2 rounded-lg" />
              <input type="time" name="time" required value={form.time} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg" />
            </div>
            <div className="mt-4">
              <label className="inline-flex items-center">
                <input type="checkbox" name="emergency" checked={form.emergency} onChange={handleChange} className="mr-2" />
                Mark as Emergency Appointment
              </label>
            </div>
          </div>

          <div className="bg-blue-100 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-4">❤️ Medical Information</h3>
            <textarea name="reason" required value={form.reason} onChange={handleChange} placeholder="Describe the symptoms or reason for the appointment..." className="w-full h-24 border border-blue-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <p className="mt-3">Additional Notes</p>
            <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Any additional notes or special requirements..." className="w-full h-20 border border-blue-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2" />
          </div>

          <div className="flex justify-end space-x-3">
            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-blue-200 rounded-md hover:bg-blue-300">Cancel</button>
            <button type="submit" disabled={isSubmitting} className={`px-4 py-2 text-white rounded-md ${isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}>{isSubmitting ? "Booking..." : "Book Appointment"}</button>
          </div>
        </form>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md text-center">
            <h3 className="text-xl font-bold mb-4 text-green-700">✅ Mail will be sent shortly!</h3>
            <p className="mb-2"><strong>Patient:</strong> {form.name}</p>
            <p className="mb-2"><strong>Doctor:</strong> {form.doctor}</p>
            <p className="mb-2"><strong>Department:</strong> {form.specialty}</p>
            <p className="mb-4"><strong>Time:</strong> {form.date} at {form.time}</p>
            <button onClick={handleConfirmClose} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Close</button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AppointmentPage;