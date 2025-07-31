// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Droplet, Phone, Mail } from "lucide-react";
// import hepatology from "../../assets/hepatology.jpeg";
// import rakesh from "../../assets/rakesh.png";
// import Sunil from "../../assets/Sunil.jpeg";
// import AppointmentModal from "./AppointModal";

// const Hepatology = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);

//   const handleBookClick = (doc) => {
//     setSelectedDoctor(doc);
//     setShowPopup(true);
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//     setSelectedDoctor(null);
//   };

//   const doctors = [
//     {
//       id: 501,
//       name: "Dr. Meganthan",
//       education: "Star Medical School",
//       experience: "10 years",
//       specialization: ["Hepatitis B & C", "Liver Cirrhosis"],
//       specialty: "Hepatologist",
//       email: "meganthan@medilab.com",
//       phone: "+91 98765 11223",
//       languages: ["English", "Tamil"],
//       image: Sunil,
//       rating: 3.5,
//        timing: "Mon - Fri: 9:00 AM - 1:00 PM",

//     },
//     {
//       id: 502,
//       name: "Dr. Rakesh Kumar",
//       education: "Walter Medical School",
//       experience: "14 years",
//       specialization: ["Liver Biopsy", "Fatty Liver"],
//       specialty: "Hepatologist",
//       email: "rakeshkumar@medilab.com",
//       phone: "+91 98989 22233",
//       languages: ["English", "Tamil", "Hindi"],
//       image: rakesh,
//       rating: 4.5,
//       timing: "Mon - Fri: 1:00 AM - 9:00 AM",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-blue-100 pt-28 px-4 sm:px-6 flex flex-col items-center">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6 }}
//         className="rounded-lg px-4 sm:px-8 py-6 flex flex-col sm:flex-row justify-between items-center w-full max-w-6xl mb-6 bg-gradient-to-r from-blue-200 via-blue-100 to-white shadow-md"
//       >
//         <div className="flex items-center space-x-4 mb-4 sm:mb-0">
//           <Droplet className="w-10 h-10 text-red-500" />
//           <div>
//             <h2 className="text-3xl sm:text-4xl font-bold text-black">Hepatology</h2>
//             <p className="text-lg sm:text-xl font-bold text-gray-500">Care for Your Liver</p>
//           </div>
//         </div>
//         <div>
//           <button
//             onClick={() => {
//               document.getElementById("Doctors")?.scrollIntoView({ behavior: "smooth" });
//             }}
//             className="bg-blue-600 hover:bg-blue-800 text-white px-5 py-2 rounded-full font-semibold transition"
//           >
//             Find a Doctor
//           </button>
//         </div>
//       </motion.div>

//       <hr className="w-full max-w-6xl border-t-2 border-black mb-10" />

//       {/* Department Info */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8 }}
//         className="flex flex-col lg:flex-row bg-blue-100 mt-6 p-4 sm:p-6 mb-10 w-full max-w-6xl items-center"
//       >
//         <div className="w-full lg:w-1/2 flex justify-center items-center mb-6 lg:mb-0 transition-transform duration-700 hover:scale-105">
//           <img
//             src={hepatology}
//             alt="Hepatology Department"
//             className="rounded-lg w-full h-auto max-h-[320px] object-cover shadow-lg"
//           />
//         </div>
//         <div className="w-full lg:w-1/2 lg:pl-8 text-black space-y-4">
//           <h2 className="text-2xl font-bold text-blue-800 mb-2 hover:text-blue-600 transition-colors duration-300">
//             Department of Hepatology
//           </h2>
//           {[
//             "Our Hepatology department provides specialized care for liver diseases with a team of experienced hepatologists and dedicated support staff.",
//             "We address a wide spectrum of liver-related conditions, including viral hepatitis, liver fibrosis, autoimmune liver disease, and hepatocellular carcinoma.",
//             "From early diagnosis to liver transplant evaluation, we ensure personalized treatment paths tailored to each patient’s health status.",
//             "The department is equipped with cutting-edge imaging, liver biopsy services, and multidisciplinary support to offer holistic care.",
//             "Our mission is to improve liver health outcomes with compassion, advanced science, and continuous support.",
//           ].map((text, idx) => (
//             <motion.p
//               key={idx}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: idx * 0.2 }}
//             >
//               {text}
//             </motion.p>
//           ))}
//         </div>
//       </motion.div>

//       <div className="h-12 sm:h-[90px]"></div>

//       {/* Doctor List */}
//       <motion.h1
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="text-2xl sm:text-3xl font-bold text-black text-center scroll-mt-28"
//         id="Doctors"
//       >
//         Find Your <span className="text-blue-600">Specialist</span>
//       </motion.h1>
//       <motion.p
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//         className="text-md text-gray-800 mt-2 mb-6 text-center max-w-xl"
//       >
//         Connect with experienced hepatologists and book your appointment with ease.
//       </motion.p>

//       <div className="flex flex-wrap justify-center gap-6">
//         {doctors.map((doc, i) => (
//           <motion.div
//             key={doc.id}
//             className="bg-white p-4 rounded-xl shadow-md w-full sm:w-[450px] h-auto flex flex-col items-center"
//           >
//             <div className="w-28 h-28 overflow-hidden rounded-full bg-white shadow">
//               <img
//                 src={doc.image}
//                 alt={doc.name}
//                 className="w-full h-full object-cover object-top"
//               />
//             </div>

//             <div className="mt-4 text-center">
//               <h2 className="text-lg sm:text-xl font-semibold">{doc.name}</h2>
//               <p className="text-blue-600 text-sm">{doc.specialty}</p>
//               <div className="flex justify-center items-center text-yellow-500 text-sm mt-1">
//                 {"★".repeat(Math.floor(doc.rating)) + (doc.rating % 1 ? "☆" : "")}
//                 <span className="text-black ml-2">{doc.rating}</span>
//               </div>
//             </div>

//             <div className="text-sm text-gray-700 mt-4 text-left w-full px-4 space-y-1">
//               <p><strong>ID:</strong> #{doc.id}</p>
//               <p><strong>Experience:</strong> {doc.experience}</p>
//               <p><strong>Education:</strong> {doc.education}</p>
//               <p><strong>Languages:</strong> {doc.languages.join(", ")}</p>
//               <p className="flex items-center">
//                 <Phone className="w-4 h-4 mr-1" /> {doc.phone}
//               </p>
//               <p className="flex items-center">
//                 <Mail className="w-4 h-4 mr-1" /> {doc.email}
//               </p>
//             </div>

//             <div className="mt-4 w-full px-4">
//               <p className="font-semibold text-sm mb-1">Specializations</p>
//               <div className="flex flex-wrap gap-2 text-xs">
//                 {doc.specialization.map((s, idx) => (
//                   <span key={idx} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
//                     {s}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div className="mt-4 w-full px-4">
//               <button
//                 onClick={() => handleBookClick(doc)}
//                 className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
//               >
//                 Book Appointment
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {showPopup && selectedDoctor && (
//         <AppointmentModal doctor={selectedDoctor} onClose={closePopup} />
//       )}
//       <div className="h-10 sm:h-[40px]"></div>
//     </div>
//   );
// };

// export default Hepatology;
