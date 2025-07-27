import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Filter,
  ChevronDown,
  CalendarDays,
  Users,
  Building,
  CreditCard,
  DollarSign,
  Receipt,
  Printer,
  Download,
  Eye,
  Calculator,
} from "lucide-react";

// Enhanced Mock data with billing information
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
      id: "PAT-001",
      name: "John Doe",
      age: 45,
      gender: "Male",
      email: "john.doe@email.com",
      phone: "+1-555-0123",
      address: {
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
      },
      insurance: {
        provider: "HealthCare Plus",
        policyNumber: "HCP-12345",
        groupNumber: "GRP-789",
      },
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
        unitPrice: 1.25,
        totalPrice: 37.5,
      },
      {
        id: "med2",
        name: "Aspirin",
        dosage: "81mg",
        frequency: "Once daily",
        duration: "30 days",
        instructions: "Take with food",
        quantity: 30,
        unitPrice: 0.15,
        totalPrice: 4.5,
      },
    ],
    billing: {
      billId: "BILL-2025-001",
      billDate: "2025-01-15",
      consultationFee: 150.0,
      medicationTotal: 42.0,
      pharmacyFee: 5.0,
      subtotal: 197.0,
      tax: 15.76,
      discount: 10.0,
      insuranceCoverage: 150.0,
      finalAmount: 52.76,
      paymentStatus: "paid",
      paymentDate: "2025-01-15",
      paymentMethod: "Credit Card",
    },
    diagnosis: "Hypertension and high cholesterol",
    notes: "Patient advised to reduce salt intake and exercise regularly",
    nextFollowUp: "2025-02-15",
    pharmacyName: "City Pharmacy",
    dispensedDate: "2025-01-15",
    totalAmount: 52.76,
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
      id: "PAT-001",
      name: "John Doe",
      age: 45,
      gender: "Male",
      email: "john.doe@email.com",
      phone: "+1-555-0123",
      address: {
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
      },
      insurance: {
        provider: "HealthCare Plus",
        policyNumber: "HCP-12345",
        groupNumber: "GRP-789",
      },
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
        unitPrice: 22.0,
        totalPrice: 22.0,
      },
    ],
    billing: {
      billId: "BILL-2025-002",
      billDate: "2025-01-10",
      consultationFee: 120.0,
      medicationTotal: 22.0,
      pharmacyFee: 3.0,
      subtotal: 145.0,
      tax: 11.6,
      discount: 0.0,
      insuranceCoverage: 100.0,
      finalAmount: 56.6,
      paymentStatus: "pending",
      paymentDate: null,
      paymentMethod: null,
    },
    diagnosis: "Eczema on hands",
    notes: "Avoid harsh soaps and use moisturizer regularly",
    nextFollowUp: "2025-01-24",
    pharmacyName: "Health Plus Pharmacy",
    dispensedDate: "2025-01-10",
    totalAmount: 56.6,
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
      id: "PAT-001",
      name: "John Doe",
      age: 45,
      gender: "Male",
      email: "john.doe@email.com",
      phone: "+1-555-0123",
      address: {
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
      },
      insurance: {
        provider: "HealthCare Plus",
        policyNumber: "HCP-12345",
        groupNumber: "GRP-789",
      },
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
        unitPrice: 4.5,
        totalPrice: 40.5,
      },
      {
        id: "med5",
        name: "Propranolol",
        dosage: "40mg",
        frequency: "Twice daily",
        duration: "30 days",
        instructions: "Take with meals",
        quantity: 60,
        unitPrice: 0.85,
        totalPrice: 51.0,
      },
    ],
    billing: {
      billId: "BILL-2025-003",
      billDate: "2025-01-05",
      consultationFee: 175.0,
      medicationTotal: 91.5,
      pharmacyFee: 7.0,
      subtotal: 273.5,
      tax: 21.88,
      discount: 25.0,
      insuranceCoverage: 200.0,
      finalAmount: 70.38,
      paymentStatus: "paid",
      paymentDate: "2025-01-05",
      paymentMethod: "Insurance + Credit Card",
    },
    diagnosis: "Migraine headaches",
    notes: "Patient should maintain headache diary and avoid known triggers",
    nextFollowUp: "2025-02-05",
    pharmacyName: "Downtown Pharmacy",
    dispensedDate: "2025-01-05",
    totalAmount: 70.38,
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
      id: "PAT-001",
      name: "John Doe",
      age: 45,
      gender: "Male",
      email: "john.doe@email.com",
      phone: "+1-555-0123",
      address: {
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
      },
      insurance: {
        provider: "HealthCare Plus",
        policyNumber: "HCP-12345",
        groupNumber: "GRP-789",
      },
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
        unitPrice: 0.75,
        totalPrice: 22.5,
      },
    ],
    billing: {
      billId: "BILL-2025-004",
      billDate: "2025-01-20",
      consultationFee: 100.0,
      medicationTotal: 22.5,
      pharmacyFee: 2.5,
      subtotal: 125.0,
      tax: 10.0,
      discount: 15.0,
      insuranceCoverage: 80.0,
      finalAmount: 40.0,
      paymentStatus: "overdue",
      paymentDate: null,
      paymentMethod: null,
    },
    diagnosis: "Bacterial sinusitis",
    notes: "Complete full course of antibiotics even if symptoms improve",
    nextFollowUp: "2025-01-30",
    pharmacyName: "City Pharmacy",
    dispensedDate: "2025-01-20",
    totalAmount: 40.0,
    createdAt: "2025-01-20T09:30:00Z",
    updatedAt: "2025-01-20T09:30:00Z",
  },
  {
    id: "5",
    prescriptionNumber: "RX-2025-005",
    date: "2025-01-12",
    time: "14:45",
    doctor: {
      id: "doc5",
      name: "Dr. Williams",
      department: "Orthopedics",
      specialization: "Sports Medicine",
    },
    patient: {
      id: "PAT-001",
      name: "John Doe",
      age: 45,
      gender: "Male",
      email: "john.doe@email.com",
      phone: "+1-555-0123",
      address: {
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
      },
      insurance: {
        provider: "HealthCare Plus",
        policyNumber: "HCP-12345",
        groupNumber: "GRP-789",
      },
    },
    status: "completed",
    medications: [
      {
        id: "med7",
        name: "Ibuprofen",
        dosage: "400mg",
        frequency: "Three times daily",
        duration: "7 days",
        instructions: "Take with food, do not exceed recommended dose",
        quantity: 21,
        unitPrice: 0.5,
        totalPrice: 10.5,
      },
      {
        id: "med8",
        name: "Muscle Relaxant Gel",
        dosage: "2%",
        frequency: "Apply as needed",
        duration: "14 days",
        instructions: "Apply to affected area, massage gently",
        quantity: 1,
        unitPrice: 18.0,
        totalPrice: 18.0,
      },
    ],
    billing: {
      billId: "BILL-2025-005",
      billDate: "2025-01-12",
      consultationFee: 140.0,
      medicationTotal: 28.5,
      pharmacyFee: 4.0,
      subtotal: 172.5,
      tax: 13.8,
      discount: 20.0,
      insuranceCoverage: 120.0,
      finalAmount: 46.3,
      paymentStatus: "paid",
      paymentDate: "2025-01-12",
      paymentMethod: "Debit Card",
    },
    diagnosis: "Lower back strain from physical activity",
    notes: "Recommended physical therapy and proper lifting techniques",
    nextFollowUp: "2025-01-26",
    pharmacyName: "Sports Medicine Pharmacy",
    dispensedDate: "2025-01-12",
    totalAmount: 46.3,
    createdAt: "2025-01-12T14:45:00Z",
    updatedAt: "2025-01-12T14:45:00Z",
  },
  {
    id: "6",
    prescriptionNumber: "RX-2025-006",
    date: "2025-01-08",
    time: "16:20",
    doctor: {
      id: "doc6",
      name: "Dr. Garcia",
      department: "Endocrinology",
      specialization: "Diabetes Management",
    },
    patient: {
      id: "PAT-001",
      name: "John Doe",
      age: 45,
      gender: "Male",
      email: "john.doe@email.com",
      phone: "+1-555-0123",
      address: {
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
      },
      insurance: {
        provider: "HealthCare Plus",
        policyNumber: "HCP-12345",
        groupNumber: "GRP-789",
      },
    },
    status: "ongoing",
    medications: [
      {
        id: "med9",
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        duration: "90 days",
        instructions: "Take with meals to reduce stomach upset",
        quantity: 180,
        unitPrice: 0.25,
        totalPrice: 45.0,
      },
      {
        id: "med10",
        name: "Glucose Test Strips",
        dosage: "N/A",
        frequency: "Daily monitoring",
        duration: "30 days",
        instructions: "Test blood glucose levels daily before meals",
        quantity: 100,
        unitPrice: 0.75,
        totalPrice: 75.0,
      },
    ],
    billing: {
      billId: "BILL-2025-006",
      billDate: "2025-01-08",
      consultationFee: 160.0,
      medicationTotal: 120.0,
      pharmacyFee: 8.0,
      subtotal: 288.0,
      tax: 23.04,
      discount: 30.0,
      insuranceCoverage: 200.0,
      finalAmount: 81.04,
      paymentStatus: "pending",
      paymentDate: null,
      paymentMethod: null,
    },
    diagnosis: "Type 2 Diabetes Mellitus",
    notes:
      "Patient education provided for diet management and blood sugar monitoring",
    nextFollowUp: "2025-02-08",
    pharmacyName: "Diabetes Care Pharmacy",
    dispensedDate: "2025-01-08",
    totalAmount: 81.04,
    createdAt: "2025-01-08T16:20:00Z",
    updatedAt: "2025-01-08T16:20:00Z",
  },
  {
    id: "7",
    prescriptionNumber: "RX-2025-007",
    date: "2025-01-03",
    time: "13:15",
    doctor: {
      id: "doc7",
      name: "Dr. Thompson",
      department: "Psychiatry",
      specialization: "Adult Psychiatry",
    },
    patient: {
      id: "PAT-001",
      name: "John Doe",
      age: 45,
      gender: "Male",
      email: "john.doe@email.com",
      phone: "+1-555-0123",
      address: {
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
      },
      insurance: {
        provider: "HealthCare Plus",
        policyNumber: "HCP-12345",
        groupNumber: "GRP-789",
      },
    },
    status: "completed",
    medications: [
      {
        id: "med11",
        name: "Sertraline",
        dosage: "50mg",
        frequency: "Once daily",
        duration: "30 days",
        instructions: "Take in the morning with food",
        quantity: 30,
        unitPrice: 1.2,
        totalPrice: 36.0,
      },
    ],
    billing: {
      billId: "BILL-2025-007",
      billDate: "2025-01-03",
      consultationFee: 180.0,
      medicationTotal: 36.0,
      pharmacyFee: 4.5,
      subtotal: 220.5,
      tax: 17.64,
      discount: 0.0,
      insuranceCoverage: 150.0,
      finalAmount: 88.14,
      paymentStatus: "paid",
      paymentDate: "2025-01-03",
      paymentMethod: "Cash",
    },
    diagnosis: "Anxiety disorder",
    notes:
      "Patient responded well to therapy sessions, medication for additional support",
    nextFollowUp: "2025-02-03",
    pharmacyName: "Mental Health Pharmacy",
    dispensedDate: "2025-01-03",
    totalAmount: 88.14,
    createdAt: "2025-01-03T13:15:00Z",
    updatedAt: "2025-01-03T13:15:00Z",
  },
];

// Enhanced search function with better date handling
const searchPrescriptions = (prescriptions, query, filters) => {
  let filtered = prescriptions;

  // Apply text and date search
  if (query && query.trim() !== "") {
    const searchTerm = query.toLowerCase().trim();

    // Check if query looks like a date (YYYY-MM-DD, MM/DD/YYYY, etc.)
    const dateFormats = [
      /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
      /^\d{2}\/\d{2}\/\d{4}$/, // MM/DD/YYYY
      /^\d{2}-\d{2}-\d{4}$/, // MM-DD-YYYY
      /^\d{1,2}\/\d{1,2}\/\d{4}$/, // M/D/YYYY or MM/D/YYYY
    ];

    const isDateQuery = dateFormats.some((format) => format.test(searchTerm));

    if (isDateQuery) {
      // Parse different date formats and search by date
      let searchDate;
      try {
        if (searchTerm.includes("/")) {
          const parts = searchTerm.split("/");
          if (parts.length === 3) {
            searchDate = new Date(parts[2], parts[0] - 1, parts[1])
              .toISOString()
              .split("T")[0];
          }
        } else if (searchTerm.includes("-") && searchTerm.length === 10) {
          searchDate = searchTerm; // Already in YYYY-MM-DD format
        }

        if (searchDate) {
          filtered = filtered.filter(
            (prescription) => prescription.date === searchDate
          );
        }
      } catch (error) {
        // If date parsing fails, fall back to text search
      }
    } else {
      // Text search
      filtered = filtered.filter((prescription) => {
        return (
          prescription.prescriptionNumber.toLowerCase().includes(searchTerm) ||
          prescription.doctor.name.toLowerCase().includes(searchTerm) ||
          prescription.doctor.department.toLowerCase().includes(searchTerm) ||
          prescription.doctor.specialization
            .toLowerCase()
            .includes(searchTerm) ||
          prescription.patient.name.toLowerCase().includes(searchTerm) ||
          prescription.patient.id.toLowerCase().includes(searchTerm) ||
          prescription.diagnosis.toLowerCase().includes(searchTerm) ||
          prescription.notes?.toLowerCase().includes(searchTerm) ||
          prescription.pharmacyName?.toLowerCase().includes(searchTerm) ||
          prescription.medications.some((med) =>
            med.name.toLowerCase().includes(searchTerm)
          ) ||
          prescription.status.toLowerCase().includes(searchTerm) ||
          prescription.date.includes(searchTerm) ||
          prescription.billing?.billId.toLowerCase().includes(searchTerm)
        );
      });
    }
  }

  // Apply filters
  if (filters.selectedDate) {
    filtered = filtered.filter(
      (prescription) => prescription.date === filters.selectedDate
    );
  }

  if (filters.selectedDoctor) {
    filtered = filtered.filter(
      (prescription) => prescription.doctor.id === filters.selectedDoctor
    );
  }

  if (filters.selectedDepartment) {
    filtered = filtered.filter(
      (prescription) =>
        prescription.doctor.department === filters.selectedDepartment
    );
  }

  if (filters.dateRange.start && filters.dateRange.end) {
    filtered = filtered.filter((prescription) => {
      const prescDate = new Date(prescription.date);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      return prescDate >= startDate && prescDate <= endDate;
    });
  }

  return filtered;
};

// Billing Modal Component - Updated with simplified tabs and download functionality
const BillingModal = ({ prescription, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create billing content for download
    const billingContent = `
BILLING STATEMENT
================

Bill ID: ${prescription.billing.billId}
Date: ${formatDate(prescription.billing.billDate)}
Prescription Number: ${prescription.prescriptionNumber}

BILLING SUMMARY
===============
Consultation Fee: ${formatCurrency(prescription.billing.consultationFee)}
Medications: ${formatCurrency(prescription.billing.medicationTotal)}
Pharmacy Fee: ${formatCurrency(prescription.billing.pharmacyFee)}
Subtotal: ${formatCurrency(prescription.billing.subtotal)}
Discount: -${formatCurrency(prescription.billing.discount)}
Tax: ${formatCurrency(prescription.billing.tax)}
Insurance Coverage: -${formatCurrency(prescription.billing.insuranceCoverage)}
Final Amount: ${formatCurrency(prescription.billing.finalAmount)}

PAYMENT INFORMATION
==================
Payment Status: ${
      prescription.billing.paymentStatus.charAt(0).toUpperCase() +
      prescription.billing.paymentStatus.slice(1)
    }
Payment Date: ${
      prescription.billing.paymentDate
        ? formatDate(prescription.billing.paymentDate)
        : "Not paid"
    }
Payment Method: ${prescription.billing.paymentMethod || "N/A"}

Doctor: ${prescription.doctor.name}
Department: ${prescription.doctor.department}

Generated on: ${new Date().toLocaleDateString("en-US")}
    `;

    // Create and download the file
    const blob = new Blob([billingContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `billing-${prescription.billing.billId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Receipt className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Billing Details
              </h2>
              <p className="text-sm text-gray-600">
                Bill ID: {prescription.billing.billId} | Date:{" "}
                {formatDate(prescription.billing.billDate)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Printer size={16} />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download size={16} />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content - Only Billing Overview */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Payment Status */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <DollarSign className="text-green-600" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Payment Status
                  </h3>
                  <p className="text-sm text-gray-600">
                    Current billing status
                  </p>
                </div>
              </div>
              <span
                className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full border ${getPaymentStatusColor(
                  prescription.billing.paymentStatus
                )}`}
              >
                {prescription.billing.paymentStatus.charAt(0).toUpperCase() +
                  prescription.billing.paymentStatus.slice(1)}
              </span>
            </div>

            {/* Billing Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Billing Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Consultation Fee</span>
                    <span className="font-medium">
                      {formatCurrency(prescription.billing.consultationFee)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Medications</span>
                    <span className="font-medium">
                      {formatCurrency(prescription.billing.medicationTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pharmacy Fee</span>
                    <span className="font-medium">
                      {formatCurrency(prescription.billing.pharmacyFee)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      {formatCurrency(prescription.billing.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>
                      -{formatCurrency(prescription.billing.discount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">
                      {formatCurrency(prescription.billing.tax)}
                    </span>
                  </div>
                  <div className="flex justify-between text-blue-600">
                    <span>Insurance Coverage</span>
                    <span>
                      -{formatCurrency(prescription.billing.insuranceCoverage)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t-2 pt-3 text-lg font-bold">
                    <span>Final Amount</span>
                    <span className="text-blue-600">
                      {formatCurrency(prescription.billing.finalAmount)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Payment Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Payment Date</p>
                    <p className="font-medium">
                      {prescription.billing.paymentDate
                        ? formatDate(prescription.billing.paymentDate)
                        : "Not paid"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-medium">
                      {prescription.billing.paymentMethod || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Prescription Number</p>
                    <p className="font-medium">
                      {prescription.prescriptionNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Doctor</p>
                    <p className="font-medium">{prescription.doctor.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium">
                      {prescription.doctor.department}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>
              <p>Generated on: {new Date().toLocaleDateString("en-US")}</p>
              <p>
                For questions about this bill, contact our billing department
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                Amount Due:{" "}
                {formatCurrency(
                  prescription.billing.paymentStatus === "paid"
                    ? 0
                    : prescription.billing.finalAmount
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Filter Panel Component (Enhanced with billing filters)
const FilterPanel = ({
  filters,
  setFilters,
  prescriptions,
  isOpen,
  onClose,
}) => {
  const doctors = [...new Set(prescriptions.map((p) => p.doctor))].filter(
    (doctor, index, self) => self.findIndex((d) => d.id === doctor.id) === index
  );

  const departments = [
    ...new Set(prescriptions.map((p) => p.doctor.department)),
  ];

  const paymentStatuses = [
    ...new Set(prescriptions.map((p) => p.billing.paymentStatus)),
  ];

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      selectedDate: "",
      selectedDoctor: "",
      selectedDepartment: "",
      selectedPaymentStatus: "",
      dateRange: { start: "", end: "" },
    });
  };

  const activeFiltersCount = Object.values(filters).filter((value) =>
    typeof value === "object" ? value.start || value.end : value
  ).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Filter className="text-blue-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900">
              Advanced Filters
            </h2>
            {activeFiltersCount > 0 && (
              <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                {activeFiltersCount} active
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Date Filters */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <CalendarDays className="mr-2 text-blue-600" size={20} />
              Date Filters
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specific Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.selectedDate}
                  onChange={(e) =>
                    handleFilterChange("selectedDate", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Date Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    placeholder="Start Date"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filters.dateRange.start}
                    onChange={(e) =>
                      handleFilterChange("dateRange", {
                        ...filters.dateRange,
                        start: e.target.value,
                      })
                    }
                  />
                  <input
                    type="date"
                    placeholder="End Date"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filters.dateRange.end}
                    onChange={(e) =>
                      handleFilterChange("dateRange", {
                        ...filters.dateRange,
                        end: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Healthcare Provider Filters */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="mr-2 text-blue-600" size={20} />
              Healthcare Provider
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Doctor
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.selectedDoctor}
                  onChange={(e) =>
                    handleFilterChange("selectedDoctor", e.target.value)
                  }
                >
                  <option value="">All Doctors</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.department}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.selectedDepartment}
                  onChange={(e) =>
                    handleFilterChange("selectedDepartment", e.target.value)
                  }
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Billing Filters */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <DollarSign className="mr-2 text-blue-600" size={20} />
              Billing Filters
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Status
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.selectedPaymentStatus || ""}
                onChange={(e) =>
                  handleFilterChange("selectedPaymentStatus", e.target.value)
                }
              >
                <option value="">All Payment Statuses</option>
                {paymentStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Active Filters
              </h3>
              <div className="flex flex-wrap gap-2">
                {filters.selectedDate && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    Date: {new Date(filters.selectedDate).toLocaleDateString()}
                    <button
                      onClick={() => handleFilterChange("selectedDate", "")}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {filters.selectedDoctor && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    Doctor:{" "}
                    {doctors.find((d) => d.id === filters.selectedDoctor)?.name}
                    <button
                      onClick={() => handleFilterChange("selectedDoctor", "")}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {filters.selectedDepartment && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                    Department: {filters.selectedDepartment}
                    <button
                      onClick={() =>
                        handleFilterChange("selectedDepartment", "")
                      }
                      className="ml-2 text-purple-600 hover:text-purple-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {filters.selectedPaymentStatus && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                    Payment:{" "}
                    {filters.selectedPaymentStatus.charAt(0).toUpperCase() +
                      filters.selectedPaymentStatus.slice(1)}
                    <button
                      onClick={() =>
                        handleFilterChange("selectedPaymentStatus", "")
                      }
                      className="ml-2 text-yellow-600 hover:text-yellow-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {(filters.dateRange.start || filters.dateRange.end) && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
                    Range: {filters.dateRange.start || "Start"} -{" "}
                    {filters.dateRange.end || "End"}
                    <button
                      onClick={() =>
                        handleFilterChange("dateRange", { start: "", end: "" })
                      }
                      className="ml-2 text-orange-600 hover:text-orange-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 p-6 bg-gray-50 flex justify-between">
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Clear All Filters
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced Prescription Modal Component with Professional Medical Format
const PrescriptionModal = ({ prescription, onClose }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
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

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const prescriptionContent = `
MEDICAL PRESCRIPTION
===================

Prescription Number: ${prescription.prescriptionNumber}
Date of Issue: ${formatDate(prescription.date)}
Time: ${formatTime(prescription.time)}

PATIENT INFORMATION
==================
Name: ${prescription.patient.name}
Patient ID: ${prescription.patient.id}
Age: ${prescription.patient.age} years
Gender: ${prescription.patient.gender}
Contact: ${prescription.patient.phone}
Email: ${prescription.patient.email}

PRESCRIBING PHYSICIAN
====================
Doctor: ${prescription.doctor.name}
Department: ${prescription.doctor.department}
Specialization: ${prescription.doctor.specialization}

DIAGNOSIS
=========
${prescription.diagnosis}

PRESCRIBED MEDICATIONS
=====================
${prescription.medications
  .map(
    (med, index) => `
${index + 1}. ${med.name}
   Strength: ${med.dosage}
   Frequency: ${med.frequency}
   Duration: ${med.duration}
   Quantity: ${med.quantity}
   Instructions: ${med.instructions}
`
  )
  .join("\n")}

ADDITIONAL NOTES
===============
${prescription.notes || "No additional notes provided"}

FOLLOW-UP
=========
Next Appointment: ${
      prescription.nextFollowUp
        ? formatDate(prescription.nextFollowUp)
        : "To be scheduled"
    }

PHARMACY INFORMATION
===================
Dispensed by: ${prescription.pharmacyName || "Not specified"}
Dispensed on: ${
      prescription.dispensedDate
        ? formatDate(prescription.dispensedDate)
        : "Not dispensed"
    }

PRESCRIPTION STATUS
==================
Status: ${
      prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)
    }
Total Cost: $${
      prescription.totalAmount ? prescription.totalAmount.toFixed(2) : "0.00"
    }

This prescription is valid for 30 days from the date of issue.
Generated on: ${new Date().toLocaleDateString("en-US")}
    `;

    const blob = new Blob([prescriptionContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prescription-${prescription.prescriptionNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto">
        {/* Professional Header - Medical Document Style */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                <FileText size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">MEDICAL PRESCRIPTION</h1>
                <p className="text-blue-100 text-sm mt-1">
                  Official Medical Document • {prescription.prescriptionNumber}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors"
              >
                <Printer size={16} />
                <span>Print</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors"
              >
                <Download size={16} />
                <span>Download</span>
              </button>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors p-2"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Professional Content Layout */}
        <div className="p-8 space-y-8">
          {/* Header Information Bar */}
          <div className="flex items-center justify-between p-4 bg-gray-50 border-l-4 border-blue-600 rounded-r-lg">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Date Issued
                </p>
                <p className="font-bold text-gray-900">
                  {formatDate(prescription.date)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Time
                </p>
                <p className="font-bold text-gray-900">
                  {formatTime(prescription.time)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Status
                </p>
                <span
                  className={`inline-flex px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(
                    prescription.status
                  )}`}
                >
                  {prescription.status.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Prescription No.
              </p>
              <p className="font-mono text-lg font-bold text-blue-600">
                {prescription.prescriptionNumber}
              </p>
            </div>
          </div>

          {/* Patient and Doctor Information - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Patient Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <User className="text-green-600" size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                  Patient Information
                </h3>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Full Name
                    </p>
                    <p className="font-semibold text-gray-900">
                      {prescription.patient.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Patient ID
                    </p>
                    <p className="font-mono font-semibold text-blue-600">
                      {prescription.patient.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Age/Gender
                    </p>
                    <p className="font-semibold text-gray-900">
                      {prescription.patient.age} yrs,{" "}
                      {prescription.patient.gender}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Contact
                    </p>
                    <p className="font-semibold text-gray-700">
                      {prescription.patient.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Email
                    </p>
                    <p className="font-semibold text-gray-700 text-sm">
                      {prescription.patient.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Stethoscope className="text-blue-600" size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                  Prescribing Physician
                </h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Doctor Name
                  </p>
                  <p className="font-bold text-xl text-gray-900">
                    {prescription.doctor.name}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Department
                    </p>
                    <p className="font-semibold text-gray-700">
                      {prescription.doctor.department}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Specialization
                    </p>
                    <p className="font-semibold text-gray-700">
                      {prescription.doctor.specialization}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnosis Section */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <Activity className="text-yellow-600" size={20} />
              <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                Clinical Diagnosis
              </h3>
            </div>
            <p className="text-gray-800 font-medium text-lg leading-relaxed">
              {prescription.diagnosis}
            </p>
          </div>

          {/* Prescribed Medications - Professional Format */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Pill className="text-red-600" size={20} />
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                  Prescribed Medications
                </h3>
                <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">
                  {prescription.medications.length} ITEM
                  {prescription.medications.length !== 1 ? "S" : ""}
                </span>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {prescription.medications.map((medication, index) => (
                <div
                  key={medication.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 uppercase tracking-wide">
                          {medication.name}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Generic Name: {medication.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Unit Price
                      </p>
                      <p className="font-bold text-lg text-green-600">
                        ${medication.unitPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Prescription Details Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">
                        Strength
                      </p>
                      <p className="font-bold text-gray-900 text-lg">
                        {medication.dosage}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">
                        Frequency
                      </p>
                      <p className="font-bold text-gray-900">
                        {medication.frequency}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">
                        Duration
                      </p>
                      <p className="font-bold text-gray-900">
                        {medication.duration}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">
                        Quantity
                      </p>
                      <p className="font-bold text-gray-900 text-lg">
                        {medication.quantity}
                      </p>
                    </div>
                  </div>

                  {/* Special Instructions */}
                  {medication.instructions && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertCircle
                          className="text-blue-600 mt-0.5"
                          size={16}
                        />
                        <div>
                          <p className="text-xs text-blue-600 uppercase tracking-wide font-bold mb-1">
                            Special Instructions
                          </p>
                          <p className="text-blue-800 font-medium">
                            {medication.instructions}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Clinical Notes */}
            {prescription.notes && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <FileText className="text-purple-600" size={20} />
                  <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                    Clinical Notes
                  </h3>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-purple-800 font-medium leading-relaxed">
                    {prescription.notes}
                  </p>
                </div>
              </div>
            )}

            {/* Pharmacy & Follow-up Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="text-orange-600" size={20} />
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                  Additional Information
                </h3>
              </div>
              <div className="space-y-4">
                {prescription.pharmacyName && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Dispensed By
                    </p>
                    <p className="font-bold text-gray-900">
                      {prescription.pharmacyName}
                    </p>
                  </div>
                )}

                {prescription.dispensedDate && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Dispensed Date
                    </p>
                    <p className="font-semibold text-gray-900">
                      {formatDate(prescription.dispensedDate)}
                    </p>
                  </div>
                )}

                {prescription.nextFollowUp && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <p className="text-xs text-orange-600 uppercase tracking-wide font-bold">
                      Next Follow-up
                    </p>
                    <p className="font-bold text-orange-800 text-lg">
                      {formatDate(prescription.nextFollowUp)}
                    </p>
                  </div>
                )}

                {prescription.totalAmount && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-xs text-green-600 uppercase tracking-wide font-bold">
                      Total Amount
                    </p>
                    <p className="font-bold text-green-800 text-2xl">
                      ${prescription.totalAmount.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Professional Footer */}
        <div className="border-t border-gray-200 bg-gray-50 p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <p className="font-semibold">IMPORTANT NOTES:</p>
              <p>
                • This prescription is valid for 30 days from the date of issue
              </p>
              <p>
                • Please complete the full course of medication as prescribed
              </p>
              <p>
                • Contact your healthcare provider if you experience any adverse
                effects
              </p>
            </div>
            <div className="text-right text-sm text-gray-500">
              <p>
                Document generated on: {new Date().toLocaleDateString("en-US")}
              </p>
              <p>
                Created: {formatDate(prescription.createdAt)} | Updated:{" "}
                {formatDate(prescription.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Prescription History Component
  const PrescriptionHistory = () => {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    selectedDate: "",
    selectedDoctor: "",
    selectedDepartment: "",
    selectedPaymentStatus: "",
    dateRange: { start: "", end: "" },
  });

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchPrescriptions = async () => {
      setIsLoading(true);
      try {
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

  // Enhanced filter prescriptions based on active tab, search query, and filters
  useEffect(() => {
    let filtered = prescriptions;

    // Filter by status first
    if (activeTab !== "all") {
      filtered = filtered.filter((p) => p.status === activeTab);
    }

    // Apply search and advanced filters
    filtered = searchPrescriptions(filtered, searchQuery, filters);

    // Apply payment status filter
    if (filters.selectedPaymentStatus) {
      filtered = filtered.filter(
        (prescription) =>
          prescription.billing.paymentStatus === filters.selectedPaymentStatus
      );
    }

    setFilteredPrescriptions(filtered);
  }, [prescriptions, activeTab, searchQuery, filters]);

  const handleViewDetails = (prescription) => {
    setSelectedPrescription(prescription);
    setIsModalOpen(true);
  };

  const handleViewBilling = (prescription) => {
    setSelectedPrescription(prescription);
    setIsBillingModalOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleDateClick = (date) => {
    setFilters((prev) => ({
      ...prev,
      selectedDate: date,
    }));
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

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
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

  const activeFiltersCount = Object.values(filters).filter((value) =>
    typeof value === "object" ? value.start || value.end : value
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#097DD1] text-white px-4 py-3 shadow-md">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-[#097DD1] text-black p-2 rounded-lg hover:bg-gray-200 transition"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg font-semibold">Patient History & Billing</h1>
            <p className="text-sm text-white/80">
              Complete medical prescription records with billing management and
              advanced search
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Search and Filter Bar */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by doctor, medication, date (YYYY-MM-DD or MM/DD/YYYY), patient details, bill ID..."
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 shadow-sm"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <button
              onClick={() => setIsFilterPanelOpen(true)}
              className="flex items-center space-x-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm relative"
            >
              <Filter size={20} className="text-gray-600" />
              <span className="font-medium text-gray-700">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Search Results and Active Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {searchQuery && (
              <div className="text-sm text-gray-600">
                {filteredPrescriptions.length > 0 ? (
                  <span>
                    Found{" "}
                    <span className="font-semibold text-blue-600">
                      {filteredPrescriptions.length}
                    </span>
                    {filteredPrescriptions.length === 1
                      ? " result"
                      : " results"}
                  </span>
                ) : (
                  <span className="text-red-600">No results found</span>
                )}
              </div>
            )}

            {/* Active Filter Tags */}
            {filters.selectedDate && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                <Calendar size={14} className="mr-1" />
                {new Date(filters.selectedDate).toLocaleDateString()}
                <button
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, selectedDate: "" }))
                  }
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X size={14} />
                </button>
              </span>
            )}

            {filters.selectedDoctor && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                <Stethoscope size={14} className="mr-1" />
                Dr.{" "}
                {
                  prescriptions
                    .find((p) => p.doctor.id === filters.selectedDoctor)
                    ?.doctor.name.split(" ")[1]
                }
                <button
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, selectedDoctor: "" }))
                  }
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <X size={14} />
                </button>
              </span>
            )}

            {filters.selectedDepartment && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                <Building size={14} className="mr-1" />
                {filters.selectedDepartment}
                <button
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, selectedDepartment: "" }))
                  }
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  <X size={14} />
                </button>
              </span>
            )}

            {filters.selectedPaymentStatus && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                <DollarSign size={14} className="mr-1" />
                {filters.selectedPaymentStatus.charAt(0).toUpperCase() +
                  filters.selectedPaymentStatus.slice(1)}
                <button
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      selectedPaymentStatus: "",
                    }))
                  }
                  className="ml-2 text-yellow-600 hover:text-yellow-800"
                >
                  <X size={14} />
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <div className="flex items-center">
                    {getTabIcon(tab.key)}
                    <div className="text-left">
                      <div className="flex items-center space-x-2">
                        <span>{tab.label}</span>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            activeTab === tab.key
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {
                            filteredPrescriptions.filter((p) =>
                              tab.key === "all" ? true : p.status === tab.key
                            ).length
                          }
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Prescriptions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredPrescriptions.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Paid Bills</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    filteredPrescriptions.filter(
                      (p) => p.billing.paymentStatus === "paid"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="text-yellow-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Bills</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    filteredPrescriptions.filter(
                      (p) => p.billing.paymentStatus === "pending"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="text-red-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Overdue Bills</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    filteredPrescriptions.filter(
                      (p) => p.billing.paymentStatus === "overdue"
                    ).length
                  }
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
                      Status & Payment
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
                          <button
                            onClick={() => handleDateClick(prescription.date)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Calendar className="mt-1" size={16} />
                          </button>
                          <div>
                            <button
                              onClick={() => handleDateClick(prescription.date)}
                              className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
                            >
                              {formatDate(prescription.date)} at{" "}
                              {formatTime(prescription.time)}
                            </button>
                            <div className="text-xs text-gray-500 mt-1">
                              {prescription.prescriptionNumber}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              Patient: {prescription.patient.name} (ID:{" "}
                              {prescription.patient.id})
                            </div>
                            <div className="text-xs text-gray-400">
                              {prescription.medications.length} medication
                              {prescription.medications.length !== 1
                                ? "s"
                                : ""}{" "}
                              •{" "}
                              {formatCurrency(prescription.billing.finalAmount)}
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
                          <div>
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(
                                prescription.billing.paymentStatus
                              )}`}
                            >
                              {prescription.billing.paymentStatus
                                .charAt(0)
                                .toUpperCase() +
                                prescription.billing.paymentStatus.slice(1)}
                            </span>
                          </div>
                          {prescription.pharmacyName && (
                            <div className="text-xs text-gray-500">
                              {prescription.pharmacyName}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewDetails(prescription)}
                            className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                          >
                            <Eye size={16} />
                            <span>Details</span>
                          </button>
                          <button
                            onClick={() => handleViewBilling(prescription)}
                            className="flex items-center space-x-1 bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-sm hover:shadow-md"
                          >
                            <Receipt size={16} />
                            <span>Billing</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredPrescriptions.length === 0 && (
              <div className="text-center py-12">
                <Pill size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  {searchQuery || activeFiltersCount > 0
                    ? "No matching prescriptions found"
                    : "No prescriptions found"}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  {searchQuery || activeFiltersCount > 0
                    ? "Try adjusting your search terms or filters"
                    : "Try adjusting your search criteria"}
                </p>
                {(searchQuery || activeFiltersCount > 0) && (
                  <div className="mt-4 space-x-2">
                    {searchQuery && (
                      <button
                        onClick={clearSearch}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Clear search
                      </button>
                    )}
                    {activeFiltersCount > 0 && (
                      <button
                        onClick={() =>
                          setFilters({
                            selectedDate: "",
                            selectedDoctor: "",
                            selectedDepartment: "",
                            selectedPaymentStatus: "",
                            dateRange: { start: "", end: "" },
                          })
                        }
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {isModalOpen && selectedPrescription && (
        <PrescriptionModal
          prescription={selectedPrescription}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isBillingModalOpen && selectedPrescription && (
        <BillingModal
          prescription={selectedPrescription}
          onClose={() => setIsBillingModalOpen(false)}
        />
      )}

      {isFilterPanelOpen && (
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          prescriptions={prescriptions}
          isOpen={isFilterPanelOpen}
          onClose={() => setIsFilterPanelOpen(false)}
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
