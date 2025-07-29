import React, { useState } from "react";
import { User, Phone, Mail, MapPin, Plus, X, Loader2 } from "lucide-react";

function Registration() {
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: "", phone: "", relation: "", email: "" },
  ]);

  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    bloodGroup: "",
    gender: "",
    maritalStatus: "",
    city: "",
    state: "",
    zipCode: "",
    address: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const addEmergencyContact = () => {
    const newContact = {
      id: Date.now(),
      name: "",
      phone: "",
      relation: "",
      email: "",
    };
    setEmergencyContacts([...emergencyContacts, newContact]);
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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear any previous status when user starts typing
    if (submitStatus) setSubmitStatus(null);
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
      address: "",
    });
    setEmergencyContacts([
      { id: 1, name: "", phone: "", relation: "", email: "" },
    ]);
    setSubmitStatus(null);
  };

  const validateForm = () => {
    const requiredFields = ['patientName', 'age', 'gender', 'bloodGroup', 'city', 'state', 'zipCode', 'address'];
    const missingFields = requiredFields.filter(field => {
      const value = formData[field];
      return !value || (typeof value === 'string' && !value.trim());
    });
    
    if (missingFields.length > 0) {
      alert(`Please fill in required fields: ${missingFields.join(', ')}`);
      return false;
    }

    // Validate emergency contacts
    const invalidContacts = emergencyContacts.filter(contact => 
      !contact.name.trim() || !contact.phone.trim() || !contact.relation.trim()
    );

    if (invalidContacts.length > 0) {
      alert('Please fill in all required emergency contact fields (Name, Phone, Relation)');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setSubmitStatus(null);

    try {
      // Prepare data for API
      const submissionData = {
        ...formData,
        age: parseInt(formData.age), // Convert age to number
        emergencyContacts: emergencyContacts.map(contact => ({
          name: contact.name,
          phone: contact.phone,
          relation: contact.relation,
          email: contact.email || null // Set empty email to null
        }))
      };

      const response = await fetch('http://localhost:8080/api/patient/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Registration successful:', result);
        setSubmitStatus('success');
        // Optionally clear form after successful submission
        // clearForm();
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Registration failed:', errorData);
        setSubmitStatus('error');
        alert(`Registration failed: ${errorData.message || 'Please try again'}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      setSubmitStatus('error');
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "Inter, system-ui, sans-serif",
    backgroundColor: "#ffffff",
    outline: "none",
    transition: "all 0.2s ease",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  };

  const selectStyle = {
    ...inputStyle,
    cursor: "pointer",
    appearance: "none",
    backgroundImage:
      "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
    backgroundPosition: "right 12px center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "16px",
    paddingRight: "40px",
  };

  const buttonStyle = {
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: "Inter, system-ui, sans-serif",
    cursor: "pointer",
    transition: "all 0.2s ease",
    border: "none",
    outline: "none",
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: isLoading ? "#9ca3af" : "#2563eb",
    color: "#ffffff",
    boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
    cursor: isLoading ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    justifyContent: "center",
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f3f4f6",
    color: "#374151",
    border: "1px solid #d1d5db",
    cursor: isLoading ? "not-allowed" : "pointer",
    opacity: isLoading ? 0.6 : 1,
  };

  const addButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#10b981",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
  };

  const sectionStyle = {
    backgroundColor: "#f8f9fa",
    padding: "24px",
    borderRadius: "12px",
    marginBottom: "24px",
    border: "1px solid #e9ecef",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  };

  const sectionHeaderStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "24px",
    fontFamily: "Inter, system-ui, sans-serif",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const statusMessageStyle = {
    padding: "12px 16px",
    borderRadius: "8px",
    marginBottom: "16px",
    fontSize: "14px",
    fontWeight: "500",
  };

  const successMessageStyle = {
    ...statusMessageStyle,
    backgroundColor: "#d1fae5",
    color: "#065f46",
    border: "1px solid #a7f3d0",
  };

  const errorMessageStyle = {
    ...statusMessageStyle,
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    border: "1px solid #fca5a5",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f1f5f9",
        padding: "40px 20px",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "32px" }}>
          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div style={successMessageStyle}>
              ✅ Patient registered successfully!
            </div>
          )}
          {submitStatus === 'error' && (
            <div style={errorMessageStyle}>
              ❌ Registration failed. Please try again.
            </div>
          )}

          {/* Personal Details Section */}
          <div style={sectionStyle}>
            <h2 style={sectionHeaderStyle}>
              <User size={20} />
              Personal Details
            </h2>

            <div style={{ display: "grid", gap: "20px" }}>
              {/* Row 1 */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                    }}
                  >
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter patient name"
                    value={formData.patientName}
                    onChange={(e) =>
                      handleInputChange("patientName", e.target.value)
                    }
                    style={inputStyle}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                    }}
                  >
                    Age *
                  </label>
                  <input
                    type="number"
                    placeholder="Enter age"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    style={inputStyle}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "20px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                    }}
                  >
                    Blood Group *
                  </label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) =>
                      handleInputChange("bloodGroup", e.target.value)
                    }
                    style={selectStyle}
                    disabled={isLoading}
                  >
                    <option value="">Select blood group</option>
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
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                    }}
                  >
                    Gender *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    style={selectStyle}
                    disabled={isLoading}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                    }}
                  >
                    Marital Status
                  </label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) =>
                      handleInputChange("maritalStatus", e.target.value)
                    }
                    style={selectStyle}
                    disabled={isLoading}
                  >
                    <option value="">Select status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
              </div>

              {/* Row 3 */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "20px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                    }}
                  >
                    City *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    style={inputStyle}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                    }}
                  >
                    State *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    style={inputStyle}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                    }}
                  >
                    Zip Code *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter zip code"
                    value={formData.zipCode}
                    onChange={(e) =>
                      handleInputChange("zipCode", e.target.value)
                    }
                    style={inputStyle}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                  }}
                >
                  Address *
                </label>
                <textarea
                  placeholder="Enter complete address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows={3}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: "80px",
                  }}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div style={sectionStyle}>
            <h2 style={sectionHeaderStyle}>
              <Phone size={20} />
              Emergency Contact & Medical Information
            </h2>

            {emergencyContacts.map((contact, index) => (
              <div
                key={contact.id}
                style={{
                  marginBottom:
                    index < emergencyContacts.length - 1 ? "32px" : "0",
                  padding: index > 0 ? "24px 0 0 0" : "0",
                  borderTop: index > 0 ? "1px solid #e5e7eb" : "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#374151",
                      margin: "0",
                    }}
                  >
                    Emergency Contact {index + 1}
                  </h3>
                  {emergencyContacts.length > 1 && (
                    <button
                      onClick={() => removeEmergencyContact(contact.id)}
                      style={{
                        ...buttonStyle,
                        backgroundColor: "#ef4444",
                        color: "#ffffff",
                        padding: "8px",
                        borderRadius: "6px",
                      }}
                      disabled={isLoading}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <div style={{ display: "grid", gap: "20px" }}>
                  {/* Row 1 */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "20px",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "8px",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#374151",
                        }}
                      >
                        Emergency Contact Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter contact name"
                        value={contact.name}
                        onChange={(e) =>
                          updateEmergencyContact(
                            contact.id,
                            "name",
                            e.target.value
                          )
                        }
                        style={inputStyle}
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "8px",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#374151",
                        }}
                      >
                        Emergency Contact Phone *
                      </label>
                      <input
                        type="tel"
                        placeholder="Enter phone number"
                        value={contact.phone}
                        onChange={(e) =>
                          updateEmergencyContact(
                            contact.id,
                            "phone",
                            e.target.value
                          )
                        }
                        style={inputStyle}
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "20px",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "8px",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#374151",
                        }}
                      >
                        Relation *
                      </label>
                      <select
                        value={contact.relation}
                        onChange={(e) =>
                          updateEmergencyContact(
                            contact.id,
                            "relation",
                            e.target.value
                          )
                        }
                        style={selectStyle}
                        disabled={isLoading}
                      >
                        <option value="">Select relation</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Parent">Parent</option>
                        <option value="Sibling">Sibling</option>
                        <option value="Child">Child</option>
                        <option value="Friend">Friend</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "8px",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#374151",
                        }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        value={contact.email}
                        onChange={(e) =>
                          updateEmergencyContact(
                            contact.id,
                            "email",
                            e.target.value
                          )
                        }
                        style={inputStyle}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: "24px", textAlign: "center" }}>
              <button 
                onClick={addEmergencyContact} 
                style={addButtonStyle}
                disabled={isLoading}
              >
                <Plus size={16} />
                Add Another Contact
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              paddingTop: "24px",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <button 
              onClick={clearForm} 
              style={secondaryButtonStyle}
              disabled={isLoading}
            >
              Clear Form
            </button>
            <button 
              onClick={handleSubmit} 
              style={primaryButtonStyle}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  Registering...
                </>
              ) : (
                'REGISTER PATIENT'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;