import React, { useState } from "react";
import { FileText } from "lucide-react";

// Exporting mockPrescriptions so other files can import it
export const mockPrescriptions = [
  {
    id: 1,
    date: "2023-07-20",
    time: "14:00",
    diagnosis: "Diabetes",
    medications: [{ name: "Metformin" }, { name: "Insulin" }],
    status: "completed",
    doctor: {
      name: "Dr. Smith",
      department: "Endocrinology",
    },
  },
  {
    id: 2,
    date: "2023-08-10",
    time: "09:30",
    diagnosis: "Hypertension",
    medications: [{ name: "Amlodipine" }],
    status: "ongoing",
    doctor: {
      name: "Dr. John",
      department: "Cardiology",
    },
  },
];

// Exporting the modal component for use in other files
export const PrescriptionModal = ({ prescription, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">Prescription Details</h2>
        <p>
          <strong>Date:</strong> {prescription.date}
        </p>
        <p>
          <strong>Time:</strong> {prescription.time}
        </p>
        <p>
          <strong>Diagnosis:</strong> {prescription.diagnosis}
        </p>
        <p>
          <strong>Doctor:</strong> {prescription.doctor.name}
        </p>
        <p>
          <strong>Department:</strong> {prescription.doctor.department}
        </p>
        <p className="mt-2 font-medium">Medications:</p>
        <ul className="list-disc list-inside">
          {prescription.medications.map((med, idx) => (
            <li key={idx}>{med.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const PatientHistory = () => {
  const [prescriptions] = useState(mockPrescriptions);

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <FileText /> Prescription History
      </h2>
      <ul className="divide-y">
        {prescriptions.map((prescription) => (
          <li key={prescription.id} className="py-2">
            <div className="flex justify-between">
              <span>{prescription.diagnosis}</span>
              <span className="text-sm text-gray-500">
                {prescription.date} at {prescription.time}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientHistory;
