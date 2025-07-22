
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowLeft,
  X,
  Calendar,
  User,
  Stethoscope,
  Pill,
  Clock,
  FileText,
  MapPin,
  Activity,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
} from "lucide-react";

// Mock data
const mockPrescriptions = [
  {
    id: "1",
    prescriptionNumber: "RX-2025-001",
    date: "2025-01-15",
    time: "10:30",
    doctor: {
      id: "doc1",
      name: "Dr. Smith",
      department: "Cardiology",
      specialization: "Interventional Cardiology",
    },
    patient: {
      id: "pat1",
      name: "John Doe",
      age: 45,
      gender: "Male",
    },
    status: "completed",
    medications: [
      {
        id: "med1",
        name: "Atorvastatin",
        dosage: "20mg",
        frequency: "Once daily",
        duration: "30 days",
        instructions: "Take with dinner",
        quantity: 30,
      },
      {
        id: "med2",
        name: "Aspirin",
        dosage: "81mg",
        frequency: "Once daily",
        duration: "30 days",
        instructions: "Take with food",
        quantity: 30,
      },
    ],
    diagnosis: "Hypertension and high cholesterol",
    notes: "Patient advised to reduce salt intake and exercise regularly",
    nextFollowUp: "2025-02-15",
    pharmacyName: "City Pharmacy",
    dispensedDate: "2025-01-15",
    totalAmount: 45.5,
    createdAt: "2025-01-15T10:30:00Z",
    updatedAt: "2025-01-15T10:30:00Z",
  },
  {
    id: "2",
    prescriptionNumber: "RX-2025-002",
    date: "2025-01-10",
    time: "15:00",
    doctor: {
      id: "doc2",
      name: "Dr. Patel",
      department: "Dermatology",
      specialization: "Clinical Dermatology",
    },
    patient: {
      id: "pat1",
      name: "John Doe",
      age: 45,
      gender: "Male",
    },
    status: "ongoing",
    medications: [
      {
        id: "med3",
        name: "Hydrocortisone Cream",
        dosage: "1%",
        frequency: "Apply twice daily",
        duration: "14 days",
        instructions: "Apply thin layer to affected area",
        quantity: 1,
      },
    ],
    diagnosis: "Eczema on hands",
    notes: "Avoid harsh soaps and use moisturizer regularly",
    nextFollowUp: "2025-01-24",
    pharmacyName: "Health Plus Pharmacy",
    dispensedDate: "2025-01-10",
    totalAmount: 25.0,
    createdAt: "2025-01-10T15:00:00Z",
    updatedAt: "2025-01-10T15:00:00Z",
  },
  {
    id: "3",
    prescriptionNumber: "RX-2025-003",
    date: "2025-01-05",
    time: "11:00",
    doctor: {
      id: "doc3",
      name: "Dr. Rana",
      department: "Neurology",
      specialization: "Headache Medicine",
    },
    patient: {
      id: "pat1",
      name: "John Doe",
      age: 45,
      gender: "Male",
    },
    status: "completed",
    medications: [
      {
        id: "med4",
        name: "Sumatriptan",
        dosage: "50mg",
        frequency: "As needed",
        duration: "30 days",
        instructions: "Take at onset of migraine",
        quantity: 9,
      },
      {
        id: "med5",
        name: "Propranolol",
        dosage: "40mg",
        frequency: "Twice daily",
        duration: "30 days",
        instructions: "Take with meals",
        quantity: 60,
      },
    ],
    diagnosis: "Migraine headaches",
    notes: "Patient should maintain headache diary and avoid known triggers",
    nextFollowUp: "2025-02-05",
    pharmacyName: "Downtown Pharmacy",
    dispensedDate: "2025-01-05",
    totalAmount: 78.25,
    createdAt: "2025-01-05T11:00:00Z",
    updatedAt: "2025-01-05T11:00:00Z",
  },
  {
    id: "4",
    prescriptionNumber: "RX-2025-004",
    date: "2025-01-20",
    time: "09:30",
    doctor: {
      id: "doc4",
      name: "Dr. Johnson",
      department: "Family Medicine",
      specialization: "Primary Care",
    },
    patient: {
      id: "pat1",
      name: "John Doe",
      age: 45,
      gender: "Male",
    },
    status: "ongoing",
    medications: [
      {
        id: "med6",
        name: "Amoxicillin",
        dosage: "500mg",
        frequency: "Three times daily",
        duration: "10 days",
        instructions: "Take with food to avoid stomach upset",
        quantity: 30,
      },
    ],
    diagnosis: "Bacterial sinusitis",
    notes: "Complete full course of antibiotics even if symptoms improve",
    nextFollowUp: "2025-01-30",
    pharmacyName: "City Pharmacy",
    dispensedDate: "2025-01-20",
    totalAmount: 22.5,
    createdAt: "2025-01-20T09:30:00Z",
    updatedAt: "2025-01-20T09:30:00Z",
  },
];

// Prescription Modal Component
const PrescriptionModel = ({ prescription, onClose }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "ongoing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "expired":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Prescription Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100 border border-transparent hover:border-gray-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{formatDate(prescription.date)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">{formatTime(prescription.time)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FileText className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Prescription Number</p>
                  <p className="font-medium">
                    {prescription.prescriptionNumber}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Stethoscope className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Doctor</p>
                  <p className="font-medium">{prescription.doctor.name}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <User className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium">
                    {prescription.doctor.department}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      getStatusColor(prescription.status).includes("green")
                        ? "bg-green-500"
                        : prescription.status === "ongoing"
                        ? "bg-blue-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(
                      prescription.status
                    )}`}
                  >
                    {prescription.status.charAt(0).toUpperCase() +
                      prescription.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

         

          {/* Diagnosis */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Diagnosis
            </h3>
            <p className="text-gray-700 bg-gray-50 rounded-lg p-4">
              {prescription.diagnosis}
            </p>
          </div>

          {/* Medications */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Prescribed Medications
            </h3>
            <div className="space-y-4">
              {prescription.medications.map((medication, index) => (
                <div
                  key={medication.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start space-x-3">
                    <Pill className="text-blue-600 mt-1" size={20} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {medication.name}
                        </h4>
                        <span className="text-sm text-gray-500">
                          #{index + 1}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Dosage</p>
                          <p className="font-medium">{medication.dosage}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Frequency</p>
                          <p className="font-medium">{medication.frequency}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Duration</p>
                          <p className="font-medium">{medication.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Quantity</p>
                          <p className="font-medium">{medication.quantity}</p>
                        </div>
                      </div>
                      {medication.instructions && (
                        <div className="mt-3">
                          <p className="text-sm text-gray-500">Instructions</p>
                          <p className="text-sm text-gray-700 bg-yellow-50 rounded p-2 mt-1">
                            {medication.instructions}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prescription.notes && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Doctor's Notes
                </h3>
                <p className="text-gray-700 bg-gray-50 rounded-lg p-4">
                  {prescription.notes}
                </p>
              </div>
            )}

            <div className="space-y-4">
              {prescription.nextFollowUp && (
                <div>
                  <p className="text-sm text-gray-500">Next Follow-up</p>
                  <p className="font-medium">
                    {formatDate(prescription.nextFollowUp)}
                  </p>
                </div>
              )}

              {prescription.pharmacyName && (
                <div>
                  <p className="text-sm text-gray-500">Pharmacy</p>
                  <p className="font-medium">{prescription.pharmacyName}</p>
                </div>
              )}

              {prescription.dispensedDate && (
                <div>
                  <p className="text-sm text-gray-500">Dispensed Date</p>
                  <p className="font-medium">
                    {formatDate(prescription.dispensedDate)}
                  </p>
                </div>
              )}

              {prescription.totalAmount && (
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-medium">
                    ${prescription.totalAmount.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <p>Created: {formatDate(prescription.createdAt)}</p>
            <p>Last Updated: {formatDate(prescription.updatedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Prescription History Component
const PrescriptionHistory = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with actual API call
  useEffect(() => {
    // Simulate API call
    const fetchPrescriptions = async () => {
      setIsLoading(true);
      try {
        // Replace with actual API call:
        // const response = await fetch('/api/prescriptions?patientId=123');
        // const data = await response.json();
        setPrescriptions(mockPrescriptions);
        setFilteredPrescriptions(mockPrescriptions);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  // Filter prescriptions based on active tab and search query
  useEffect(() => {
    let filtered = prescriptions;

    // Filter by status
    if (activeTab !== "all") {
      filtered = filtered.filter((p) => p.status === activeTab);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.doctor.department
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          p.medications.some((m) =>
            m.name.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          p.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPrescriptions(filtered);
  }, [prescriptions, activeTab, searchQuery]);

  const handleViewDetails = (prescription) => {
    setSelectedPrescription(prescription);
    setIsModalOpen(true);
  };
 const navigate = useNavigate();
  const handleBackToProfile = () => {
    navigate('/patient');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "ongoing":
        return "bg-blue-100 text-blue-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getTabIcon = (tabKey) => {
    switch (tabKey) {
      case "all":
        return <FileText size={16} className="mr-2" />;
      case "ongoing":
        return <Activity size={16} className="mr-2" />;
      case "completed":
        return <CheckCircle size={16} className="mr-2" />;
      default:
        return null;
    }
  };

  const tabs = [
    {
      key: "all",
      label: "All Medical Records",
      count: prescriptions.length,
      description: "Complete prescription and treatment history",
      color: "text-gray-600",
    },
    {
      key: "ongoing",
      label: "Active Treatments",
      count: prescriptions.filter((p) => p.status === "ongoing").length,
      description: "Current medications and ongoing treatments",
      color: "text-blue-600",
    },
    {
      key: "completed",
      label: "Completed Treatments",
      count: prescriptions.filter((p) => p.status === "completed").length,
      description: "Finished prescriptions and past medical care",
      color: "text-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="bg-blue-600 text-white px-6 py-4">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleBackToProfile}
              className="flex items-center justify-center p-3 rounded-lg border border-transparent hover:border-blue-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-blue-600"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Patient History</h1>
              <p className="text-blue-100 text-sm mt-1">
                Complete medical prescription records
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by doctor, medication, department, diagnosis, or prescription number..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-20">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-2 font-medium text-base border-b-2 transition-all duration-200 ${
                    activeTab === tab.key
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    {getTabIcon(tab.key)}
                    <div className="text-left">
                      <div className="flex items-center space-x-3">
                        <span>{tab.label}</span>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                            activeTab === tab.key
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {tab.count}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {tab.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Prescriptions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {prescriptions.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed Treatments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {prescriptions.filter((p) => p.status === "completed").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Activity className="text-orange-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Treatments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {prescriptions.filter((p) => p.status === "ongoing").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Prescription Table */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading patient history...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prescription Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Healthcare Provider
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Treatment Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPrescriptions.map((prescription) => (
                    <tr
                      key={prescription.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-start space-x-3">
                          <Calendar className="text-blue-600 mt-1" size={16} />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {formatDate(prescription.date)} at{" "}
                              {formatTime(prescription.time)}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-start space-x-3">
                          <Stethoscope
                            className="text-green-600 mt-1"
                            size={16}
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {prescription.doctor.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {prescription.doctor.department}
                            </div>
                            <div className="text-xs text-gray-400">
                              {prescription.doctor.specialization}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              prescription.status
                            )}`}
                          >
                            {prescription.status.charAt(0).toUpperCase() +
                              prescription.status.slice(1)}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewDetails(prescription)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          View Full Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredPrescriptions.length === 0 && (
              <div className="text-center py-12">
                <Pill size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No prescriptions found</p>
                <p className="text-gray-400 text-sm">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedPrescription && (
        <PrescriptionModel
          prescription={selectedPrescription}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

// Main App Component
function PatientHistory() {
  return (
    <div className="App">
      <PrescriptionHistory />
    </div>
  );
}

export default PatientHistory;