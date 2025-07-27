import React, { useState } from "react";
import { X } from "lucide-react";

const AppointmentModal = ({ doctor, onClose }) => {
  const [patientType, setPatientType] = useState("");

  if (!doctor) return null;

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8 relative overflow-y-auto max-h-[90vh]">
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

          {/* Date & Time input combined */}
          <input
            type="datetime-local"
            name="preferredDateTime"
            required
            min={`${today}T00:00`}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />

          <textarea
            placeholder="Other Details"
            className="w-full border px-4 py-2 rounded-lg"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
