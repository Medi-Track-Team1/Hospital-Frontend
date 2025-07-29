import React, { useState } from "react";

const PatientRegistrationForm = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    bloodGroup: "",
    gender: "",
    maritalStatus: "",
    city: "",
    states: "",
    zipCode: "",
    contactNumber: "",
    email: "",
    address: "",
  });

  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: "", phone: "", relation: "", email: "" },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmergencyContactChange = (id, field, value) => {
    setEmergencyContacts((prev) =>
      prev.map((contact) =>
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    );
  };

  const addEmergencyContact = () => {
    const newId = Math.max(...emergencyContacts.map((c) => c.id), 0) + 1;
    setEmergencyContacts((prev) => [
      ...prev,
      { id: newId, name: "", phone: "", relation: "", email: "" },
    ]);
  };

  const removeEmergencyContact = (id) => {
    if (emergencyContacts.length > 1) {
      setEmergencyContacts((prev) =>
        prev.filter((contact) => contact.id !== id)
      );
    }
  };

  const handleClearForm = () => {
    setFormData({
      patientName: "",
      age: "",
      bloodGroup: "",
      gender: "",
      maritalStatus: "",
      city: "",
      states: "",
      zipCode: "",
      contactNumber: "",
      email: "",
      address: "",
    });
    setEmergencyContacts([
      { id: 1, name: "", phone: "", relation: "", email: "" },
    ]);
  };

  const handleRegisterPatient = () => {
    console.log("Patient registration data:", { formData, emergencyContacts });
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "14px",
    backgroundColor: "#ffffff",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const sectionStyle = {
    backgroundColor: "#ffffff",
    padding: "32px",
    borderRadius: "12px",
    marginBottom: "24px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
  };

  const sectionTitleStyle = {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1e40af",
    marginBottom: "24px",
    fontFamily: "Arial, sans-serif",
    paddingBottom: "8px",
  };

  const rowStyle = {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  };

  const columnStyle = {
    flex: 1,
  };

  const fullWidthStyle = {
    width: "100%",
    marginBottom: "20px",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "100px",
    resize: "vertical",
    fontFamily: "Arial, sans-serif",
  };

  const buttonStyle = {
    padding: "14px 28px",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  const clearButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#ffffff",
    color: "#3b82f6",
    marginRight: "16px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  };

  const registerButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#3b82f6",
    color: "#ffffff",
  };

  const containerStyle = {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "24px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8fafc",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "32px",
  };

  const addContactButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    marginTop: "20px",
    alignSelf: "flex-start",
    fontSize: "13px",
    padding: "10px 20px",
  };

  const removeContactButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#ef4444",
    color: "#ffffff",
    fontSize: "12px",
    padding: "8px 16px",
    marginLeft: "12px",
  };

  const contactContainerStyle = {
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "16px",
    backgroundColor: "#f9fafb",
  };

  const contactHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  };

  const contactTitleStyle = {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1e40af",
  };

  const requiredStyle = {
    color: "#ef4444",
    marginLeft: "4px",
    fontSize: "16px",
  };

  return (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Personal Details</h2>
        <div style={rowStyle}>
          <div style={columnStyle}>
            <input
              type="text"
              name="patientName"
              placeholder="Patient Name *"
              value={formData.patientName}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={columnStyle}>
            <input
              type="number"
              name="age"
              placeholder="Age *"
              value={formData.age}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />
          </div>
        </div>
        <div style={rowStyle}>
          <div style={columnStyle}>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              style={inputStyle}
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
          <div style={columnStyle}>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              style={inputStyle}
              required
            >
              <option value="">Gender *</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div style={columnStyle}>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleInputChange}
              style={inputStyle}
            >
              <option value="">Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>
        </div>
        <div style={rowStyle}>
          <div style={columnStyle}>
            <input
              type="text"
              name="city"
              placeholder="City *"
              value={formData.city}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={columnStyle}>
            <input
              type="text"
              name="states"
              placeholder="States *"
              value={formData.states}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={columnStyle}>
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
        </div>
        <div style={rowStyle}>
          <div style={columnStyle}>
            <input
              type="tel"
              name="contactNumber"
              placeholder="Contact Number *"
              value={formData.contactNumber}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={columnStyle}>
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleInputChange}
              style={inputStyle}
              required
            />
          </div>
        </div>
        <div style={fullWidthStyle}>
          <textarea
            name="address"
            placeholder="Address *"
            value={formData.address}
            onChange={handleInputChange}
            style={textareaStyle}
            required
          />
        </div>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>
          Emergency Contact & Medical Information
        </h2>
        {emergencyContacts.map((contact, index) => (
          <div key={contact.id} style={contactContainerStyle}>
            <div style={contactHeaderStyle}>
              <span style={contactTitleStyle}>
                Emergency Contact {index + 1}
              </span>
              {emergencyContacts.length > 1 && (
                <button
                  style={removeContactButtonStyle}
                  onClick={() => removeEmergencyContact(contact.id)}
                >
                  Remove Contact
                </button>
              )}
            </div>
            <div style={rowStyle}>
              <div style={columnStyle}>
                <input
                  type="text"
                  placeholder="Emergency Contact Name"
                  value={contact.name}
                  onChange={(e) =>
                    handleEmergencyContactChange(
                      contact.id,
                      "name",
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />
              </div>
              <div style={columnStyle}>
                <input
                  type="tel"
                  placeholder="Emergency Contact Phone"
                  value={contact.phone}
                  onChange={(e) =>
                    handleEmergencyContactChange(
                      contact.id,
                      "phone",
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />
              </div>
            </div>
            <div style={rowStyle}>
              <div style={columnStyle}>
                <input
                  type="text"
                  placeholder="Relation"
                  value={contact.relation}
                  onChange={(e) =>
                    handleEmergencyContactChange(
                      contact.id,
                      "relation",
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />
              </div>
              <div style={columnStyle}>
                <input
                  type="email"
                  placeholder="Email"
                  value={contact.email}
                  onChange={(e) =>
                    handleEmergencyContactChange(
                      contact.id,
                      "email",
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        ))}
        <button style={addContactButtonStyle} onClick={addEmergencyContact}>
          Add Another Contact
        </button>
      </div>

      <div style={buttonContainerStyle}>
        <button style={clearButtonStyle} onClick={handleClearForm}>
          Clear Form
        </button>
        <button style={registerButtonStyle} onClick={handleRegisterPatient}>
          REGISTER PATIENT
        </button>
      </div>
    </div>
  );
};

export default PatientRegistrationForm;
