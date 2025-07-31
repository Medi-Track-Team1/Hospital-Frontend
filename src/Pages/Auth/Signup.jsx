
import React, { useState } from "react";
import { User, Phone, Plus, X } from "lucide-react";
import React, { useState,useEffect } from "react";
import { User, Phone, Mail, MapPin, Plus, X } from "lucide-react";
import { registerUser, registerPatientDetails } from "./api";

// Password encryption function using Web Crypto API
const encryptPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "healthcare_salt_2024"); // Add salt
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const Signup = ({ onClose, onLoginClick }) => {
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: "", phone: "", relation: "", email: "" },
  ]);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    bloodGroup: "",
    gender: "",
    maritalStatus: "",
    city: "",
    state: "",
    zipCode: "",
    contactNumber: "",
    patientEmail: "",
    password: "",
    address: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
   useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const addEmergencyContact = () => {
    const newId = Math.max(...emergencyContacts.map((c) => c.id), 0) + 1;
    setEmergencyContacts([...emergencyContacts, {
      id: newId,
      name: "",
      phone: "",
      relation: "",
      email: "",
    }]);
  };

  const removeEmergencyContact = (id) => {
    if (emergencyContacts.length > 1) {
      setEmergencyContacts(
        emergencyContacts.filter((contact) => contact.id !== id)
      );
    }
  };

  const updateEmergencyContact = (id, field, value) => {
    setEmergencyContacts(
      emergencyContacts.map((contact) =>
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setFormData({
      patientName: "",
      age: "",
      bloodGroup: "",
      gender: "",
      maritalStatus: "",
      city: "",
      state: "",
      zipCode: "",
      contactNumber: "",
      patientEmail: "",
      password: "",
      address: "",
    });
    setEmergencyContacts([
      { id: 1, name: "", phone: "", relation: "", email: "" },
    ]);
    setError("");
  };


  const handleSubmit = async () => {
    try {
      // Encrypt password before sending
      const encryptedPassword = await encryptPassword(formData.password);
      
      // Prepare the data according to your backend Patient model
      const patientData = {
        patientName: formData.patientName,
        age: parseInt(formData.age),
        bloodGroup: formData.bloodGroup,
        gender: formData.gender,
        maritalStatus: formData.maritalStatus || null,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode || "",
        contactNumber: formData.contactNumber,
        patientEmail: formData.patientEmail,
        password: encryptedPassword, // Send encrypted password
        address: formData.address,
        emergencyContacts: emergencyContacts.filter(contact => 
          contact.name.trim() || contact.phone.trim() || contact.relation.trim() || contact.email.trim()
        )
      };

      // Make API call to your backend
      const response = await fetch('http://localhost:8080/api/patient/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('Patient registered successfully!' + result.data.patientId);
        // Clear the form after successful registration
        clearForm();
        onClose();
      } else {
        alert('Registration failed: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error registering patient:', error);
      alert('Registration failed: Network error or server is not responding');
    }

  };

  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      {/* Success Message (shown temporarily) */}
      {successMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50 animate-fade-in-out">
          {successMessage}
        </div>
      )}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Create Account
              </h2>
              <p className="text-gray-600 mt-1">
                Sign up with your details to get started
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Personal Details Section */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <User size={20} className="text-blue-600" />
              Personal Details
            </h3>

            <div className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    placeholder="Patient Name *"
                    value={formData.patientName}

                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"

                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    placeholder="Age *"
                    value={formData.age}

                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"

                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Group *
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}

                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
                    required
                  >
                    <option value="">Blood Group *</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>

                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}

                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"

                  >

                    <option value="">Gender *</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>

                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marital Status
                  </label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}

                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
                  >
                    <option value="">Marital Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>

                  </select>
                </div>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"

                    name="city"
                    placeholder="City *"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"

                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"

                    name="state"
                    placeholder="State *"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"

                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zip Code
                  </label>
                  <input
                    type="text"

                    name="zipCode"
                    placeholder="Zip Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"

                  />
                </div>
              </div>


              {/* Row 4 - Contact Number, Email, Password */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    placeholder="Contact Number *"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"

                    name="patientEmail"
                    placeholder="Email Address *"
                    value={formData.patientEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"

                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"

                    name="password"
                    placeholder="Password *"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"

                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <textarea
                  name="address"
                  placeholder="Address *"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                  required
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Phone size={20} className="text-blue-600" />
              Emergency Contact & Medical Information
            </h3>

            {emergencyContacts.map((contact, index) => (
              <div
                key={contact.id}
                className={`border border-gray-200 rounded-lg p-5 mb-4 bg-gray-50 ${
                  index > 0 ? "mt-4" : ""
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-blue-600">
                    Emergency Contact {index + 1}
                  </h4>
                  {emergencyContacts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEmergencyContact(contact.id)}

                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"

                    >
                      Remove Contact
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"

                        placeholder="Emergency Contact Name"

                        value={contact.name}
                        onChange={(e) =>
                          updateEmergencyContact(
                            contact.id,
                            "name",
                            e.target.value
                          )
                        }

                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"

                      />
                    </div>
                    <div>
                      <input
                        type="tel"

                        placeholder="Emergency Contact Phone"

                        value={contact.phone}
                        onChange={(e) =>
                          updateEmergencyContact(
                            contact.id,
                            "phone",
                            e.target.value
                          )
                        }

                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"

                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Relation"
                        value={contact.relation}
                        onChange={(e) =>
                          updateEmergencyContact(
                            contact.id,
                            "relation",
                            e.target.value
                          )
                        }

                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />

                    </div>
                    <div>
                      <input
                        type="email"

                        placeholder="Email"

                        value={contact.email}
                        onChange={(e) =>
                          updateEmergencyContact(
                            contact.id,
                            "email",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6">
              <button
                type="button"
                onClick={addEmergencyContact}

                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"

              >
                Add Another Contact
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={clearForm}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"

            >
              Clear Form
            </button>
            <button
              type="button"
              onClick={handleSubmit}

              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"

              disabled={isLoading}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"

            >

              REGISTER PATIENT

            </button>
          </div>

          <p className="text-center text-sm text-gray-600 pt-4 border-t border-gray-200">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onLoginClick}
              className="text-blue-600 hover:text-blue-800 underline font-medium"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;