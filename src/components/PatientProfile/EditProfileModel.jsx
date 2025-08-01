import React, { useState } from 'react';
import {
  X, User, Phone, Mail, MapPin, Heart, Calendar, FileText,
  Users, Shield, Save, AlertCircle
} from 'lucide-react';

const EditProfileModal = ({ patient, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: patient?.firstName || '',
    phone: patient?.phone || '',
    email: patient?.email || '',
    dateOfBirth: patient?.dateOfBirth || '',
    age: patient?.age || '',
    gender: patient?.gender || '',
    bloodType: patient?.bloodType || '',
    maritalStatus: patient?.maritalStatus || '',
    address: {
      street: patient?.address?.street || '',
      city: patient?.address?.city || '',
      state: patient?.address?.state || '',
      zipCode: patient?.address?.zipCode || ''
    },
    emergencyContact: {
      name: patient?.emergencyContact?.name || '',
      relationship: patient?.emergencyContact?.relationship || '',
      phone: patient?.emergencyContact?.phone || '',
      email: patient?.emergencyContact?.email || ''
    },
    insurance: {
      provider: patient?.insurance?.provider || '',
      policyNumber: patient?.insurance?.policyNumber || '',
      groupNumber: patient?.insurance?.groupNumber || '',
      planType: patient?.insurance?.planType || ''
    },
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [activeSection, setActiveSection] = useState('personal');
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleInputChange = (section, field, value) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Always validate basic fields
    if (!formData.firstName.trim()) newErrors.firstName = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    
    // Only validate password fields if on password section
    if (activeSection === 'changePassword') {
      if (!formData.oldPassword) newErrors.oldPassword = 'Old password is required';
      if (!formData.newPassword) newErrors.newPassword = 'New password is required';
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'emergency', label: 'Emergency', icon: Users },
    { id: 'changePassword', label: 'Change Password', icon: Shield }
  ];

  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
  const bloodTypeOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const maritalStatusOptions = ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'];
  const relationshipOptions = ['Spouse', 'Parent', 'Child', 'Sibling', 'Friend', 'Other'];

  const InputField = ({ label, value, onChange, type = 'text', required = false, error, options = null, placeholder = '' }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
            error ? 'border-destructive' : 'border-border'
          } bg-background text-foreground`}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
            error ? 'border-destructive' : 'border-border'
          } bg-background text-foreground`}
        />
      )}
      {error && (
        <div className="flex items-center gap-1 text-destructive text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl border border-border overflow-hidden">
        <div className="bg-primary text-primary-foreground p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-foreground/20 rounded-2xl flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Edit Profile</h2>
              <p className="text-primary-foreground/80">Update your personal information</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-primary-foreground/20 rounded-xl transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-120px)]">
          <div className="w-full lg:w-64 bg-muted/30 p-4 lg:p-6 border-b lg:border-b-0 lg:border-r border-border">
            <div className="space-y-2">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 text-left ${
                      activeSection === section.id
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
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
              {activeSection === 'personal' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <User className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">Personal Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Name"
                      value={formData.firstName}
                      onChange={(value) => handleInputChange(null, 'firstName', value)}
                      required
                      error={errors.firstName}
                    />
                    <InputField
                      label="Date of Birth"
                      value={formData.dateOfBirth}
                      onChange={(value) => handleInputChange(null, 'dateOfBirth', value)}
                      type="date"
                      required
                      error={errors.dateOfBirth}
                    />
                    <InputField
                      label="Age"
                      value={formData.age}
                      onChange={(value) => handleInputChange(null, 'age', value)}
                      type="number"
                      placeholder="Enter age"
                    />
                    <InputField
                      label="Gender"
                      value={formData.gender}
                      onChange={(value) => handleInputChange(null, 'gender', value)}
                      options={genderOptions}
                    />
                    <InputField
                      label="Blood Group"
                      value={formData.bloodType}
                      onChange={(value) => handleInputChange(null, 'bloodType', value)}
                      options={bloodTypeOptions}
                    />
                    <InputField
                      label="Marital Status"
                      value={formData.maritalStatus}
                      onChange={(value) => handleInputChange(null, 'maritalStatus', value)}
                      options={maritalStatusOptions}
                    />
                  </div>
                </div>
              )}

              {activeSection === 'contact' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Phone className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">Contact Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Phone Number"
                      value={formData.phone}
                      onChange={(value) => handleInputChange(null, 'phone', value)}
                      type="tel"
                      required
                      error={errors.phone}
                      placeholder="(555) 123-4567"
                    />
                    <InputField
                      label="Email Address"
                      value={formData.email}
                      onChange={(value) => handleInputChange(null, 'email', value)}
                      type="email"
                      required
                      error={errors.email}
                    />
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Address
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <InputField
                          label="Street Address"
                          value={formData.address.street}
                          onChange={(value) => handleInputChange('address', 'street', value)}
                          placeholder="123 Main Street"
                        />
                      </div>
                      <InputField
                        label="City"
                        value={formData.address.city}
                        onChange={(value) => handleInputChange('address', 'city', value)}
                      />
                      <InputField
                        label="State"
                        value={formData.address.state}
                        onChange={(value) => handleInputChange('address', 'state', value)}
                      />
                      <InputField
                        label="ZIP Code"
                        value={formData.address.zipCode}
                        onChange={(value) => handleInputChange('address', 'zipCode', value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'emergency' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">Emergency Contact</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Contact Name"
                      value={formData.emergencyContact.name}
                      onChange={(value) => handleInputChange('emergencyContact', 'name', value)}
                    />
                    <InputField
                      label="Relationship"
                      value={formData.emergencyContact.relationship}
                      onChange={(value) => handleInputChange('emergencyContact', 'relationship', value)}
                      options={relationshipOptions}
                    />
                    <InputField
                      label="Phone Number"
                      value={formData.emergencyContact.phone}
                      onChange={(value) => handleInputChange('emergencyContact', 'phone', value)}
                      type="tel"
                      placeholder="(555) 123-4567"
                    />
                    <InputField
                      label="Email"
                      value={formData.emergencyContact.email}
                      onChange={(value) => handleInputChange('emergencyContact', 'email', value)}
                      type="email"
                      placeholder="emergency@example.com"
                    />
                  </div>
                </div>
              )}

              {activeSection === 'changePassword' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">Change Password</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-6 max-w-md">
                    <InputField
                      label="Current Password"
                      type="password"
                      value={formData.oldPassword}
                      onChange={(value) => handleInputChange(null, 'oldPassword', value)}
                      required
                      error={errors.oldPassword}
                      placeholder="Enter current password"
                    />
                    <InputField
                      label="New Password"
                      type="password"
                      value={formData.newPassword}
                      onChange={(value) => handleInputChange(null, 'newPassword', value)}
                      required
                      error={errors.newPassword}
                      placeholder="Enter new password"
                    />
                    <InputField
                      label="Confirm New Password"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(value) => handleInputChange(null, 'confirmPassword', value)}
                      required
                      error={errors.confirmPassword}
                      placeholder="Confirm new password"
                    />
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Password Requirements:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
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

        <div className="border-t border-border p-6 bg-muted/20">
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-muted text-muted-foreground rounded-xl hover:bg-muted/80 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium shadow-lg"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;