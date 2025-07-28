import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Calendar, TrendingUp, Users, DollarSign, FileText, ChevronDown, X, User, Pill } from 'lucide-react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedBillDetails, setSelectedBillDetails] = useState(null);

  const dummyBills = [
    {
      id: 1,
      patientId: 'P001',
      patientName: 'John Smith',
      doctorName: 'Dr. Sarah Williams',
      billDate: '2024-01-15',
      items: [
        { name: 'Consultation', quantity: 1, rate: 500, type: 'service' },
        { name: 'Paracetamol 500mg', quantity: 2, rate: 150, type: 'medicine' }
      ],
      total: 800,
      status: 'paid'
    },
    {
      id: 2,
      patientId: 'P002',
      patientName: 'Sarah Johnson',
      doctorName: 'Dr. Michael Chen',
      billDate: '2024-01-16',
      items: [
        { name: 'X-Ray', quantity: 1, rate: 800, type: 'service' }
      ],
      total: 800,
      status: 'paid'
    },
    {
      id: 3,
      patientId: 'P003',
      patientName: 'Michael Brown',
      doctorName: 'Dr. Emily Rodriguez',
      billDate: '2024-01-17',
      items: [
        { name: 'Blood Test', quantity: 1, rate: 300, type: 'service' },
        { name: 'Consultation', quantity: 1, rate: 500, type: 'service' },
        { name: 'Amoxicillin 250mg', quantity: 1, rate: 200, type: 'medicine' }
      ],
      total: 1000,
      status: 'pending'
    },
    {
      id: 4,
      patientId: 'P004',
      patientName: 'Emily Davis',
      doctorName: 'Dr. James Thompson',
      billDate: '2024-01-18',
      items: [
        { name: 'Surgery', quantity: 1, rate: 5000, type: 'service' },
        { name: 'Ibuprofen 400mg', quantity: 3, rate: 150, type: 'medicine' }
      ],
      total: 5450,
      status: 'paid'
    },
    {
      id: 5,
      patientId: 'P005',
      patientName: 'David Wilson',
      doctorName: 'Dr. Lisa Anderson',
      billDate: '2024-01-19',
      items: [
        { name: 'Consultation', quantity: 1, rate: 500, type: 'service' },
        { name: 'ECG', quantity: 1, rate: 400, type: 'service' }
      ],
      total: 900,
      status: 'overdue'
    }
  ];

  const filteredAndSortedBills = useMemo(() => {
    let filtered = dummyBills.filter(bill => {
      const matchesSearch = bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bill.patientId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDateRange = (!dateRange.start || bill.billDate >= dateRange.start) &&
                              (!dateRange.end || bill.billDate <= dateRange.end);
      
      const matchesPatient = !selectedPatient || bill.patientId === selectedPatient;
      
      return matchesSearch && matchesDateRange && matchesPatient;
    });

    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.billDate);
          bValue = new Date(b.billDate);
          break;
        case 'amount':
          aValue = a.total;
          bValue = b.total;
          break;
        case 'patient':
          aValue = a.patientName.toLowerCase();
          bValue = b.patientName.toLowerCase();
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, sortBy, sortOrder, dateRange, selectedPatient]);

  const totalRevenue = filteredAndSortedBills.reduce((sum, bill) => sum + bill.total, 0);
  const paidBills = filteredAndSortedBills.filter(bill => bill.status === 'paid');
  const pendingBills = filteredAndSortedBills.filter(bill => bill.status === 'pending');
  const overdueBills = filteredAndSortedBills.filter(bill => bill.status === 'overdue');

  const exportData = () => {
    const csvContent = [
      ['Patient Name', 'Patient ID', 'Date', 'Total', 'Status'],
      ...filteredAndSortedBills.map(bill => [
        bill.patientName,
        bill.patientId,
        bill.billDate,
        bill.total,
        bill.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'billing-history.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'overdue': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDateRange({ start: '', end: '' });
    setSelectedPatient('');
    setSortBy('date');
    setSortOrder('desc');
  };

  const handleBillClick = (bill) => {
    setSelectedBillDetails(bill);
  };

  const closeModal = () => {
    setSelectedBillDetails(null);
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      {/* Analytics Cards */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {[
          { title: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, color: '#10B981', bg: '#ECFDF5' },
          { title: 'Total Bills', value: filteredAndSortedBills.length, icon: FileText, color: '#3B82F6', bg: '#EFF6FF' },
          { title: 'Paid Bills', value: paidBills.length, icon: TrendingUp, color: '#10B981', bg: '#ECFDF5' },
          { title: 'Pending/Overdue', value: pendingBills.length + overdueBills.length, icon: Users, color: '#F59E0B', bg: '#FFFBEB' }
        ].map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              border: '1px solid #e5e7eb',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  backgroundColor: stat.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <IconComponent size={24} color={stat.color} />
                </div>
                <div>
                  <p style={{
                    fontSize: '14px',
                    color: '#6B7280',
                    margin: '0 0 4px 0',
                    fontWeight: '500'
                  }}>
                    {stat.title}
                  </p>
                  <p style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#1F2937',
                    margin: '0'
                  }}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters and Search */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        border: '1px solid #e5e7eb',
        marginBottom: '30px'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
            <Search size={20} style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6B7280'
            }} />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 40px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="patient">Sort by Patient</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              padding: '12px 16px',
              backgroundColor: showFilters ? '#3B82F6' : '#f3f4f6',
              color: showFilters ? 'white' : '#374151',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            <Filter size={16} />
            Filters
            <ChevronDown size={16} style={{
              transform: showFilters ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }} />
          </button>

          {/* Export */}
          <button
            onClick={exportData}
            style={{
              padding: '12px 16px',
              backgroundColor: '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10B981'}
          >
            <Download size={16} />
            Export
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div style={{
            borderTop: '1px solid #e5e7eb',
            paddingTop: '16px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '4px'
              }}>Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '4px'
              }}>End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '4px'
              }}>Patient</label>
              <select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">All Patients</option>
                {Array.from(new Set(dummyBills.map(bill => bill.patientId))).map(patientId => {
                  const patient = dummyBills.find(bill => bill.patientId === patientId);
                  return (
                    <option key={patientId} value={patientId}>
                      {patient?.patientName} ({patientId})
                    </option>
                  );
                })}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'end' }}>
              <button
                onClick={clearFilters}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              >
                <X size={16} />
                Clear
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bills List */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {filteredAndSortedBills.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            padding: '60px 20px',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <FileText size={48} style={{ color: '#9CA3AF', marginBottom: '16px' }} />
            <h3 style={{ color: '#6B7280', fontSize: '18px', margin: '0 0 8px 0' }}>
              No bills found
            </h3>
            <p style={{ color: '#9CA3AF', fontSize: '14px', margin: '0' }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gap: '20px'
          }}>
            {filteredAndSortedBills.map((bill) => (
              <div key={bill.id} style={{
                backgroundColor: 'white',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                border: '1px solid #e5e7eb',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer'
              }}
              onClick={() => handleBillClick(bill)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#1F2937',
                      margin: '0 0 8px 0'
                    }}>
                      {bill.patientName}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#6B7280',
                      margin: '0 0 4px 0'
                    }}>
                      Patient ID: <span style={{ fontWeight: '500' }}>{bill.patientId}</span>
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: '#6B7280',
                      margin: '0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Calendar size={14} />
                      {new Date(bill.billDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#1F2937',
                      margin: '0 0 8px 0'
                    }}>
                      ₹{bill.total.toLocaleString()}
                    </p>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      backgroundColor: `${getStatusColor(bill.status)}20`,
                      color: getStatusColor(bill.status)
                    }}>
                      {bill.status}
                    </div>
                  </div>
                </div>

                <div style={{
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: '16px'
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#374151',
                    margin: '0 0 12px 0'
                  }}>
                    Bill Items
                  </h4>
                  <div style={{
                    display: 'grid',
                    gap: '8px'
                  }}>
                    {bill.items.map((item, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 12px',
                        backgroundColor: '#f9fafb',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <div>
                          <span style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#374151'
                          }}>
                            {item.name}
                          </span>
                          <span style={{
                            fontSize: '12px',
                            color: '#6B7280',
                            marginLeft: '8px'
                          }}>
                            Qty: {item.quantity}
                          </span>
                        </div>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1F2937'
                        }}>
                          ₹{(item.quantity * item.rate).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Patient Details Modal */}
      {selectedBillDetails && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}
        onClick={closeModal}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '80vh',
            overflow: 'auto',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }}
          onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={{
              padding: '24px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#1F2937',
                margin: '0'
              }}>
                Patient Details
              </h2>
              <button
                onClick={closeModal}
                style={{
                  padding: '8px',
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={20} color="#6B7280" />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '24px' }}>
              {/* Patient Info */}
              <div style={{
                backgroundColor: '#f8fafc',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  <User size={24} color="#3B82F6" />
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#1F2937',
                    margin: '0'
                  }}>
                    {selectedBillDetails.patientName}
                  </h3>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '12px'
                }}>
                  <div>
                    <p style={{
                      fontSize: '12px',
                      color: '#6B7280',
                      margin: '0 0 4px 0',
                      textTransform: 'uppercase',
                      fontWeight: '600'
                    }}>Patient ID</p>
                    <p style={{
                      fontSize: '16px',
                      color: '#374151',
                      margin: '0',
                      fontWeight: '500'
                    }}>{selectedBillDetails.patientId}</p>
                  </div>
                  <div>
                    <p style={{
                      fontSize: '12px',
                      color: '#6B7280',
                      margin: '0 0 4px 0',
                      textTransform: 'uppercase',
                      fontWeight: '600'
                    }}>Doctor</p>
                    <p style={{
                      fontSize: '16px',
                      color: '#374151',
                      margin: '0',
                      fontWeight: '500'
                    }}>{selectedBillDetails.doctorName}</p>
                  </div>
                  <div>
                    <p style={{
                      fontSize: '12px',
                      color: '#6B7280',
                      margin: '0 0 4px 0',
                      textTransform: 'uppercase',
                      fontWeight: '600'
                    }}>Date</p>
                    <p style={{
                      fontSize: '16px',
                      color: '#374151',
                      margin: '0',
                      fontWeight: '500'
                    }}>{new Date(selectedBillDetails.billDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                  <div>
                    <p style={{
                      fontSize: '12px',
                      color: '#6B7280',
                      margin: '0 0 4px 0',
                      textTransform: 'uppercase',
                      fontWeight: '600'
                    }}>Total Amount</p>
                    <p style={{
                      fontSize: '20px',
                      color: '#1F2937',
                      margin: '0',
                      fontWeight: '700'
                    }}>₹{selectedBillDetails.total.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Medicines Section */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px'
                }}>
                  <Pill size={20} color="#10B981" />
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1F2937',
                    margin: '0'
                  }}>
                    Medicines Purchased
                  </h4>
                </div>
                <div style={{
                  display: 'grid',
                  gap: '8px'
                }}>
                  {selectedBillDetails.items.filter(item => item.type === 'medicine').length > 0 ? (
                    selectedBillDetails.items
                      .filter(item => item.type === 'medicine')
                      .map((medicine, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px 16px',
                          backgroundColor: '#ECFDF5',
                          borderRadius: '8px',
                          border: '1px solid #A7F3D0'
                        }}>
                          <div>
                            <span style={{
                              fontSize: '16px',
                              fontWeight: '600',
                              color: '#065F46'
                            }}>
                              {medicine.name}
                            </span>
                            <span style={{
                              fontSize: '14px',
                              color: '#047857',
                              marginLeft: '12px',
                              backgroundColor: '#A7F3D0',
                              padding: '2px 8px',
                              borderRadius: '12px'
                            }}>
                              Qty: {medicine.quantity}
                            </span>
                          </div>
                          <div style={{
                            fontSize: '16px',
                            fontWeight: '700',
                            color: '#065F46'
                          }}>
                            ₹{(medicine.quantity * medicine.rate).toLocaleString()}
                          </div>
                        </div>
                      ))
                  ) : (
                    <div style={{
                      textAlign: 'center',
                      padding: '24px',
                      color: '#6B7280',
                      fontStyle: 'italic'
                    }}>
                      No medicines purchased in this visit
                    </div>
                  )}
                </div>
              </div>

              {/* All Services */}
              <div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1F2937',
                  margin: '0 0 16px 0'
                }}>
                  All Services
                </h4>
                <div style={{
                  display: 'grid',
                  gap: '8px'
                }}>
                  {selectedBillDetails.items.map((item, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 16px',
                      backgroundColor: item.type === 'medicine' ? '#ECFDF5' : '#f3f4f6',
                      borderRadius: '8px',
                      border: `1px solid ${item.type === 'medicine' ? '#A7F3D0' : '#d1d5db'}`
                    }}>
                      <div>
                        <span style={{
                          fontSize: '16px',
                          fontWeight: '500',
                          color: '#374151'
                        }}>
                          {item.name}
                        </span>
                        <span style={{
                          fontSize: '14px',
                          color: '#6B7280',
                          marginLeft: '12px',
                          backgroundColor: item.type === 'medicine' ? '#A7F3D0' : '#e5e7eb',
                          padding: '2px 8px',
                          borderRadius: '12px'
                        }}>
                          Qty: {item.quantity} | {item.type === 'medicine' ? 'Medicine' : 'Service'}
                        </span>
                      </div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#1F2937'
                      }}>
                        ₹{(item.quantity * item.rate).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;