import React, { useState } from "react";

const availableMeds = [
  { name: "Paracetamol", type: "Tablet" },
  { name: "Amoxicillin", type: "Capsule" },
  { name: "Cough Syrup", type: "Syrup" },
  { name: "Ibuprofen", type: "Tablet" },
  { name: "Cetirizine", type: "Tablet" },
];

const PrescribePage = () => {
  const [selectedMeds, setSelectedMeds] = useState([]);
  const [injections, setInjections] = useState([]);
  const [foodPrescription, setFoodPrescription] = useState("");
  const [recommendedTests, setRecommendedTests] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddMedicine = (med) => {
    if (!selectedMeds.find((m) => m.name === med.name)) {
      setSelectedMeds([
        ...selectedMeds,
        { ...med, dosage: "", timing: [], duration: "" },
      ]);
    }
    setSearchTerm(""); // Clear input
  };

  const handleManualAdd = () => {
    const trimmed = searchTerm.trim();
    if (trimmed && !selectedMeds.find((m) => m.name === trimmed)) {
      handleAddMedicine({ name: trimmed, type: "Custom" });
    }
  };

  const handleMedicineChange = (index, field, value) => {
    const updated = [...selectedMeds];
    updated[index][field] = value;
    setSelectedMeds(updated);
  };

  const handleAddInjection = () => {
    setInjections([...injections, { name: "", dosage: "", schedule: "", notes: "" }]);
  };

  const handleInjectionChange = (index, field, value) => {
    const updated = [...injections];
    updated[index][field] = value;
    setInjections(updated);
  };

  const handleSave = () => {
    const data = {
      medicines: selectedMeds,
      injections,
      foodPrescription,
      recommendedTests,
    };
    console.log("Prescription Saved:", data);
    alert("Prescription Saved Successfully!");
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredMeds = availableMeds.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-3xl mx-auto font-roboto text-black">
      <h2 className="text-2xl mb-4">Prescribe Medicines</h2>

      {/* Search & Select Medicines */}
      <div className="mb-4">
        <h3 className="text-lg mb-2">Search & Add Medicines</h3>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            placeholder="Search medicine..."
            className="w-full px-3 py-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleManualAdd}
            className="bg-[#2563eb] text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        {/* Suggestions */}
        {searchTerm && filteredMeds.length > 0 && (
          <ul className="bg-white border rounded shadow-sm max-h-40 overflow-y-auto">
            {filteredMeds.map((med, idx) => (
              <li
                key={idx}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                onClick={() => handleAddMedicine(med)}
              >
                {med.name} ({med.type})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected Medicines */}
      {selectedMeds.map((med, index) => (
        <div key={index} className="border rounded p-3 mb-4 bg-gray-50">
          <h4 className="text-[#2563eb] mb-1">{med.name}</h4>
          <p className="text-sm text-gray-600 mb-2">{med.type}</p>

          <label className="block text-sm mb-1">Dosage</label>
          <input
            type="text"
            value={med.dosage}
            onChange={(e) => handleMedicineChange(index, "dosage", e.target.value)}
            placeholder="e.g. 1 tablet or 5ml"
            className="w-full px-3 py-2 mb-3 border rounded"
          />

          <label className="block text-sm mb-1">Timing</label>
          <div className="flex space-x-3 mb-3">
            {["Morning", "Afternoon", "Night"].map((time) => (
              <label key={time} className="flex items-center space-x-1 text-sm">
                <input
                  type="checkbox"
                  checked={med.timing.includes(time)}
                  onChange={(e) => {
                    const newTiming = e.target.checked
                      ? [...med.timing, time]
                      : med.timing.filter((t) => t !== time);
                    handleMedicineChange(index, "timing", newTiming);
                  }}
                />
                <span>{time}</span>
              </label>
            ))}
          </div>

          <label className="block text-sm mb-1">Duration (days)</label>
          <input
            type="number"
            value={med.duration}
            onChange={(e) => handleMedicineChange(index, "duration", e.target.value)}
            placeholder="e.g. 5"
            className="w-full px-3 py-2 mb-2 border rounded"
          />
        </div>
      ))}

      {/* Injections */}
      <div className="mb-6">
        <h3 className="text-lg mb-2">Add Injections</h3>
        <button
          onClick={handleAddInjection}
          className="bg-[#2563eb] text-white px-4 py-2 rounded hover:bg-blue-700 mb-3"
        >
          + Add Injection
        </button>
        {injections.map((inj, index) => (
          <div key={index} className="border rounded p-3 mt-3 bg-gray-50">
            <input
              type="text"
              placeholder="Injection Name"
              value={inj.name}
              onChange={(e) => handleInjectionChange(index, "name", e.target.value)}
              className="w-full px-3 py-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Dosage (e.g. 2ml)"
              value={inj.dosage}
              onChange={(e) => handleInjectionChange(index, "dosage", e.target.value)}
              className="w-full px-3 py-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Schedule (e.g. Daily for 3 days)"
              value={inj.schedule}
              onChange={(e) => handleInjectionChange(index, "schedule", e.target.value)}
              className="w-full px-3 py-2 mb-2 border rounded"
            />
            <textarea
              placeholder="Additional Notes"
              value={inj.notes}
              onChange={(e) => handleInjectionChange(index, "notes", e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        ))}
      </div>

      {/* Food Prescription */}
      <div className="mb-6">
        <h3 className="text-lg mb-2">Food Prescription (Diet Plan)</h3>
        <textarea
          rows="3"
          className="w-full px-3 py-2 border rounded"
          value={foodPrescription}
          onChange={(e) => setFoodPrescription(e.target.value)}
          placeholder="Suggest a diet plan, e.g., Avoid spicy foods, Eat high-protein diet, etc."
        ></textarea>
      </div>

      {/* Tests to be Taken */}
      <div className="mb-6">
        <h3 className="text-lg mb-2">Tests to be Taken</h3>
        <textarea
          rows="2"
          className="w-full px-3 py-2 border rounded"
          value={recommendedTests}
          onChange={(e) => setRecommendedTests(e.target.value)}
          placeholder="e.g., Blood test, ECG, Chest X-Ray, etc."
        ></textarea>
      </div>

      {/* Actions */}
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="bg-[#2563eb] text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Prescription
        </button>
        <button
          onClick={handlePrint}
          className="border border-[#2563eb] text-[#2563eb] px-6 py-2 rounded hover:bg-blue-50"
        >
          Print / Export PDF
        </button>
      </div>
    </div>
  );
};

export default PrescribePage;
