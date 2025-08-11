import React, { useEffect, useRef, useState } from "react";
import { getDoctorsBySpecialty } from "../../services/DoctorPanel/GetDoctorsBySpecialty"; // Adjust path as needed

// Skeleton Loader Component
const DoctorSkeleton = () => (
  <div className="animate-pulse bg-gray-50 rounded-2xl p-6 shadow-md flex items-start gap-6">
    <div className="w-24 h-24 rounded-full bg-gray-300 border-4 border-white shadow-md"></div>
    <div className="flex-1 space-y-2">
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
    </div>
  </div>
);

const Doctors = () => {
  const sectionRef = useRef(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to check if doctor is available
  const isDoctorAvailable = (status) => {
    const unavailableStatuses = [
      "on leave", "On Leave", "ON LEAVE",
      "leave", "Leave", "LEAVE",
      "inactive", "Inactive", "INACTIVE",
      "unavailable", "Unavailable", "UNAVAILABLE"
    ];
    return !unavailableStatuses.includes(status);
  };

  // Format timing display
  const getTimingDisplay = (doctor) => {
    // You can customize this based on your data structure
    return doctor.timing || doctor.availability || "Contact for availability";
  };

  // Format hours display
  const getHoursDisplay = (doctor) => {
    // You can customize this based on your data structure
    return doctor.workingHours || doctor.hours || doctor.experience || "Contact for details";
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getDoctorsBySpecialty("General");
        setDoctors(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error("Error fetching general doctors:", err);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (!loading && doctors.length > 0) {
      const cards = sectionRef.current?.querySelectorAll(".doctor-card");
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-fadeInUp");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      cards?.forEach(card => observer.observe(card));

      // Cleanup observer on unmount
      return () => {
        cards?.forEach(card => observer.unobserve(card));
      };
    }
  }, [loading, doctors]);

  return (
    <div className="bg-white py-20 px-6 md:px-20" ref={sectionRef}>
      <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">
        General Doctors
      </h2>
      <p className="text-center text-lg text-gray-600 mb-14">
        Meet our experienced team dedicated to providing exceptional care.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {loading
          ? Array(4).fill().map((_, i) => <DoctorSkeleton key={i} />)
          : doctors?.length > 0
          ? doctors.map((doctor, index) => (
              <div
                key={doctor.doctorId}
                className="doctor-card opacity-0 transform scale-95 bg-gray-50 rounded-2xl p-6 shadow-md flex items-start gap-6 hover:shadow-xl transition duration-500"
              >
                <div className="relative">
                  <img
                    src={doctor.photoUrl || "https://via.placeholder.com/96x96?text=Dr"}
                    alt={doctor.doctorName}
                    className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-md"
                  />
                  {/* Status indicator */}
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                    isDoctorAvailable(doctor.status) 
                      ? "bg-green-500" 
                      : "bg-red-500"
                  }`}></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {doctor.doctorName}
                  </h3>
                  <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                  <p className="text-sm text-gray-600">
                    {doctor.designation || doctor.education || "Medical Professional"}
                  </p>
                  
                  {/* Status badge */}
                  <span className={`inline-block mt-2 text-xs font-medium px-2 py-1 rounded-full ${
                    isDoctorAvailable(doctor.status)
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {doctor.status}
                  </span>
                  
                  <p className="text-sm text-gray-700 mt-2">
                    <strong>Available:</strong> {getTimingDisplay(doctor)}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Experience:</strong> {getHoursDisplay(doctor)}
                  </p>
                  
                  {/* Additional info if available */}
                  {doctor.languages && (
                    <p className="text-sm text-gray-700">
                      <strong>Languages:</strong> {
                        Array.isArray(doctor.languages) 
                          ? doctor.languages.join(", ") 
                          : doctor.languages
                      }
                    </p>
                  )}
                </div>
              </div>
            ))
          : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">No general doctors found at the moment.</p>
              <p className="text-gray-500 text-sm mt-2">Please check back later or contact us directly.</p>
            </div>
          )}
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-xl transition duration-300 z-50"
        aria-label="Scroll to top"
      >
        ↑
      </button>
      
      {/* Add the required CSS for fade animation */}
      <style jsx>{`
        .animate-fadeInUp {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
          transition: all 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Doctors;