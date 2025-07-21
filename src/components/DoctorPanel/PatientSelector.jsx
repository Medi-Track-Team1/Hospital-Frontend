import React from 'react';

const patients = [
  { name: 'Alice Johnson', age: 35, gender: 'Female' },
  { name: 'Bob Smith', age: 42, gender: 'Male' },
  { name: 'Carol Davis', age: 28, gender: 'Female' },
];

export default function PatientSelector({ onSelect, selected }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h2 className="text-lg font-semibold text-blue-900 mb-2">🔍 Select Patient</h2>
      <input
        type="text"
        placeholder="Search patient..."
        className="w-full mb-3 px-3 py-2 border rounded"
      />
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {patients.map((p, idx) => (
          <div
            key={idx}
            className={`p-2 border rounded cursor-pointer hover:bg-blue-50 ${
              selected?.name === p.name ? 'bg-blue-100 font-semibold' : ''
            }`}
            onClick={() => onSelect(p)}
          >
            <div className="text-sm">{p.name}</div>
            <div className="text-xs text-gray-600">{p.age}y, {p.gender}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
