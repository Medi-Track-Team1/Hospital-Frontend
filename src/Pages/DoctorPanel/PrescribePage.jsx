import React, { useState } from "react";

const availableMeds = [
  { name: "Paracetamol", type: "Tablet", dosage: "500mg" },
  { name: "Amoxicillin", type: "Capsule", dosage: "250mg" },
  { name: "Ibuprofen", type: "Syrup", dosage: "100mg/5ml" },
  { name: "Loratadine", type: "Injection", dosage: "10mg/ml" },
  { name: "Omeprazole", type: "Tablet", dosage: "20mg" }
];

const availableInjections = [
  { name: "Insulin", dosage: "100 units/ml" },
  { name: "Vitamin B12", dosage: "1000mcg/ml" },
  { name: "Morphine", dosage: "10mg/ml" },
  { name: "Diclofenac", dosage: "25mg/ml" },
  { name: "Dexamethasone", dosage: "4mg/ml" },
  { name: "Adrenaline", dosage: "1mg/ml" },
  { name: "Furosemide", dosage: "10mg/ml" }
];

const testOptions = [
  "Blood Test",
  "ECG",
  "Chest X-Ray",
  "Urine Test",
  "MRI Scan",
  "CT Scan",
];

const PrescriptionForm = () => {
  const [search, setSearch] = useState("");
  const [selectedMeds, setSelectedMeds] = useState([]);
  const [injections, setInjections] = useState([]);
  const [injectionSearch, setInjectionSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showInjectionSuggestions, setShowInjectionSuggestions] = useState(false);
  const [foodPlan, setFoodPlan] = useState("");
  const [tests, setTests] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "" });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3000);
  };

  const handleSavePrescription = () => {
    // Here you can add logic to save the prescription data
    // For now, we'll just show the toast message
    showToast("Prescription saved successfully!");
  };

  const filteredSuggestions = availableMeds.filter((med) =>
    med.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  const filteredInjectionSuggestions = availableInjections.filter((inj) =>
    inj.name.toLowerCase().includes(injectionSearch.trim().toLowerCase())
  );

  const handleAddMedicine = (med) => {
    const exists = selectedMeds.find(
      (m) => m.name.toLowerCase() === med.name.toLowerCase()
    );
    if (!exists) {
      setSelectedMeds([
        ...selectedMeds,
        { ...med, timing: [], duration: "", quantity: "" },
      ]);
    }
    setSearch("");
    setShowSuggestions(false);
  };

  const handleAddInjectionFromSearch = (injection) => {
    setInjections([
      ...injections,
      { 
        name: injection.name, 
        dosage: injection.dosage, 
        schedule: "", 
        notes: "",
        quantity: ""
      },
    ]);
    setInjectionSearch("");
    setShowInjectionSuggestions(false);
  };

  const handleRemoveMedicine = (indexToRemove) => {
    const updated = selectedMeds.filter((_, idx) => idx !== indexToRemove);
    setSelectedMeds(updated);
  };

  const handleRemoveInjection = (indexToRemove) => {
    const updated = injections.filter((_, idx) => idx !== indexToRemove);
    setInjections(updated);
  };

  const handleTimingChange = (index, time) => {
    const updated = [...selectedMeds];
    const current = updated[index].timing;
    if (current.includes(time)) {
      updated[index].timing = current.filter((t) => t !== time);
    } else {
      updated[index].timing.push(time);
    }
    setSelectedMeds(updated);
  };

  const updateMedField = (index, field, value) => {
    const updated = [...selectedMeds];
    updated[index][field] = value;
    setSelectedMeds(updated);
  };

  const handleAddInjection = () => {
    setInjections([
      ...injections,
      { name: "", dosage: "", schedule: "", notes: "", quantity: "" },
    ]);
  };

  const updateInjection = (index, field, value) => {
    const updated = [...injections];
    updated[index][field] = value;
    setInjections(updated);
  };

  const handleTestToggle = (testName) => {
    setTests((prev) =>
      prev.includes(testName)
        ? prev.filter((t) => t !== testName)
        : [...prev, testName]
    );
  };

  return (
    <div className="p-6 relative">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {toast.message}
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4">Prescribe Medicines</h2>

      {/* Medicine Search */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Search & Add Medicines</h3>
        <div className="relative">
          <div className="flex gap-2">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search medicine..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowSuggestions(true);
                }}
                className="border px-3 py-2 pr-8 rounded w-full"
              />
              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    setShowSuggestions(false);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg hover:text-gray-700"
                  aria-label="Clear search"
                  title="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <button
              onClick={() => {
                const found = availableMeds.find(
                  (m) => m.name.toLowerCase() === search.trim().toLowerCase()
                );
                if (found) handleAddMedicine(found);
                else alert("❌ Medicine not found");
              }}
              className="bg-blue-600 text-white px-4 rounded"
            >
              Add
            </button>
          </div>

          {showSuggestions &&
            search.trim() &&
            filteredSuggestions.length > 0 && (
              <ul className="absolute bg-white border w-full rounded mt-1 shadow z-50 max-h-48 overflow-auto">
                {filteredSuggestions.map((med, idx) => (
                  <li
                    key={idx}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleAddMedicine(med)}
                  >
                    {med.name} ({med.type} - {med.dosage})
                  </li>
                ))}
              </ul>
            )}
        </div>
      </div>

      {/* Selected Medicines */}
      {selectedMeds.map((med, index) => (
        <div
          key={index}
          className="bg-gray-50 border rounded p-4 mb-4 shadow-sm relative"
        >
          {/* ❌ Close button - changed to black */}
          <button
            onClick={() => handleRemoveMedicine(index)}
            className="absolute top-2 right-2 text-black text-xl hover:text-gray-700"
            title="Remove Medicine"
          >
            ×
          </button>

          <h3 className="text-blue-600 font-medium text-lg">{med.name}</h3>
          <p className="text-sm text-gray-700">{med.type} - {med.dosage}</p>

          <div className="mt-3">
            <label className="block mb-1 font-medium">Quantity</label>
            <input
              type="number"
              placeholder="e.g. 2"
              value={med.quantity}
              onChange={(e) =>
                updateMedField(index, "quantity", e.target.value)
              }
              className="w-full border px-3 py-2 rounded"
              min="1"
            />
          </div>

          <div className="mt-3">
            <label className="block mb-1 font-medium">Timing</label>
            <div className="flex gap-4">
              {["Morning", "Afternoon", "Night"].map((time) => (
                <label key={time} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={med.timing.includes(time)}
                    onChange={() => handleTimingChange(index, time)}
                  />
                  {time}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <label className="block mb-1 font-medium">Duration (days)</label>
            <input
              type="number"
              placeholder="e.g. 5"
              value={med.duration}
              onChange={(e) =>
                updateMedField(index, "duration", e.target.value)
              }
              className="w-full border px-3 py-2 rounded"
              min="1"
            />
          </div>
        </div>
      ))}

      {/* Injections */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Add Injections</h3>
        
        {/* Injection Search */}
        <div className="relative mb-4">
          <div className="flex gap-2">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search injection..."
                value={injectionSearch}
                onChange={(e) => {
                  setInjectionSearch(e.target.value);
                  setShowInjectionSuggestions(true);
                }}
                className="border px-3 py-2 pr-8 rounded w-full"
              />
              {injectionSearch && (
                <button
                  onClick={() => {
                    setInjectionSearch("");
                    setShowInjectionSuggestions(false);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg hover:text-gray-700"
                  aria-label="Clear search"
                  title="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <button
              onClick={() => {
                const found = availableInjections.find(
                  (inj) => inj.name.toLowerCase() === injectionSearch.trim().toLowerCase()
                );
                if (found) handleAddInjectionFromSearch(found);
                else alert("❌ Injection not found");
              }}
              className="bg-blue-600 text-white px-4 rounded"
            >
              Add
            </button>
          </div>

          {showInjectionSuggestions &&
            injectionSearch.trim() &&
            filteredInjectionSuggestions.length > 0 && (
              <ul className="absolute bg-white border w-full rounded mt-1 shadow z-50 max-h-48 overflow-auto">
                {filteredInjectionSuggestions.map((inj, idx) => (
                  <li
                    key={idx}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleAddInjectionFromSearch(inj)}
                  >
                    {inj.name} ({inj.dosage})
                  </li>
                ))}
              </ul>
            )}
        </div>

        <button
          onClick={handleAddInjection}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        >
          + Add Custom Injection
        </button>

        {injections.map((inj, index) => (
          <div
            key={index}
            className="border p-4 rounded bg-gray-50 mb-4 space-y-3 relative"
          >
            <button
              onClick={() => handleRemoveInjection(index)}
              className="absolute top-2 right-2 text-black text-xl hover:text-gray-700"
              title="Remove Injection"
            >
              ×
            </button>

            <input
              type="text"
              placeholder="Injection Name"
              value={inj.name}
              onChange={(e) => updateInjection(index, "name", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Dosage (e.g. 10mg/ml)"
              value={inj.dosage}
              onChange={(e) => updateInjection(index, "dosage", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
            <div>
              <label className="block mb-1 font-medium">Quantity</label>
              <input
                type="number"
                placeholder="e.g. 2"
                value={inj.quantity}
                onChange={(e) => updateInjection(index, "quantity", e.target.value)}
                className="w-full border px-3 py-2 rounded"
                min="1"
              />
            </div>
            <input
              type="text"
              placeholder="Schedule (e.g. Daily for 3 days)"
              value={inj.schedule}
              onChange={(e) =>
                updateInjection(index, "schedule", e.target.value)
              }
              className="w-full border px-3 py-2 rounded"
            />
            <textarea
              placeholder="Additional Notes"
              value={inj.notes}
              onChange={(e) => updateInjection(index, "notes", e.target.value)}
              className="w-full border px-3 py-2 rounded"
              rows={3}
            />
          </div>
        ))}
      </div>

      {/* Food Prescription */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Food Prescription (Diet Plan)</h3>
        <textarea
          placeholder="Suggest a diet plan, e.g., Avoid spicy foods, Eat high-protein diet, etc."
          value={foodPlan}
          onChange={(e) => setFoodPlan(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          rows={3}
        />
      </div>

      {/* Tests to be Taken */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Tests to be Taken</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {testOptions.map((test) => (
            <label key={test} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={tests.includes(test)}
                onChange={() => handleTestToggle(test)}
              />
              {test}
            </label>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button 
          onClick={handleSavePrescription}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Save Prescription
        </button>
      </div>
    </div>
  );
};

export default PrescriptionForm;