import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Search,
  Filter,
  Plus,
  Edit3,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Users,
  Activity,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  MapPin,
  Stethoscope,
  Heart,
  Star,
  Award,
  Shield,
  Zap,
  Save,
  X,
  UserPlus,
  AlertTriangle,
  Check,
  Ban,
  FileText,
} from "lucide-react";

const Appointment = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      doctor: "Dr. Sarah Smith",
      date: "2025-01-20",
      time: "10:00 AM",
      status: "Confirmed",
      department: "Cardiology",
      phone: "+1 (555) 123-4567",
      email: "john.doe@email.com",
      age: 45,
      symptoms: "Chest pain and shortness of breath",
      reason: "Follow-up consultation for cardiac evaluation",
      insurance: "Blue Cross",
    },
    {
      id: 2,
      patientName: "Jane Wilson",
      doctor: "Dr. Michael Johnson",
      date: "2025-01-20",
      time: "02:30 PM",
      status: "Confirmed",
      department: "Neurology",
      phone: "+1 (555) 987-6543",
      email: "jane.wilson@email.com",
      age: 32,
      symptoms: "Frequent headaches and dizziness",
      reason: "Initial consultation for neurological assessment",
      insurance: "Aetna",
    },
    {
      id: 3,
      patientName: "Mike Davis",
      doctor: "Dr. Emily Brown",
      date: "2025-01-20",
      time: "09:00 AM",
      status: "Confirmed",
      department: "Emergency",
      phone: "+1 (555) 456-7890",
      email: "mike.davis@email.com",
      age: 28,
      symptoms: "Severe abdominal pain",
      reason: "Emergency examination for acute abdominal pain",
      insurance: "Medicare",
    },
    {
      id: 4,
      patientName: "Sarah Johnson",
      doctor: "Dr. Robert Lee",
      date: "2025-01-21",
      time: "11:30 AM",
      status: "Cancelled",
      department: "Pediatrics",
      phone: "+1 (555) 321-0987",
      email: "sarah.johnson@email.com",
      age: 8,
      symptoms: "None - routine checkup",
      reason: "Regular checkup and vaccination",
      insurance: "Cigna",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDate, setFilterDate] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [showEditAppointmentModal, setShowEditAppointmentModal] =
    useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Confirmation modals
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [appointmentToConfirm, setAppointmentToConfirm] = useState(null);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

  // New appointment form state
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    doctor: "",
    date: "",
    time: "",
    status: "Confirmed",
    department: "",
    phone: "",
    email: "",
    age: "",
    symptoms: "",
    reason: "",
    insurance: "",
  });

  // Edit appointment form state
  const [editAppointment, setEditAppointment] = useState({
    id: null,
    patientName: "",
    doctor: "",
    date: "",
    time: "",
    status: "Confirmed",
    department: "",
    phone: "",
    email: "",
    age: "",
    symptoms: "",
    reason: "",
    insurance: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [editFormErrors, setEditFormErrors] = useState({});

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const doctors = [
    "Dr. Sarah Smith",
    "Dr. Michael Johnson",
    "Dr. Emily Brown",
    "Dr. Robert Lee",
    "Dr. Jessica Chen",
    "Dr. David Wilson",
    "Dr. Maria Garcia",
    "Dr. James Taylor",
  ];

  const departments = [
    "Cardiology",
    "Neurology",
    "Emergency",
    "Pediatrics",
    "Orthopedics",
    "Dermatology",
    "Psychiatry",
    "Oncology",
    "Radiology",
    "General Medicine",
  ];

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
  ];

  const insuranceOptions = [
    "Blue Cross",
    "Aetna",
    "Medicare",
    "Cigna",
    "UnitedHealth",
    "Humana",
    "Kaiser Permanente",
    "Anthem",
  ];

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || appointment.status === filterStatus;
    const matchesDate = !filterDate || appointment.date === filterDate;

    return matchesSearch && matchesStatus && matchesDate;
  });

  const validateForm = () => {
    const errors = {};

    if (!newAppointment.patientName.trim())
      errors.patientName = "Patient name is required";
    if (!newAppointment.doctor) errors.doctor = "Doctor selection is required";
    if (!newAppointment.date) errors.date = "Date is required";
    if (!newAppointment.time) errors.time = "Time is required";
    if (!newAppointment.department)
      errors.department = "Department is required";
    if (!newAppointment.phone.trim()) errors.phone = "Phone number is required";
    if (!newAppointment.email.trim()) errors.email = "Email is required";
    if (!newAppointment.age || newAppointment.age < 1)
      errors.age = "Valid age is required";
    if (!newAppointment.symptoms.trim())
      errors.symptoms = "Symptoms are required";
    if (!newAppointment.reason.trim())
      errors.reason = "Reason for visit is required";
    if (!newAppointment.insurance)
      errors.insurance = "Insurance selection is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (newAppointment.email && !emailRegex.test(newAppointment.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Phone validation (basic)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (
      newAppointment.phone &&
      !phoneRegex.test(newAppointment.phone.replace(/[\s\-\(\)]/g, ""))
    ) {
      errors.phone = "Please enter a valid phone number";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateEditForm = () => {
    const errors = {};

    if (!editAppointment.patientName.trim())
      errors.patientName = "Patient name is required";
    if (!editAppointment.doctor) errors.doctor = "Doctor selection is required";
    if (!editAppointment.date) errors.date = "Date is required";
    if (!editAppointment.time) errors.time = "Time is required";
    if (!editAppointment.department)
      errors.department = "Department is required";
    if (!editAppointment.phone.trim())
      errors.phone = "Phone number is required";
    if (!editAppointment.email.trim()) errors.email = "Email is required";
    if (!editAppointment.age || editAppointment.age < 1)
      errors.age = "Valid age is required";
    if (!editAppointment.symptoms.trim())
      errors.symptoms = "Symptoms are required";
    if (!editAppointment.reason.trim())
      errors.reason = "Reason for visit is required";
    if (!editAppointment.insurance)
      errors.insurance = "Insurance selection is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (editAppointment.email && !emailRegex.test(editAppointment.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Phone validation (basic)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (
      editAppointment.phone &&
      !phoneRegex.test(editAppointment.phone.replace(/[\s\-\(\)]/g, ""))
    ) {
      errors.phone = "Please enter a valid phone number";
    }

    setEditFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateAppointment = () => {
    if (!validateForm()) return;

    const appointment = {
      ...newAppointment,
      id: Math.max(...appointments.map((a) => a.id), 0) + 1,
      age: parseInt(newAppointment.age),
    };

    setAppointments((prev) => [appointment, ...prev]);
    setNewAppointment({
      patientName: "",
      doctor: "",
      date: "",
      time: "",
      status: "Confirmed",
      department: "",
      phone: "",
      email: "",
      age: "",
      symptoms: "",
      reason: "",
      insurance: "",
    });
    setFormErrors({});
    setShowNewAppointmentModal(false);
  };

  const handleEditAppointment = (appointment) => {
    setEditAppointment({
      id: appointment.id,
      patientName: appointment.patientName,
      doctor: appointment.doctor,
      date: appointment.date,
      time: appointment.time,
      status: appointment.status,
      department: appointment.department,
      phone: appointment.phone,
      email: appointment.email,
      age: appointment.age.toString(),
      symptoms: appointment.symptoms,
      reason: appointment.reason,
      insurance: appointment.insurance,
    });
    setEditFormErrors({});
    setShowEditAppointmentModal(true);
  };

  const handleUpdateAppointment = () => {
    if (!validateEditForm()) return;

    const updatedAppointment = {
      ...editAppointment,
      age: parseInt(editAppointment.age),
    };

    setAppointments((prev) =>
      prev.map((app) =>
        app.id === editAppointment.id ? updatedAppointment : app
      )
    );

    setEditAppointment({
      id: null,
      patientName: "",
      doctor: "",
      date: "",
      time: "",
      status: "Confirmed",
      department: "",
      phone: "",
      email: "",
      age: "",
      symptoms: "",
      reason: "",
      insurance: "",
    });
    setEditFormErrors({});
    setShowEditAppointmentModal(false);
  };

  const handleDeleteClick = (appointment) => {
    setAppointmentToDelete(appointment);
    setShowDeleteConfirmModal(true);
  };

  const confirmDelete = () => {
    if (appointmentToDelete) {
      setAppointments((prev) =>
        prev.filter((app) => app.id !== appointmentToDelete.id)
      );
      setAppointmentToDelete(null);
      setShowDeleteConfirmModal(false);
    }
  };

  const cancelDelete = () => {
    setAppointmentToDelete(null);
    setShowDeleteConfirmModal(false);
  };

  // Confirm appointment functions
  const handleConfirmClick = (appointment) => {
    setAppointmentToConfirm(appointment);
    setShowConfirmModal(true);
  };

  const confirmAppointment = () => {
    if (appointmentToConfirm) {
      setAppointments((prev) =>
        prev.map((app) =>
          app.id === appointmentToConfirm.id
            ? { ...app, status: "Confirmed" }
            : app
        )
      );
      setAppointmentToConfirm(null);
      setShowConfirmModal(false);
    }
  };

  const cancelConfirm = () => {
    setAppointmentToConfirm(null);
    setShowConfirmModal(false);
  };

  // Cancel appointment functions
  const handleCancelClick = (appointment) => {
    setAppointmentToCancel(appointment);
    setShowCancelModal(true);
  };

  const cancelAppointment = () => {
    if (appointmentToCancel) {
      setAppointments((prev) =>
        prev.map((app) =>
          app.id === appointmentToCancel.id
            ? { ...app, status: "Cancelled" }
            : app
        )
      );
      setAppointmentToCancel(null);
      setShowCancelModal(false);
    }
  };

  const cancelCancelAction = () => {
    setAppointmentToCancel(null);
    setShowCancelModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "linear-gradient(135deg, #10b981, #059669)";
      case "Cancelled":
        return "linear-gradient(135deg, #6b7280, #4b5563)";
      default:
        return "linear-gradient(135deg, #3b82f6, #1d4ed8)";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Confirmed":
        return <CheckCircle size={16} />;
      case "Cancelled":
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const todayAppointments = appointments.filter(
    (app) => app.date === new Date().toISOString().split("T")[0]
  );
  const confirmedCount = appointments.filter(
    (app) => app.status === "Confirmed"
  ).length;
  const cancelledCount = appointments.filter(
    (app) => app.status === "Cancelled"
  ).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "15px",
        }}
      >
        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {[
            {
              title: "Today's Appointments",
              value: todayAppointments.length,
              icon: Calendar,
              color: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              bgColor: "rgba(59, 130, 246, 0.1)",
            },
            {
              title: "Confirmed",
              value: confirmedCount,
              icon: CheckCircle,
              color: "linear-gradient(135deg, #10b981, #059669)",
              bgColor: "rgba(16, 185, 129, 0.1)",
            },
            {
              title: "Cancelled",
              value: cancelledCount,
              icon: XCircle,
              color: "linear-gradient(135deg, #6b7280, #4b5563)",
              bgColor: "rgba(107, 114, 128, 0.1)",
            },
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "20px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                border: "1px solid rgba(59, 130, 246, 0.1)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3
                    style={{
                      color: "#64748b",
                      fontSize: "14px",
                      fontWeight: "600",
                      margin: "0 0 10px 0",
                    }}
                  >
                    {stat.title}
                  </h3>
                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      background: stat.color,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.value}
                  </div>
                </div>
                <div
                  style={{
                    background: stat.bgColor,
                    padding: "15px",
                    borderRadius: "50%",
                  }}
                >
                  <stat.icon
                    size={24}
                    style={{ color: stat.color.split(",")[0].split("(")[1] }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
            marginBottom: "25px",
            border: "1px solid rgba(59, 130, 246, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                gap: "15px",
                alignItems: "center",
                minWidth: "300px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  flex: 1,
                  minWidth: "250px",
                }}
              >
                <Search
                  size={18}
                  style={{
                    position: "absolute",
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#64748b",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search patients, doctors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 12px 12px 45px",
                    borderRadius: "12px",
                    border: "2px solid #e2e8f0",
                    fontSize: "16px",
                    transition: "all 0.3s ease",
                    background: "#f8fafc",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "2px solid #e2e8f0",
                  fontSize: "16px",
                  background: "white",
                  cursor: "pointer",
                  minWidth: "130px",
                }}
              >
                <option value="All">All Status</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "2px solid #e2e8f0",
                  fontSize: "16px",
                  background: "white",
                  cursor: "pointer",
                  minWidth: "130px",
                }}
              />
            </div>

            <button
              onClick={() => setShowNewAppointmentModal(true)}
              style={{
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
                whiteSpace: "nowrap",
              }}
            >
              <Plus size={18} />
              <span>New Appointment</span>
            </button>
          </div>
        </div>

        {/* Appointments List */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(59, 130, 246, 0.1)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "25px",
              borderBottom: "1px solid #e2e8f0",
              background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
            }}
          >
            <h2
              style={{
                color: "#1e293b",
                fontSize: "22px",
                fontWeight: "700",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <Users size={26} color="#3b82f6" />
              <span>Appointment Management</span>
              <span
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {filteredAppointments.length} appointments
              </span>
            </h2>
          </div>

          <div style={{ padding: "0" }}>
            {filteredAppointments.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "50px 25px",
                  color: "#64748b",
                }}
              >
                <Users
                  size={40}
                  style={{ marginBottom: "15px", opacity: 0.5 }}
                />
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    margin: "0 0 8px 0",
                  }}
                >
                  No appointments found
                </h3>
                <p style={{ margin: 0 }}>
                  Try adjusting your search criteria or add a new appointment.
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gap: "1px",
                  background: "#e2e8f0",
                }}
              >
                {filteredAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    style={{
                      background: "white",
                      padding: "20px",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setSelectedAppointment(appointment);
                      setShowModal(true);
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto",
                        gap: "15px",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(280px, 1fr))",
                          gap: "25px",
                        }}
                      >
                        {/* Patient Info */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              marginBottom: "8px",
                            }}
                          >
                            <div
                              style={{
                                background:
                                  "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                                padding: "10px",
                                borderRadius: "50%",
                                boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
                              }}
                            >
                              <User size={18} color="white" />
                            </div>
                            <div>
                              <h3
                                style={{
                                  color: "#1e293b",
                                  fontSize: "16px",
                                  fontWeight: "600",
                                  margin: 0,
                                }}
                              >
                                {appointment.patientName}
                              </h3>
                              <p
                                style={{
                                  color: "#64748b",
                                  fontSize: "13px",
                                  margin: "2px 0 0 0",
                                }}
                              >
                                Age: {appointment.age} • {appointment.insurance}
                              </p>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                              marginLeft: "42px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              <Phone size={12} color="#64748b" />
                              <span
                                style={{ color: "#64748b", fontSize: "12px" }}
                              >
                                {appointment.phone}
                              </span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              <Mail size={12} color="#64748b" />
                              <span
                                style={{ color: "#64748b", fontSize: "12px" }}
                              >
                                {appointment.email}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Appointment Details */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              marginBottom: "8px",
                            }}
                          >
                            <div
                              style={{
                                background:
                                  "linear-gradient(135deg, #10b981, #059669)",
                                padding: "10px",
                                borderRadius: "50%",
                                boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
                              }}
                            >
                              <Stethoscope size={18} color="white" />
                            </div>
                            <div>
                              <h4
                                style={{
                                  color: "#1e293b",
                                  fontSize: "14px",
                                  fontWeight: "600",
                                  margin: 0,
                                }}
                              >
                                {appointment.doctor}
                              </h4>
                              <p
                                style={{
                                  color: "#64748b",
                                  fontSize: "13px",
                                  margin: "2px 0 0 0",
                                }}
                              >
                                {appointment.department}
                              </p>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                              marginLeft: "42px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              <Calendar size={12} color="#64748b" />
                              <span
                                style={{
                                  color: "#64748b",
                                  fontSize: "12px",
                                  fontWeight: "500",
                                }}
                              >
                                {appointment.date}
                              </span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              <Clock size={12} color="#64748b" />
                              <span
                                style={{
                                  color: "#64748b",
                                  fontSize: "12px",
                                  fontWeight: "500",
                                }}
                              >
                                {appointment.time}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Status & Actions */}
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                          }}
                        >
                          {/* Status Badge */}
                          <div
                            style={{
                              background: getStatusColor(appointment.status),
                              color: "white",
                              padding: "8px 16px",
                              borderRadius: "20px",
                              fontSize: "12px",
                              fontWeight: "600",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              alignSelf: "flex-start",
                              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                            }}
                          >
                            {getStatusIcon(appointment.status)}
                            {appointment.status}
                          </div>

                          {/* Cancel Button for Confirmed appointments only */}
                          {appointment.status === "Confirmed" && (
                            <div
                              style={{
                                display: "flex",
                                gap: "8px",
                                flexWrap: "wrap",
                              }}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCancelClick(appointment);
                                }}
                                style={{
                                  background:
                                    "linear-gradient(135deg, #ef4444, #dc2626)",
                                  color: "white",
                                  border: "none",
                                  padding: "6px 12px",
                                  borderRadius: "16px",
                                  fontSize: "11px",
                                  fontWeight: "600",
                                  cursor: "pointer",
                                  transition: "all 0.3s ease",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  boxShadow: "0 2px 8px rgba(239, 68, 68, 0.3)",
                                }}
                              >
                                <Ban size={12} />
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "15px",
                          flexShrink: 0,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                          }}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedAppointment(appointment);
                              setShowModal(true);
                            }}
                            style={{
                              background:
                                "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                              color: "white",
                              border: "none",
                              padding: "8px",
                              borderRadius: "8px",
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                              boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
                            }}
                          >
                            <Eye size={14} />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditAppointment(appointment);
                            }}
                            style={{
                              background:
                                "linear-gradient(135deg, #10b981, #059669)",
                              color: "white",
                              border: "none",
                              padding: "8px",
                              borderRadius: "8px",
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                              boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
                            }}
                          >
                            <Edit3 size={14} />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(appointment);
                            }}
                            style={{
                              background:
                                "linear-gradient(135deg, #ef4444, #dc2626)",
                              color: "white",
                              border: "none",
                              padding: "8px",
                              borderRadius: "8px",
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                              boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Appointment Modal */}
      {showCancelModal && appointmentToCancel && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(8px)",
            padding: "15px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "30px",
              maxWidth: "450px",
              width: "90%",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #fee2e2, #fecaca)",
                borderRadius: "50%",
                width: "80px",
                height: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px auto",
              }}
            >
              <Ban size={40} color="#ef4444" />
            </div>

            <h2
              style={{
                color: "#1e293b",
                fontSize: "24px",
                fontWeight: "700",
                margin: "0 0 10px 0",
              }}
            >
              Cancel Appointment
            </h2>

            <p
              style={{
                color: "#64748b",
                fontSize: "16px",
                margin: "0 0 20px 0",
                lineHeight: "1.5",
              }}
            >
              Are you sure you want to cancel the appointment for{" "}
              <strong style={{ color: "#1e293b" }}>
                {appointmentToCancel.patientName}
              </strong>
              ?
            </p>

            <div
              style={{
                background: "#f8fafc",
                padding: "15px",
                borderRadius: "12px",
                margin: "20px 0",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ color: "#64748b", fontSize: "14px" }}>
                  Patient:
                </span>
                <span
                  style={{
                    color: "#1e293b",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {appointmentToCancel.patientName}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ color: "#64748b", fontSize: "14px" }}>
                  Doctor:
                </span>
                <span
                  style={{
                    color: "#1e293b",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {appointmentToCancel.doctor}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b", fontSize: "14px" }}>
                  Date & Time:
                </span>
                <span
                  style={{
                    color: "#1e293b",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {appointmentToCancel.date} at {appointmentToCancel.time}
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                marginTop: "25px",
              }}
            >
              <button
                onClick={cancelCancelAction}
                style={{
                  background: "white",
                  color: "#64748b",
                  border: "2px solid #e2e8f0",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  minHeight: "48px",
                }}
              >
                Keep Active
              </button>
              <button
                onClick={cancelAppointment}
                style={{
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
                  minHeight: "48px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Ban size={16} />
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Appointment Modal */}
      {showNewAppointmentModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(8px)",
            padding: "15px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.98)",
              borderRadius: "24px",
              padding: "30px",
              width: "100%",
              maxWidth: "900px",
              maxHeight: "calc(100vh - 30px)",
              overflow: "auto",
              boxShadow: "0 24px 48px rgba(0, 0, 0, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "25px",
                paddingBottom: "15px",
                borderBottom: "2px solid rgba(148, 163, 184, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#1e293b",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  margin: 0,
                }}
              >
                <UserPlus size={28} />
                Create New Appointment
              </h2>
              <button
                onClick={() => {
                  setShowNewAppointmentModal(false);
                  setNewAppointment({
                    patientName: "",
                    doctor: "",
                    department: "",
                    date: "",
                    time: "",
                    phone: "",
                    email: "",
                    age: "",
                    symptoms: "",
                    reason: "",
                    insurance: "",
                  });
                  setFormErrors({});
                }}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  color: "#64748b",
                  transition: "color 0.3s ease",
                  padding: "6px",
                  borderRadius: "8px",
                }}
              >
                <X size={22} />
              </button>
            </div>

            <div>
              {/* Patient Information */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                  borderRadius: "16px",
                  padding: "20px",
                  marginBottom: "20px",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "#1e293b",
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <User size={18} />
                  Patient Information
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "6px",
                      }}
                    >
                      Patient Name *
                    </label>
                    <input
                      type="text"
                      value={newAppointment.patientName}
                      onChange={(e) =>
                        setNewAppointment((prev) => ({
                          ...prev,
                          patientName: e.target.value,
                        }))
                      }
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: `2px solid ${
                          formErrors.patientName
                            ? "#ef4444"
                            : "rgba(148, 163, 184, 0.2)"
                        }`,
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        outline: "none",
                        background: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "inherit",
                      }}
                      placeholder="Enter patient full name"
                    />
                    {formErrors.patientName && (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.8rem",
                          marginTop: "4px",
                        }}
                      >
                        {formErrors.patientName}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "6px",
                      }}
                    >
                      Age *
                    </label>
                    <input
                      type="number"
                      value={newAppointment.age}
                      onChange={(e) =>
                        setNewAppointment((prev) => ({
                          ...prev,
                          age: e.target.value,
                        }))
                      }
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: `2px solid ${
                          formErrors.age
                            ? "#ef4444"
                            : "rgba(148, 163, 184, 0.2)"
                        }`,
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        outline: "none",
                        background: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "inherit",
                      }}
                      placeholder="Enter age"
                    />
                    {formErrors.age && (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.8rem",
                          marginTop: "4px",
                        }}
                      >
                        {formErrors.age}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "6px",
                      }}
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={newAppointment.phone}
                      onChange={(e) =>
                        setNewAppointment((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: `2px solid ${
                          formErrors.phone
                            ? "#ef4444"
                            : "rgba(148, 163, 184, 0.2)"
                        }`,
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        outline: "none",
                        background: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "inherit",
                      }}
                      placeholder="+1 (555) 123-4567"
                    />
                    {formErrors.phone && (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.8rem",
                          marginTop: "4px",
                        }}
                      >
                        {formErrors.phone}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "6px",
                      }}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={newAppointment.email}
                      onChange={(e) =>
                        setNewAppointment((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: `2px solid ${
                          formErrors.email
                            ? "#ef4444"
                            : "rgba(148, 163, 184, 0.2)"
                        }`,
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        outline: "none",
                        background: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "inherit",
                      }}
                      placeholder="patient@email.com"
                    />
                    {formErrors.email && (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.8rem",
                          marginTop: "4px",
                        }}
                      >
                        {formErrors.email}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "6px",
                      }}
                    >
                      Insurance *
                    </label>
                    <select
                      value={newAppointment.insurance}
                      onChange={(e) =>
                        setNewAppointment((prev) => ({
                          ...prev,
                          insurance: e.target.value,
                        }))
                      }
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: `2px solid ${
                          formErrors.insurance
                            ? "#ef4444"
                            : "rgba(148, 163, 184, 0.2)"
                        }`,
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        outline: "none",
                        background: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "inherit",
                        cursor: "pointer",
                      }}
                    >
                      <option value="">Select Insurance</option>
                      {insuranceOptions.map((insurance) => (
                        <option key={insurance} value={insurance}>
                          {insurance}
                        </option>
                      ))}
                    </select>
                    {formErrors.insurance && (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.8rem",
                          marginTop: "4px",
                        }}
                      >
                        {formErrors.insurance}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                  borderRadius: "16px",
                  padding: "20px",
                  marginBottom: "20px",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "#1e293b",
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Calendar size={18} />
                  Appointment Details
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "6px",
                      }}
                    >
                      Department *
                    </label>
                    <select
                      value={newAppointment.department}
                      onChange={(e) => {
                        setNewAppointment((prev) => ({
                          ...prev,
                          department: e.target.value,
                          doctor: "",
                        }));
                      }}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: `2px solid ${
                          formErrors.department
                            ? "#ef4444"
                            : "rgba(148, 163, 184, 0.2)"
                        }`,
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        outline: "none",
                        background: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "inherit",
                        cursor: "pointer",
                      }}
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                    {formErrors.department && (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.8rem",
                          marginTop: "4px",
                        }}
                      >
                        {formErrors.department}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "6px",
                      }}
                    >
                      Doctor *
                    </label>
                    <select
                      value={newAppointment.doctor}
                      onChange={(e) =>
                        setNewAppointment((prev) => ({
                          ...prev,
                          doctor: e.target.value,
                        }))
                      }
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: `2px solid ${
                          formErrors.doctor
                            ? "#ef4444"
                            : "rgba(148, 163, 184, 0.2)"
                        }`,
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        outline: "none",
                        background: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "inherit",
                        cursor: "pointer",
                      }}
                    >
                      <option value="">Select Doctor</option>
                      {doctors.map((doctor) => (
                        <option key={doctor} value={doctor}>
                          {doctor}
                        </option>
                      ))}
                    </select>
                    {formErrors.doctor && (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.8rem",
                          marginTop: "4px",
                        }}
                      >
                        {formErrors.doctor}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "6px",
                      }}
                    >
                      Date *
                    </label>
                    <input
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) =>
                        setNewAppointment((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: `2px solid ${
                          formErrors.date
                            ? "#ef4444"
                            : "rgba(148, 163, 184, 0.2)"
                        }`,
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        outline: "none",
                        background: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "inherit",
                        cursor: "pointer",
                      }}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {formErrors.date && (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.8rem",
                          marginTop: "4px",
                        }}
                      >
                        {formErrors.date}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "6px",
                      }}
                    >
                      Time *
                    </label>
                    <select
                      value={newAppointment.time}
                      onChange={(e) =>
                        setNewAppointment((prev) => ({
                          ...prev,
                          time: e.target.value,
                        }))
                      }
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: `2px solid ${
                          formErrors.time
                            ? "#ef4444"
                            : "rgba(148, 163, 184, 0.2)"
                        }`,
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        outline: "none",
                        background: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "inherit",
                        cursor: "pointer",
                      }}
                    >
                      <option value="">Select Time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    {formErrors.time && (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.8rem",
                          marginTop: "4px",
                        }}
                      >
                        {formErrors.time}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                  borderRadius: "16px",
                  padding: "20px",
                  marginBottom: "20px",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "#1e293b",
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Heart size={18} />
                  Medical Information
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <Heart size={14} />
                      Symptoms *
                    </label>
                    <textarea
                      value={newAppointment.symptoms}
                      onChange={(e) =>
                        setNewAppointment((prev) => ({
                          ...prev,
                          symptoms: e.target.value,
                        }))
                      }
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: `2px solid ${
                          formErrors.symptoms
                            ? "#ef4444"
                            : "rgba(148, 163, 184, 0.2)"
                        }`,
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        outline: "none",
                        background: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "inherit",
                        resize: "vertical",
                        minHeight: "80px",
                      }}
                      placeholder="Describe the patient's symptoms..."
                    />
                    {formErrors.symptoms && (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.8rem",
                          marginTop: "4px",
                        }}
                      >
                        {formErrors.symptoms}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <FileText size={14} />
                      Reason for Visit *
                    </label>
                    <textarea
                      value={newAppointment.reason}
                      onChange={(e) =>
                        setNewAppointment((prev) => ({
                          ...prev,
                          reason: e.target.value,
                        }))
                      }
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: `2px solid ${
                          formErrors.reason
                            ? "#ef4444"
                            : "rgba(148, 163, 184, 0.2)"
                        }`,
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        outline: "none",
                        background: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "inherit",
                        resize: "vertical",
                        minHeight: "80px",
                      }}
                      placeholder="Reason for the appointment or visit..."
                    />
                    {formErrors.reason && (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.8rem",
                          marginTop: "4px",
                        }}
                      >
                        {formErrors.reason}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "flex-end",
                  paddingTop: "15px",
                  borderTop: "2px solid rgba(148, 163, 184, 0.1)",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => {
                    setShowNewAppointmentModal(false);
                    setNewAppointment({
                      patientName: "",
                      doctor: "",
                      department: "",
                      date: "",
                      time: "",
                      phone: "",
                      email: "",
                      age: "",
                      symptoms: "",
                      reason: "",
                      insurance: "",
                    });
                    setFormErrors({});
                  }}
                  style={{
                    background: "white",
                    color: "#64748b",
                    border: "2px solid rgba(148, 163, 184, 0.2)",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    minHeight: "44px",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateAppointment}
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    border: "none",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
                    minHeight: "44px",
                  }}
                >
                  <Save size={16} />
                  Create Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Appointment Modal */}
      {showEditAppointmentModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(8px)",
            padding: "15px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.98)",
              borderRadius: "24px",
              padding: "30px",
              width: "100%",
              maxWidth: "900px",
              maxHeight: "calc(100vh - 30px)",
              overflow: "auto",
              boxShadow: "0 24px 48px rgba(0, 0, 0, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "25px",
                paddingBottom: "15px",
                borderBottom: "2px solid rgba(148, 163, 184, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#1e293b",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  margin: 0,
                }}
              >
                <Edit3 size={28} />
                Edit Appointment
              </h2>
              <button
                onClick={() => {
                  setShowEditAppointmentModal(false);
                  setEditAppointment({
                    id: null,
                    patientName: "",
                    doctor: "",
                    department: "",
                    date: "",
                    time: "",
                    phone: "",
                    email: "",
                    age: "",
                    symptoms: "",
                    reason: "",
                    insurance: "",
                  });
                  setEditFormErrors({});
                }}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  color: "#64748b",
                  transition: "color 0.3s ease",
                  padding: "6px",
                  borderRadius: "8px",
                }}
              >
                <X size={22} />
              </button>
            </div>

            <div>
              {/* Patient Information */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                  borderRadius: "16px",
                  padding: "20px",
                  marginBottom: "20px",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "#1e293b",
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <User size={18} />
                  Patient Information
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "6px",
                      }}
                    >
                      Patient Name *
                    </label>
                    <input
                      type="text"
                      value={editAppointment.patientName}
                      onChange={(e) =>
                        setEditAppointment((prev) => ({
                          ...prev,
                          patientName: e.target.value,
                        }))
                      }
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: `2px solid ${
                          editFormErrors.patientName
                            ? "#ef4444"
                            : "rgba(148, 163, 184, 0.2)"
                        }`,
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        outline: "none",
                        background: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "inherit",
                      }}
                      placeholder="Enter patient full name"
                    />
                    {editFormErrors.patientName && (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.8rem",
                          marginTop: "4px",
                        }}
                      >
                        {editFormErrors.patientName}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "6px",
                      }}
                    >
                      Age *
                    </label>
                    <input
                      type="number"
                      value={editAppointment.age}
                      onChange={(e) =>
                        setEditAppointment((prev) => ({
                          ...prev,
                          age: e.target.value,
                        }))
                      }
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: `2px solid ${
                          editFormErrors.age
                            ? "#ef4444"
                            : "rgba(148, 163, 184, 0.2)"
                        }`,
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        outline: "none",
                        background: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "inherit",
                      }}
                      placeholder="Enter age"
                    />
                    {editFormErrors.age && (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.8rem",
                          marginTop: "4px",
                        }}
                      >
                        {editFormErrors.age}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "6px",
                      }}
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={editAppointment.phone}
                      onChange={(e) =>
                        setEditAppointment((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: `2px solid ${
                          editFormErrors.phone
                            ? "#ef4444"
                            : "rgba(148, 163, 184, 0.2)"
                        }`,
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        outline: "none",
                        background: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "inherit",
                      }}
                      placeholder="+1 (555) 123-4567"
                    />
                    {editFormErrors.phone && (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.8rem",
                          marginTop: "4px",
                        }}
                      >
                        {editFormErrors.phone}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "6px",
                      }}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={editAppointment.email}
                      onChange={(e) =>
                        setEditAppointment((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: `2px solid ${
                          editFormErrors.email
                            ? "#ef4444"
                            : "rgba(148, 163, 184, 0.2)"
                        }`,
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        outline: "none",
                        background: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "inherit",
                      }}
                      placeholder="patient@email.com"
                    />
                    {editFormErrors.email && (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.8rem",
                          marginTop: "4px",
                        }}
                      >
                        {editFormErrors.email}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "6px",
                      }}
                    >
                      Insurance *
                    </label>
                    <select
                      value={editAppointment.insurance}
                      onChange={(e) =>
                        setEditAppointment((prev) => ({
                          ...prev,
                          insurance: e.target.value,
                        }))
                      }
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: `2px solid ${
                          editFormErrors.insurance
                            ? "#ef4444"
                            : "rgba(148, 163, 184, 0.2)"
                        }`,
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        outline: "none",
                        background: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "inherit",
                        cursor: "pointer",
                      }}
                    >
                      <option value="">Select Insurance</option>
                      {insuranceOptions.map((insurance) => (
                        <option key={insurance} value={insurance}>
                          {insurance}
                        </option>
                      ))}
                    </select>
                    {editFormErrors.insurance && (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.8rem",
                          marginTop: "4px",
                        }}
                      >
                        {editFormErrors.insurance}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                  borderRadius: "16px",
                  padding: "20px",
                  marginBottom: "20px",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "#1e293b",
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Calendar size={18} />
                  Appointment Details
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "6px",
                      }}
                    >
                      Department *
                    </label>
                    <select
                      value={editAppointment.department}
                      onChange={(e) => {
                        setEditAppointment((prev) => ({
                          ...prev,
                          department: e.target.value,
                          doctor: "",
                        }));
                      }}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: `2px solid ${
                          editFormErrors.department
                            ? "#ef4444"
                            : "rgba(148, 163, 184, 0.2)"
                        }`,
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        outline: "none",
                        background: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "inherit",
                        cursor: "pointer",
                      }}
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                    {editFormErrors.department && (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.8rem",
                          marginTop: "4px",
                        }}
                      >
                        {editFormErrors.department}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "6px",
                      }}
                    >
                      Doctor *
                    </label>
                    <select
                      value={editAppointment.doctor}
                      onChange={(e) =>
                        setEditAppointment((prev) => ({
                          ...prev,
                          doctor: e.target.value,
                        }))
                      }
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: `2px solid ${
                          editFormErrors.doctor
                            ? "#ef4444"
                            : "rgba(148, 163, 184, 0.2)"
                        }`,
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        outline: "none",
                        background: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "inherit",
                        cursor: "pointer",
                      }}
                    >
                      <option value="">Select Doctor</option>
                      {doctors.map((doctor) => (
                        <option key={doctor} value={doctor}>
                          {doctor}
                        </option>
                      ))}
                    </select>
                    {editFormErrors.doctor && (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.8rem",
                          marginTop: "4px",
                        }}
                      >
                        {editFormErrors.doctor}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "6px",
                      }}
                    >
                      Date *
                    </label>
                    <input
                      type="date"
                      value={editAppointment.date}
                      onChange={(e) =>
                        setEditAppointment((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: `2px solid ${
                          editFormErrors.date
                            ? "#ef4444"
                            : "rgba(148, 163, 184, 0.2)"
                        }`,
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        outline: "none",
                        background: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "inherit",
                        cursor: "pointer",
                      }}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {editFormErrors.date && (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.8rem",
                          marginTop: "4px",
                        }}
                      >
                        {editFormErrors.date}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "6px",
                      }}
                    >
                      Time *
                    </label>
                    <select
                      value={editAppointment.time}
                      onChange={(e) =>
                        setEditAppointment((prev) => ({
                          ...prev,
                          time: e.target.value,
                        }))
                      }
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: `2px solid ${
                          editFormErrors.time
                            ? "#ef4444"
                            : "rgba(148, 163, 184, 0.2)"
                        }`,
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        outline: "none",
                        background: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "inherit",
                        cursor: "pointer",
                      }}
                    >
                      <option value="">Select Time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    {editFormErrors.time && (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.8rem",
                          marginTop: "4px",
                        }}
                      >
                        {editFormErrors.time}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                  borderRadius: "16px",
                  padding: "20px",
                  marginBottom: "20px",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "#1e293b",
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Heart size={18} />
                  Medical Information
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <Heart size={14} />
                      Symptoms *
                    </label>
                    <textarea
                      value={editAppointment.symptoms}
                      onChange={(e) =>
                        setEditAppointment((prev) => ({
                          ...prev,
                          symptoms: e.target.value,
                        }))
                      }
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: `2px solid ${
                          editFormErrors.symptoms
                            ? "#ef4444"
                            : "rgba(148, 163, 184, 0.2)"
                        }`,
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        outline: "none",
                        background: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "inherit",
                        resize: "vertical",
                        minHeight: "80px",
                      }}
                      placeholder="Describe the patient's symptoms..."
                    />
                    {editFormErrors.symptoms && (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.8rem",
                          marginTop: "4px",
                        }}
                      >
                        {editFormErrors.symptoms}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <FileText size={14} />
                      Reason for Visit *
                    </label>
                    <textarea
                      value={editAppointment.reason}
                      onChange={(e) =>
                        setEditAppointment((prev) => ({
                          ...prev,
                          reason: e.target.value,
                        }))
                      }
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: `2px solid ${
                          editFormErrors.reason
                            ? "#ef4444"
                            : "rgba(148, 163, 184, 0.2)"
                        }`,
                        fontSize: "1rem",
                        transition: "all 0.3s ease",
                        outline: "none",
                        background: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "inherit",
                        resize: "vertical",
                        minHeight: "80px",
                      }}
                      placeholder="Reason for the appointment or visit..."
                    />
                    {editFormErrors.reason && (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.8rem",
                          marginTop: "4px",
                        }}
                      >
                        {editFormErrors.reason}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "flex-end",
                  paddingTop: "15px",
                  borderTop: "2px solid rgba(148, 163, 184, 0.1)",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => {
                    setShowEditAppointmentModal(false);
                    setEditAppointment({
                      id: null,
                      patientName: "",
                      doctor: "",
                      department: "",
                      date: "",
                      time: "",
                      phone: "",
                      email: "",
                      age: "",
                      symptoms: "",
                      reason: "",
                      insurance: "",
                    });
                    setEditFormErrors({});
                  }}
                  style={{
                    background: "white",
                    color: "#64748b",
                    border: "2px solid rgba(148, 163, 184, 0.2)",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    minHeight: "44px",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateAppointment}
                  style={{
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    border: "none",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 8px 24px rgba(16, 185, 129, 0.3)",
                    minHeight: "44px",
                  }}
                >
                  <Save size={16} />
                  Update Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && appointmentToDelete && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(8px)",
            padding: "15px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "30px",
              maxWidth: "450px",
              width: "90%",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #fee2e2, #fecaca)",
                borderRadius: "50%",
                width: "80px",
                height: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px auto",
              }}
            >
              <AlertTriangle size={40} color="#ef4444" />
            </div>

            <h2
              style={{
                color: "#1e293b",
                fontSize: "24px",
                fontWeight: "700",
                margin: "0 0 10px 0",
              }}
            >
              Delete Appointment
            </h2>

            <p
              style={{
                color: "#64748b",
                fontSize: "16px",
                margin: "0 0 20px 0",
                lineHeight: "1.5",
              }}
            >
              Are you sure you want to delete the appointment for{" "}
              <strong style={{ color: "#1e293b" }}>
                {appointmentToDelete.patientName}
              </strong>
              ?
              <br />
              This action cannot be undone.
            </p>

            <div
              style={{
                background: "#f8fafc",
                padding: "15px",
                borderRadius: "12px",
                margin: "20px 0",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ color: "#64748b", fontSize: "14px" }}>
                  Patient:
                </span>
                <span
                  style={{
                    color: "#1e293b",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {appointmentToDelete.patientName}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ color: "#64748b", fontSize: "14px" }}>
                  Doctor:
                </span>
                <span
                  style={{
                    color: "#1e293b",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {appointmentToDelete.doctor}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b", fontSize: "14px" }}>
                  Date & Time:
                </span>
                <span
                  style={{
                    color: "#1e293b",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {appointmentToDelete.date} at {appointmentToDelete.time}
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                marginTop: "25px",
              }}
            >
              <button
                onClick={cancelDelete}
                style={{
                  background: "white",
                  color: "#64748b",
                  border: "2px solid #e2e8f0",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  minHeight: "48px",
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
                  minHeight: "48px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Trash2 size={16} />
                Delete Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Appointment Modal */}
      {showModal && selectedAppointment && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(8px)",
            padding: "15px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "30px",
              maxWidth: "600px",
              width: "90%",
              maxHeight: "calc(100vh - 30px)",
              overflow: "auto",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "25px",
                paddingBottom: "15px",
                borderBottom: "2px solid #f1f5f9",
              }}
            >
              <h2
                style={{
                  color: "#1e293b",
                  fontSize: "24px",
                  fontWeight: "700",
                  margin: 0,
                }}
              >
                Appointment Details
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "#64748b",
                  padding: "4px",
                  minHeight: "44px",
                  minWidth: "44px",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "grid", gap: "20px" }}>
              {/* Patient Information */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                  padding: "20px",
                  borderRadius: "12px",
                }}
              >
                <h3
                  style={{
                    color: "#1e293b",
                    fontSize: "16px",
                    fontWeight: "600",
                    margin: "0 0 12px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <User size={18} color="#3b82f6" />
                  Patient Information
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "12px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        color: "#64748b",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      Name
                    </label>
                    <p
                      style={{
                        color: "#1e293b",
                        fontSize: "14px",
                        margin: "4px 0 0 0",
                        fontWeight: "500",
                      }}
                    >
                      {selectedAppointment.patientName}
                    </p>
                  </div>
                  <div>
                    <label
                      style={{
                        color: "#64748b",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      Age
                    </label>
                    <p
                      style={{
                        color: "#1e293b",
                        fontSize: "14px",
                        margin: "4px 0 0 0",
                        fontWeight: "500",
                      }}
                    >
                      {selectedAppointment.age} years
                    </p>
                  </div>
                  <div>
                    <label
                      style={{
                        color: "#64748b",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      Phone
                    </label>
                    <p
                      style={{
                        color: "#1e293b",
                        fontSize: "14px",
                        margin: "4px 0 0 0",
                        fontWeight: "500",
                      }}
                    >
                      {selectedAppointment.phone}
                    </p>
                  </div>
                  <div>
                    <label
                      style={{
                        color: "#64748b",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      Email
                    </label>
                    <p
                      style={{
                        color: "#1e293b",
                        fontSize: "14px",
                        margin: "4px 0 0 0",
                        fontWeight: "500",
                      }}
                    >
                      {selectedAppointment.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Appointment Information */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                  padding: "20px",
                  borderRadius: "12px",
                }}
              >
                <h3
                  style={{
                    color: "#1e293b",
                    fontSize: "16px",
                    fontWeight: "600",
                    margin: "0 0 12px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Calendar size={18} color="#3b82f6" />
                  Appointment Information
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "12px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        color: "#64748b",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      Doctor
                    </label>
                    <p
                      style={{
                        color: "#1e293b",
                        fontSize: "14px",
                        margin: "4px 0 0 0",
                        fontWeight: "500",
                      }}
                    >
                      {selectedAppointment.doctor}
                    </p>
                  </div>
                  <div>
                    <label
                      style={{
                        color: "#64748b",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      Department
                    </label>
                    <p
                      style={{
                        color: "#1e293b",
                        fontSize: "14px",
                        margin: "4px 0 0 0",
                        fontWeight: "500",
                      }}
                    >
                      {selectedAppointment.department}
                    </p>
                  </div>
                  <div>
                    <label
                      style={{
                        color: "#64748b",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      Date
                    </label>
                    <p
                      style={{
                        color: "#1e293b",
                        fontSize: "14px",
                        margin: "4px 0 0 0",
                        fontWeight: "500",
                      }}
                    >
                      {selectedAppointment.date}
                    </p>
                  </div>
                  <div>
                    <label
                      style={{
                        color: "#64748b",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      Time
                    </label>
                    <p
                      style={{
                        color: "#1e293b",
                        fontSize: "14px",
                        margin: "4px 0 0 0",
                        fontWeight: "500",
                      }}
                    >
                      {selectedAppointment.time}
                    </p>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                  padding: "20px",
                  borderRadius: "12px",
                }}
              >
                <h3
                  style={{
                    color: "#1e293b",
                    fontSize: "16px",
                    fontWeight: "600",
                    margin: "0 0 15px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Heart size={18} color="#3b82f6" />
                  Medical Information
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "15px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        color: "#64748b",
                        fontSize: "13px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        marginBottom: "6px",
                      }}
                    >
                      <Heart size={12} />
                      Symptoms
                    </label>
                    <p
                      style={{
                        color: "#1e293b",
                        fontSize: "14px",
                        margin: 0,
                        lineHeight: "1.5",
                      }}
                    >
                      {selectedAppointment.symptoms}
                    </p>
                  </div>
                  <div>
                    <label
                      style={{
                        color: "#64748b",
                        fontSize: "13px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        marginBottom: "6px",
                      }}
                    >
                      <FileText size={12} />
                      Reason for Visit
                    </label>
                    <p
                      style={{
                        color: "#1e293b",
                        fontSize: "14px",
                        margin: 0,
                        lineHeight: "1.5",
                      }}
                    >
                      {selectedAppointment.reason}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
