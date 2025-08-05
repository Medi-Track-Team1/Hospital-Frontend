import React, { useState, useEffect, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  X,
  User,
  Phone,
  MapPin,
  Users,
  Shield,
  Save,
  AlertCircle,
  Loader2,
} from "lucide-react";

const EditProfileModal = ({ patient, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    contactNumber: "",
    patientEmail: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    bloodGroup: "",
    maritalStatus: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    emergencyContacts: {
      name: "",
      relationship: "",
      phone: "",
      email: "",
    },
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [activeSection, setActiveSection] = useState("personal");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && patient) {
      setFormData({
        patientName: patient.patientName || "",
        contactNumber: patient.contactNumber || "",
        patientEmail: patient.patientEmail || "",
        dateOfBirth: patient.dateOfBirth || "",
        age: patient.age || "",
        gender: patient.gender || "",
        bloodGroup: patient.bloodGroup || "",
        maritalStatus: patient.maritalStatus || "",
        address: patient.address || "",
        city: patient.city || "",
        state: patient.state || "",
        zipCode: patient.zipCode || "",
        emergencyContacts: patient.emergencyContacts?.[0] || {
          name: "",
          relationship: "",
          phone: "",
          email: "",
        },
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({});
      setActiveSection("personal");
    }
  }, [isOpen, patient]);

  const handleInputChange = useCallback((section, field, value) => {
    if (section === "emergencyContacts") {
      setFormData((prev) => ({
        ...prev,
        emergencyContacts: {
          ...prev.emergencyContacts,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

    setErrors((prev) => {
      if (prev[field]) {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      }
      return prev;
    });
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.patientName.trim())
      newErrors.patientName = "Name is required";
    if (!formData.patientEmail.trim())
      newErrors.patientEmail = "Email is required";
    if (!formData.contactNumber.trim())
      newErrors.contactNumber = "Phone is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";

    if (activeSection === "changePassword" && !formData.oldPassword.trim()) {
      newErrors.oldPassword = "Current password is required to change password";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      formData.patientEmail &&
      !emailRegex.test(formData.patientEmail.trim())
    ) {
      newErrors.patientEmail = "Please enter a valid email address";
    }

    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    if (
      formData.contactNumber &&
      !phoneRegex.test(formData.contactNumber.trim())
    ) {
      newErrors.contactNumber = "Please enter a valid phone number";
    }

    if (
      formData.age &&
      (parseInt(formData.age) < 0 || parseInt(formData.age) > 150)
    ) {
      newErrors.age = "Please enter a valid age";
    }

    if (formData.dateOfBirth) {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      if (dob > today) {
        newErrors.dateOfBirth = "Date of birth cannot be in the future";
      }
    }

    if (activeSection === "changePassword") {
      if (!formData.newPassword.trim())
        newErrors.newPassword = "New password is required";
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      if (formData.newPassword && formData.newPassword.length < 8) {
        newErrors.newPassword = "Password must be at least 8 characters long";
      }

      if (formData.newPassword) {
        const hasUpperCase = /[A-Z]/.test(formData.newPassword);
        const hasLowerCase = /[a-z]/.test(formData.newPassword);
        const hasNumbers = /\d/.test(formData.newPassword);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(
          formData.newPassword
        );

        if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
          newErrors.newPassword =
            "Password must contain uppercase, lowercase, number, and special character";
        }
      }
    }

    if (formData.emergencyContacts.name.trim()) {
      if (
        formData.emergencyContacts.phone &&
        !phoneRegex.test(formData.emergencyContacts.phone.trim())
      ) {
        newErrors.emergencyPhone =
          "Please enter a valid emergency contact phone number";
      }
      if (
        formData.emergencyContacts.email &&
        !emailRegex.test(formData.emergencyContacts.email.trim())
      ) {
        newErrors.emergencyEmail =
          "Please enter a valid emergency contact email";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, activeSection]);

  const handleSave = useCallback(async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const updatePayload = {
        patientName: formData.patientName.trim(),
        contactNumber: formData.contactNumber.trim(),
        patientEmail: formData.patientEmail.trim().toLowerCase(),
        dateOfBirth: formData.dateOfBirth,
        age: formData.age ? parseInt(formData.age) : null,
        gender: formData.gender || null,
        bloodGroup: formData.bloodGroup || null,
        maritalStatus: formData.maritalStatus || null,
        address: formData.address.trim() || null,
        city: formData.city.trim() || null,
        state: formData.state.trim() || null,
        zipCode: formData.zipCode.trim() || null,
        password: formData.oldPassword.trim(),
        emergencyContacts: formData.emergencyContacts,
      };

      if (formData.emergencyContacts.name.trim()) {
        updatePayload.emergencyContacts = [
          {
            name: formData.emergencyContacts.name.trim(),
            relationship: formData.emergencyContacts.relationship || "Other",
            phone: formData.emergencyContacts.phone.trim() || null,
            email: formData.emergencyContacts.email.trim() || null,
          },
        ];
      } else {
        updatePayload.emergencyContacts = [];
      }

      if (activeSection === "changePassword" && formData.newPassword) {
        updatePayload.newPassword = formData.newPassword;
      }

      const response = await fetch(
        `https://patient-service-ntk0.onrender.com/api/patient/update/${patient.patientId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(updatePayload),
        }
      );

      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        const validationErrors = {};
        const errorObj = result.errors || result.error || {};
        Object.keys(errorObj).forEach((field) => {
          if (field === "password") {
            validationErrors.oldPassword = errorObj[field];
          } else {
            validationErrors[field] = errorObj[field];
          }
        });

        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          throw new Error("Please correct the validation errors");
        }

        throw new Error(
          result.message || "Failed to update patient information"
        );
      }

      if (result.success || response.ok) {
        onSave(result.data || updatePayload);
        toast.success("Profile updated successfully!");

        setFormData((prev) => ({
          ...prev,
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
        onClose();
      } else {
        throw new Error(result.message || "Update failed");
      }
    } catch (error) {
      if (!Object.keys(errors).length) {
        toast.error(`Error updating profile: ${error.message}`);
      }

      const errorMessage = error.message.toLowerCase();
      if (errorMessage.includes("email")) {
        setErrors((prev) => ({ ...prev, patientEmail: error.message }));
      } else if (
        errorMessage.includes("phone") ||
        errorMessage.includes("contact")
      ) {
        setErrors((prev) => ({ ...prev, contactNumber: error.message }));
      } else if (errorMessage.includes("password")) {
        setErrors((prev) => ({ ...prev, oldPassword: error.message }));
      } else if (errorMessage.includes("name")) {
        setErrors((prev) => ({ ...prev, patientName: error.message }));
      }
    } finally {
      setIsLoading(false);
    }
  }, [formData, activeSection, patient, validateForm, onSave, onClose, errors]);

  // Memoize the input field component to prevent unnecessary re-renders
  const InputField = useCallback(
    ({
      label,
      value,
      onChange,
      type = "text",
      required = false,
      error,
      options = null,
      placeholder = "",
    }) => (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {options ? (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              error ? "border-red-500" : "border-gray-300"
            } bg-white text-gray-900`}
          >
            <option value="">Select {label.toLowerCase()}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              error ? "border-red-500" : "border-gray-300"
            } bg-white text-gray-900`}
          />
        )}
        {error && (
          <div className="flex items-center gap-1 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </div>
    ),
    []
  );

  if (!isOpen) return null;

  const sections = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "contact", label: "Contact", icon: Phone },
    { id: "emergency", label: "Emergency", icon: Users },
    { id: "changePassword", label: "Change Password", icon: Shield },
  ];

  const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];
  const bloodTypeOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const maritalStatusOptions = [
    "Single",
    "Married",
    "Divorced",
    "Widowed",
    "Separated",
  ];
  const relationshipOptions = [
    "Spouse",
    "Parent",
    "Child",
    "Sibling",
    "Friend",
    "Other",
  ];

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* ToastContainer will show notifications only when this modal is open */}
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="bg-blue-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Edit Profile</h2>
              <p className="text-blue-100">Update your personal information</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-colors"
            aria-label="Close modal"
            type="button"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-120px)]">
          <div className="w-full lg:w-64 bg-gray-50 p-4 lg:p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
            <div className="space-y-2">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 text-left ${
                      activeSection === section.id
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    type="button"
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="hidden lg:inline">{section.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {activeSection === "personal" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <User className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">
                      Personal Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Patient Name"
                      value={formData.patientName}
                      onChange={(value) =>
                        handleInputChange(null, "patientName", value)
                      }
                      required
                      error={errors.patientName}
                    />
                    <InputField
                      label="Date of Birth"
                      value={formData.dateOfBirth}
                      onChange={(value) =>
                        handleInputChange(null, "dateOfBirth", value)
                      }
                      type="date"
                      required
                      error={errors.dateOfBirth}
                    />
                    <InputField
                      label="Age"
                      value={formData.age}
                      onChange={(value) =>
                        handleInputChange(null, "age", value)
                      }
                      type="number"
                      placeholder="Enter age"
                    />
                    <InputField
                      label="Gender"
                      value={formData.gender}
                      onChange={(value) =>
                        handleInputChange(null, "gender", value)
                      }
                      options={genderOptions}
                    />
                    <InputField
                      label="Blood Group"
                      value={formData.bloodGroup}
                      onChange={(value) =>
                        handleInputChange(null, "bloodGroup", value)
                      }
                      options={bloodTypeOptions}
                    />
                    <InputField
                      label="Marital Status"
                      value={formData.maritalStatus}
                      onChange={(value) =>
                        handleInputChange(null, "maritalStatus", value)
                      }
                      options={maritalStatusOptions}
                    />
                  </div>
                </div>
              )}

              {activeSection === "contact" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Phone className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">
                      Contact Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Phone Number"
                      value={formData.contactNumber}
                      onChange={(value) =>
                        handleInputChange(null, "contactNumber", value)
                      }
                      type="tel"
                      required
                      error={errors.contactNumber}
                      placeholder="(555) 123-4567"
                    />
                    <InputField
                      label="Email Address"
                      value={formData.patientEmail}
                      onChange={(value) =>
                        handleInputChange(null, "patientEmail", value)
                      }
                      type="email"
                      required
                      error={errors.patientEmail}
                    />
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Address
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <InputField
                          label="Street Address"
                          value={formData.address}
                          onChange={(value) =>
                            handleInputChange(null, "address", value)
                          }
                          placeholder="123 Main Street"
                        />
                      </div>
                      <InputField
                        label="City"
                        value={formData.city}
                        onChange={(value) =>
                          handleInputChange(null, "city", value)
                        }
                      />
                      <InputField
                        label="State"
                        value={formData.state}
                        onChange={(value) =>
                          handleInputChange(null, "state", value)
                        }
                      />
                      <InputField
                        label="ZIP Code"
                        value={formData.zipCode}
                        onChange={(value) =>
                          handleInputChange(null, "zipCode", value)
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "emergency" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">
                      Emergency Contact
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Contact Name"
                      value={formData.emergencyContacts.name}
                      onChange={(value) =>
                        handleInputChange("emergencyContacts", "name", value)
                      }
                    />
                    <InputField
                      label="Relationship"
                      value={formData.emergencyContacts.relationship}
                      onChange={(value) =>
                        handleInputChange(
                          "emergencyContacts",
                          "relationship",
                          value
                        )
                      }
                      options={relationshipOptions}
                    />
                    <InputField
                      label="Phone Number"
                      value={formData.emergencyContacts.phone}
                      onChange={(value) =>
                        handleInputChange("emergencyContacts", "phone", value)
                      }
                      type="tel"
                      placeholder="(555) 123-4567"
                    />
                    <InputField
                      label="Email"
                      value={formData.emergencyContacts.email}
                      onChange={(value) =>
                        handleInputChange("emergencyContacts", "email", value)
                      }
                      type="email"
                      placeholder="emergency@example.com"
                    />
                  </div>
                </div>
              )}

              {activeSection === "changePassword" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">
                      Change Password
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-6 max-w-md">
                    <InputField
                      label="Current Password"
                      type="password"
                      value={formData.oldPassword}
                      onChange={(value) =>
                        handleInputChange(null, "oldPassword", value)
                      }
                      required
                      error={errors.oldPassword}
                      placeholder="Enter current password"
                    />
                    <InputField
                      label="New Password"
                      type="password"
                      value={formData.newPassword}
                      onChange={(value) =>
                        handleInputChange(null, "newPassword", value)
                      }
                      required
                      error={errors.newPassword}
                      placeholder="Enter new password"
                    />
                    <InputField
                      label="Confirm New Password"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(value) =>
                        handleInputChange(null, "confirmPassword", value)
                      }
                      required
                      error={errors.confirmPassword}
                      placeholder="Confirm new password"
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Password Requirements:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• At least 8 characters long</li>
                      <li>• Include uppercase and lowercase letters</li>
                      <li>• Include at least one number</li>
                      <li>• Include at least one special character</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium disabled:opacity-50"
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg disabled:opacity-50"
              type="button"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
