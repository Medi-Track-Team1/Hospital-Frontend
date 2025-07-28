import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, User, Phone, Mail, Search, Filter, Plus, 
  Edit3, Trash2, CheckCircle, XCircle, AlertCircle, Eye,
  Users, Activity, TrendingUp, Bell, Settings, LogOut,
  ChevronDown, ChevronRight, MapPin, Stethoscope, Heart,
  Star, Award, Shield, Zap, Save, X, UserPlus, AlertTriangle
} from 'lucide-react';

const Appointment = () => {
  const [appointments, setAppointments] = useState([
    { 
      id: 1, 
      patientName: 'John Doe', 
      doctor: 'Dr. Sarah Smith', 
      date: '2025-01-20', 
      time: '10:00 AM', 
      status: 'Confirmed', 
      department: 'Cardiology',
      phone: '+1 (555) 123-4567',
      email: 'john.doe@email.com',
      age: 45,
      symptoms: 'Chest pain and shortness of breath',
      isEmergency: false,
      insurance: 'Blue Cross'
    },
    { 
      id: 2, 
      patientName: 'Jane Wilson', 
      doctor: 'Dr. Michael Johnson', 
      date: '2025-01-20', 
      time: '02:30 PM', 
      status: 'Pending', 
      department: 'Neurology',
      phone: '+1 (555) 987-6543',
      email: 'jane.wilson@email.com',
      age: 32,
      symptoms: 'Frequent headaches and dizziness',
      isEmergency: false,
      insurance: 'Aetna'
    },
    { 
      id: 3, 
      patientName: 'Mike Davis', 
      doctor: 'Dr. Emily Brown', 
      date: '2025-01-20', 
      time: '09:00 AM', 
      status: 'Emergency', 
      department: 'Emergency',
      phone: '+1 (555) 456-7890',
      email: 'mike.davis@email.com',
      age: 28,
      symptoms: 'Severe abdominal pain',
      isEmergency: true,
      insurance: 'Medicare'
    },
    { 
      id: 4, 
      patientName: 'Sarah Johnson', 
      doctor: 'Dr. Robert Lee', 
      date: '2025-01-21', 
      time: '11:30 AM', 
      status: 'Confirmed', 
      department: 'Pediatrics',
      phone: '+1 (555) 321-0987',
      email: 'sarah.johnson@email.com',
      age: 8,
      symptoms: 'Regular checkup and vaccination',
      isEmergency: false,
      insurance: 'Cigna'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDate, setFilterDate] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeView, setActiveView] = useState('today');

  // New appointment form state
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    doctor: '',
    date: '',
    time: '',
    status: 'Pending',
    department: '',
    phone: '',
    email: '',
    age: '',
    symptoms: '',
    isEmergency: false,
    insurance: '',
    notes: ''
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const doctors = [
    'Dr. Sarah Smith',
    'Dr. Michael Johnson', 
    'Dr. Emily Brown',
    'Dr. Robert Lee',
    'Dr. Jessica Chen',
    'Dr. David Wilson',
    'Dr. Maria Garcia',
    'Dr. James Taylor'
  ];

  const departments = [
    'Cardiology',
    'Neurology',
    'Emergency',
    'Pediatrics',
    'Orthopedics',
    'Dermatology',
    'Psychiatry',
    'Oncology',
    'Radiology',
    'General Medicine'
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
  ];

  const insuranceOptions = [
    'Blue Cross',
    'Aetna',
    'Medicare',
    'Cigna',
    'UnitedHealth',
    'Humana',
    'Kaiser Permanente',
    'Anthem'
  ];

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || appointment.status === filterStatus;
    const matchesDate = !filterDate || appointment.date === filterDate;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const validateForm = () => {
    const errors = {};
    
    if (!newAppointment.patientName.trim()) errors.patientName = 'Patient name is required';
    if (!newAppointment.doctor) errors.doctor = 'Doctor selection is required';
    if (!newAppointment.date) errors.date = 'Date is required';
    if (!newAppointment.time) errors.time = 'Time is required';
    if (!newAppointment.department) errors.department = 'Department is required';
    if (!newAppointment.phone.trim()) errors.phone = 'Phone number is required';
    if (!newAppointment.email.trim()) errors.email = 'Email is required';
    if (!newAppointment.age || newAppointment.age < 1) errors.age = 'Valid age is required';
    if (!newAppointment.symptoms.trim()) errors.symptoms = 'Symptoms/reason is required';
    if (!newAppointment.insurance) errors.insurance = 'Insurance selection is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (newAppointment.email && !emailRegex.test(newAppointment.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone validation (basic)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (newAppointment.phone && !phoneRegex.test(newAppointment.phone.replace(/[\s\-\(\)]/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateAppointment = () => {
    if (!validateForm()) return;

    const appointment = {
      ...newAppointment,
      id: appointments.length + 1,
      age: parseInt(newAppointment.age),
      isEmergency: newAppointment.status === 'Emergency'
    };

    setAppointments(prev => [...prev, appointment]);
    setNewAppointment({
      patientName: '',
      doctor: '',
      date: '',
      time: '',
      status: 'Pending',
      department: '',
      phone: '',
      email: '',
      age: '',
      symptoms: '',
      isEmergency: false,
      insurance: '',
      notes: ''
    });
    setFormErrors({});
    setShowNewAppointmentModal(false);
  };

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments(prev => prev.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  const deleteAppointment = (id) => {
    setAppointments(prev => prev.filter(app => app.id !== id));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return 'linear-gradient(135deg, #10b981, #059669)';
      case 'Emergency': return 'linear-gradient(135deg, #ef4444, #dc2626)';
      case 'Pending': return 'linear-gradient(135deg, #f59e0b, #d97706)';
      case 'Completed': return 'linear-gradient(135deg, #8b5cf6, #7c3aed)';
      case 'Cancelled': return 'linear-gradient(135deg, #6b7280, #4b5563)';
      default: return 'linear-gradient(135deg, #6b7280, #4b5563)';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Confirmed': return <CheckCircle size={16} />;
      case 'Emergency': return <AlertCircle size={16} />;
      case 'Pending': return <Clock size={16} />;
      case 'Completed': return <Award size={16} />;
      case 'Cancelled': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const todayAppointments = appointments.filter(app => app.date === new Date().toISOString().split('T')[0]);
  const emergencyCount = appointments.filter(app => app.status === 'Emergency').length;
  const confirmedCount = appointments.filter(app => app.status === 'Confirmed').length;
  const pendingCount = appointments.filter(app => app.status === 'Pending').length;

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .responsive-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 15px;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .controls-container {
          background: white;
          padding: 20px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          margin-bottom: 25px;
          border: 1px solid rgba(59, 130, 246, 0.1);
        }
        
        .controls-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          align-items: center;
          justify-content: space-between;
        }
        
        .search-filters {
          display: flex;
          flex: 1;
          gap: 15px;
          align-items: center;
          min-width: 300px;
        }
        
        .search-container {
          position: relative;
          flex: 1;
          min-width: 250px;
        }
        
        .appointments-grid {
          display: grid;
          gap: 1px;
          background: #e2e8f0;
        }
        
        .appointment-card {
          background: white;
          padding: 20px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .appointment-content {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 15px;
          align-items: flex-start;
        }
        
        .appointment-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
        }
        
        .patient-section, .appointment-section, .symptoms-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .actions-container {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          flex-shrink: 0;
        }
        
        .action-buttons {
          display: flex;
          gap: 8px;
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(8px);
          padding: 15px;
          box-sizing: border-box;
        }
        
        .modal-content {
          background: rgba(255, 255, 255, 0.98);
          border-radius: 24px;
          padding: 30px;
          width: 100%;
          max-width: 900px;
          max-height: calc(100vh - 30px);
          overflow: auto;
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(20px);
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        
        .form-section {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 20px;
        }
        
        /* Mobile Responsive Styles */
        @media (max-width: 1200px) {
          .appointment-info {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .appointment-content {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .actions-container {
            justify-content: center;
            width: 100%;
          }
        }
        
        @media (max-width: 768px) {
          .responsive-container {
            padding: 10px;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-bottom: 20px;
          }
          
          .controls-container {
            padding: 15px;
          }
          
          .controls-wrapper {
            flex-direction: column;
            align-items: stretch;
            gap: 15px;
          }
          
          .search-filters {
            flex-direction: column;
            min-width: auto;
          }
          
          .search-container {
            min-width: auto;
          }
          
          .appointment-card {
            padding: 15px;
          }
          
          .patient-section, .appointment-section, .symptoms-section {
            gap: 8px;
          }
          
          .action-buttons {
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .modal-content {
            padding: 20px;
            margin: 10px;
            border-radius: 16px;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          
          .form-section {
            padding: 15px;
            margin-bottom: 15px;
          }
        }
        
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .appointment-info {
            gap: 15px;
          }
          
          .actions-container {
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }
          
          .modal-content {
            padding: 15px;
            max-height: calc(100vh - 20px);
          }
        }
        
        /* Touch-friendly buttons on mobile */
        @media (hover: none) and (pointer: coarse) {
          button {
            min-height: 44px;
            min-width: 44px;
          }
          
          input, select, textarea {
            min-height: 44px;
          }
        }
      `}</style>
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div className="responsive-container">
          {/* Stats Cards */}
          <div className="stats-grid">
            {[
              { 
                title: 'Today\'s Appointments', 
                value: todayAppointments.length, 
                icon: Calendar, 
                color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                bgColor: 'rgba(59, 130, 246, 0.1)'
              },
              { 
                title: 'Emergency Cases', 
                value: emergencyCount, 
                icon: AlertCircle, 
                color: 'linear-gradient(135deg, #ef4444, #dc2626)',
                bgColor: 'rgba(239, 68, 68, 0.1)'
              },
              { 
                title: 'Confirmed', 
                value: confirmedCount, 
                icon: CheckCircle, 
                color: 'linear-gradient(135deg, #10b981, #059669)',
                bgColor: 'rgba(16, 185, 129, 0.1)'
              },
              { 
                title: 'Pending', 
                value: pendingCount, 
                icon: Clock, 
                color: 'linear-gradient(135deg, #f59e0b, #d97706)',
                bgColor: 'rgba(245, 158, 11, 0.1)'
              }
            ].map((stat, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  padding: '20px',
                  borderRadius: '20px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(59, 130, 246, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{
                      color: '#64748b',
                      fontSize: '14px',
                      fontWeight: '600',
                      margin: '0 0 10px 0'
                    }}>
                      {stat.title}
                    </h3>
                    <div style={{
                      fontSize: '28px',
                      fontWeight: '700',
                      background: stat.color,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      {stat.value}
                    </div>
                  </div>
                  <div style={{
                    background: stat.bgColor,
                    padding: '15px',
                    borderRadius: '50%'
                  }}>
                    <stat.icon size={24} style={{ color: stat.color.split(',')[0].split('(')[1] }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="controls-container">
            <div className="controls-wrapper">
              <div className="search-filters">
                <div className="search-container">
                  <Search 
                    size={18} 
                    style={{
                      position: 'absolute',
                      left: '15px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#64748b'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Search patients, doctors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 45px',
                      borderRadius: '12px',
                      border: '2px solid #e2e8f0',
                      fontSize: '16px',
                      transition: 'all 0.3s ease',
                      background: '#f8fafc',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3b82f6';
                      e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                      e.target.style.background = 'white';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.boxShadow = 'none';
                      e.target.style.background = '#f8fafc';
                    }}
                  />
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0',
                    fontSize: '16px',
                    background: 'white',
                    cursor: 'pointer',
                    minWidth: '130px'
                  }}
                >
                  <option value="All">All Status</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0',
                    fontSize: '16px',
                    background: 'white',
                    cursor: 'pointer'
                  }}
                />
              </div>

              <button
                onClick={() => setShowNewAppointmentModal(true)}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
                }}
              >
                <Plus size={18} />
                <span>New Appointment</span>
              </button>
            </div>
          </div>

          {/* Appointments Table */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(59, 130, 246, 0.1)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '25px',
              borderBottom: '1px solid #e2e8f0',
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
            }}>
              <h2 style={{
                color: '#1e293b',
                fontSize: '22px',
                fontWeight: '700',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                <Users size={26} color="#3b82f6" />
                <span>Appointment Management</span>
                <span style={{
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {filteredAppointments.length} appointments
                </span>
              </h2>
            </div>

            <div style={{ padding: '0' }}>
              {filteredAppointments.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '50px 25px',
                  color: '#64748b'
                }}>
                  <Users size={40} style={{ marginBottom: '15px', opacity: 0.5 }} />
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 8px 0' }}>
                    No appointments found
                  </h3>
                  <p style={{ margin: 0 }}>
                    Try adjusting your search criteria or add a new appointment.
                  </p>
                </div>
              ) : (
                <div className="appointments-grid">
                  {filteredAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="appointment-card"
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#f8fafc';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'white';
                      }}
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setShowModal(true);
                      }}
                    >
                      <div className="appointment-content">
                        <div className="appointment-info">
                          {/* Patient Info */}
                          <div className="patient-section">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                              <div style={{
                                background: appointment.isEmergency 
                                  ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                                  : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                                padding: '10px',
                                borderRadius: '50%',
                                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                              }}>
                                <User size={18} color="white" />
                              </div>
                              <div>
                                <h3 style={{
                                  color: '#1e293b',
                                  fontSize: '16px',
                                  fontWeight: '600',
                                  margin: 0
                                }}>
                                  {appointment.patientName}
                                </h3>
                                <p style={{
                                  color: '#64748b',
                                  fontSize: '13px',
                                  margin: '2px 0 0 0'
                                }}>
                                  Age: {appointment.age} • {appointment.insurance}
                                </p>
                              </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginLeft: '42px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Phone size={12} color="#64748b" />
                                <span style={{ color: '#64748b', fontSize: '12px' }}>
                                  {appointment.phone}
                                </span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Mail size={12} color="#64748b" />
                                <span style={{ color: '#64748b', fontSize: '12px' }}>
                                  {appointment.email}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Appointment Details */}
                          <div className="appointment-section">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                              <div style={{
                                background: 'linear-gradient(135deg, #10b981, #059669)',
                                padding: '10px',
                                borderRadius: '50%',
                                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                              }}>
                                <Stethoscope size={18} color="white" />
                              </div>
                              <div>
                                <h4 style={{
                                  color: '#1e293b',
                                  fontSize: '14px',
                                  fontWeight: '600',
                                  margin: 0
                                }}>
                                  {appointment.doctor}
                                </h4>
                                <p style={{
                                  color: '#64748b',
                                  fontSize: '13px',
                                  margin: '2px 0 0 0'
                                }}>
                                  {appointment.department}
                                </p>
                              </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginLeft: '42px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Calendar size={12} color="#64748b" />
                                <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '500' }}>
                                  {appointment.date}
                                </span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Clock size={12} color="#64748b" />
                                <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '500' }}>
                                  {appointment.time}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Symptoms */}
                          <div className="symptoms-section">
                            <h4 style={{
                              color: '#1e293b',
                              fontSize: '13px',
                              fontWeight: '600',
                              margin: '0 0 6px 0'
                            }}>
                              Symptoms / Reason
                            </h4>
                            <p style={{
                              color: '#64748b',
                              fontSize: '13px',
                              margin: 0,
                              lineHeight: '1.4',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}>
                              {appointment.symptoms}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="actions-container">
                          <div style={{
                            background: getStatusColor(appointment.status),
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '16px',
                            fontSize: '11px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                            minWidth: '90px',
                            justifyContent: 'center'
                          }}>
                            {getStatusIcon(appointment.status)}
                            {appointment.status}
                          </div>

                          <div className="action-buttons">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAppointment(appointment);
                                setShowModal(true);
                              }}
                              style={{
                                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                                color: 'white',
                                border: 'none',
                                padding: '8px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                              }}
                              onMouseOver={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
                              }}
                              onMouseOut={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
                              }}
                            >
                              <Eye size={14} />
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Edit functionality
                              }}
                              style={{
                                background: 'linear-gradient(135deg, #10b981, #059669)',
                                color: 'white',
                                border: 'none',
                                padding: '8px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                              }}
                              onMouseOver={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
                              }}
                              onMouseOut={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
                              }}
                            >
                              <Edit3 size={14} />
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteAppointment(appointment.id);
                              }}
                              style={{
                                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                color: 'white',
                                border: 'none',
                                padding: '8px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
                              }}
                              onMouseOver={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.4)';
                              }}
                              onMouseOut={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.3)';
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

        {/* New Appointment Modal */}
        {showNewAppointmentModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '25px',
                paddingBottom: '15px',
                borderBottom: '2px solid rgba(148, 163, 184, 0.1)',
              }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  margin: 0,
                }}>
                  <UserPlus size={28} />
                  Create New Appointment
                </h2>
                <button
                  onClick={() => {
                    setShowNewAppointmentModal(false);
                    setNewAppointment({
                      patientName: '',
                      doctor: '',
                      department: '',
                      date: '',
                      time: '',
                      phone: '',
                      email: '',
                      age: '',
                      symptoms: '',
                      insurance: '',
                      notes: '',
                      isEmergency: false
                    });
                    setFormErrors({});
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    color: '#64748b',
                    transition: 'color 0.3s ease',
                    padding: '6px',
                    borderRadius: '8px',
                  }}
                >
                  <X size={22} />
                </button>
              </div>

              <div>
                {/* Patient Information */}
                <div className="form-section">
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <User size={18} />
                    Patient Information
                  </h3>
                  
                  <div className="form-grid">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '6px',
                      }}>Patient Name *</label>
                      <input
                        type="text"
                        value={newAppointment.patientName}
                        onChange={(e) => setNewAppointment(prev => ({ ...prev, patientName: e.target.value }))}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: `2px solid ${formErrors.patientName ? '#ef4444' : 'rgba(148, 163, 184, 0.2)'}`,
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          outline: 'none',
                          background: 'rgba(255, 255, 255, 0.8)',
                          fontFamily: 'inherit',
                        }}
                        placeholder="Enter patient full name"
                      />
                      {formErrors.patientName && (
                        <span style={{
                          color: '#ef4444',
                          fontSize: '0.8rem',
                          marginTop: '4px',
                        }}>{formErrors.patientName}</span>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '6px',
                      }}>Age *</label>
                      <input
                        type="number"
                        value={newAppointment.age}
                        onChange={(e) => setNewAppointment(prev => ({ ...prev, age: e.target.value }))}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: `2px solid ${formErrors.age ? '#ef4444' : 'rgba(148, 163, 184, 0.2)'}`,
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          outline: 'none',
                          background: 'rgba(255, 255, 255, 0.8)',
                          fontFamily: 'inherit',
                        }}
                        placeholder="Enter age"
                      />
                      {formErrors.age && (
                        <span style={{
                          color: '#ef4444',
                          fontSize: '0.8rem',
                          marginTop: '4px',
                        }}>{formErrors.age}</span>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '6px',
                      }}>Phone Number *</label>
                      <input
                        type="tel"
                        value={newAppointment.phone}
                        onChange={(e) => setNewAppointment(prev => ({ ...prev, phone: e.target.value }))}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: `2px solid ${formErrors.phone ? '#ef4444' : 'rgba(148, 163, 184, 0.2)'}`,
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          outline: 'none',
                          background: 'rgba(255, 255, 255, 0.8)',
                          fontFamily: 'inherit',
                        }}
                        placeholder="+1 (555) 123-4567"
                      />
                      {formErrors.phone && (
                        <span style={{
                          color: '#ef4444',
                          fontSize: '0.8rem',
                          marginTop: '4px',
                        }}>{formErrors.phone}</span>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '6px',
                      }}>Email Address *</label>
                      <input
                        type="email"
                        value={newAppointment.email}
                        onChange={(e) => setNewAppointment(prev => ({ ...prev, email: e.target.value }))}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: `2px solid ${formErrors.email ? '#ef4444' : 'rgba(148, 163, 184, 0.2)'}`,
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          outline: 'none',
                          background: 'rgba(255, 255, 255, 0.8)',
                          fontFamily: 'inherit',
                        }}
                        placeholder="patient@email.com"
                      />
                      {formErrors.email && (
                        <span style={{
                          color: '#ef4444',
                          fontSize: '0.8rem',
                          marginTop: '4px',
                        }}>{formErrors.email}</span>
                      )}
                    </div>

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gridColumn: window.innerWidth <= 768 ? 'span 1' : 'span 2'
                    }}>
                      <label style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '6px',
                      }}>Insurance Provider *</label>
                      <select
                        value={newAppointment.insurance}
                        onChange={(e) => setNewAppointment(prev => ({ ...prev, insurance: e.target.value }))}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: `2px solid ${formErrors.insurance ? '#ef4444' : 'rgba(148, 163, 184, 0.2)'}`,
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          outline: 'none',
                          background: 'rgba(255, 255, 255, 0.8)',
                          fontFamily: 'inherit',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="">Select Insurance Provider</option>
                        {insuranceOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      {formErrors.insurance && (
                        <span style={{
                          color: '#ef4444',
                          fontSize: '0.8rem',
                          marginTop: '4px',
                        }}>{formErrors.insurance}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="form-section">
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <Calendar size={18} />
                    Appointment Details
                  </h3>
                  
                  <div className="form-grid">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '6px',
                      }}>Department *</label>
                      <select
                        value={newAppointment.department}
                        onChange={(e) => {
                          setNewAppointment(prev => ({ 
                            ...prev, 
                            department: e.target.value,
                            doctor: ''
                          }));
                        }}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: `2px solid ${formErrors.department ? '#ef4444' : 'rgba(148, 163, 184, 0.2)'}`,
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          outline: 'none',
                          background: 'rgba(255, 255, 255, 0.8)',
                          fontFamily: 'inherit',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                      {formErrors.department && (
                        <span style={{
                          color: '#ef4444',
                          fontSize: '0.8rem',
                          marginTop: '4px',
                        }}>{formErrors.department}</span>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '6px',
                      }}>Doctor *</label>
                      <select
                        value={newAppointment.doctor}
                        onChange={(e) => setNewAppointment(prev => ({ ...prev, doctor: e.target.value }))}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: `2px solid ${formErrors.doctor ? '#ef4444' : 'rgba(148, 163, 184, 0.2)'}`,
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          outline: 'none',
                          background: 'rgba(255, 255, 255, 0.8)',
                          fontFamily: 'inherit',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="">Select Doctor</option>
                        {doctors.map(doctor => (
                          <option key={doctor} value={doctor}>{doctor}</option>
                        ))}
                      </select>
                      {formErrors.doctor && (
                        <span style={{
                          color: '#ef4444',
                          fontSize: '0.8rem',
                          marginTop: '4px',
                        }}>{formErrors.doctor}</span>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '6px',
                      }}>Date *</label>
                      <input
                        type="date"
                        value={newAppointment.date}
                        onChange={(e) => setNewAppointment(prev => ({ ...prev, date: e.target.value }))}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: `2px solid ${formErrors.date ? '#ef4444' : 'rgba(148, 163, 184, 0.2)'}`,
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          outline: 'none',
                          background: 'rgba(255, 255, 255, 0.8)',
                          fontFamily: 'inherit',
                          cursor: 'pointer',
                        }}
                        min={new Date().toISOString().split('T')[0]}
                      />
                      {formErrors.date && (
                        <span style={{
                          color: '#ef4444',
                          fontSize: '0.8rem',
                          marginTop: '4px',
                        }}>{formErrors.date}</span>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '6px',
                      }}>Time *</label>
                      <select
                        value={newAppointment.time}
                        onChange={(e) => setNewAppointment(prev => ({ ...prev, time: e.target.value }))}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: `2px solid ${formErrors.time ? '#ef4444' : 'rgba(148, 163, 184, 0.2)'}`,
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          outline: 'none',
                          background: 'rgba(255, 255, 255, 0.8)',
                          fontFamily: 'inherit',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="">Select Time</option>
                        {timeSlots.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                      {formErrors.time && (
                        <span style={{
                          color: '#ef4444',
                          fontSize: '0.8rem',
                          marginTop: '4px',
                        }}>{formErrors.time}</span>
                      )}
                    </div>
                  </div>

                  <div style={{ marginTop: '15px' }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#374151',
                    }}>
                      <input
                        type="checkbox"
                        checked={newAppointment.isEmergency}
                        onChange={(e) => setNewAppointment(prev => ({ ...prev, isEmergency: e.target.checked }))}
                        style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                      />
                      <AlertTriangle size={16} color={newAppointment.isEmergency ? '#ef4444' : '#64748b'} />
                      Mark as Emergency Appointment
                    </label>
                  </div>
                </div>

                {/* Medical Information */}
                <div className="form-section">
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <Heart size={18} />
                    Medical Information
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '6px',
                      }}>Symptoms / Reason for Visit *</label>
                      <textarea
                        value={newAppointment.symptoms}
                        onChange={(e) => setNewAppointment(prev => ({ ...prev, symptoms: e.target.value }))}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: `2px solid ${formErrors.symptoms ? '#ef4444' : 'rgba(148, 163, 184, 0.2)'}`,
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          outline: 'none',
                          background: 'rgba(255, 255, 255, 0.8)',
                          resize: 'vertical',
                          minHeight: '80px',
                          fontFamily: 'inherit',
                        }}
                        placeholder="Describe the symptoms or reason for the appointment..."
                      />
                      {formErrors.symptoms && (
                        <span style={{
                          color: '#ef4444',
                          fontSize: '0.8rem',
                          marginTop: '4px',
                        }}>{formErrors.symptoms}</span>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '6px',
                      }}>Additional Notes</label>
                      <textarea
                        value={newAppointment.notes}
                        onChange={(e) => setNewAppointment(prev => ({ ...prev, notes: e.target.value }))}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '2px solid rgba(148, 163, 184, 0.2)',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          outline: 'none',
                          background: 'rgba(255, 255, 255, 0.8)',
                          resize: 'vertical',
                          minHeight: '60px',
                          fontFamily: 'inherit',
                        }}
                        placeholder="Any additional notes or special requirements..."
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'flex-end',
                  paddingTop: '15px',
                  borderTop: '2px solid rgba(148, 163, 184, 0.1)',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => {
                      setShowNewAppointmentModal(false);
                      setNewAppointment({
                        patientName: '',
                        doctor: '',
                        department: '',
                        date: '',
                        time: '',
                        phone: '',
                        email: '',
                        age: '',
                        symptoms: '',
                        insurance: '',
                        notes: '',
                        isEmergency: false
                      });
                      setFormErrors({});
                    }}
                    style={{
                      background: 'white',
                      color: '#64748b',
                      border: '2px solid rgba(148, 163, 184, 0.2)',
                      padding: '10px 20px',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      minHeight: '44px'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateAppointment}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      padding: '10px 20px',
                      borderRadius: '10px',
                      border: 'none',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
                      minHeight: '44px'
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

        {/* View Appointment Modal */}
        {showModal && selectedAppointment && (
          <div className="modal-overlay">
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: 'calc(100vh - 30px)',
              overflow: 'auto',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
              animation: 'modalSlideIn 0.3s ease-out'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '25px',
                paddingBottom: '15px',
                borderBottom: '2px solid #f1f5f9'
              }}>
                <h2 style={{
                  color: '#1e293b',
                  fontSize: '24px',
                  fontWeight: '700',
                  margin: 0
                }}>
                  Appointment Details
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                    color: '#64748b',
                    padding: '4px',
                    minHeight: '44px',
                    minWidth: '44px'
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              <div style={{ display: 'grid', gap: '20px' }}>
                {/* Patient Information */}
                <div style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  padding: '20px',
                  borderRadius: '12px'
                }}>
                  <h3 style={{
                    color: '#1e293b',
                    fontSize: '16px',
                    fontWeight: '600',
                    margin: '0 0 12px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                   <User size={18} color="#3b82f6" />
                    Patient Information
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                    <div>
                      <label style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>Name</label>
                      <p style={{ color: '#1e293b', fontSize: '14px', margin: '4px 0 0 0', fontWeight: '500' }}>
                        {selectedAppointment.patientName}
                      </p>
                    </div>
                    <div>
                      <label style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>Age</label>
                      <p style={{ color: '#1e293b', fontSize: '14px', margin: '4px 0 0 0', fontWeight: '500' }}>
                        {selectedAppointment.age} years
                      </p>
                    </div>
                    <div>
                      <label style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>Phone</label>
                      <p style={{ color: '#1e293b', fontSize: '14px', margin: '4px 0 0 0', fontWeight: '500' }}>
                        {selectedAppointment.phone}
                      </p>
                    </div>
                    <div>
                      <label style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>Email</label>
                      <p style={{ color: '#1e293b', fontSize: '14px', margin: '4px 0 0 0', fontWeight: '500' }}>
                        {selectedAppointment.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Appointment Information */}
                <div style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  padding: '20px',
                  borderRadius: '12px'
                }}>
                  <h3 style={{
                    color: '#1e293b',
                    fontSize: '16px',
                    fontWeight: '600',
                    margin: '0 0 12px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Calendar size={18} color="#3b82f6" />
                    Appointment Information
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                    <div>
                      <label style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>Doctor</label>
                      <p style={{ color: '#1e293b', fontSize: '14px', margin: '4px 0 0 0', fontWeight: '500' }}>
                        {selectedAppointment.doctor}
                      </p>
                    </div>
                    <div>
                      <label style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>Department</label>
                      <p style={{ color: '#1e293b', fontSize: '14px', margin: '4px 0 0 0', fontWeight: '500' }}>
                        {selectedAppointment.department}
                      </p>
                    </div>
                    <div>
                      <label style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>Date</label>
                      <p style={{ color: '#1e293b', fontSize: '14px', margin: '4px 0 0 0', fontWeight: '500' }}>
                        {selectedAppointment.date}
                      </p>
                    </div>
                    <div>
                      <label style={{ color: '#64748b', fontSize: '13px', fontWeight: '600' }}>Time</label>
                      <p style={{ color: '#1e293b', fontSize: '14px', margin: '4px 0 0 0', fontWeight: '500' }}>
                        {selectedAppointment.time}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Symptoms */}
                <div style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  padding: '20px',
                  borderRadius: '12px'
                }}>
                  <h3 style={{
                    color: '#1e293b',
                    fontSize: '16px',
                    fontWeight: '600',
                    margin: '0 0 12px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Heart size={18} color="#3b82f6" />
                    Symptoms / Reason for Visit
                  </h3>
                  <p style={{
                    color: '#1e293b',
                    fontSize: '14px',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    {selectedAppointment.symptoms}
                  </p>
                </div>

                {/* Status Update */}
                <div style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  padding: '20px',
                  borderRadius: '12px'
                }}>
                  <h3 style={{
                    color: '#1e293b',
                    fontSize: '16px',
                    fontWeight: '600',
                    margin: '0 0 12px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Activity size={18} color="#3b82f6" />
                    Update Status
                  </h3>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['Confirmed', 'Pending', 'Completed', 'Cancelled'].map(status => (
                      <button
                        key={status}
                        onClick={() => {
                          updateAppointmentStatus(selectedAppointment.id, status);
                          setSelectedAppointment({ ...selectedAppointment, status });
                        }}
                        style={{
                          background: selectedAppointment.status === status 
                            ? getStatusColor(status)
                            : 'white',
                          color: selectedAppointment.status === status ? 'white' : '#64748b',
                          border: selectedAppointment.status === status ? 'none' : '2px solid #e2e8f0',
                          padding: '8px 16px',
                          borderRadius: '16px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          minHeight: '40px'
                        }}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Appointment;