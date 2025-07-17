import React, { useState } from 'react';

const ReceptionBilling = () => {
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [billDate, setBillDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState([
    { name: '', quantity: 1, rate: 0 }
  ]);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [notes, setNotes] = useState('');
  const [savedBills, setSavedBills] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = field === 'name' ? value : parseFloat(value) || 0;
    setItems(updatedItems);
  };

  const addItem = () => setItems([...items, { name: '', quantity: 1, rate: 0 }]);

  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const discountAmount = (discount / 100) * subtotal;
  const taxAmount = 0.1 * (subtotal - discountAmount);
  const total = subtotal - discountAmount + taxAmount;

  const resetForm = () => {
    setPatientId('');
    setPatientName('');
    setBillDate(new Date().toISOString().split('T')[0]);
    setItems([{ name: '', quantity: 1, rate: 0 }]);
    setDiscount(0);
    setPaymentMethod('Cash');
    setNotes('');
  };

  const saveBill = () => {
    const bill = {
      id: Date.now(),
      patientId,
      patientName,
      billDate,
      items: items.filter(item => item.name.trim() !== ''),
      discount,
      paymentMethod,
      notes,
      subtotal,
      discountAmount,
      taxAmount,
      total,
      timestamp: new Date().toLocaleString()
    };
    setSavedBills([...savedBills, bill]);
    resetForm();
    alert('Bill saved successfully!');
  };

  const predefinedServices = [
    { name: 'Consultation', rate: 500 },
    { name: 'Blood Test', rate: 300 },
    { name: 'X-Ray', rate: 800 },
    { name: 'ECG', rate: 200 },
    { name: 'Ultrasound', rate: 1200 },
    { name: 'Medicine', rate: 150 }
  ];

  const quickAddService = (service) => {
    const newItem = { name: service.name, quantity: 1, rate: service.rate };
    setItems([...items, newItem]);
  };

  return (
    <div>
      {/* <div style={styles.header}>
        <h1 style={styles.title}>🏥 Reception Billing System</h1>
        <div style={styles.headerButtons}>
          <button 
            onClick={() => setShowHistory(!showHistory)} 
            style={styles.historyBtn}
          >
            📊 {showHistory ? 'Hide' : 'Show'} History
          </button>
          <button onClick={resetForm} style={styles.resetBtn}>
            🔄 Reset
          </button>
        </div>
      </div> */}
      

      {showHistory && (
        <div style={styles.historySection}>
          <h3 style={styles.sectionTitle}>📋 Billing History</h3>
          {savedBills.length === 0 ? (
            <p style={styles.emptyHistory}>No bills saved yet.</p>
          ) : (
            <div style={styles.historyList}>
              {savedBills.map((bill) => (
                <div key={bill.id} style={styles.historyItem}>
                  <div style={styles.historyHeader}>
                    <strong>{bill.patientName || 'Unknown Patient'}</strong>
                    <span style={styles.historyDate}>{bill.timestamp}</span>
                  </div>
                  <div style={styles.historyDetails}>
                    <span>ID: {bill.patientId}</span>
                    <span>Total: ${bill.total.toFixed(2)}</span>
                    <span>Method: {bill.paymentMethod}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={styles.formGrid}>
        <div style={styles.leftColumn}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>👤 Patient Information</h3>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Patient ID:</label>
              <input 
                type="text" 
                value={patientId} 
                onChange={(e) => setPatientId(e.target.value)} 
                style={styles.input}
                placeholder="Enter patient ID"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Patient Name:</label>
              <input 
                type="text" 
                value={patientName} 
                onChange={(e) => setPatientName(e.target.value)} 
                style={styles.input}
                placeholder="Enter patient name"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Bill Date:</label>
              <input 
                type="date" 
                value={billDate} 
                onChange={(e) => setBillDate(e.target.value)} 
                style={styles.input} 
              />
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>🛍️ Quick Add Services</h3>
            <div style={styles.quickServices}>
              {predefinedServices.map((service, index) => (
                <button
                  key={index}
                  onClick={() => quickAddService(service)}
                  style={styles.quickServiceBtn}
                >
                  {service.name} (${service.rate})
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.rightColumn}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>💊 Services & Items</h3>
            <div style={styles.itemsContainer}>
              {items.map((item, index) => (
                <div key={index} style={styles.itemRow}>
                  <input
                    type="text"
                    placeholder="Service/Item name"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    style={styles.itemInput}
                  />
                  <input
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    style={styles.qtyInput}
                    min="1"
                  />
                  <input
                    type="number"
                    placeholder="Rate"
                    value={item.rate}
                    onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                    style={styles.rateInput}
                    min="0"
                    step="0.01"
                  />
                  <span style={styles.amount}>${(item.quantity * item.rate).toFixed(2)}</span>
                  <button 
                    onClick={() => removeItem(index)} 
                    style={styles.removeBtn}
                    disabled={items.length === 1}
                  >
                  ❌
                  </button>
                </div>
              ))}
              <button onClick={addItem} style={styles.addBtn}>
                ➕ Add New Item
              </button>
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>💳 Payment Details</h3>
            <div style={styles.paymentGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Discount (%):</label>
                <input 
                  type="number" 
                  value={discount} 
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)} 
                  style={styles.input}
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Payment Method:</label>
                <select 
                  value={paymentMethod} 
                  onChange={(e) => setPaymentMethod(e.target.value)} 
                  style={styles.select}
                >
                  <option value="Cash">💵 Cash</option>
                  <option value="Card">💳 Card</option>
                  <option value="UPI">📱 UPI</option>
                  <option value="Insurance">🏥 Insurance</option>
                </select>
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Notes:</label>
              <textarea 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)} 
                style={styles.textarea}
                placeholder="Additional notes or remarks..."
                rows="3"
              />
            </div>
          </div>
        </div>
      </div>

      <div style={styles.summaryBox}>
        <h3 style={styles.summaryTitle}>💰 Bill Summary</h3>
        <div style={styles.summaryGrid}>
          <div style={styles.summaryLeft}>
            <div style={styles.summaryRow}>
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Discount ({discount}%):</span>
              <span style={styles.discount}>-${discountAmount.toFixed(2)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Tax (10%):</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <div style={styles.totalRow}>
              <span>Total Amount:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div style={styles.summaryRight}>
            <button 
              onClick={saveBill} 
              style={styles.saveBtn}
              disabled={!patientId || !patientName || items.every(item => !item.name.trim())}
            >
              💾 Save Bill
            </button>
            <button style={styles.payBtn}>
              🎯 Process Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #4a90e2 100%)',
    minHeight: '100vh',
    color: 'black'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)'
  },
  title: {
    margin: 0,
    fontSize: '2.5rem',
    background: 'linear-gradient(45deg, #1e3c72, #2a5298, #4a90e2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold'
  },
  headerButtons: {
    display: 'flex',
    gap: '10px'
  },
  historyBtn: {
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    
  },
  resetBtn: {
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    
  },
  historySection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '20px',
    borderRadius: '15px',
    marginBottom: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)'
  },
  historyList: {
    maxHeight: '300px',
    overflowY: 'auto'
  },
  historyItem: {
    padding: '15px',
    backgroundColor: '#f0f8ff',
    borderRadius: '10px',
    marginBottom: '10px',
    border: '1px solid #e3f2fd'
  },
  historyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '5px'
  },
  historyDate: {
    fontSize: '0.9rem',
    color: '#666'
  },
  historyDetails: {
    display: 'flex',
    gap: '20px',
    fontSize: '0.9rem',
    color: '#666'
  },
  emptyHistory: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '20px'
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  sectionTitle: {
    margin: '0 0 20px 0',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: 'black',
    borderBottom: '2px solid black',
    paddingBottom: '10px'
  },
  inputGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: 'black'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '2px solid #bbdefb',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    padding: '12px',
    border: '2px solid #bbdefb',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    backgroundColor: 'white'
  },
  textarea: {
    width: '100%',
    padding: '12px',
    border: '2px solid #bbdefb',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    resize: 'vertical',
    fontFamily: 'inherit'
  },
  quickServices: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '10px'
  },
  quickServiceBtn: {
    padding: '10px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
  itemsContainer: {
    maxHeight: '400px',
    overflowY: 'auto'
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#f0f8ff',
    borderRadius: '8px',
    border: '1px solid #e3f2fd'
  },
  itemInput: {
    flex: 2,
    padding: '8px',
    border: '1px solid #bbdefb',
    borderRadius: '4px',
    fontSize: '14px'
  },
  qtyInput: {
    flex: 0.5,
    padding: '8px',
    border: '1px solid #bbdefb',
    borderRadius: '4px',
    fontSize: '14px'
  },
  rateInput: {
    flex: 1,
    padding: '8px',
    border: '1px solid #bbdefb',
    borderRadius: '4px',
    fontSize: '14px'
  },
  amount: {
    flex: 1,
    fontWeight: 'bold',
    color: 'black',
    fontSize: '16px'
  },
  removeBtn: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '70%',
    width: '45px',
    height: '35px',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'all 0.3s ease'
  },
  addBtn: {
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    
  },
  paymentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px'
  },
  summaryBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255, 255, 255, 0.3)'
  },
  summaryTitle: {
    margin: '0 0 20px 0',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center'
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '30px',
    alignItems: 'center'
  },
  summaryLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    fontSize: '16px',
    borderBottom: '1px solid #e3f2fd'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 0',
    fontSize: '20px',
    fontWeight: 'bold',
    borderTop: '2px solid #2196F3',
    borderBottom: 'none',
    color: 'black'
  },
  discount: {
    color: '#f44336',
    fontWeight: 'bold'
  },
  summaryRight: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  saveBtn: {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '15px 25px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
   
  },
  payBtn: {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '15px 25px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    
  }
};

export default ReceptionBilling;