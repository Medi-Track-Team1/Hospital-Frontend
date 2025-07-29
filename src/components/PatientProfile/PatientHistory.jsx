import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
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
  MapPin,
  Heart,
  Shield,
  Clipboard,
  Timer,
} from "lucide-react";

// Enhanced Mock data with 7 comprehensive prescription and billing records
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
      mbbs: "MBBS, MS (Cardiology)",
      regNo: "74652",
      phoneNumber: "+1-555-0100",
      email: "dr.smith@meditrack.com",
      consultationFee: 150.0,
    },
    patient: {
      id: "PAT-001",
      name: "John Doe",
      age: 45,
      gender: "Male",
      dateOfBirth: "1979-03-15",
      bloodGroup: "O+",
      weight: "78 kg",
      height: "5'10\"",
      email: "john.doe@email.com",
      phone: "+1-555-0123",
      emergencyContact: {
        name: "Jane Doe",
        relationship: "Spouse",
        phone: "+1-555-0124",
      },
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
        copay: 25.0,
      },
      medicalHistory: ["Hypertension (2020)", "High Cholesterol (2019)"],
      allergies: ["Penicillin", "Shellfish"],
    },
    hospitalName: "MEDITRACK MEDICAL CENTRE",
    hospitalAddress: "Opposite to hospital temple, Main road, City-123456",
    hospitalPhone: "+1-555-9000",
    consultationTime: "9am-2pm & 5:30pm-9pm\nSunday holiday",
    appointmentNumber: "9600862639",
    appointmentType: "Follow-up Consultation",
    officeId: "RK20663",
    status: "completed",
    priority: "Normal",
    referredBy: "Dr. Johnson (General Medicine)",
    visitReason: "Routine cardiology checkup and medication review",
    vitalSigns: {
      bloodPressure: "140/90 mmHg",
      heartRate: "72 bpm",
      temperature: "98.6°F",
      weight: "78 kg",
      height: "5'10\"",
      oxygenSaturation: "98%",
    },
    labResults: [
      {
        test: "Total Cholesterol",
        value: "220 mg/dL",
        normalRange: "<200 mg/dL",
        status: "High",
      },
      {
        test: "LDL Cholesterol",
        value: "145 mg/dL",
        normalRange: "<100 mg/dL",
        status: "High",
      },
    ],
    medications: [
      {
        id: "med1",
        name: "Atorvastatin",
        genericName: "Atorvastatin Calcium",
        dosage: "20mg",
        frequency: "Once daily",
        duration: "30 days",
        instructions: "Take with dinner, avoid grapefruit",
        quantity: 30,
        unitPrice: 1.25,
        totalPrice: 37.5,
        manufacturer: "Pfizer",
        lotNumber: "LOT123456",
        expiryDate: "2026-12-31",
        refillsRemaining: 5,
      },
      {
        id: "med2",
        name: "Aspirin",
        genericName: "Acetylsalicylic Acid",
        dosage: "81mg",
        frequency: "Once daily",
        duration: "30 days",
        instructions: "Take with food to reduce stomach irritation",
        quantity: 30,
        unitPrice: 0.15,
        totalPrice: 4.5,
        manufacturer: "Bayer",
        lotNumber: "LOT789012",
        expiryDate: "2026-08-15",
        refillsRemaining: 3,
      },
    ],
    billing: {
      billId: "BILL-2025-001",
      billDate: "2025-01-15",
      consultationFee: 150.0,
      medicationTotal: 42.0,
      labTestFees: 85.0,
      procedureFees: 0.0,
      facilityFees: 25.0,
      subtotal: 192.0,
      tax: 15.36,
      discount: 10.0,
      insuranceCoverage: 120.0,
      copay: 25.0,
      finalAmount: 197.36,
      paymentStatus: "paid",
      paymentDate: "2025-01-15",
      paymentMethod: "Credit Card",
      transactionId: "TXN-20250115-001",
    },
    diagnosis: "Essential Hypertension (I10) and Hypercholesterolemia (E78.0)",
    icdCodes: ["I10", "E78.0"],
    clinicalNotes:
      "Patient presents with well-controlled hypertension and elevated cholesterol levels. Current medication regimen appears effective. Blood pressure readings have improved since last visit.",
    treatmentPlan:
      "Continue current medications, dietary modifications, regular exercise, follow-up in 3 months",
    notes:
      "Patient advised to reduce salt intake, exercise regularly, and maintain low-cholesterol diet. Schedule lipid panel in 6 weeks.",
    nextFollowUp: "2025-02-15",
    followUpInstructions:
      "Return if experiencing chest pain, shortness of breath, or unusual symptoms",
    pharmacyName: "City Pharmacy",
    pharmacyAddress: "456 Oak Street, New York, NY 10002",
    pharmacyPhone: "+1-555-7890",
    dispensedDate: "2025-01-15",
    dispensedBy: "PharmD Sarah Wilson",
    prescriptionValidUntil: "2025-02-14",
    totalAmount: 197.36,
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
      mbbs: "MBBS, MS (Dermatology)",
      regNo: "74653",
      phoneNumber: "+1-555-0101",
      email: "dr.patel@meditrack.com",
      consultationFee: 120.0,
    },
    patient: {
      id: "PAT-002",
      name: "Sarah Johnson",
      age: 32,
      gender: "Female",
      dateOfBirth: "1992-08-22",
      bloodGroup: "A+",
      weight: "65 kg",
      height: "5'6\"",
      email: "sarah.johnson@email.com",
      phone: "+1-555-0125",
      emergencyContact: {
        name: "Mike Johnson",
        relationship: "Husband",
        phone: "+1-555-0126",
      },
      address: {
        street: "456 Oak Avenue",
        city: "Boston",
        state: "MA",
        zipCode: "02101",
        country: "USA",
      },
      insurance: {
        provider: "Blue Cross",
        policyNumber: "BC-54321",
        groupNumber: "GRP-456",
        copay: 30.0,
      },
      medicalHistory: ["Eczema (childhood)", "Seasonal Allergies"],
      allergies: ["Latex", "Pollen"],
    },
    hospitalName: "MEDITRACK MEDICAL CENTRE",
    hospitalAddress: "Opposite to hospital temple, Main road, City-123456",
    hospitalPhone: "+1-555-9000",
    consultationTime: "9am-2pm & 5:30pm-9pm\nSunday holiday",
    appointmentNumber: "9600862640",
    appointmentType: "New Patient Consultation",
    officeId: "RK20664",
    status: "ongoing",
    priority: "Normal",
    referredBy: "Self-referred",
    visitReason: "Skin irritation and rash on hands",
    vitalSigns: {
      bloodPressure: "125/80 mmHg",
      heartRate: "68 bpm",
      temperature: "98.2°F",
      weight: "65 kg",
      height: "5'6\"",
      oxygenSaturation: "99%",
    },
    labResults: [],
    medications: [
      {
        id: "med3",
        name: "Hydrocortisone Cream",
        genericName: "Hydrocortisone",
        dosage: "1%",
        frequency: "Apply twice daily",
        duration: "14 days",
        instructions:
          "Apply thin layer to affected area, wash hands after application",
        quantity: 1,
        unitPrice: 22.0,
        totalPrice: 22.0,
        manufacturer: "Johnson & Johnson",
        lotNumber: "LOT345678",
        expiryDate: "2026-06-30",
        refillsRemaining: 2,
      },
    ],
    billing: {
      billId: "BILL-2025-002",
      billDate: "2025-01-10",
      consultationFee: 120.0,
      medicationTotal: 22.0,
      labTestFees: 0.0,
      procedureFees: 0.0,
      facilityFees: 15.0,
      subtotal: 157.0,
      tax: 12.56,
      discount: 0.0,
      insuranceCoverage: 95.0,
      copay: 30.0,
      finalAmount: 104.56,
      paymentStatus: "pending",
      paymentDate: null,
      paymentMethod: null,
      transactionId: null,
    },
    diagnosis: "Contact Dermatitis (L25.9)",
    icdCodes: ["L25.9"],
    clinicalNotes:
      "Patient presents with acute contact dermatitis on both hands. Likely occupational exposure. Skin appears inflamed with mild scaling.",
    treatmentPlan:
      "Topical corticosteroid therapy, avoid irritants, use protective gloves",
    notes:
      "Avoid harsh soaps and chemicals, use moisturizer regularly, wear protective gloves when cleaning",
    nextFollowUp: "2025-01-24",
    followUpInstructions:
      "Return if no improvement in 2 weeks or if condition worsens",
    pharmacyName: "Health Plus Pharmacy",
    pharmacyAddress: "789 Pine Avenue, Boston, MA 02102",
    pharmacyPhone: "+1-555-7891",
    dispensedDate: "2025-01-10",
    dispensedBy: "PharmD Michael Chen",
    prescriptionValidUntil: "2025-01-24",
    totalAmount: 104.56,
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
      mbbs: "MBBS, MS (Neurology)",
      regNo: "74654",
      phoneNumber: "+1-555-0102",
      email: "dr.rana@meditrack.com",
      consultationFee: 175.0,
    },
    patient: {
      id: "PAT-003",
      name: "Michael Brown",
      age: 38,
      gender: "Male",
      dateOfBirth: "1986-11-12",
      bloodGroup: "B+",
      weight: "82 kg",
      height: "6'0\"",
      email: "michael.brown@email.com",
      phone: "+1-555-0127",
      emergencyContact: {
        name: "Lisa Brown",
        relationship: "Wife",
        phone: "+1-555-0128",
      },
      address: {
        street: "789 Pine Street",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
        country: "USA",
      },
      insurance: {
        provider: "Aetna",
        policyNumber: "AET-67890",
        groupNumber: "GRP-123",
        copay: 35.0,
      },
      medicalHistory: ["Migraines (2015)", "Stress-related headaches"],
      allergies: ["Codeine", "Nuts"],
    },
    hospitalName: "MEDITRACK MEDICAL CENTRE",
    hospitalAddress: "Opposite to hospital temple, Main road, City-123456",
    hospitalPhone: "+1-555-9000",
    consultationTime: "9am-2pm & 5:30pm-9pm\nSunday holiday",
    appointmentNumber: "9600862641",
    appointmentType: "Specialist Consultation",
    officeId: "RK20665",
    status: "completed",
    priority: "High",
    referredBy: "Dr. Martinez (Emergency Medicine)",
    visitReason: "Severe recurring migraines, medication adjustment needed",
    vitalSigns: {
      bloodPressure: "118/75 mmHg",
      heartRate: "65 bpm",
      temperature: "98.4°F",
      weight: "82 kg",
      height: "6'0\"",
      oxygenSaturation: "99%",
    },
    labResults: [
      {
        test: "Complete Blood Count",
        value: "Normal",
        normalRange: "Within normal limits",
        status: "Normal",
      },
    ],
    medications: [
      {
        id: "med4",
        name: "Sumatriptan",
        genericName: "Sumatriptan Succinate",
        dosage: "50mg",
        frequency: "As needed",
        duration: "30 days",
        instructions: "Take at onset of migraine, maximum 2 doses per day",
        quantity: 9,
        unitPrice: 4.5,
        totalPrice: 40.5,
        manufacturer: "GlaxoSmithKline",
        lotNumber: "LOT901234",
        expiryDate: "2026-11-30",
        refillsRemaining: 4,
      },
      {
        id: "med5",
        name: "Propranolol",
        genericName: "Propranolol Hydrochloride",
        dosage: "40mg",
        frequency: "Twice daily",
        duration: "30 days",
        instructions: "Take with meals, do not stop abruptly",
        quantity: 60,
        unitPrice: 0.85,
        totalPrice: 51.0,
        manufacturer: "Teva",
        lotNumber: "LOT567890",
        expiryDate: "2026-09-15",
        refillsRemaining: 5,
      },
    ],
    billing: {
      billId: "BILL-2025-003",
      billDate: "2025-01-05",
      consultationFee: 175.0,
      medicationTotal: 91.5,
      labTestFees: 45.0,
      procedureFees: 0.0,
      facilityFees: 20.0,
      subtotal: 331.5,
      tax: 26.52,
      discount: 25.0,
      insuranceCoverage: 200.0,
      copay: 35.0,
      finalAmount: 158.02,
      paymentStatus: "paid",
      paymentDate: "2025-01-05",
      paymentMethod: "Debit Card",
      transactionId: "TXN-20250105-003",
    },
    diagnosis: "Migraine without Aura (G43.009)",
    icdCodes: ["G43.009"],
    clinicalNotes:
      "Patient experiencing frequent migraines, 3-4 episodes per week. Previous medication ineffective. Neurological examination normal.",
    treatmentPlan:
      "Initiate prophylactic therapy with propranolol, sumatriptan for acute episodes, lifestyle modifications",
    notes:
      "Patient should maintain headache diary, avoid known triggers (stress, certain foods), regular sleep schedule",
    nextFollowUp: "2025-02-05",
    followUpInstructions:
      "Return immediately if experiencing severe headache with fever, neck stiffness, or visual changes",
    pharmacyName: "Downtown Pharmacy",
    pharmacyAddress: "321 Broadway, Chicago, IL 60602",
    pharmacyPhone: "+1-555-7892",
    dispensedDate: "2025-01-05",
    dispensedBy: "PharmD Lisa Rodriguez",
    prescriptionValidUntil: "2025-02-04",
    totalAmount: 158.02,
    createdAt: "2025-01-05T11:00:00Z",
    updatedAt: "2025-01-05T11:00:00Z",
  },
  {
    id: "4",
    prescriptionNumber: "RX-2025-004",
    date: "2025-01-08",
    time: "14:30",
    doctor: {
      id: "doc4",
      name: "Dr. Wilson",
      department: "Orthopedics",
      specialization: "Sports Medicine",
      mbbs: "MBBS, MS (Orthopedics)",
      regNo: "74655",
      phoneNumber: "+1-555-0103",
      email: "dr.wilson@meditrack.com",
      consultationFee: 180.0,
    },
    patient: {
      id: "PAT-004",
      name: "Emily Davis",
      age: 28,
      gender: "Female",
      dateOfBirth: "1996-05-18",
      bloodGroup: "AB+",
      weight: "58 kg",
      height: "5'4\"",
      email: "emily.davis@email.com",
      phone: "+1-555-0129",
      emergencyContact: {
        name: "Robert Davis",
        relationship: "Father",
        phone: "+1-555-0130",
      },
      address: {
        street: "321 Elm Street",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90001",
        country: "USA",
      },
      insurance: {
        provider: "Kaiser Permanente",
        policyNumber: "KP-98765",
        groupNumber: "GRP-321",
        copay: 40.0,
      },
      medicalHistory: ["Previous ankle sprain (2023)", "ACL tear (2022)"],
      allergies: ["Sulfa drugs"],
    },
    hospitalName: "MEDITRACK MEDICAL CENTRE",
    hospitalAddress: "Opposite to hospital temple, Main road, City-123456",
    hospitalPhone: "+1-555-9000",
    consultationTime: "9am-2pm & 5:30pm-9pm\nSunday holiday",
    appointmentNumber: "9600862642",
    appointmentType: "Follow-up Consultation",
    officeId: "RK20666",
    status: "ongoing",
    priority: "Normal",
    referredBy: "Dr. Thompson (Physical Therapy)",
    visitReason: "Knee pain and swelling after exercise",
    vitalSigns: {
      bloodPressure: "110/70 mmHg",
      heartRate: "75 bpm",
      temperature: "98.1°F",
      weight: "58 kg",
      height: "5'4\"",
      oxygenSaturation: "99%",
    },
    labResults: [
      {
        test: "X-Ray Knee",
        value: "Mild joint effusion",
        normalRange: "No abnormalities",
        status: "Abnormal",
      },
    ],
    medications: [
      {
        id: "med6",
        name: "Ibuprofen",
        genericName: "Ibuprofen",
        dosage: "400mg",
        frequency: "Three times daily",
        duration: "14 days",
        instructions: "Take with food, do not exceed recommended dose",
        quantity: 42,
        unitPrice: 0.25,
        totalPrice: 10.5,
        manufacturer: "Advil",
        lotNumber: "LOT456789",
        expiryDate: "2026-03-31",
        refillsRemaining: 2,
      },
      {
        id: "med7",
        name: "Diclofenac Gel",
        genericName: "Diclofenac Sodium",
        dosage: "1%",
        frequency: "Apply twice daily",
        duration: "14 days",
        instructions: "Apply to affected area, wash hands after use",
        quantity: 1,
        unitPrice: 18.0,
        totalPrice: 18.0,
        manufacturer: "Voltaren",
        lotNumber: "LOT112233",
        expiryDate: "2026-07-31",
        refillsRemaining: 1,
      },
    ],
    billing: {
      billId: "BILL-2025-004",
      billDate: "2025-01-08",
      consultationFee: 180.0,
      medicationTotal: 28.5,
      labTestFees: 125.0,
      procedureFees: 0.0,
      facilityFees: 30.0,
      subtotal: 363.5,
      tax: 29.08,
      discount: 15.0,
      insuranceCoverage: 250.0,
      copay: 40.0,
      finalAmount: 187.58,
      paymentStatus: "paid",
      paymentDate: "2025-01-08",
      paymentMethod: "Insurance + Credit Card",
      transactionId: "TXN-20250108-004",
    },
    diagnosis: "Knee Joint Effusion (M25.461)",
    icdCodes: ["M25.461"],
    clinicalNotes:
      "Patient presents with moderate knee swelling and pain following recent athletic activity. X-ray shows mild joint effusion.",
    treatmentPlan:
      "Anti-inflammatory medications, rest, ice therapy, physical therapy follow-up",
    notes:
      "Avoid high-impact activities for 2 weeks, ice 15-20 minutes 3-4 times daily, continue with gentle range of motion exercises",
    nextFollowUp: "2025-01-22",
    followUpInstructions:
      "Return if pain increases or swelling persists beyond 2 weeks",
    pharmacyName: "Sports Medicine Pharmacy",
    pharmacyAddress: "654 Olympic Blvd, Los Angeles, CA 90012",
    pharmacyPhone: "+1-555-7893",
    dispensedDate: "2025-01-08",
    dispensedBy: "PharmD Jennifer Lee",
    prescriptionValidUntil: "2025-01-22",
    totalAmount: 187.58,
    createdAt: "2025-01-08T14:30:00Z",
    updatedAt: "2025-01-08T14:30:00Z",
  },
  {
    id: "5",
    prescriptionNumber: "RX-2025-005",
    date: "2025-01-12",
    time: "09:15",
    doctor: {
      id: "doc5",
      name: "Dr. Garcia",
      department: "Pediatrics",
      specialization: "General Pediatrics",
      mbbs: "MBBS, MD (Pediatrics)",
      regNo: "74656",
      phoneNumber: "+1-555-0104",
      email: "dr.garcia@meditrack.com",
      consultationFee: 140.0,
    },
    patient: {
      id: "PAT-005",
      name: "Tommy Wilson",
      age: 8,
      gender: "Male",
      dateOfBirth: "2016-09-03",
      bloodGroup: "O-",
      weight: "28 kg",
      height: "4'2\"",
      email: "parent@email.com",
      phone: "+1-555-0131",
      emergencyContact: {
        name: "Amanda Wilson",
        relationship: "Mother",
        phone: "+1-555-0132",
      },
      address: {
        street: "987 Maple Lane",
        city: "Denver",
        state: "CO",
        zipCode: "80201",
        country: "USA",
      },
      insurance: {
        provider: "Children's Health Plan",
        policyNumber: "CHP-11223",
        groupNumber: "GRP-555",
        copay: 20.0,
      },
      medicalHistory: ["Asthma (2022)", "Seasonal allergies"],
      allergies: ["Peanuts", "Dust mites"],
    },
    hospitalName: "MEDITRACK MEDICAL CENTRE",
    hospitalAddress: "Opposite to hospital temple, Main road, City-123456",
    hospitalPhone: "+1-555-9000",
    consultationTime: "9am-2pm & 5:30pm-9pm\nSunday holiday",
    appointmentNumber: "9600862643",
    appointmentType: "Routine Check-up",
    officeId: "RK20667",
    status: "completed",
    priority: "Normal",
    referredBy: "School Nurse",
    visitReason: "Persistent cough and wheezing, asthma management",
    vitalSigns: {
      bloodPressure: "95/60 mmHg",
      heartRate: "88 bpm",
      temperature: "99.1°F",
      weight: "28 kg",
      height: "4'2\"",
      oxygenSaturation: "96%",
    },
    labResults: [
      {
        test: "Peak Flow",
        value: "180 L/min",
        normalRange: "200-250 L/min",
        status: "Below Normal",
      },
    ],
    medications: [
      {
        id: "med8",
        name: "Albuterol Inhaler",
        genericName: "Albuterol Sulfate",
        dosage: "90mcg",
        frequency: "2 puffs every 4-6 hours as needed",
        duration: "30 days",
        instructions: "Shake well before use, rinse mouth after use",
        quantity: 1,
        unitPrice: 35.0,
        totalPrice: 35.0,
        manufacturer: "ProAir",
        lotNumber: "LOT789123",
        expiryDate: "2026-04-30",
        refillsRemaining: 3,
      },
      {
        id: "med9",
        name: "Montelukast",
        genericName: "Montelukast Sodium",
        dosage: "5mg",
        frequency: "Once daily at bedtime",
        duration: "30 days",
        instructions: "Take as directed, may take with or without food",
        quantity: 30,
        unitPrice: 2.5,
        totalPrice: 75.0,
        manufacturer: "Singulair",
        lotNumber: "LOT334455",
        expiryDate: "2026-10-31",
        refillsRemaining: 5,
      },
    ],
    billing: {
      billId: "BILL-2025-005",
      billDate: "2025-01-12",
      consultationFee: 140.0,
      medicationTotal: 110.0,
      labTestFees: 40.0,
      procedureFees: 0.0,
      facilityFees: 20.0,
      subtotal: 310.0,
      tax: 24.8,
      discount: 20.0,
      insuranceCoverage: 200.0,
      copay: 20.0,
      finalAmount: 134.8,
      paymentStatus: "paid",
      paymentDate: "2025-01-12",
      paymentMethod: "Insurance + Cash",
      transactionId: "TXN-20250112-005",
    },
    diagnosis: "Asthma, Mild Persistent (J45.20)",
    icdCodes: ["J45.20"],
    clinicalNotes:
      "Child presents with well-controlled asthma but recent increase in symptoms. Peak flow readings below normal range.",
    treatmentPlan:
      "Continue rescue inhaler, add controller medication, environmental modifications",
    notes:
      "Avoid known triggers, use air purifier in bedroom, ensure proper inhaler technique",
    nextFollowUp: "2025-02-12",
    followUpInstructions:
      "Return if symptoms worsen or rescue inhaler needed more than twice weekly",
    pharmacyName: "Children's Pharmacy",
    pharmacyAddress: "246 Family Way, Denver, CO 80202",
    pharmacyPhone: "+1-555-7894",
    dispensedDate: "2025-01-12",
    dispensedBy: "PharmD Susan Taylor",
    prescriptionValidUntil: "2025-02-11",
    totalAmount: 134.8,
    createdAt: "2025-01-12T09:15:00Z",
    updatedAt: "2025-01-12T09:15:00Z",
  },
  {
    id: "6",
    prescriptionNumber: "RX-2025-006",
    date: "2025-01-14",
    time: "16:45",
    doctor: {
      id: "doc6",
      name: "Dr. Thompson",
      department: "Psychiatry",
      specialization: "Adult Psychiatry",
      mbbs: "MBBS, MD (Psychiatry)",
      regNo: "74657",
      phoneNumber: "+1-555-0105",
      email: "dr.thompson@meditrack.com",
      consultationFee: 200.0,
    },
    patient: {
      id: "PAT-006",
      name: "Rachel Green",
      age: 35,
      gender: "Female",
      dateOfBirth: "1989-12-08",
      bloodGroup: "A-",
      weight: "62 kg",
      height: "5'5\"",
      email: "rachel.green@email.com",
      phone: "+1-555-0133",
      emergencyContact: {
        name: "Monica Geller",
        relationship: "Friend",
        phone: "+1-555-0134",
      },
      address: {
        street: "555 Central Park West",
        city: "New York",
        state: "NY",
        zipCode: "10024",
        country: "USA",
      },
      insurance: {
        provider: "Mental Health Alliance",
        policyNumber: "MHA-77889",
        groupNumber: "GRP-999",
        copay: 50.0,
      },
      medicalHistory: ["Anxiety disorder (2020)", "Depression (2019)"],
      allergies: ["None known"],
    },
    hospitalName: "MEDITRACK MEDICAL CENTRE",
    hospitalAddress: "Opposite to hospital temple, Main road, City-123456",
    hospitalPhone: "+1-555-9000",
    consultationTime: "9am-2pm & 5:30pm-9pm\nSunday holiday",
    appointmentNumber: "9600862644",
    appointmentType: "Therapy Session",
    officeId: "RK20668",
    status: "completed",
    priority: "Normal",
    referredBy: "Dr. Ross (Primary Care)",
    visitReason: "Anxiety management and medication review",
    vitalSigns: {
      bloodPressure: "128/82 mmHg",
      heartRate: "78 bpm",
      temperature: "98.3°F",
      weight: "62 kg",
      height: "5'5\"",
      oxygenSaturation: "98%",
    },
    labResults: [],
    medications: [
      {
        id: "med10",
        name: "Sertraline",
        genericName: "Sertraline Hydrochloride",
        dosage: "50mg",
        frequency: "Once daily in morning",
        duration: "30 days",
        instructions: "Take with food, may cause drowsiness initially",
        quantity: 30,
        unitPrice: 1.8,
        totalPrice: 54.0,
        manufacturer: "Zoloft",
        lotNumber: "LOT667788",
        expiryDate: "2026-08-31",
        refillsRemaining: 5,
      },
      {
        id: "med11",
        name: "Lorazepam",
        genericName: "Lorazepam",
        dosage: "0.5mg",
        frequency: "As needed for anxiety",
        duration: "30 days",
        instructions: "Do not exceed 2mg per day, avoid alcohol",
        quantity: 15,
        unitPrice: 0.75,
        totalPrice: 11.25,
        manufacturer: "Ativan",
        lotNumber: "LOT998877",
        expiryDate: "2026-12-31",
        refillsRemaining: 2,
      },
    ],
    billing: {
      billId: "BILL-2025-006",
      billDate: "2025-01-14",
      consultationFee: 200.0,
      medicationTotal: 65.25,
      labTestFees: 0.0,
      procedureFees: 0.0,
      facilityFees: 25.0,
      subtotal: 290.25,
      tax: 23.22,
      discount: 30.0,
      insuranceCoverage: 180.0,
      copay: 50.0,
      finalAmount: 153.47,
      paymentStatus: "pending",
      paymentDate: null,
      paymentMethod: null,
      transactionId: null,
    },
    diagnosis: "Generalized Anxiety Disorder (F41.1)",
    icdCodes: ["F41.1"],
    clinicalNotes:
      "Patient reports improvement in anxiety symptoms with current medication regimen. Sleep quality has improved.",
    treatmentPlan:
      "Continue current medications, cognitive behavioral therapy, stress management techniques",
    notes:
      "Practice relaxation techniques, maintain regular sleep schedule, avoid caffeine after 2 PM",
    nextFollowUp: "2025-02-14",
    followUpInstructions:
      "Contact immediately if experiencing increased anxiety or suicidal thoughts",
    pharmacyName: "Mind & Body Pharmacy",
    pharmacyAddress: "888 Wellness Ave, New York, NY 10025",
    pharmacyPhone: "+1-555-7895",
    dispensedDate: "2025-01-14",
    dispensedBy: "PharmD David Kim",
    prescriptionValidUntil: "2025-02-13",
    totalAmount: 153.47,
    createdAt: "2025-01-14T16:45:00Z",
    updatedAt: "2025-01-14T16:45:00Z",
  },
  {
    id: "7",
    prescriptionNumber: "RX-2025-007",
    date: "2025-01-16",
    time: "13:20",
    doctor: {
      id: "doc7",
      name: "Dr. Martinez",
      department: "Endocrinology",
      specialization: "Diabetes Management",
      mbbs: "MBBS, MD (Endocrinology)",
      regNo: "74658",
      phoneNumber: "+1-555-0106",
      email: "dr.martinez@meditrack.com",
      consultationFee: 190.0,
    },
    patient: {
      id: "PAT-007",
      name: "Robert Taylor",
      age: 52,
      gender: "Male",
      dateOfBirth: "1972-04-25",
      bloodGroup: "B-",
      weight: "85 kg",
      height: "5'9\"",
      email: "robert.taylor@email.com",
      phone: "+1-555-0135",
      emergencyContact: {
        name: "Mary Taylor",
        relationship: "Wife",
        phone: "+1-555-0136",
      },
      address: {
        street: "147 Diabetes Way",
        city: "Phoenix",
        state: "AZ",
        zipCode: "85001",
        country: "USA",
      },
      insurance: {
        provider: "United HealthCare",
        policyNumber: "UHC-44556",
        groupNumber: "GRP-777",
        copay: 45.0,
      },
      medicalHistory: [
        "Type 2 Diabetes (2018)",
        "Hypertension (2020)",
        "High cholesterol (2019)",
      ],
      allergies: ["Metformin (GI intolerance)"],
    },
    hospitalName: "MEDITRACK MEDICAL CENTRE",
    hospitalAddress: "Opposite to hospital temple, Main road, City-123456",
    hospitalPhone: "+1-555-9000",
    consultationTime: "9am-2pm & 5:30pm-9pm\nSunday holiday",
    appointmentNumber: "9600862645",
    appointmentType: "Diabetes Management",
    officeId: "RK20669",
    status: "ongoing",
    priority: "High",
    referredBy: "Dr. Anderson (Family Medicine)",
    visitReason: "Diabetes management and HbA1c review",
    vitalSigns: {
      bloodPressure: "145/95 mmHg",
      heartRate: "70 bpm",
      temperature: "98.5°F",
      weight: "85 kg",
      height: "5'9\"",
      oxygenSaturation: "97%",
    },
    labResults: [
      {
        test: "HbA1c",
        value: "8.2%",
        normalRange: "<7.0%",
        status: "High",
      },
      {
        test: "Fasting Glucose",
        value: "165 mg/dL",
        normalRange: "70-100 mg/dL",
        status: "High",
      },
    ],
    medications: [
      {
        id: "med12",
        name: "Glipizide",
        genericName: "Glipizide",
        dosage: "10mg",
        frequency: "Twice daily before meals",
        duration: "30 days",
        instructions: "Take 30 minutes before breakfast and dinner",
        quantity: 60,
        unitPrice: 0.45,
        totalPrice: 27.0,
        manufacturer: "Glucotrol",
        lotNumber: "LOT556677",
        expiryDate: "2026-05-31",
        refillsRemaining: 5,
      },
      {
        id: "med13",
        name: "Insulin Glargine",
        genericName: "Insulin Glargine",
        dosage: "100 units/mL",
        frequency: "20 units at bedtime",
        duration: "30 days",
        instructions: "Inject subcutaneously, rotate injection sites",
        quantity: 1,
        unitPrice: 85.0,
        totalPrice: 85.0,
        manufacturer: "Lantus",
        lotNumber: "LOT223344",
        expiryDate: "2026-02-28",
        refillsRemaining: 3,
      },
      {
        id: "med14",
        name: "Glucose Test Strips",
        genericName: "Blood Glucose Test Strips",
        dosage: "N/A",
        frequency: "4 times daily",
        duration: "30 days",
        instructions: "Test before meals and at bedtime, record results",
        quantity: 120,
        unitPrice: 0.85,
        totalPrice: 102.0,
        manufacturer: "OneTouch",
        lotNumber: "LOT445566",
        expiryDate: "2026-01-31",
        refillsRemaining: 2,
      },
    ],
    billing: {
      billId: "BILL-2025-007",
      billDate: "2025-01-16",
      consultationFee: 190.0,
      medicationTotal: 214.0,
      labTestFees: 95.0,
      procedureFees: 0.0,
      facilityFees: 35.0,
      subtotal: 534.0,
      tax: 42.72,
      discount: 50.0,
      insuranceCoverage: 300.0,
      copay: 45.0,
      finalAmount: 271.72,
      paymentStatus: "paid",
      paymentDate: "2025-01-16",
      paymentMethod: "Insurance + Debit Card",
      transactionId: "TXN-20250116-007",
    },
    diagnosis: "Type 2 Diabetes Mellitus with Hyperglycemia (E11.65)",
    icdCodes: ["E11.65"],
    clinicalNotes:
      "Patient's diabetes management needs improvement. HbA1c elevated at 8.2%. Blood pressure also elevated.",
    treatmentPlan:
      "Intensify diabetes management, add insulin therapy, dietary counseling, blood pressure monitoring",
    notes:
      "Monitor blood glucose 4 times daily, follow diabetic diet, exercise 30 minutes daily, weight management",
    nextFollowUp: "2025-02-16",
    followUpInstructions:
      "Return sooner if blood glucose consistently >300 mg/dL or if experiencing symptoms of ketoacidosis",
    pharmacyName: "Diabetes Care Pharmacy",
    pharmacyAddress: "369 Wellness Center Dr, Phoenix, AZ 85002",
    pharmacyPhone: "+1-555-7896",
    dispensedDate: "2025-01-16",
    dispensedBy: "PharmD Maria Gonzalez",
    prescriptionValidUntil: "2025-02-15",
    totalAmount: 271.72,
    createdAt: "2025-01-16T13:20:00Z",
    updatedAt: "2025-01-16T13:20:00Z",
  },
];

// Enhanced search function with comprehensive field matching
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
        filtered = performTextSearch(filtered, searchTerm);
      }
    } else {
      // Text search across all searchable fields
      filtered = performTextSearch(filtered, searchTerm);
    }
  }

  // Apply advanced filters
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

// Comprehensive text search function
const performTextSearch = (prescriptions, searchTerm) => {
  return prescriptions.filter((prescription) => {
    // Search in basic prescription info
    if (
      prescription.prescriptionNumber.toLowerCase().includes(searchTerm) ||
      prescription.date.includes(searchTerm) ||
      prescription.time.includes(searchTerm) ||
      prescription.status.toLowerCase().includes(searchTerm) ||
      prescription.priority.toLowerCase().includes(searchTerm) ||
      prescription.appointmentType.toLowerCase().includes(searchTerm) ||
      prescription.visitReason.toLowerCase().includes(searchTerm) ||
      prescription.officeId.toLowerCase().includes(searchTerm) ||
      prescription.appointmentNumber.includes(searchTerm)
    ) {
      return true;
    }

    // Search in doctor information
    if (
      prescription.doctor.name.toLowerCase().includes(searchTerm) ||
      prescription.doctor.department.toLowerCase().includes(searchTerm) ||
      prescription.doctor.specialization.toLowerCase().includes(searchTerm) ||
      prescription.doctor.mbbs.toLowerCase().includes(searchTerm) ||
      prescription.doctor.regNo.includes(searchTerm) ||
      prescription.doctor.phoneNumber.includes(searchTerm) ||
      prescription.doctor.email.toLowerCase().includes(searchTerm)
    ) {
      return true;
    }

    // Search in patient information
    if (
      prescription.patient.name.toLowerCase().includes(searchTerm) ||
      prescription.patient.id.toLowerCase().includes(searchTerm) ||
      prescription.patient.email.toLowerCase().includes(searchTerm) ||
      prescription.patient.phone.includes(searchTerm) ||
      prescription.patient.gender.toLowerCase().includes(searchTerm) ||
      prescription.patient.bloodGroup.toLowerCase().includes(searchTerm) ||
      prescription.patient.dateOfBirth.includes(searchTerm) ||
      prescription.patient.address.street.toLowerCase().includes(searchTerm) ||
      prescription.patient.address.city.toLowerCase().includes(searchTerm) ||
      prescription.patient.address.state.toLowerCase().includes(searchTerm) ||
      prescription.patient.address.zipCode.includes(searchTerm)
    ) {
      return true;
    }

    // Search in patient insurance
    if (
      prescription.patient.insurance.provider
        .toLowerCase()
        .includes(searchTerm) ||
      prescription.patient.insurance.policyNumber
        .toLowerCase()
        .includes(searchTerm) ||
      prescription.patient.insurance.groupNumber
        .toLowerCase()
        .includes(searchTerm)
    ) {
      return true;
    }

    // Search in medical history and allergies
    if (
      prescription.patient.medicalHistory.some((history) =>
        history.toLowerCase().includes(searchTerm)
      ) ||
      prescription.patient.allergies.some((allergy) =>
        allergy.toLowerCase().includes(searchTerm)
      )
    ) {
      return true;
    }

    // Search in medical details
    if (
      prescription.diagnosis.toLowerCase().includes(searchTerm) ||
      prescription.icdCodes.some((code) =>
        code.toLowerCase().includes(searchTerm)
      ) ||
      prescription.clinicalNotes?.toLowerCase().includes(searchTerm) ||
      prescription.treatmentPlan?.toLowerCase().includes(searchTerm) ||
      prescription.notes?.toLowerCase().includes(searchTerm) ||
      prescription.referredBy.toLowerCase().includes(searchTerm) ||
      prescription.followUpInstructions?.toLowerCase().includes(searchTerm)
    ) {
      return true;
    }

    // Search in vital signs
    if (
      prescription.vitalSigns.bloodPressure
        .toLowerCase()
        .includes(searchTerm) ||
      prescription.vitalSigns.heartRate.toLowerCase().includes(searchTerm) ||
      prescription.vitalSigns.temperature.toLowerCase().includes(searchTerm) ||
      prescription.vitalSigns.weight.toLowerCase().includes(searchTerm) ||
      prescription.vitalSigns.height.toLowerCase().includes(searchTerm) ||
      prescription.vitalSigns.oxygenSaturation
        .toLowerCase()
        .includes(searchTerm)
    ) {
      return true;
    }

    // Search in lab results
    if (
      prescription.labResults.some(
        (result) =>
          result.test.toLowerCase().includes(searchTerm) ||
          result.value.toLowerCase().includes(searchTerm) ||
          result.status.toLowerCase().includes(searchTerm)
      )
    ) {
      return true;
    }

    // Search in medications
    if (
      prescription.medications.some(
        (medication) =>
          medication.name.toLowerCase().includes(searchTerm) ||
          medication.genericName.toLowerCase().includes(searchTerm) ||
          medication.dosage.toLowerCase().includes(searchTerm) ||
          medication.frequency.toLowerCase().includes(searchTerm) ||
          medication.instructions.toLowerCase().includes(searchTerm) ||
          medication.manufacturer.toLowerCase().includes(searchTerm) ||
          medication.lotNumber.toLowerCase().includes(searchTerm)
      )
    ) {
      return true;
    }

    // Search in pharmacy information
    if (
      prescription.pharmacyName?.toLowerCase().includes(searchTerm) ||
      prescription.pharmacyAddress?.toLowerCase().includes(searchTerm) ||
      prescription.pharmacyPhone?.includes(searchTerm) ||
      prescription.dispensedBy?.toLowerCase().includes(searchTerm)
    ) {
      return true;
    }

    // Search in billing information
    if (
      prescription.billing?.billId.toLowerCase().includes(searchTerm) ||
      prescription.billing?.paymentStatus.toLowerCase().includes(searchTerm) ||
      prescription.billing?.paymentMethod?.toLowerCase().includes(searchTerm) ||
      prescription.billing?.transactionId?.toLowerCase().includes(searchTerm)
    ) {
      return true;
    }

    // Search in hospital information
    if (
      prescription.hospitalName.toLowerCase().includes(searchTerm) ||
      prescription.hospitalAddress.toLowerCase().includes(searchTerm) ||
      prescription.hospitalPhone.includes(searchTerm)
    ) {
      return true;
    }

    return false;
  });
};

// Enhanced Print utility for Prescription with all details
const printPrescription = (prescription) => {
  const printWindow = window.open("", "", "height=600,width=800");

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Medical Prescription - ${prescription.prescriptionNumber}</title>
        <style>
            @page { 
                size: A4; 
                margin: 0.5in; 
            }
            @media print {
                body { 
                    -webkit-print-color-adjust: exact;
                    color-adjust: exact;
                }
            }
            body { 
                font-family: Arial, sans-serif; 
                margin: 0; 
                padding: 10px;
                font-size: 12px;
                line-height: 1.3;
            }
            .header { 
                text-align: center; 
                margin-bottom: 15px;
                border-bottom: 2px solid #3B82F6;
                padding-bottom: 10px;
            }
            .hospital-name { 
                font-size: 18px; 
                font-weight: bold; 
                color: #1F2937;
                margin-bottom: 5px;
            }
            .hospital-address {
                font-size: 10px;
                color: #6B7280;
                margin-bottom: 10px;
            }
            .doctor-info { 
                text-align: center; 
                margin-bottom: 15px;
                padding: 8px;
                background-color: #F9FAFB;
                border-radius: 4px;
            }
            .doctor-name { 
                font-size: 14px; 
                font-weight: bold; 
                color: #1F2937;
            }
            .patient-info { 
                display: flex; 
                justify-content: space-between; 
                margin: 15px 0;
                padding: 8px;
                background-color: #F3F4F6;
                border-radius: 4px;
            }
            .medications-table { 
                width: 100%; 
                border-collapse: collapse; 
                margin: 15px 0;
                font-size: 10px;
            }
            .medications-table th, 
            .medications-table td { 
                border: 1px solid #D1D5DB; 
                padding: 6px; 
                text-align: left;
            }
            .medications-table th { 
                background-color: #F9FAFB; 
                font-weight: bold;
            }
            .diagnosis-section {
                margin: 12px 0;
                padding: 8px;
                background-color: #FEF3C7;
                border-left: 4px solid #F59E0B;
                border-radius: 4px;
            }
            .notes-section {
                margin: 12px 0;
                padding: 8px;
                background-color: #EFF6FF;
                border-left: 4px solid #3B82F6;
                border-radius: 4px;
            }
            .vital-signs {
                margin: 12px 0;
                padding: 8px;
                background-color: #F0FDF4;
                border-left: 4px solid #10B981;
                border-radius: 4px;
            }
            .footer { 
                margin-top: 20px; 
                border-top: 1px solid #E5E7EB;
                padding-top: 10px;
                display: flex;
                justify-content: space-between;
                font-size: 10px;
            }
            .status-badge {
                display: inline-block;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 10px;
                font-weight: bold;
                text-transform: uppercase;
            }
            .status-completed {
                background-color: #D1FAE5;
                color: #065F46;
            }
            .status-ongoing {
                background-color: #DBEAFE;
                color: #1E40AF;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="hospital-name">${prescription.hospitalName}</div>
            <div class="hospital-address">${prescription.hospitalAddress}</div>
            <div style="font-size: 10px;">Phone: ${
              prescription.hospitalPhone
            }</div>
        </div>
        
        <div class="doctor-info">
            <div class="doctor-name">${prescription.doctor.name}</div>
            <div>${prescription.doctor.mbbs}</div>
            <div>${prescription.doctor.department} - ${
    prescription.doctor.specialization
  }</div>
            <div style="font-size: 10px; margin-top: 5px;">REG NO. ${
              prescription.doctor.regNo
            }</div>
            <div style="font-size: 10px;">Email: ${
              prescription.doctor.email
            } | Phone: ${prescription.doctor.phoneNumber}</div>
            <div style="font-size: 10px; margin-top: 5px;">${
              prescription.consultationTime
            }</div>
            <div style="font-size: 10px;">APPOINTMENT NUMBER: ${
              prescription.appointmentNumber
            }</div>
        </div>
        
        <div class="patient-info">
            <div>
                <strong>Patient:</strong> ${prescription.patient.name}<br>
                <strong>DOB:</strong> ${prescription.patient.dateOfBirth}<br>
                <strong>Age/Sex:</strong> ${
                  prescription.patient.age
                }y ${prescription.patient.gender.charAt(0)}<br>
                <strong>Blood Group:</strong> ${
                  prescription.patient.bloodGroup
                }<br>
                <strong>Weight/Height:</strong> ${
                  prescription.patient.weight
                }, ${prescription.patient.height}<br>
                <strong>Office ID:</strong> ${prescription.officeId}
            </div>
            <div style="text-align: right;">
                <strong>Date:</strong> ${new Date(
                  prescription.date
                ).toLocaleDateString()}<br>
                <strong>Time:</strong> ${prescription.time}<br>
                <strong>Mobile:</strong> ${prescription.patient.phone}<br>
                <strong>Prescription No:</strong> ${
                  prescription.prescriptionNumber
                }<br>
                <strong>Visit Type:</strong> ${prescription.appointmentType}<br>
                <strong>Priority:</strong> ${prescription.priority}
            </div>
        </div>

        <div class="vital-signs">
            <strong>Vital Signs:</strong><br>
            BP: ${prescription.vitalSigns.bloodPressure} | HR: ${
    prescription.vitalSigns.heartRate
  } | 
            Temp: ${prescription.vitalSigns.temperature} | O2 Sat: ${
    prescription.vitalSigns.oxygenSaturation
  }
        </div>
        
        <div class="diagnosis-section">
            <strong>Diagnosis:</strong> ${prescription.diagnosis}<br>
            <strong>ICD Codes:</strong> ${prescription.icdCodes.join(", ")}<br>
            <strong>Visit Reason:</strong> ${prescription.visitReason}
        </div>
        
        <table class="medications-table">
            <thead>
                <tr>
                    <th>Rx</th>
                    <th>Medication</th>
                    <th>Frequency</th>
                    <th>Duration</th>
                    <th>Instructions</th>
                    <th>Refills</th>
                </tr>
            </thead>
            <tbody>
                ${prescription.medications
                  .map(
                    (medication, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>
                            <strong>${medication.name}</strong><br>
                            <small>${medication.genericName}</small><br>
                            <small>${medication.dosage}</small><br>
                            <small>Lot: ${medication.lotNumber}</small>
                        </td>
                        <td>${medication.frequency}</td>
                        <td>${medication.duration}</td>
                        <td>${medication.instructions}</td>
                        <td>${medication.refillsRemaining}</td>
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
        </table>
        
        ${
          prescription.clinicalNotes
            ? `
        <div class="notes-section">
            <strong>Clinical Notes:</strong> ${prescription.clinicalNotes}<br>
            <strong>Treatment Plan:</strong> ${prescription.treatmentPlan}
        </div>
        `
            : ""
        }

        ${
          prescription.notes
            ? `
        <div class="notes-section">
            <strong>Additional Notes:</strong> ${prescription.notes}<br>
            <strong>Follow-up Instructions:</strong> ${prescription.followUpInstructions}
        </div>
        `
            : ""
        }

        <div style="margin: 12px 0; padding: 8px; background-color: #FEF3C7; border-radius: 4px;">
            <strong>Pharmacy Details:</strong><br>
            ${prescription.pharmacyName} - ${prescription.pharmacyAddress}<br>
            Phone: ${prescription.pharmacyPhone} | Dispensed by: ${
    prescription.dispensedBy
  }<br>
            Valid until: ${prescription.prescriptionValidUntil}
        </div>
        
        <div class="footer">
            <div>
                <div><strong>${prescription.doctor.name}</strong></div>
                <div>${prescription.doctor.mbbs}</div>
                <div>REG NO: ${prescription.doctor.regNo}</div>
                <div>Next Follow-up: ${prescription.nextFollowUp}</div>
            </div>
            <div style="text-align: right;">
                <div class="status-badge status-${prescription.status}">
                    ${prescription.status.toUpperCase()}
                </div>
                <div style="margin-top: 5px;">Generated: ${new Date().toLocaleDateString()}</div>
                <div>Referred by: ${prescription.referredBy}</div>
            </div>
        </div>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
};
const downloadPrescriptionPDF = (prescription) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; font-size: 12px; line-height: 1.4;">
        <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid #3B82F6; padding-bottom: 15px;">
            <h1 style="font-size: 18px; font-weight: bold; color: #1F2937; margin-bottom: 5px;">${
              prescription.hospitalName
            }</h1>
            <p style="font-size: 10px; color: #6B7280; margin-bottom: 10px;">${
              prescription.hospitalAddress
            }</p>
           
        </div>
        
        <div style="text-align: center; margin-bottom: 20px; padding: 10px; background-color: #F9FAFB; border-radius: 6px;">
            <h2 style="font-size: 14px; font-weight: bold; color: #1F2937;">${
              prescription.doctor.name
            }</h2>
            <p>${prescription.doctor.mbbs}</p>
            <p>${prescription.doctor.department} - ${
    prescription.doctor.specialization
  }</p>
            
            
            <p style="font-size: 10px; margin-top: 5px;">${
              prescription.consultationTime
            }</p>
            <p style="font-size: 10px;">APT-${
              prescription.appointmentNumber
            }</p>
        </div>
        
        <div style="display: flex; justify-content: space-between; margin: 20px 0; padding: 10px; background-color: #F3F4F6; border-radius: 6px;">
            <div>
                <strong>Patient:</strong> ${prescription.patient.name}<br>
                <strong>DOB:</strong> ${prescription.patient.dateOfBirth}<br>

            </div>
            <div style="text-align: right;">
                <strong>Date:</strong> ${new Date(
                  prescription.date
                ).toLocaleDateString()}<br>
              
            </div>
        </div>

        
        
        <div style="margin: 15px 0; padding: 10px; background-color: #FEF3C7; border-left: 4px solid #F59E0B; border-radius: 6px;">
            <strong>Diagnosis:</strong> ${prescription.diagnosis}<br>
            <strong>ICD Codes:</strong> ${prescription.icdCodes.join(", ")}<br>
            <strong>Visit Reason:</strong> ${prescription.visitReason}
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 10px;">
            <thead>
                <tr style="background-color: #F9FAFB;">
                    <th style="border: 1px solid #D1D5DB; padding: 8px; text-align: left; font-weight: bold;">Rx</th>
                    <th style="border: 1px solid #D1D5DB; padding: 8px; text-align: left; font-weight: bold;">Medication</th>
                    <th style="border: 1px solid #D1D5DB; padding: 8px; text-align: left; font-weight: bold;">Frequency</th>
                    <th style="border: 1px solid #D1D5DB; padding: 8px; text-align: left; font-weight: bold;">Duration</th>
                    <th style="border: 1px solid #D1D5DB; padding: 8px; text-align: left; font-weight: bold;">Instructions</th>
                    <th style="border: 1px solid #D1D5DB; padding: 8px; text-align: left; font-weight: bold;">Refills</th>
                </tr>
            </thead>
            <tbody>
                ${prescription.medications
                  .map(
                    (medication, index) => `
                    <tr>
                        <td style="border: 1px solid #D1D5DB; padding: 8px;">${
                          index + 1
                        }</td>
                        <td style="border: 1px solid #D1D5DB; padding: 8px;">
                           
                          <strong>${medication.name}</strong><br>
                        </td>
                        <td style="border: 1px solid #D1D5DB; padding: 8px;">${
                          medication.frequency
                        }</td>
                        <td style="border: 1px solid #D1D5DB; padding: 8px;">${
                          medication.duration
                        }</td>
                        <td style="border: 1px solid #D1D5DB; padding: 8px;">${
                          medication.instructions
                        }</td>
                        <td style="border: 1px solid #D1D5DB; padding: 8px;">${
                          medication.refillsRemaining
                        }</td>
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
        </table>
        
      

        
          
        
       
        

        
        
        <div style="margin-top: 25px; border-top: 1px solid #E5E7EB; padding-top: 15px; display: flex; justify-content: space-between; font-size: 10px;">
            <div>
                <div><strong>${prescription.doctor.name}</strong></div>
                <div>${prescription.doctor.mbbs}</div>
               
            </div>
            <div style="text-align: right;">
                <div style="display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 10px; font-weight: bold; text-transform: uppercase; background-color: ${
                  prescription.status === "completed"
                    ? "#D1FAE5; color: #065F46"
                    : "#DBEAFE; color: #1E40AF"
                };">
                    ${prescription.status.toUpperCase()}
                </div>
                
            </div>
        </div>
    </div>
  `;

  const opt = {
    margin: 0.5,
    filename: `Prescription_${prescription.prescriptionNumber}_${
      new Date().toISOString().split("T")[0]
    }.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(opt).from(htmlContent).save();
};

const printBilling = (prescription) => {
  const printWindow = window.open("", "", "height=600,width=800");

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Billing Details - ${prescription.billing.billId}</title>
        <style>
            @page { 
                size: A4; 
                margin: 0.5in; 
            }
            @media print {
                body { 
                    -webkit-print-color-adjust: exact;
                    color-adjust: exact;
                }
            }
            body { 
                font-family: Arial, sans-serif; 
                margin: 0; 
                padding: 10px;
                font-size: 12px;
                line-height: 1.4;
            }
            .header { 
                text-align: center; 
                margin-bottom: 20px;
                border-bottom: 2px solid #3B82F6;
                padding-bottom: 15px;
            }
            .company-name { 
                font-size: 20px; 
                font-weight: bold; 
                color: #1F2937;
                margin-bottom: 8px;
            }
            .bill-info { 
                margin: 15px 0;
                padding: 10px;
                background-color: #F9FAFB;
                border-radius: 6px;
            }
            .patient-info { 
                margin: 15px 0;
                padding: 10px;
                background-color: #F3F4F6;
                border-radius: 6px;
            }
            .billing-table { 
                width: 100%; 
                border-collapse: collapse; 
                margin: 20px 0;
            }
            .billing-table th, 
            .billing-table td { 
                border: 1px solid #D1D5DB; 
                padding: 8px; 
                text-align: left;
            }
            .billing-table th { 
                background-color: #F9FAFB; 
                font-weight: bold;
            }
            .total-row { 
                font-weight: bold; 
                background-color: #EFF6FF;
                border-top: 2px solid #3B82F6;
            }
            .payment-info {
                margin: 15px 0;
                padding: 10px;
                background-color: #F0FDF4;
                border-left: 4px solid #10B981;
                border-radius: 4px;
            }
            .footer { 
                margin-top: 25px; 
                text-align: center; 
                font-size: 10px; 
                color: #6B7280;
                border-top: 1px solid #E5E7EB;
                padding-top: 15px;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="company-name">${prescription.hospitalName}</div>
            <div style="color: #6B7280; font-size: 14px;">${
              prescription.hospitalAddress
            }</div>
            <div style="color: #6B7280; font-size: 12px; margin-top: 5px;">Phone: ${
              prescription.hospitalPhone
            }</div>
            <p style="color: #6B7280; font-size: 14px; margin-top: 10px;">Billing Statement</p>
        </div>
        
        <div class="bill-info">
            <strong>Bill ID:</strong> ${prescription.billing.billId}<br>
            <strong>Date:</strong> ${new Date(
              prescription.billing.billDate
            ).toLocaleDateString()}<br>
            <strong>Prescription Number:</strong> ${
              prescription.prescriptionNumber
            }<br>
            <strong>Transaction ID:</strong> ${
              prescription.billing.transactionId || "N/A"
            }
        </div>
        
        <div class="patient-info">
            <strong>Patient:</strong> ${prescription.patient.name} (DOB: ${
    prescription.patient.dateOfBirth
  })<br>
            <strong>Patient ID:</strong> ${prescription.patient.id}<br>
            <strong>Phone:</strong> ${prescription.patient.phone}<br>
            <strong>Address:</strong> ${prescription.patient.address.street}, ${
    prescription.patient.address.city
  }, ${prescription.patient.address.state} ${
    prescription.patient.address.zipCode
  }<br>
            <strong>Doctor:</strong> ${prescription.doctor.name}<br>
            <strong>Department:</strong> ${prescription.doctor.department}<br>
            <strong>Visit Type:</strong> ${prescription.appointmentType}
        </div>

        <div style="margin: 15px 0; padding: 10px; background-color: #EFF6FF; border-radius: 6px;">
            <strong>Insurance Information:</strong><br>
            Provider: ${prescription.patient.insurance.provider}<br>
            Policy Number: ${prescription.patient.insurance.policyNumber}<br>
            Group Number: ${prescription.patient.insurance.groupNumber}<br>
            Copay: $${prescription.patient.insurance.copay.toFixed(2)}
        </div>
        
        <table class="billing-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th style="text-align: right;">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Consultation Fee (${prescription.doctor.name})</td>
                    <td style="text-align: right;">$${prescription.billing.consultationFee.toFixed(
                      2
                    )}</td>
                </tr>
                <tr>
                    <td>Medications</td>
                    <td style="text-align: right;">$${prescription.billing.medicationTotal.toFixed(
                      2
                    )}</td>
                </tr>
                <tr>
                    <td>Laboratory Tests</td>
                    <td style="text-align: right;">$${prescription.billing.labTestFees.toFixed(
                      2
                    )}</td>
                </tr>
                <tr>
                    <td>Procedure Fees</td>
                    <td style="text-align: right;">$${prescription.billing.procedureFees.toFixed(
                      2
                    )}</td>
                </tr>
                <tr>
                    <td>Facility Fees</td>
                    <td style="text-align: right;">$${prescription.billing.facilityFees.toFixed(
                      2
                    )}</td>
                </tr>
                <tr>
                    <td>Subtotal</td>
                    <td style="text-align: right;">$${prescription.billing.subtotal.toFixed(
                      2
                    )}</td>
                </tr>
                <tr>
                    <td>Discount</td>
                    <td style="text-align: right; color: #10B981;">-$${prescription.billing.discount.toFixed(
                      2
                    )}</td>
                </tr>
                <tr>
                    <td>Insurance Coverage</td>
                    <td style="text-align: right; color: #10B981;">-$${prescription.billing.insuranceCoverage.toFixed(
                      2
                    )}</td>
                </tr>
                <tr>
                    <td>Tax</td>
                    <td style="text-align: right;">$${prescription.billing.tax.toFixed(
                      2
                    )}</td>
                </tr>
                <tr>
                    <td>Copay</td>
                    <td style="text-align: right;">$${prescription.billing.copay.toFixed(
                      2
                    )}</td>
                </tr>
                <tr class="total-row">
                    <td><strong>Final Amount</strong></td>
                    <td style="text-align: right;"><strong>$${prescription.billing.finalAmount.toFixed(
                      2
                    )}</strong></td>
                </tr>
            </tbody>
        </table>
        
        <div class="payment-info">
            <strong>Payment Status:</strong> ${
              prescription.billing.paymentStatus.charAt(0).toUpperCase() +
              prescription.billing.paymentStatus.slice(1)
            }<br>
            <strong>Payment Method:</strong> ${
              prescription.billing.paymentMethod || "N/A"
            }<br>
            <strong>Payment Date:</strong> ${
              prescription.billing.paymentDate
                ? new Date(
                    prescription.billing.paymentDate
                  ).toLocaleDateString()
                : "Not paid"
            }<br>
            <strong>Transaction ID:</strong> ${
              prescription.billing.transactionId || "N/A"
            }
        </div>
        
        <div class="footer">
            <p><strong>Generated on:</strong> ${new Date().toLocaleDateString()}</p>
            <p>Thank you for choosing ${prescription.hospitalName}</p>
            <p>For billing inquiries, please contact our billing department</p>
        </div>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
};

// Direct PDF Download utility for Billing
const downloadBillingPDF = (prescription) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; font-size: 12px; line-height: 1.4;">
        <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid #3B82F6; padding-bottom: 15px;">
            <h1 style="font-size: 20px; font-weight: bold; color: #1F2937; margin-bottom: 8px;">${
              prescription.hospitalName
            }</h1>
            <p style="color: #6B7280; font-size: 14px;">${
              prescription.hospitalAddress
            }</p>
            <p style="color: #6B7280; font-size: 12px; margin-top: 5px;">Phone: ${
              prescription.hospitalPhone
            }</p>
            <p style="color: #6B7280; font-size: 14px; margin-top: 10px;">Billing Statement</p>
        </div>
        
        <div style="margin: 15px 0; padding: 10px; background-color: #F9FAFB; border-radius: 6px;">
            <strong>Bill ID:</strong> ${prescription.billing.billId}<br>
            
            
        </div>
        
        

        
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
                <tr style="background-color: #F9FAFB;">
                    <th style="border: 1px solid #D1D5DB; padding: 8px; text-align: left; font-weight: bold;">Description</th>
                    <th style="border: 1px solid #D1D5DB; padding: 8px; text-align: right; font-weight: bold;">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="border: 1px solid #D1D5DB; padding: 8px;">Consultation Fee (${
                      prescription.doctor.name
                    })</td>
                    <td style="border: 1px solid #D1D5DB; padding: 8px; text-align: right;">$${prescription.billing.consultationFee.toFixed(
                      2
                    )}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #D1D5DB; padding: 8px;">Medications</td>
                    <td style="border: 1px solid #D1D5DB; padding: 8px; text-align: right;">$${prescription.billing.medicationTotal.toFixed(
                      2
                    )}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #D1D5DB; padding: 8px;">Laboratory Tests</td>
                    <td style="border: 1px solid #D1D5DB; padding: 8px; text-align: right;">$${prescription.billing.labTestFees.toFixed(
                      2
                    )}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #D1D5DB; padding: 8px;">Procedure Fees</td>
                    <td style="border: 1px solid #D1D5DB; padding: 8px; text-align: right;">$${prescription.billing.procedureFees.toFixed(
                      2
                    )}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #D1D5DB; padding: 8px;">Facility Fees</td>
                    <td style="border: 1px solid #D1D5DB; padding: 8px; text-align: right;">$${prescription.billing.facilityFees.toFixed(
                      2
                    )}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #D1D5DB; padding: 8px;">Subtotal</td>
                    <td style="border: 1px solid #D1D5DB; padding: 8px; text-align: right;">$${prescription.billing.subtotal.toFixed(
                      2
                    )}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #D1D5DB; padding: 8px;">Discount</td>
                    <td style="border: 1px solid #D1D5DB; padding: 8px; text-align: right; color: #10B981;">-$${prescription.billing.discount.toFixed(
                      2
                    )}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #D1D5DB; padding: 8px;">Insurance Coverage</td>
                    <td style="border: 1px solid #D1D5DB; padding: 8px; text-align: right; color: #10B981;">-$${prescription.billing.insuranceCoverage.toFixed(
                      2
                    )}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #D1D5DB; padding: 8px;">Tax</td>
                    <td style="border: 1px solid #D1D5DB; padding: 8px; text-align: right;">$${prescription.billing.tax.toFixed(
                      2
                    )}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #D1D5DB; padding: 8px;">Copay</td>
                    <td style="border: 1px solid #D1D5DB; padding: 8px; text-align: right;">$${prescription.billing.copay.toFixed(
                      2
                    )}</td>
                </tr>
                <tr style="font-weight: bold; background-color: #EFF6FF; border-top: 2px solid #3B82F6;">
                    <td style="border: 1px solid #D1D5DB; padding: 8px;"><strong>Final Amount</strong></td>
                    <td style="border: 1px solid #D1D5DB; padding: 8px; text-align: right;"><strong>$${prescription.billing.finalAmount.toFixed(
                      2
                    )}</strong></td>
                </tr>
            </tbody>
        </table>
        
        <div style="margin: 15px 0; padding: 10px; background-color: #F0FDF4; border-left: 4px solid #10B981; border-radius: 4px;">
            <strong>Payment Status:</strong> ${
              prescription.billing.paymentStatus.charAt(0).toUpperCase() +
              prescription.billing.paymentStatus.slice(1)
            }<br>
            <strong>Payment Method:</strong> ${
              prescription.billing.paymentMethod || "N/A"
            }<br>
            <strong>Payment Date:</strong> ${
              prescription.billing.paymentDate
                ? new Date(
                    prescription.billing.paymentDate
                  ).toLocaleDateString()
                : "Not paid"
            }<br>
            <strong>Transaction ID:</strong> ${
              prescription.billing.transactionId || "N/A"
            }
        </div>
        
        <div style="margin-top: 25px; text-align: center; font-size: 10px; color: #6B7280; border-top: 1px solid #E5E7EB; padding-top: 15px;">
            <p><strong>Generated on:</strong> ${new Date().toLocaleDateString()}</p>
            <p>Thank you for choosing ${prescription.hospitalName}</p>
            <p>For billing inquiries, please contact our billing department</p>
        </div>
    </div>
  `;

  const opt = {
    margin: 0.5,
    filename: `Billing_${prescription.billing.billId}_${
      new Date().toISOString().split("T")[0]
    }.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(opt).from(htmlContent).save();
};

// Simplified Billing Modal Component matching the design in the image
const BillingModal = ({ prescription, onClose }) => {
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
    printBilling(prescription);
  };

  const handleDownloadPDF = () => {
    downloadBillingPDF(prescription);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header matching the image design */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-blue-50">
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
              onClick={handleDownloadPDF}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download size={16} />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Payment Status Section matching the image */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
            <div className="flex items-center space-x-3">
              <DollarSign className="text-green-600" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900">Payment Status</h3>
                <p className="text-sm text-gray-600">Current billing status</p>
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

          {/* Two column layout matching the image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Billing Summary */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
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
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    {formatCurrency(prescription.billing.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600">Discount</span>
                  <span className="font-medium text-green-600">
                    -{formatCurrency(prescription.billing.discount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">
                    {formatCurrency(prescription.billing.tax)}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Final Amount
                    </span>
                    <span className="text-lg font-bold text-blue-600">
                      {formatCurrency(prescription.billing.finalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Payment Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Payment Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Payment Date</p>
                  <p className="font-semibold text-gray-900">
                    {formatDate(prescription.billing.paymentDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-semibold text-gray-900">
                    {prescription.billing.paymentMethod || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Prescription Number</p>
                  <p className="font-semibold text-gray-900">
                    {prescription.prescriptionNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Doctor</p>
                  <p className="font-semibold text-gray-900">
                    {prescription.doctor.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Department</p>
                  <p className="font-semibold text-gray-900">
                    {prescription.doctor.department}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Filter Panel Component
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

// Enhanced Prescription Modal Component with comprehensive details
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Normal":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Low":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handlePrint = () => {
    printPrescription(prescription);
  };

  const handleDownloadPDF = () => {
    downloadPrescriptionPDF(prescription);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto">
        {/* Professional Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold">
                {prescription.hospitalName}
              </h1>
              <p className="text-blue-100 text-sm mt-1">
                {prescription.hospitalAddress}
              </p>
              <p className="text-blue-100 text-xs mt-1">
                Phone: {prescription.hospitalPhone}
              </p>
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
                onClick={handleDownloadPDF}
                className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors"
              >
                <Download size={16} />
                <span>Download PDF</span>
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

        {/* Doctor and Visit Information */}
        <div className="p-8 space-y-6">
          <div className="text-center border-b border-gray-200 pb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {prescription.doctor.name}
            </h2>
            <p className="text-gray-600">{prescription.doctor.mbbs}</p>
            <p className="text-gray-600">
              {prescription.doctor.department} -{" "}
              {prescription.doctor.specialization}
            </p>
            <div className="flex justify-center space-x-4 mt-2 text-sm text-gray-500"></div>
            <div className="mt-4 flex justify-between text-sm">
              <div>
                <p className="font-semibold">Consultation Time:</p>
                <p className="whitespace-pre-line">
                  {prescription.consultationTime}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  APT-{prescription.appointmentNumber}
                </p>
                {/* <p className="text-xs text-gray-500 mt-1">
                  Visit Type: {prescription.appointmentType}
                </p> */}
                {/* { <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
                    prescription.priority
                  )}`}
                >
                  {prescription.priority} Priority
                </span> } */}
              </div>
            </div>
          </div>

          {/* Comprehensive Patient Information */}

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="mr-2 text-blue-600" size={20} />
              Patient Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="font-bold text-lg">{prescription.patient.name}</p>
                <p className="text-sm">
                  DOB: {prescription.patient.dateOfBirth}
                </p>
                {/* <p className="text-sm">
                  Age/Sex: {prescription.patient.age}y{" "}
                  {prescription.patient.gender} */}
                {/* </p>
                <p className="text-sm">Blood Group: {prescription.patient.bloodGroup}</p>
                <p className="text-sm">Height: {prescription.patient.height} | Weight: {prescription.patient.weight}</p> */}
              </div>
              <div>
                {/* <p className="text-sm text-gray-500">Contact Information:</p>
                <p className="text-sm">Phone: {prescription.patient.phone}</p>
                <p className="text-sm">Email: {prescription.patient.email}</p>
                <p className="text-sm">Address: {prescription.patient.address.street}</p>
                <p className="text-sm">{prescription.patient.address.city}, {prescription.patient.address.state} {prescription.patient.address.zipCode}</p>
                <p className="text-sm">Emergency Contact: {prescription.patient.emergencyContact.name} ({prescription.patient.emergencyContact.relationship})</p>
                <p className="text-sm">Emergency Phone: {prescription.patient.emergencyContact.phone}</p> */}
              </div>
              <div className="text-right">
                {/* <p className="text-sm text-gray-500">Visit Details:</p> */}
                <p className="font-bold">{formatDate(prescription.date)}</p>
                {/* <p className="text-sm">Time: {formatTime(prescription.time)}</p>
                <p className="text-sm">Office ID: {prescription.officeId}</p>
                <p className="text-sm">Prescription No: {prescription.prescriptionNumber}</p>
                <p className="text-sm">Referred by: {prescription.referredBy}</p> */}
              </div>
            </div>
          </div>

          {/* Visit Reason and Diagnosis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                <Clipboard className="mr-2 text-yellow-600" size={16} />
                Visit Reason
              </h4>
              <p className="text-sm text-gray-800">
                {prescription.visitReason}
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Diagnosis</h4>
              <p className="text-sm text-gray-800">{prescription.diagnosis}</p>
              {/* <p className="text-xs text-gray-600 mt-1">
                ICD Codes: {prescription.icdCodes.join(", ")}
              </p> */}
            </div>
          </div>

          {/* Lab Results */}
          {/* {prescription.labResults && prescription.labResults.length > 0 && (
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Activity className="mr-2 text-purple-600" size={20} />
                Laboratory Results
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prescription.labResults.map((result, index) => (
                  <div key={index} className="bg-white p-3 rounded border">
                    <p className="font-medium text-sm">{result.test}</p>
                    <p className="text-sm">Value: {result.value}</p>
                    <p className="text-xs text-gray-600">
                      Normal Range: {result.normalRange}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded ${
                        result.status === "Normal"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {result.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {/* Enhanced Medications Table */}
          <div className="overflow-x-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Pill className="mr-2 text-green-600" size={20} />
              Prescribed Medications
            </h3>
            <table className="w-full border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left font-bold">
                    Rx
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-bold">
                    Medication Details
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-bold">
                    Dosage & Frequency
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-bold">
                    Duration & Instructions
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-bold">
                    Pharmacy Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {prescription.medications.map((medication, index) => (
                  <tr key={medication.id}>
                    <td className="border border-gray-300 px-3 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <div className="font-semibold">{medication.name}</div>
                      <div className="text-gray-600 text-xs">
                        Generic: {medication.genericName}
                      </div>
                      <div className="text-gray-600 text-xs">
                        Manufacturer: {medication.manufacturer}
                      </div>
                      <div className="text-gray-600 text-xs">
                        Lot: {medication.lotNumber}
                      </div>
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <div className="font-medium">{medication.dosage}</div>
                      <div className="text-xs">{medication.frequency}</div>
                      <div className="text-xs">Qty: {medication.quantity}</div>
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <div className="text-xs mb-1">
                        <strong>Duration:</strong> {medication.duration}
                      </div>
                      <div className="text-xs mb-1">
                        <strong>Instructions:</strong> {medication.instructions}
                      </div>
                      <div className="text-xs">
                        <strong>Refills:</strong> {medication.refillsRemaining}
                      </div>
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <div className="text-xs">
                        <strong>Expires:</strong> {medication.expiryDate}
                      </div>
                      <div className="text-xs">
                        <strong>Price:</strong> $
                        {medication.totalPrice.toFixed(2)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">
                  {prescription.doctor.name}
                </p>
                <p className="text-sm text-gray-600">
                  {prescription.doctor.mbbs}
                </p>

                {/* <p className="text-xs text-gray-500 mt-2">
                  Next Follow-up: {prescription.nextFollowUp}
                </p> */}
              </div>
              <div className="text-right">
                <div
                  className={`inline-flex px-3 py-1 text-sm font-bold rounded-full border ${getStatusColor(
                    prescription.status
                  )}`}
                >
                  {prescription.status.toUpperCase()}
                </div>
              </div>
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
            className="flex items-center justify-center p-3 rounded-lg border border-transparent hover:border-blue-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-blue-600"
          >
            <ArrowLeft size={20} color="white" />
          </button>
          <div>
            <h1 className="text-lg font-semibold">Patient History</h1>
            <p className="text-sm text-white/80">
              Comprehensive medical prescription records with detailed billing
              management, advanced search, and direct PDF downloads
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
                placeholder="Search by doctor, patient, medication, date (YYYY-MM-DD or MM/DD/YYYY), diagnosis, bill ID, prescription number, phone, email, department, insurance, vital signs, lab results, pharmacy, hospital details..."
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
              <span className="font-medium text-gray-700">
                Advanced Filters
              </span>
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
            <p className="mt-4 text-gray-600">
              Loading comprehensive patient history...
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prescription & Visit Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Healthcare Provider & Patient
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Medical Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status & Billing
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
                            {/* <div className="text-xs text-gray-500 mt-1">
                              {prescription.prescriptionNumber}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              Visit Type: {prescription.appointmentType}
                            </div> */}
                            {/* <div className="text-xs text-gray-400">
                              Priority: {prescription.priority} | Referred by:{" "}
                              {prescription.referredBy.split(" ")[0]}
                            </div> */}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-2">
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
                              {/* <div className="text-xs text-gray-400">
                                {prescription.doctor.specialization}
                              </div> */}
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            {/* <User className="text-blue-600 mt-1" size={14} /> */}
                            <div>
                              {/* <div className="text-sm text-gray-700">
                                {prescription.patient.name}
                              </div> */}
                              {/* <div className="text-xs text-gray-500">
                                {prescription.patient.age}y{" "}
                                {prescription.patient.gender.charAt(0)} |{" "}
                                {prescription.patient.bloodGroup}
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-900">
                            {prescription.diagnosis
                              .split(" ")
                              .slice(0, 3)
                              .join(" ")}
                          </div>
                          {/* <div className="text-xs text-gray-500">
                            {prescription.medications.length} medication
                            {prescription.medications.length !== 1 ? "s" : ""}
                          </div> */}
                          {/* <div className="text-xs text-gray-400">
                            Vital Signs: BP{" "}
                            {prescription.vitalSigns.bloodPressure}
                          </div> */}
                          {/* <div className="text-xs text-gray-400">
                            ICD: {prescription.icdCodes.join(", ")}
                          </div> */}
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
                            {/* <span
                              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(
                                prescription.billing.paymentStatus
                              )}`}
                            >
                              {prescription.billing.paymentStatus
                                .charAt(0)
                                .toUpperCase() +
                                prescription.billing.paymentStatus.slice(1)}
                            </span> */}
                          </div>
                          {/* <div className="text-xs text-gray-500">
                            {formatCurrency(prescription.billing.finalAmount)}
                          </div> */}
                          {/* <div className="text-xs text-gray-400">
                            Pharmacy: {prescription.pharmacyName}
                          </div> */}
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
