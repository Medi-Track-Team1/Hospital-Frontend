import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const AppointModal = ({ doctor, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    specialty:"",
    doctor: "",
    date: "",
    time: "",
    emergency: false,
    reason: "",
    notes: "",
  });

  // Prefill doctor and specialty when the component mounts or doctor prop changes
  useEffect(() => {
    if (doctor) {
      setForm((prevForm) => ({
        ...prevForm,
        doctor: doctor.name || "",
        specialty: doctor.specialty || "",
      }));
    }
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", form);
  };

  if (!doctor) return null; // Prevent rendering if doctor info is not provided

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Appointment with {doctor.name}</h2>
          <button onClick={onClose}><X className="w-6 h-6" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Information */}
          <div className="bg-blue-100 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-4">👤 Patient Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <input name="name" required placeholder="Enter patient full name" value={form.name} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg" />
              <input name="age" required placeholder="Enter age" value={form.age} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg"  />
              <input name="phone" required placeholder="+91 " value={form.phone} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg" />
              <input name="email" required type="email" placeholder="patient@email.com" value={form.email} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg" />
            </div>
          </div>

          {/* Appointment Details */}
          <div className="bg-blue-100 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-4">📅 Doctor Appointment Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <input
                type="text"
                value={form.doctor}
                readOnly
                className="w-full border px-4 py-2 rounded-lg"
                placeholder="Doctor"
              />
              <input
                type="text"
                value={form.specialty}
                readOnly
                className="w-full border px-4 py-2 rounded-lg"
                placeholder="specialty"
              />
              <input
                type="date"
                name="date"
                required
                value={form.date}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg"
              />
              <input
                type="time"
                name="time"
                required
                value={form.time}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg"
              />
            </div>
            <div className="mt-4">
              <label className="inline-flex items-center">
                <input type="checkbox" name="emergency" checked={form.emergency} onChange={handleChange} className="mr-2" />
                Mark as Emergency Appointment
              </label>
            </div>
          </div>

          {/* Medical Info */}
          <div className="bg-blue-100 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-4">❤️ Medical Information</h3>
            <textarea
              name="reason"
              required
              value={form.reason}
              onChange={handleChange}
              placeholder="Describe the symptoms or reason for the appointment..."
              className="w-full h-24 border border-blue-300 rounded-md p-3 text-left align-top resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p>Additional Notes</p>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any additional notes or special requirements..."
              className="w-full h-20 border border-blue-300 rounded-md p-3 text-left align-top resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-blue-200 rounded-md hover:bg-blue-300">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointModal;
