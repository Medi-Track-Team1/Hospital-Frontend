import React from 'react';

export default function PrescriptionDetails({
  diagnosis,
  setDiagnosis,
  prescriptionDate,
  setPrescriptionDate,
  followUpDate,
  setFollowUpDate,
  onSave
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">📋 Prescription Details</h3>
      <textarea
        className="textarea textarea-bordered w-full mb-2"
        placeholder="Enter diagnosis..."
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
      />
      <label className="block text-sm font-medium text-gray-700 mb-1">Prescription Date</label>
      <input
        type="date"
        className="input input-bordered w-full mb-2"
        value={prescriptionDate}
        onChange={(e) => setPrescriptionDate(e.target.value)}
      />
      <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date</label>
      <input
        type="date"
        className="input input-bordered w-full mb-4"
        value={followUpDate}
        onChange={(e) => setFollowUpDate(e.target.value)}
      />
      <button onClick={onSave} className="bg-blue-500 text-white w-full py-2 rounded-lg font-semibold">
        💾 Save Prescription
      </button>
    </div>
  );
}
