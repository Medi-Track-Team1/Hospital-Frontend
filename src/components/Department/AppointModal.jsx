import React, { useState } from "react";
import { X } from "lucide-react";

const AppointmentModal = ({ doctor, onClose }) => {
  const [patientType, setPatientType] = useState("");

  if (!doctor) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
          onClick={onClose}
        >
          <X />
        </button>

        <h2 className="text-xl font-bold text-center text-blue-700 mb-6">
          Appointment with {doctor.name}
        </h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Patient Name"
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email id"
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
          <input
            type="tel"
            placeholder="Mobile"
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="Specialty"
            value={doctor.specialty}
            readOnly
            className="w-full border px-4 py-2 rounded-lg bg-gray-100"
          />
          <input
            type="text"
            placeholder="Doctor Name"
            value={doctor.name}
            readOnly
            className="w-full border px-4 py-2 rounded-lg bg-gray-100"
          />

          <div className="flex items-center justify-between px-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="patientType"
                value="New Patient"
                onChange={(e) => setPatientType(e.target.value)}
              />
              <span>New Patient</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="patientType"
                value="Review Patient"
                onChange={(e) => setPatientType(e.target.value)}
              />
              <span>Review Patient</span>
            </label>
          </div>

          <input
            type="date"
            placeholder="Preferred date"
            required
            className="w-full border px-4 py-2 rounded-lg"
          />

          <textarea
            placeholder="Other Details"
            className="w-full border px-4 py-2 rounded-lg"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
