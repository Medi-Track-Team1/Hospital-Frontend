
import React, { useState } from 'react';
import { Calendar, X, CheckCircle } from 'lucide-react';

const Doctors = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    mobile: '',
    specialty: '',
    doctorName: '',
    patientType: 'new',
    preferredDate: '',
    otherDetails: ''
  });

  const doctors = [
    {
      name: 'Dr. Priyanka David',
      department: 'Department of General Medicine',
      specialty: 'General Medicine',
      qualification: 'MBBS, MD',
      designation: 'Chief Medical Officer',
      image: 'data:image/jpeg;base64,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',
    },
    {
      name: 'Dr. Hari Anand',
      department: 'Department of Cardiology',
      specialty: 'Cardiologist',
      qualification: 'MBBS, DM',
      designation: 'Senior Consultant',
      image: 'data:image/jpeg;base64,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',
    },
    {
      name: 'Dr. Anu Sherina ',
      department: 'Department of Neurology',
      specialty: 'Neurologist',
      qualification: 'MBBS, MD (Neuro)',
      designation: 'Neurology Consultant',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT-7R6jHW55Y8g0YGkU_EU-ouEHahX9SyhJtuosCzCrGHU8e38VGF7UEyoKuDpzOT_vQE&usqp=CAU',
    },
    {
      name: 'Dr. James Dharshan',
      department: 'Department of Orthopedics',
      specialty: 'Orthopedic Surgeon',
      qualification: 'MBBS, MS (Ortho)',
      designation: 'Orthopedic Consultant',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREL6ufFK4TA_K2m7Hjr5rcNTHnqjawSkQh2g&s',
    },
  ];

  const specialties = [
    'General Medicine',
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Dermatology',
    'Gynecology',
    'Psychiatry'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAppointmentRequest = (doctor) => {
    setFormData(prev => ({
      ...prev,
      doctorName: doctor.name
    }));
    setShowAppointmentForm(true);
    setSelectedDoctor(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment request:', formData);
    
    // Close the appointment form and show success modal
    setShowAppointmentForm(false);
    setShowSuccessModal(true);
    
    // Reset form data
    setFormData({
      patientName: '',
      email: '',
      doctorName: '',
      patientType: 'new',
      preferredDate: '',
      otherDetails: ''
    });
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  return (
    <section className="py-20 bg-white relative z-0">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Doctors</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our experienced team dedicated to providing exceptional care.
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              onClick={() => setSelectedDoctor(doctor)}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-xl cursor-pointer transition"
            >
              <div className="flex items-start space-x-6">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full object-cover shadow-md"
                />
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-1">
                    {doctor.name}
                  </h4>
                  <p className="text-blue-600 font-medium mb-1">
                    {doctor.specialty}
                  </p>
                  <p className="text-gray-500 text-sm">{doctor.designation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Doctor Details Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 relative animate-fade-in">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-blue-600 text-xl font-bold"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <img
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
                className="w-40 h-40 object-cover rounded shadow-md"
              />

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-blue-700 mb-1">{selectedDoctor.name}</h3>
                <p className="text-sm text-gray-700 mb-2">
                  {selectedDoctor.department}
                </p>

                <hr className="mb-4 border-blue-300 w-20" />

                <div className="space-y-2 text-gray-800 text-sm">
                  <p>
                    <span className="font-semibold text-blue-600">Specialty:</span>{' '}
                    {selectedDoctor.specialty}
                  </p>
                  <p>
                    <span className="font-semibold text-blue-600">Qualification:</span>{' '}
                    {selectedDoctor.qualification}
                  </p>
                  <p>
                    <span className="font-semibold text-blue-600">Designation:</span>{' '}
                    {selectedDoctor.designation}
                  </p>
                </div>

                <div className="mt-6 flex gap-4">
                  <button 
                    onClick={() => handleAppointmentRequest(selectedDoctor)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-medium transition"
                  >
                    Request an Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Form Modal */}
      {showAppointmentForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 pt-20">
          <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="bg-white border-b border-gray-200 p-4 relative">
              <h2 className="text-xl font-bold text-gray-800 text-center">Request an Appointment</h2>
              <div className="w-12 h-1 bg-[#2563eb] mx-auto mt-2"></div>

              <button
                onClick={() => setShowAppointmentForm(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 hover:shadow-lg hover:shadow-blue-200 rounded-md p-1 transition-all duration-200">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-4 space-y-4">
              {/* Patient Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email id <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Doctor Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Patient Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient Type
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="patientType"
                      value="new"
                      checked={formData.patientType === 'new'}
                      onChange={handleInputChange}
                      className="mr-2 accent-blue-600"
                    />
                    <span className="text-sm">New Patient</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="patientType"
                      value="review"
                      checked={formData.patientType === 'review'}
                      onChange={handleInputChange}
                      className="mr-2 accent-blue-600"
                    />
                    <span className="text-sm">Review Patient</span>
                  </label>
                </div>
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Other Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Other Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="otherDetails"
                  value={formData.otherDetails}
                  onChange={handleInputChange}
                  rows={3}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                  placeholder="Please provide any additional details about your appointment..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="bg-[#2563eb] hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors text-sm"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-8 text-center animate-fade-in">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Mail sent successfully</h3>
              <p className="text-gray-600 leading-relaxed">
                Your doctor appointment has been sent successfully.
                <br />
                Our team will check the appointment date and will contact you shortly.
              </p>
            </div>
            
            <button
              onClick={handleSuccessModalClose}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-lg font-medium transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Doctors;