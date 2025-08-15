import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


const AppointmentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;

  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    specialty: "",
    doctor: "",
    doctorId: "",
    date: "",
    time: "",
    emergency: false,
    reason: "",
    notes: "",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // UPDATED API URLs - Let's test different variations
  const API_BASE_URL = "https://appoitment-backend.onrender.com";
  const API_ENDPOINTS = [
    `${API_BASE_URL}/api/appointments`,           // Original
    `${API_BASE_URL}/appointments`,               // Without /api
    `${API_BASE_URL}/api/appointment`,            // Singular
    `${API_BASE_URL}/appointment`,                // Singular without /api
  ];
  
  const PATIENT_API_URL = "https://patient-service-ntk0.onrender.com/api/patient";

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const formatTimeForDisplay = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const createAppointmentDateTime = (date, time) => {
    console.log("🔧 createAppointmentDateTime called with:", { date, time });

    if (!date || !time) {
      console.log("⚠️ Missing date or time, returning null");
      return null;
    }

    const dateTimeString = `${date}T${time}:00.000Z`;
    const dateTime = new Date(dateTimeString);

    console.log("📅 Created Date object:", dateTime);
    console.log("🔍 Date validation:", {
      isValid: !isNaN(dateTime.getTime()),
      isoString: dateTime.toISOString(),
    });

    if (isNaN(dateTime.getTime())) {
      console.log("❌ Invalid date created");
      return null;
    }

    const isoString = dateTime.toISOString();
    console.log("📤 Final ISO string:", isoString);
    return isoString;
  };

  // Test API endpoint availability
  const testApiEndpoints = async () => {
    console.log("🔍 Testing API endpoints...");
    
    for (const endpoint of API_ENDPOINTS) {
      try {
        console.log(`Testing: ${endpoint}`);
        const response = await axios.get(endpoint, { timeout: 5000 });
        console.log(`✅ ${endpoint} - Status: ${response.status}`);
        return endpoint; // Return the first working endpoint
      } catch (error) {
        console.log(`❌ ${endpoint} - Error: ${error.response?.status || error.message}`);
      }
    }
    
    // Test base URL
    try {
      console.log(`Testing base URL: ${API_BASE_URL}`);
      const response = await axios.get(API_BASE_URL, { timeout: 5000 });
      console.log(`✅ Base URL working - Status: ${response.status}`);
    } catch (error) {
      console.log(`❌ Base URL - Error: ${error.response?.status || error.message}`);
    }
    
    return null;
  };

  // Enhanced retry function with endpoint testing
  const makeRequestWithRetry = async (data, maxRetries = 3) => {
    // First, test which endpoint works
    const workingEndpoint = await testApiEndpoints();
    
    if (!workingEndpoint) {
      console.log("❌ No working endpoints found");
      throw new Error("API service is not available. All endpoints returned 404.");
    }

    console.log(`🎯 Using working endpoint: ${workingEndpoint}`);

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 Attempt ${attempt}/${maxRetries}`);
        console.log(`📤 Sending POST to: ${workingEndpoint}`);
        console.log(`📦 Request data:`, JSON.stringify(data, null, 2));
        
        const response = await axios.post(workingEndpoint, data, {
          timeout: 30000,
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
        });
        
        console.log(`✅ Success! Response:`, response.data);
        return response;
      } catch (error) {
        console.log(`❌ Attempt ${attempt} failed:`, error.message);
        
        if (error.response) {
          console.log(`📋 Error details:`, {
            status: error.response.status,
            statusText: error.response.statusText,
            data: error.response.data,
            headers: error.response.headers
          });
        }

        if (attempt === maxRetries) {
          throw error;
        }

        const waitTime = attempt * 2000;
        console.log(`⏳ Retrying in ${waitTime}ms...`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
  };

  useEffect(() => {
    if (doctor) {
      localStorage.setItem("selectedDoctor", JSON.stringify(doctor));
      setForm((prev) => ({
        ...prev,
        doctor: doctor.name || doctor.doctorName || "",
        specialty: doctor.specialty || "",
        doctorId: doctor.doctorId || "",
      }));
    } else {
      const storedDoctor = JSON.parse(localStorage.getItem("selectedDoctor"));
      if (storedDoctor) {
        setForm((prev) => ({
          ...prev,
          doctor: storedDoctor.name || storedDoctor.doctorName || "",
          specialty: storedDoctor.specialty || "",
          doctorId: storedDoctor.doctorId || "",
        }));
      }
    }
  }, [doctor]);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      const storedUser = JSON.parse(
        localStorage.getItem("currentUser") || "{}"
      );
      const patientId = storedUser.userId;
      console.log("ksihore"+patientId);
      if (!patientId) {
        toast.error("No patient ID found in localStorage.", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
        return;
      }

      try {
        const response = await axios.get(`${PATIENT_API_URL}/${patientId}`);
        const patient = response.data.data;

        console.log("Fetched patient data:", patient);

        setForm((prev) => ({
          ...prev,
          name: patient.patientName || "",
          age: patient.age?.toString() || "",
          phone: patient.contactNumber || "",
          email: patient.patientEmail || "",
        }));
      } catch (error) {
        console.error("❌ Failed to fetch patient details:", error);
        toast.error("Could not load patient details", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    };

    fetchPatientDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      setForm({ ...form, phone: numericValue });
    } else if (name === "age") {
      const numericValue = value.replace(/\D/g, "").slice(0, 3);
      setForm({ ...form, age: numericValue });
    } else {
      setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !form.name ||
      !form.phone ||
      !form.date ||
      !form.time ||
      !form.reason ||
      !form.doctorId
    ) {
      toast.error("Please fill in all required fields.", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const patientId = storedUser.userId;

    if (!patientId) {
      toast.error("Patient not logged in. Please login again.", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    console.log("🔍 FORM DEBUG - Raw form data:");
    console.log("📋 Form State:", {
      date: form.date,
      time: form.time,
      name: form.name,
      doctorId: form.doctorId,
      specialty: form.specialty,
      email: form.email,
      reason: form.reason,
      emergency: form.emergency,
    });

    const appointmentDateTime = createAppointmentDateTime(form.date, form.time);

    if (!appointmentDateTime) {
      toast.error("Invalid date or time selected.", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    // Try multiple payload formats
    const payloadVariations = [
      // Format 1: Matching your working Postman format exactly
      {
        patientId: patientId,
        doctorId: form.doctorId,
        appointmentId: `APP-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        patientName: form.name,
        age: parseInt(form.age) || 0,
        department: form.specialty,
        patientEmail: form.email,
        appointmentDateTime: appointmentDateTime,
        duration: 30,
        reason: form.reason,
        symptoms: form.reason,
        additionalNotes: form.notes || "",
        status: "PENDING",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        emergency: form.emergency,
        phoneNumber: form.phone,
        doctorName: null
      },
      
      // Format 2: Simplified version
      {
        patientId: patientId,
        doctorId: form.doctorId,
        patientName: form.name,
        department: form.specialty,
        patientEmail: form.email,
        appointmentDateTime: appointmentDateTime,
        duration: 30,
        reason: form.reason,
        symptoms: form.reason,
        additionalNotes: form.notes || "",
        emergency: form.emergency
      },
      
      // Format 3: Basic required fields only
      {
        patientId: patientId,
        doctorId: form.doctorId,
        appointmentDateTime: appointmentDateTime,
        reason: form.reason
      }
    ];

    try {
      setIsSubmitting(true);
      
      // Try each payload format
      for (let i = 0; i < payloadVariations.length; i++) {
        try {
          console.log(`🎯 Trying payload format ${i + 1}:`, payloadVariations[i]);
          const response = await makeRequestWithRetry(payloadVariations[i]);
          
          if (response.status === 201 || response.status === 200) {
            console.log("🎉 Success! Appointment created successfully");
            toast.success("Appointment booked successfully!", {
              position: "top-center",
              autoClose: 3000,
              theme: "colored",
            });
            setShowConfirmation(true);
            return;
          }
        } catch (formatError) {
          console.log(`❌ Payload format ${i + 1} failed:`, formatError.message);
          if (i === payloadVariations.length - 1) {
            throw formatError; // Throw the last error
          }
        }
      }

    } catch (error) {
      console.log("❌ ALL ATTEMPTS FAILED");
      console.log("Error object:", error);
      console.log("Error message:", error.message);

      if (error.response) {
        console.log("📋 Error response details:", {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        });

        if (error.response.status === 404) {
          toast.error(
            "❌ API Endpoint Not Found!\n\nPossible solutions:\n1. Check if the backend server is running\n2. Verify the API endpoint URL\n3. Contact the backend team",
            {
              position: "top-center",
              autoClose: 8000,
              theme: "colored",
            }
          );
        } else if (error.response.status === 400) {
          toast.error(
            error.response.data?.message ||
              "Invalid appointment data. Please check your inputs.",
            {
              position: "top-center",
              autoClose: 5000,
              theme: "colored",
            }
          );
        } else if (error.response.status === 500) {
          toast.error("Server error. Please try again later.", {
            position: "top-center",
            autoClose: 3000,
            theme: "colored",
          });
        } else {
          toast.error(
            error.response.data?.message ||
              "Failed to book appointment. Please try again.",
            {
              position: "top-center",
              autoClose: 3000,
              theme: "colored",
            }
          );
        }
      } else if (error.request) {
        console.log("📤 Request details:", error.request);
        toast.error(
          "Network error. Please check your internet connection and try again.",
          {
            position: "top-center",
            autoClose: 3000,
            theme: "colored",
          }
        );
      } else {
        toast.error("An unexpected error occurred. Please try again.", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } finally {
      setIsSubmitting(false);
      console.log("🔄 Request completed, isSubmitting set to false");
    }
  };

  const handleConfirmClose = () => {
    localStorage.removeItem("selectedDoctor");
    setShowConfirmation(false);
    navigate("/departments/appointment");
  };

  // Add debug button for testing
  const handleDebugTest = async () => {
    console.log("🚀 Running debug test...");
    await testApiEndpoints();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-6 mt-12">
      <div className="bg-white max-w-5xl mx-auto shadow-xl rounded-lg p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold pb-4">
            Book Appointment with {form.doctor || "Doctor"}
          </h2>
          {/* Debug button - remove in production */}
          <button
            onClick={handleDebugTest}
            className="px-3 py-1 bg-red-100 text-red-600 text-sm rounded hover:bg-red-200"
            type="button"
          >
            🐛 Debug API
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-blue-100 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-4">👤 Patient Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <input
                name="name"
                required
                placeholder="Full name*"
                value={form.name}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="age"
                required
                inputMode="numeric"
                maxLength={3}
                placeholder="Age*"
                value={form.age}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="phone"
                required
                type="tel"
                placeholder="Phone Number*"
                value={form.phone}
                onChange={handleChange}
                maxLength={10}
                pattern="[0-9]{10}"
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="email"
                required
                type="email"
                placeholder="Email*"
                value={form.email}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-blue-100 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-4">
              👨‍⚕️ Doctor & Appointment Details –{" "}
              <span className="text-blue-600 font-normal">
                {new Date().toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <input
                type="text"
                value={form.doctor}
                readOnly
                placeholder="Doctor Name"
                className="w-full border bg-gray-50 px-4 py-2 rounded-lg"
              />
              <input
                type="text"
                value={form.specialty}
                readOnly
                placeholder="Department"
                className="w-full border bg-gray-50 px-4 py-2 rounded-lg"
              />
              <input
                type="text"
                value={form.doctorId}
                readOnly
                placeholder="Doctor ID"
                className="w-full border bg-gray-50 px-4 py-2 rounded-lg"
              />
              <div></div>
              <input
                type="date"
                name="date"
                required
                value={form.date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="time"
                name="time"
                required
                value={form.time}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="emergency"
                  checked={form.emergency}
                  onChange={handleChange}
                  className="mr-2 rounded"
                />
                <span className="text-red-600 font-medium">
                  Mark as Emergency Appointment
                </span>
              </label>
            </div>
          </div>

          <div className="bg-blue-100 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-4">❤️ Medical Information</h3>
            <textarea
              name="reason"
              required
              value={form.reason}
              onChange={handleChange}
              placeholder="Describe the symptoms or reason for the appointment...*"
              className="w-full h-24 border border-blue-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-3 font-medium">Additional Notes</p>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any additional notes or special requirements..."
              className="w-full h-20 border border-blue-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 text-white rounded-md transition-colors ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Booking..." : "Book Appointment"}
            </button>
          </div>
        </form>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md text-center">
            <h3 className="text-xl font-bold mb-4 text-green-700">
              ✅ Appointment Booked Successfully!
            </h3>
            <p className="mb-2">
              <strong>Patient:</strong> {form.name}
            </p>
            <p className="mb-2">
              <strong>Doctor:</strong> {form.doctor}
            </p>
            <p className="mb-2">
              <strong>Department:</strong> {form.specialty}
            </p>
            <p className="mb-4">
              <strong>Date & Time:</strong> {formatDateForDisplay(form.date)} at{" "}
              {formatTimeForDisplay(form.time)}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              A confirmation email will be sent shortly.
            </p>
            <button
              onClick={handleConfirmClose}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AppointmentPage;