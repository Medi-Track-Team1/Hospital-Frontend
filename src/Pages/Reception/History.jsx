import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Calendar, TrendingUp, Users, DollarSign, FileText, ChevronDown, X } from 'lucide-react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedPatient, setSelectedPatient] = useState('');

  const dummyBills = [
    {
      id: 1,
      patientId: 'P001',
      patientName: 'John Smith',
      billDate: '2024-01-15',
      items: [
        { name: 'Consultation', quantity: 1, rate: 500 },
        { name: 'Medicine', quantity: 2, rate: 150 }
      ],
      total: 800,
      status: 'paid'
    },
    {
      id: 2,
      patientId: 'P002',
      patientName: 'Sarah Johnson',
      billDate: '2024-01-16',
      items: [
        { name: 'X-Ray', quantity: 1, rate: 800 }
      ],
      total: 800,
      status: 'paid'
    },
    {
      id: 3,
      patientId: 'P003',
      patientName: 'Michael Brown',
      billDate: '2024-01-17',
      items: [
        { name: 'Blood Test', quantity: 1, rate: 300 },
        { name: 'Consultation', quantity: 1, rate: 500 },
        { name: 'Medicine', quantity: 1, rate: 200 }
      ],
      total: 1000,
      status: 'pending'
    },
    {
      id: 4,
      patientId: 'P004',
      patientName: 'Emily Davis',
      billDate: '2024-01-18',
      items: [
        { name: 'Surgery', quantity: 1, rate: 5000 },
        { name: 'Medicine', quantity: 3, rate: 150 }
      ],
      total: 5450,
      status: 'paid'
    },
    {
      id: 5,
      patientId: 'P005',
      patientName: 'David Wilson',
      billDate: '2024-01-19',
      items: [
        { name: 'Consultation', quantity: 1, rate: 500 },
        { name: 'ECG', quantity: 1, rate: 400 }
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

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      {/* Header */}
      {/* <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '30px',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            margin: '0 0 10px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <FileText size={32} />
            Billing History Dashboard
          </h1>
          <p style={{
            fontSize: '16px',
            opacity: '0.9',
            margin: '0'
          }}>
            Comprehensive billing management and analytics
          </p>
        </div>
      </div> */}

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
    </div>
  );
}

export default App;