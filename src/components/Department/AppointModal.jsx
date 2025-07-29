import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const AppointModal = ({ doctor, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    specialty: "",
    doctor: "",
    date: "",
    time: "",
    emergency: false,
    reason: "",
    notes: "",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

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
    if (name === "phone") {
      // Only allow numeric input
      const numericValue = value.replace(/\D/g, "");
      setForm({ ...form, phone: numericValue });
    } else {
      setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true); // Show confirmation popup
  };

  const handleConfirmClose = () => {
    setShowConfirmation(false);
    onClose();
  };

  if (!doctor) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[95%] sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* Fixed Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-white sticky top-0 z-10">
          <h2 className="text-2xl font-semibold">Appointment with {doctor.name}</h2>
          <button onClick={onClose}><X className="w-6 h-6" /></button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6">
          {/* Patient Info */}
          <div className="bg-blue-100 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-4">👤 Patient Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <input name="name" required placeholder="Enter patient full name" value={form.name} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg" />
              <input name="age" required placeholder="Enter age" value={form.age} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg" />
<input
  name="phone"
  required
  type="tel"
  placeholder="+91"
  value={form.phone}
  onChange={(e) => {
    const numeric = e.target.value.replace(/\D/g, ""); // Remove non-numeric chars
    setForm({ ...form, phone: numeric });
  }}
  pattern="[0-9]{10}"
  maxLength={10}
  className="w-full border px-4 py-2 rounded-lg"
/>
              <input name="email" required type="email" placeholder="patient@email.com" value={form.email} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg" />
            </div>
          </div>

          {/* Appointment Details */}
          <div className="bg-blue-100 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-4">📅 Doctor Appointment Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <input type="text" value={form.doctor} readOnly className="w-full border px-4 py-2 rounded-lg" />
              <input type="text" value={form.specialty} readOnly className="w-full border px-4 py-2 rounded-lg" />
              <input type="date" name="date" required value={form.date} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg" />
              <input type="time" name="time" required value={form.time} onChange={handleChange} className="w-full border px-4 py-2 rounded-lg" />
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
              className="w-full h-24 border border-blue-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-3">Additional Notes</p>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any additional notes or special requirements..."
              className="w-full h-20 border border-blue-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
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

      {/* ✅ Confirmation Popup */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md text-center">
            <h3 className="text-xl font-bold mb-4 text-green-700">✅ Mail will be sent shortly!,</h3>
            <p className="mb-2"><strong>Patient:</strong> {form.name}</p>
            <p className="mb-2"><strong>Doctor:</strong> {form.doctor}</p>
            <p className="mb-2"><strong>Department:</strong> {form.specialty}</p>
            <p className="mb-4"><strong>Time:</strong> {form.date} at {form.time}</p>
            <button onClick={handleConfirmClose} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointModal;
