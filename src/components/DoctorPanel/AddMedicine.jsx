import React, { useState } from 'react';

const medicines = [
  { name: 'Paracetamol 500mg', type: 'Pain Relief', stock: 100 },
  { name: 'Amoxicillin 250mg', type: 'Antibiotic', stock: 50 },
  { name: 'Ibuprofen 400mg', type: 'Anti-inflammatory', stock: 75 },
];

export default function AddMedicine({ onAdd }) {
  const [query, setQuery] = useState('');

  const filtered = medicines.filter((m) =>
    m.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h2 className="text-lg font-semibold text-blue-900 mb-2">🧾 Add Medicines</h2>
      <input
        type="text"
        placeholder="Search medicines..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full mb-3 px-3 py-2 border rounded"
      />
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {filtered.map((m, idx) => (
          <div
            key={idx}
            className="p-2 border rounded flex justify-between items-center"
          >
            <div>
              <div className="font-medium text-sm">{m.name}</div>
              <div className="text-xs text-gray-600">{m.type}</div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Stock: {m.stock}</span>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                onClick={() => onAdd(m)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
