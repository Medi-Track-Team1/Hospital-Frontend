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

const PrescriptionForm = ({ onClose }) => {
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

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      console.log("Form should close");
    }
  };

  const handleSavePrescription = () => {
    showToast("Prescription saved successfully!");
    setTimeout(() => {
      handleClose();
    }, 2000);
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
        { ...med, timing: [], duration: "", quantity: "", dosage: med.dosage },
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Toast Notification */}
        {toast.show && (
          <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {toast.message}
          </div>
        )}

        {/* Form Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-6">
          <div>
            <h2 className="text-2xl font-bold">Prescribe Medicines</h2>
            <p className="text-blue-100 text-sm mt-1">Create comprehensive medical prescriptions</p>
          </div>
        </div>

        {/* Form Content */}
        <div className="max-h-[80vh] overflow-y-auto">
          <div className="p-8 space-y-8">

            {/* Search Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Medicine Search */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Add Medicines
                  </h3>
                  <div className="relative">
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Search medicine..."
                          value={search}
                          onChange={(e) => {
                            setSearch(e.target.value);
                            setShowSuggestions(true);
                          }}
                          className="border-2 border-gray-200 px-4 py-3 pr-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        {search && (
                          <button
                            onClick={() => {
                              setSearch("");
                              setShowSuggestions(false);
                            }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium transition-colors duration-200"
                      >
                        Add
                      </button>
                    </div>

                    {showSuggestions && search.trim() && filteredSuggestions.length > 0 && (
                      <ul className="absolute bg-white border-2 border-gray-100 rounded-lg mt-2 shadow-xl z-50 max-h-40 overflow-auto w-full">
                        {filteredSuggestions.map((med, idx) => (
                          <li
                            key={idx}
                            className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 transition-colors duration-150"
                            onClick={() => handleAddMedicine(med)}
                          >
                            <div className="font-semibold text-gray-800">{med.name}</div>
                            <div className="text-sm text-gray-500">{med.type} - {med.dosage}</div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* Injection Search */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Add Injections
                  </h3>
                  <div className="relative">
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Search injection..."
                          value={injectionSearch}
                          onChange={(e) => {
                            setInjectionSearch(e.target.value);
                            setShowInjectionSuggestions(true);
                          }}
                          className="border-2 border-gray-200 px-4 py-3 pr-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        {injectionSearch && (
                          <button
                            onClick={() => {
                              setInjectionSearch("");
                              setShowInjectionSuggestions(false);
                            }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium transition-colors duration-200"
                      >
                        Add
                      </button>
                    </div>

                    {showInjectionSuggestions && injectionSearch.trim() && filteredInjectionSuggestions.length > 0 && (
                      <ul className="absolute bg-white border-2 border-gray-100 rounded-lg mt-2 shadow-xl z-50 max-h-40 overflow-auto w-full">
                        {filteredInjectionSuggestions.map((inj, idx) => (
                          <li
                            key={idx}
                            className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 transition-colors duration-150"
                            onClick={() => handleAddInjectionFromSearch(inj)}
                          >
                            <div className="font-semibold text-gray-800">{inj.name}</div>
                            <div className="text-sm text-gray-500">{inj.dosage}</div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                </div>
              </div>
            </div>

            {/* Combined Table */}
            {(selectedMeds.length > 0 || injections.length > 0) && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Prescribed Items
                </h3>
                <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                  <div className="overflow-x-auto max-h-80">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100 sticky top-0">
                        <tr>
                          <th className="border-r border-gray-300 px-4 py-4 text-left font-semibold text-gray-700 w-20">Type</th>
                          <th className="border-r border-gray-300 px-4 py-4 text-left font-semibold text-gray-700 w-40">Name</th>
                          <th className="border-r border-gray-300 px-4 py-4 text-left font-semibold text-gray-700 w-32">Dosage</th>
                          <th className="border-r border-gray-300 px-4 py-4 text-left font-semibold text-gray-700 w-24">Qty</th>
                          <th className="border-r border-gray-300 px-4 py-4 text-left font-semibold text-gray-700 w-32">Duration/Schedule</th>
                          <th className="border-r border-gray-300 px-4 py-4 text-left font-semibold text-gray-700 w-36">Timing/Notes</th>
                          <th className="px-4 py-4 text-center font-semibold text-gray-700 w-16">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {selectedMeds.map((med, index) => (
                          <tr key={`med-${index}`} className="hover:bg-blue-50 transition-colors duration-150">
                            <td className="border-r border-gray-200 px-4 py-4">
                              <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">Med</span>
                            </td>
                            <td className="border-r border-gray-200 px-4 py-4">
                              <input
                                type="text"
                                placeholder="Medicine Name"
                                value={med.name}
                                onChange={(e) => updateMedField(index, "name", e.target.value)}
                                className="w-full border border-gray-300 px-2 py-2 text-sm font-semibold text-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </td>
                            <td className="border-r border-gray-200 px-4 py-4">
                              <input
                                type="text"
                                placeholder="Dosage"
                                value={med.dosage}
                                onChange={(e) => updateMedField(index, "dosage", e.target.value)}
                                className="w-full border border-gray-300 px-2 py-2 text-sm text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </td>
                            <td className="border-r border-gray-200 px-4 py-4">
                              <input
                                type="number"
                                placeholder="2"
                                value={med.quantity}
                                onChange={(e) => updateMedField(index, "quantity", e.target.value)}
                                className="w-full border border-gray-300 px-2 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="1"
                              />
                            </td>
                            <td className="border-r border-gray-200 px-4 py-4">
                              <input
                                type="number"
                                placeholder="7"
                                value={med.duration}
                                onChange={(e) => updateMedField(index, "duration", e.target.value)}
                                className="w-full border border-gray-300 px-2 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="1"
                              />
                            </td>
                            <td className="border-r border-gray-200 px-4 py-4">
                              <div className="flex gap-2">
                                {["Morning", "Afternoon", "Night"].map((time) => (
                                  <label key={time} className="flex items-center gap-1 text-xs">
                                    <input
                                      type="checkbox"
                                      checked={med.timing.includes(time)}
                                      onChange={() => handleTimingChange(index, time)}
                                      className="w-4 h-4 rounded"
                                    />
                                    {time.charAt(0)}
                                  </label>
                                ))}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-center">
                              <button
                                onClick={() => handleRemoveMedicine(index)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors duration-200"
                                title="Remove"
                              >
                                ×
                              </button>
                            </td>
                          </tr>
                        ))}
                        {injections.map((inj, index) => (
                          <tr key={`inj-${index}`} className="hover:bg-blue-50 transition-colors duration-150">
                            <td className="border-r border-gray-200 px-4 py-4">
                              <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">Inj</span>
                            </td>
                            <td className="border-r border-gray-200 px-4 py-4">
                              <input
                                type="text"
                                placeholder="Injection Name"
                                value={inj.name}
                                onChange={(e) => updateInjection(index, "name", e.target.value)}
                                className="w-full border border-gray-300 px-2 py-2 text-sm font-semibold text-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </td>
                            <td className="border-r border-gray-200 px-4 py-4">
                              <input
                                type="text"
                                placeholder="Dosage"
                                value={inj.dosage}
                                onChange={(e) => updateInjection(index, "dosage", e.target.value)}
                                className="w-full border border-gray-300 px-2 py-2 text-sm text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </td>
                            <td className="border-r border-gray-200 px-4 py-4">
                              <input
                                type="number"
                                placeholder="2"
                                value={inj.quantity}
                                onChange={(e) => updateInjection(index, "quantity", e.target.value)}
                                className="w-full border border-gray-300 px-2 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="1"
                              />
                            </td>
                            <td className="border-r border-gray-200 px-4 py-4">
                              <input
                                type="text"
                                placeholder="Daily for 3 days"
                                value={inj.schedule}
                                onChange={(e) => updateInjection(index, "schedule", e.target.value)}
                                className="w-full border border-gray-300 px-2 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </td>
                            <td className="border-r border-gray-200 px-4 py-4">
                              <textarea
                                placeholder="Notes"
                                value={inj.notes}
                                onChange={(e) => updateInjection(index, "notes", e.target.value)}
                                className="w-full border border-gray-300 px-2 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                rows={1}
                              />
                            </td>
                            <td className="px-4 py-4 text-center">
                              <button
                                onClick={() => handleRemoveInjection(index)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors duration-200"
                                title="Remove"
                              >
                                ×
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Food Plan and Tests */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Food Prescription */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Diet Plan
                </h3>
                <textarea
                  placeholder="Diet recommendations..."
                  value={foodPlan}
                  onChange={(e) => setFoodPlan(e.target.value)}
                  className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-200"
                  rows={4}
                />
              </div>

              {/* Tests */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Recommended Tests
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {testOptions.map((test) => (
                    <label key={test} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-150">
                      <input
                        type="checkbox"
                        checked={tests.includes(test)}
                        onChange={() => handleTestToggle(test)}
                        className="rounded w-5 h-5 text-red-500"
                      />
                      <span className="text-sm font-medium text-gray-700">{test}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Footer */}
        <div className="bg-gray-100 px-8 py-6 flex justify-end gap-4 border-t-2 border-gray-200">
          <button 
            onClick={handleClose}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
          >
            Cancel
          </button>
          <button 
            onClick={handleSavePrescription}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Save Prescription
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionForm;