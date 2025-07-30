// import React, { useState } from "react";

// const availableMeds = [
//   { name: "Paracetamol", type: "Tablet" },
//   { name: "Amoxicillin", type: "Capsule" },
//   { name: "Cough Syrup", type: "Syrup" },
//   { name: "Insulin", type: "Injection" },
// ];

// const PrescriptionForm = () => {
//   const [selectedMeds, setSelectedMeds] = useState([]);
//   const [selectedMedName, setSelectedMedName] = useState("");
//   const [foodAdvice, setFoodAdvice] = useState("");
//   const [tests, setTests] = useState("");
//   const [injectionSchedule, setInjectionSchedule] = useState("");

//   const handleAddMedicine = (med) => {
//     if (!selectedMeds.find((m) => m.name === med.name)) {
//       setSelectedMeds([
//         ...selectedMeds,
//         { ...med, dosage: '', timing: [], duration: '' },
//       ]);
//     }
//   };

//   const handleAddSelectedMedicine = () => {
//     const selectedMed = availableMeds.find((m) => m.name === selectedMedName);
//     if (selectedMed) {
//       handleAddMedicine(selectedMed);
//       setSelectedMedName("");
//     }
//   };

//   return (
//     <div className="p-6 font-roboto">
//       <h2 className="text-2xl font-medium mb-4">Prescribe Medicines</h2>

//       {/* Medicine Dropdown */}
//       <div className="mb-4">
//         <h3 className="text-lg font-normal mb-2">Search & Add Medicines</h3>
//         <div className="flex items-center gap-2">
//           <select
//             value={selectedMedName}
//             onChange={(e) => setSelectedMedName(e.target.value)}
//             className="border px-3 py-2 rounded w-full"
//           >
//             <option value="">-- Select Medicine --</option>
//             {availableMeds.map((med, index) => (
//               <option key={index} value={med.name}>
//                 {med.name} ({med.type})
//               </option>
//             ))}
//           </select>
//           <button
//             onClick={handleAddSelectedMedicine}
//             className="bg-[#2563eb] text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Add
//           </button>
//         </div>
//       </div>

//       {/* Selected Medicines List */}
//       {selectedMeds.map((med, index) => (
//         <div key={index} className="mb-4 border p-4 rounded">
//           <h4 className="font-medium text-black">{med.name} ({med.type})</h4>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
//             <input
//               type="text"
//               placeholder="Dosage (e.g., 1 Tablet / 5ml)"
//               value={med.dosage}
//               onChange={(e) => {
//                 const updated = [...selectedMeds];
//                 updated[index].dosage = e.target.value;
//                 setSelectedMeds(updated);
//               }}
//               className="border px-2 py-1 rounded"
//             />
//             <div>
//               <label className="block text-black">Timing:</label>
//               <div className="flex gap-2">
//                 {['Morning', 'Afternoon', 'Night'].map((time) => (
//                   <label key={time} className="flex items-center gap-1">
//                     <input
//                       type="checkbox"
//                       checked={med.timing.includes(time)}
//                       onChange={(e) => {
//                         const updated = [...selectedMeds];
//                         if (e.target.checked) {
//                           updated[index].timing.push(time);
//                         } else {
//                           updated[index].timing = updated[index].timing.filter(
//                             (t) => t !== time
//                           );
//                         }
//                         setSelectedMeds(updated);
//                       }}
//                     />
//                     {time}
//                   </label>
//                 ))}
//               </div>
//             </div>
//             <input
//               type="text"
//               placeholder="Duration (e.g., 5 days)"
//               value={med.duration}
//               onChange={(e) => {
//                 const updated = [...selectedMeds];
//                 updated[index].duration = e.target.value;
//                 setSelectedMeds(updated);
//               }}
//               className="border px-2 py-1 rounded"
//             />
//           </div>
//         </div>
//       ))}

//       {/* Food Prescription */}
//       <div className="mb-4">
//         <h3 className="text-lg font-normal mb-2">Food Prescription</h3>
//         <textarea
//           className="w-full border px-3 py-2 rounded"
//           rows={3}
//           placeholder="E.g., Avoid oily foods, eat more fruits/vegetables, take after food"
//           value={foodAdvice}
//           onChange={(e) => setFoodAdvice(e.target.value)}
//         />
//       </div>

//       {/* Tests Section */}
//       <div className="mb-4">
//         <h3 className="text-lg font-normal mb-2">Tests to Take</h3>
//         <textarea
//           className="w-full border px-3 py-2 rounded"
//           rows={3}
//           placeholder="E.g., Blood test, X-ray, MRI, etc."
//           value={tests}
//           onChange={(e) => setTests(e.target.value)}
//         />
//       </div>

//       {/* Injections Section */}
//       <div className="mb-6">
//         <h3 className="text-lg font-normal mb-2">Injections Schedule</h3>
//         <textarea
//           className="w-full border px-3 py-2 rounded"
//           rows={3}
//           placeholder="E.g., Insulin 10ml - Morning and Night for 3 days"
//           value={injectionSchedule}
//           onChange={(e) => setInjectionSchedule(e.target.value)}
//         />
//       </div>

//       {/* Save Button */}
//       <button
//         onClick={() => alert("Prescription Saved!")}
//         className="bg-[#2563eb] text-white px-6 py-2 rounded hover:bg-blue-700"
//       >
//         Save Prescription
//       </button>
//     </div>
//   );
// };

// export default PrescriptionForm;
