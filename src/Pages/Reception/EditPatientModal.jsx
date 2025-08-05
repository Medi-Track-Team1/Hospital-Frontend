import React, { useState, useEffect } from 'react';
import { X, Edit, User, MapPin, Phone, Save, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

// Mock toast implementation
const toast = {
  success: (message, options) => {
    console.log('SUCCESS:', message);
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 transition-all duration-300';
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => document.body.removeChild(notification), 300);
    }, options?.autoClose || 5000);
  },
  error: (message, options) => {
    console.log('ERROR:', message);
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 transition-all duration-300';
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
        </svg>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => document.body.removeChild(notification), 300);
    }, options?.autoClose || 7000);
  },
  info: (message) => {
    console.log('INFO:', message);
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 transition-all duration-300';
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
        </svg>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 4000);
  }
};

const EditPatientModal = ({
  isOpen,
  onClose,
  patient,
  onSave,
  isSubmitting,
  submitStatus
}) => {
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    age: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    maritalStatus: '',
    city: '',
    state: '',
    zipCode: '',
    address: '',
    patientEmail: '',
    contactNumber: '',
    password: ''
  });

  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: '', phone: '', relation: '', email: '' }
  ]);

  const [errors, setErrors] = useState({});

  // Initialize form data when patient changes
  useEffect(() => {
    if (patient) {
      setFormData({
        patientId: patient.id || '',
        patientName: patient.name || '',
        age: patient.age || '',
        dateOfBirth: patient.dateOfBirth || '',
        gender: patient.gender || '',
        bloodGroup: patient.bloodGroup || '',
        maritalStatus: patient.maritalStatus || '',
        city: patient.city || '',
        state: patient.state || '',
        zipCode: patient.zipCode || '',
        address: patient.rawAddress || patient.address || '',
        patientEmail: patient.patientEmail || '',
        contactNumber: patient.contactNumber || '',
        password: patient.password || ''
      });

      // Set emergency contacts
      if (patient.emergencyContacts && patient.emergencyContacts.length > 0) {
        const contacts = patient.emergencyContacts.map((contact, index) => ({
          id: index + 1,
          name: contact.name || '',
          phone: contact.phone || '',
          relation: contact.relation || '',
          email: contact.email || ''
        }));
        setEmergencyContacts(contacts);
      } else {
        setEmergencyContacts([{ id: 1, name: '', phone: '', relation: '', email: '' }]);
      }
    }
  }, [patient]);

  if (!isOpen || !patient) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
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

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.patientName.trim()) {
      newErrors.patientName = "Patient name is required";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (formData.age < 1 || formData.age > 120) {
      newErrors.age = "Age must be between 1 and 120";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      // Validate date of birth is not in the future
      const today = new Date();
      const dob = new Date(formData.dateOfBirth);
      if (dob > today) {
        newErrors.dateOfBirth = "Date of birth cannot be in the future";
      }
    }

    if (!formData.bloodGroup) {
      newErrors.bloodGroup = "Blood group is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    } else if (formData.contactNumber.length < 10) {
      newErrors.contactNumber = "Contact number must be at least 10 digits";
    }

    if (!formData.patientEmail.trim()) {
      newErrors.patientEmail = "Email address is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.patientEmail)) {
        newErrors.patientEmail = "Please enter a valid email address";
      }
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    // Prepare data for save
    const dataToSave = {
      ...formData,
      emergencyContacts: emergencyContacts.filter(contact =>
        contact.name.trim() || contact.phone.trim() || contact.relation.trim() || contact.email.trim()
      )
    };

    onSave(dataToSave);
  };

  // Styling functions
  const getInputStyle = (fieldName) => ({
    width: "100%",
    padding: "12px 16px",
    border: `1px solid ${errors[fieldName] ? '#ef4444' : '#e5e7eb'}`,
    borderRadius: "8px",
    fontSize: "14px",
    backgroundColor: "#ffffff",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
    opacity: isSubmitting ? 0.5 : 1,
    cursor: isSubmitting ? 'not-allowed' : 'text',
  });

  const labelStyle = {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "8px",
    fontFamily: "Arial, sans-serif",
  };

  const errorTextStyle = {
    color: "#ef4444",
    fontSize: "12px",
    marginTop: "4px",
    display: "block",
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

  const getTextareaStyle = (fieldName) => ({
    ...getInputStyle(fieldName),
    minHeight: "100px",
    resize: "vertical",
    fontFamily: "Arial, sans-serif",
  });

  const buttonStyle = {
    padding: "14px 28px",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: isSubmitting ? "not-allowed" : "pointer",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    opacity: isSubmitting ? 0.6 : 1,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    justifyContent: "center",
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#ffffff",
    color: "#3b82f6",
    marginRight: "16px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  };

  const saveButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#3b82f6",
    color: "#ffffff",
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

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "32px",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Edit className="h-6 w-6" />
            <div>
              <h2 className="text-xl font-bold">Edit Patient Information</h2>
              <p className="text-blue-100 text-sm">Patient ID: {formData.patientId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-700 rounded-lg p-2 transition-colors"
            disabled={isSubmitting}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px", fontFamily: "Arial, sans-serif", backgroundColor: "#f8fafc" }}>
          {/* Success/Error Status */}
          {submitStatus && (
            <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              submitStatus === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {submitStatus === 'success' ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              <span className="font-medium">
                {submitStatus === 'success'
                  ? 'Patient information updated successfully!'
                  : 'There was an error processing your request. Please check the form and try again.'
                }
              </span>
            </div>
          )}

          {/* Personal Details Section */}
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Personal Details</h2>
            <div style={rowStyle}>
              <div style={columnStyle}>
                <label style={labelStyle}>Patient Name *</label>
                <input
                  type="text"
                  name="patientName"
                  placeholder="Enter patient name"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  style={getInputStyle('patientName')}
                  disabled={isSubmitting}
                  required
                />
                {errors.patientName && (
                  <span style={errorTextStyle}>{errors.patientName}</span>
                )}
              </div>
              <div style={columnStyle}>
                <label style={labelStyle}>Age *</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={handleInputChange}
                  style={getInputStyle('age')}
                  disabled={isSubmitting}
                  min="1"
                  max="120"
                  required
                />
                {errors.age && (
                  <span style={errorTextStyle}>{errors.age}</span>
                )}
              </div>
              <div style={columnStyle}>
                <label style={labelStyle}>Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  placeholder="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  style={getInputStyle('dateOfBirth')}
                  disabled={isSubmitting}
                  required
                />
                {errors.dateOfBirth && (
                  <span style={errorTextStyle}>{errors.dateOfBirth}</span>
                )}
              </div>
            </div>
            <div style={rowStyle}>
              <div style={columnStyle}>
                <label style={labelStyle}>Blood Group *</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  style={getInputStyle('bloodGroup')}
                  disabled={isSubmitting}
                  required
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
                {errors.bloodGroup && (
                  <span style={errorTextStyle}>{errors.bloodGroup}</span>
                )}
              </div>
              <div style={columnStyle}>
                <label style={labelStyle}>Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  style={getInputStyle('gender')}
                  disabled={isSubmitting}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <span style={errorTextStyle}>{errors.gender}</span>
                )}
              </div>
              <div style={columnStyle}>
                <label style={labelStyle}>Marital Status</label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  style={getInputStyle('maritalStatus')}
                  disabled={isSubmitting}
                >
                  <option value="">Select marital status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>
            </div>
            <div style={rowStyle}>
              <div style={columnStyle}>
                <label style={labelStyle}>City *</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleInputChange}
                  style={getInputStyle('city')}
                  disabled={isSubmitting}
                  required
                />
                {errors.city && (
                  <span style={errorTextStyle}>{errors.city}</span>
                )}
              </div>
              <div style={columnStyle}>
                <label style={labelStyle}>State *</label>
                <input
                  type="text"
                  name="state"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={handleInputChange}
                  style={getInputStyle('state')}
                  disabled={isSubmitting}
                  required
                />
                {errors.state && (
                  <span style={errorTextStyle}>{errors.state}</span>
                )}
              </div>
              <div style={columnStyle}>
                <label style={labelStyle}>ZIP Code *</label>
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Enter ZIP code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  style={getInputStyle('zipCode')}
                  disabled={isSubmitting}
                  required
                />
                {errors.zipCode && (
                  <span style={errorTextStyle}>{errors.zipCode}</span>
                )}
              </div>
            </div>
            <div style={rowStyle}>
              <div style={columnStyle}>
                <label style={labelStyle}>Contact Number *</label>
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Enter contact number"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  style={getInputStyle('contactNumber')}
                  disabled={isSubmitting}
                  required
                />
                {errors.contactNumber && (
                  <span style={errorTextStyle}>{errors.contactNumber}</span>
                )}
              </div>
              <div style={columnStyle}>
                <label style={labelStyle}>Email Address *</label>
                <input
                  type="email"
                  name="patientEmail"
                  placeholder="Enter email address"
                  value={formData.patientEmail}
                  onChange={handleInputChange}
                  style={getInputStyle('patientEmail')}
                  disabled={isSubmitting}
                  required
                />
                {errors.patientEmail && (
                  <span style={errorTextStyle}>{errors.patientEmail}</span>
                )}
              </div>
              <div style={columnStyle}>
                <label style={labelStyle}>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Leave empty to keep current"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={getInputStyle('password')}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div style={fullWidthStyle}>
              <label style={labelStyle}>Address *</label>
              <textarea
                name="address"
                placeholder="Enter full address"
                value={formData.address}
                onChange={handleInputChange}
                style={getTextareaStyle('address')}
                disabled={isSubmitting}
                required
              />
              {errors.address && (
                <span style={errorTextStyle}>{errors.address}</span>
              )}
            </div>
          </div>

          {/* Emergency Contact Section */}
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
                      disabled={isSubmitting}
                    >
                      Remove Contact
                    </button>
                  )}
                </div>
                <div style={rowStyle}>
                  <div style={columnStyle}>
                    <label style={labelStyle}>Emergency Contact Name</label>
                    <input
                      type="text"
                      placeholder="Enter emergency contact name"
                      value={contact.name}
                      onChange={(e) =>
                        handleEmergencyContactChange(
                          contact.id,
                          "name",
                          e.target.value
                        )
                      }
                      style={getInputStyle('')}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div style={columnStyle}>
                    <label style={labelStyle}>Emergency Contact Phone</label>
                    <input
                      type="tel"
                      placeholder="Enter emergency contact phone"
                      value={contact.phone}
                      onChange={(e) =>
                        handleEmergencyContactChange(
                          contact.id,
                          "phone",
                          e.target.value
                        )
                      }
                      style={getInputStyle('')}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div style={rowStyle}>
                  <div style={columnStyle}>
                    <label style={labelStyle}>Relationship</label>
                    <input
                      type="text"
                      placeholder="e.g., Mother, Father, Spouse"
                      value={contact.relation}
                      onChange={(e) =>
                        handleEmergencyContactChange(
                          contact.id,
                          "relation",
                          e.target.value
                        )
                      }
                      style={getInputStyle('')}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div style={columnStyle}>
                    <label style={labelStyle}>Email</label>
                    <input
                      type="email"
                      placeholder="Enter emergency contact email"
                      value={contact.email}
                      onChange={(e) =>
                        handleEmergencyContactChange(
                          contact.id,
                          "email",
                          e.target.value
                        )
                      }
                      style={getInputStyle('')}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              style={addContactButtonStyle}
              onClick={addEmergencyContact}
              disabled={isSubmitting}
            >
              Add Another Contact
            </button>
          </div>

          {/* Action Buttons */}
          <div style={buttonContainerStyle}>
            <button
              style={cancelButtonStyle}
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              style={saveButtonStyle}
              onClick={handleSave}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid transparent',
                    borderTop: '2px solid currentColor',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Processing...
                </>
              ) : (
                'UPDATE PATIENT'
              )}
            </button>
          </div>

          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      </div>
    </div>
  );
};

export default EditPatientModal;