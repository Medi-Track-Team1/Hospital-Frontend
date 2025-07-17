import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, User, Phone, Mail, Search, Filter, Plus, 
  Edit3, Trash2, CheckCircle, XCircle, AlertCircle, Eye,
  Users, Activity, TrendingUp, Bell, Settings, LogOut,
  ChevronDown, ChevronRight, MapPin, Stethoscope, Heart,
  Star, Award, Shield, Zap
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
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeView, setActiveView] = useState('today');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || appointment.status === filterStatus;
    const matchesDate = !filterDate || appointment.date === filterDate;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      /

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '30px' }}>
        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '25px',
          marginBottom: '40px'
        }}>
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
                padding: '30px',
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
                    fontSize: '16px',
                    fontWeight: '600',
                    margin: '0 0 10px 0'
                  }}>
                    {stat.title}
                  </h3>
                  <div style={{
                    fontSize: '36px',
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
                  padding: '20px',
                  borderRadius: '50%'
                }}>
                  <stat.icon size={32} style={{ color: stat.color.split(',')[0].split('(')[1] }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
          marginBottom: '30px',
          border: '1px solid rgba(59, 130, 246, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flex: 1 }}>
              <div style={{ position: 'relative', minWidth: '300px' }}>
                <Search 
                  size={20} 
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
                  placeholder="Search patients, doctors, or departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '15px 15px 15px 50px',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    background: '#f8fafc'
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
                  padding: '15px 20px',
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  fontSize: '16px',
                  background: 'white',
                  cursor: 'pointer',
                  minWidth: '150px'
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
                  padding: '15px 20px',
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  fontSize: '16px',
                  background: 'white',
                  cursor: 'pointer'
                }}
              />
            </div>

            <button
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
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
              <Plus size={20} />
              New Appointment
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
            padding: '30px',
            borderBottom: '1px solid #e2e8f0',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
          }}>
            <h2 style={{
              color: '#1e293b',
              fontSize: '24px',
              fontWeight: '700',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <Users size={28} color="#3b82f6" />
              Appointment Management
              <span style={{
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: 'white',
                padding: '5px 15px',
                borderRadius: '20px',
                fontSize: '14px',
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
                padding: '60px 30px',
                color: '#64748b'
              }}>
                <Users size={48} style={{ marginBottom: '20px', opacity: 0.5 }} />
                <h3 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 10px 0' }}>
                  No appointments found
                </h3>
                <p style={{ margin: 0 }}>
                  Try adjusting your search criteria or add a new appointment.
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1px', background: '#e2e8f0' }}>
                {filteredAppointments.map((appointment, index) => (
                  <div
                    key={appointment.id}
                    style={{
                      background: 'white',
                      padding: '25px 30px',
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      alignItems: 'center',
                      gap: '20px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
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
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '30px' }}>
                      {/* Patient Info */}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                          <div style={{
                            background: appointment.isEmergency 
                              ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                              : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                            padding: '12px',
                            borderRadius: '50%',
                            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                          }}>
                            <User size={20} color="white" />
                          </div>
                          <div>
                            <h3 style={{
                              color: '#1e293b',
                              fontSize: '18px',
                              fontWeight: '600',
                              margin: 0
                            }}>
                              {appointment.patientName}
                            </h3>
                            <p style={{
                              color: '#64748b',
                              fontSize: '14px',
                              margin: '2px 0 0 0'
                            }}>
                              Age: {appointment.age} • {appointment.insurance}
                            </p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginLeft: '47px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Phone size={14} color="#64748b" />
                            <span style={{ color: '#64748b', fontSize: '14px' }}>
                              {appointment.phone}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Mail size={14} color="#64748b" />
                            <span style={{ color: '#64748b', fontSize: '14px' }}>
                              {appointment.email}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Appointment Details */}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                          <div style={{
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            padding: '12px',
                            borderRadius: '50%',
                            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                          }}>
                            <Stethoscope size={20} color="white" />
                          </div>
                          <div>
                            <h4 style={{
                              color: '#1e293b',
                              fontSize: '16px',
                              fontWeight: '600',
                              margin: 0
                            }}>
                              {appointment.doctor}
                            </h4>
                            <p style={{
                              color: '#64748b',
                              fontSize: '14px',
                              margin: '2px 0 0 0'
                            }}>
                              {appointment.department}
                            </p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginLeft: '47px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Calendar size={14} color="#64748b" />
                            <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '500' }}>
                              {appointment.date}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Clock size={14} color="#64748b" />
                            <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '500' }}>
                              {appointment.time}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Symptoms */}
                      <div>
                        <h4 style={{
                          color: '#1e293b',
                          fontSize: '14px',
                          fontWeight: '600',
                          margin: '0 0 8px 0'
                        }}>
                          Symptoms / Reason
                        </h4>
                        <p style={{
                          color: '#64748b',
                          fontSize: '14px',
                          margin: 0,
                          lineHeight: '1.5',
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{
                        background: getStatusColor(appointment.status),
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                        minWidth: '100px',
                        justifyContent: 'center'
                      }}>
                        {getStatusIcon(appointment.status)}
                        {appointment.status}
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
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
                            padding: '10px',
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
                          <Eye size={16} />
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
                            padding: '10px',
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
                          <Edit3 size={16} />
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
                            padding: '10px',
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
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedAppointment && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(5px)'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '40px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
            animation: 'modalSlideIn 0.3s ease-out'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px',
              paddingBottom: '20px',
              borderBottom: '2px solid #f1f5f9'
            }}>
              <h2 style={{
                color: '#1e293b',
                fontSize: '28px',
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
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#64748b',
                  padding: '5px'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'grid', gap: '25px' }}>
              {/* Patient Information */}
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                padding: '25px',
                borderRadius: '15px'
              }}>
                <h3 style={{
                  color: '#1e293b',
                  fontSize: '18px',
                  fontWeight: '600',
                  margin: '0 0 15px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <User size={20} color="#3b82f6" />
                  Patient Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Name</label>
                    <p style={{ color: '#1e293b', fontSize: '16px', margin: '5px 0 0 0', fontWeight: '500' }}>
                      {selectedAppointment.patientName}
                    </p>
                  </div>
                  <div>
                    <label style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Age</label>
                    <p style={{ color: '#1e293b', fontSize: '16px', margin: '5px 0 0 0', fontWeight: '500' }}>
                      {selectedAppointment.age} years
                    </p>
                  </div>
                  <div>
                    <label style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Phone</label>
                    <p style={{ color: '#1e293b', fontSize: '16px', margin: '5px 0 0 0', fontWeight: '500' }}>
                      {selectedAppointment.phone}
                    </p>
                  </div>
                  <div>
                    <label style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Email</label>
                    <p style={{ color: '#1e293b', fontSize: '16px', margin: '5px 0 0 0', fontWeight: '500' }}>
                      {selectedAppointment.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Appointment Information */}
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                padding: '25px',
                borderRadius: '15px'
              }}>
                <h3 style={{
                  color: '#1e293b',
                  fontSize: '18px',
                  fontWeight: '600',
                  margin: '0 0 15px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <Calendar size={20} color="#3b82f6" />
                  Appointment Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Doctor</label>
                    <p style={{ color: '#1e293b', fontSize: '16px', margin: '5px 0 0 0', fontWeight: '500' }}>
                      {selectedAppointment.doctor}
                    </p>
                  </div>
                  <div>
                    <label style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Department</label>
                    <p style={{ color: '#1e293b', fontSize: '16px', margin: '5px 0 0 0', fontWeight: '500' }}>
                      {selectedAppointment.department}
                    </p>
                  </div>
                  <div>
                    <label style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Date</label>
                    <p style={{ color: '#1e293b', fontSize: '16px', margin: '5px 0 0 0', fontWeight: '500' }}>
                      {selectedAppointment.date}
                    </p>
                  </div>
                  <div>
                    <label style={{ color: '#64748b', fontSize: '14px', fontWeight: '600' }}>Time</label>
                    <p style={{ color: '#1e293b', fontSize: '16px', margin: '5px 0 0 0', fontWeight: '500' }}>
                      {selectedAppointment.time}
                    </p>
                  </div>
                </div>
              </div>

              {/* Symptoms */}
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                padding: '25px',
                borderRadius: '15px'
              }}>
                <h3 style={{
                  color: '#1e293b',
                  fontSize: '18px',
                  fontWeight: '600',
                  margin: '0 0 15px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <Heart size={20} color="#3b82f6" />
                  Symptoms / Reason for Visit
                </h3>
                <p style={{
                  color: '#1e293b',
                  fontSize: '16px',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  {selectedAppointment.symptoms}
                </p>
              </div>

              {/* Status Update */}
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                padding: '25px',
                borderRadius: '15px'
              }}>
                <h3 style={{
                  color: '#1e293b',
                  fontSize: '18px',
                  fontWeight: '600',
                  margin: '0 0 15px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <Activity size={20} color="#3b82f6" />
                  Update Status
                </h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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
                        padding: '10px 20px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
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
        
        @media (max-width: 1200px) {
          .grid-appointments {
            grid-template-columns: 1fr !important;
          }
        }
        
        @media (max-width: 768px) {
          .controls {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Appointment;