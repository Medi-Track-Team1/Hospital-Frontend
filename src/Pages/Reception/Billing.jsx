import React, { useState } from 'react';

const ReceptionBilling = () => {
const [patientId, setPatientId] = useState('');
const [patientName, setPatientName] = useState('');
const [billDate, setBillDate] = useState(new Date().toISOString().split('T')[0]);
const [consultancyFee, setConsultancyFee] = useState(0);
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

const itemsSubtotal = items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
const subtotal = itemsSubtotal + consultancyFee;
const discountAmount = (discount / 100) * subtotal;
const taxAmount = 0.1 * (subtotal - discountAmount);
const total = subtotal - discountAmount + taxAmount;

const resetForm = () => {
setPatientId('');
setPatientName('');
setBillDate(new Date().toISOString().split('T')[0]);
setConsultancyFee(0);
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
consultancyFee,
items: items.filter(item => item.name.trim() !== ''),
discount,
paymentMethod,
notes,
itemsSubtotal,
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
{ name: 'Blood Test', rate: 300 },
{ name: 'X-Ray', rate: 800 },
{ name: 'ECG', rate: 200 },
{ name: 'Ultrasound', rate: 1200 },
{ name: 'Medicine', rate: 150 },
{ name: 'Lab Report', rate: 250 }
];

const predefinedFees = [
{ label: 'General Consultation', fee: 500 },
{ label: 'Specialist Consultation', fee: 750 },

];

const quickAddService = (service) => {
const newItem = { name: service.name, quantity: 1, rate: service.rate };
setItems([...items, newItem]);
};

const selectFee = (feeOption) => {
setConsultancyFee(feeOption.fee);
};

return (
<div>
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

  {/* Single Unified Card */}
  <div style={styles.unifiedCard}>
    {/* Patient Information */}
    <div style={styles.cardSection}>
      <h3 style={styles.sectionTitle}>👤 Patient Information</h3>
      <div style={styles.inputGrid}>
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
    </div>

    {/* Doctor Consultancy Section */}
    <div style={styles.cardSection}>
      <h3 style={styles.sectionTitle}>👨‍⚕️ Doctor Consultancy</h3>
      <div style={styles.doctorSection}>
        <div style={styles.quickDoctors}>
          <label style={styles.label}>Quick Select Consultation Type:</label>
          <div style={styles.doctorButtons}>
            {predefinedFees.map((feeOption, index) => (
              <button
                key={index}
                onClick={() => selectFee(feeOption)}
                style={styles.quickDoctorBtn}
              >
                {feeOption.label} (${feeOption.fee})
              </button>
            ))}
          </div>
        </div>
        <div style={styles.inputGrid}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Consultancy Fee ($):</label>
            <input 
              type="number" 
              value={consultancyFee} 
              onChange={(e) => setConsultancyFee(parseFloat(e.target.value) || 0)} 
              style={styles.input}
              placeholder="Enter consultancy fee"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>
    </div>

    {/* Quick Add Services */}
    <div style={styles.cardSection}>
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

    {/* Services & Items */}
    <div style={styles.cardSection}>
      <h3 style={styles.sectionTitle}>💊 Additional Services & Items</h3>
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

    {/* Payment Details */}
    <div style={styles.cardSection}>
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

    {/* Bill Summary */}
    <div style={styles.cardSection}>
      <h3 style={styles.summaryTitle}>💰 Bill Summary</h3>
      <div style={styles.summaryGrid}>
        <div style={styles.summaryLeft}>
          <div style={styles.summaryRow}>
            <span>Doctor Consultancy:</span>
            <span>${consultancyFee.toFixed(2)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Additional Services:</span>
            <span>${itemsSubtotal.toFixed(2)}</span>
          </div>
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
            disabled={!patientId || !patientName}
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
</div>
);
};

const styles = {
container: {
fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
padding: '10px',
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
marginBottom: '20px',
padding: '15px',
backgroundColor: 'rgba(255, 255, 255, 0.95)',
borderRadius: '15px',
boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
backdropFilter: 'blur(10px)',
flexWrap: 'wrap',
gap: '10px'
},
title: {
margin: 0,
fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
background: 'linear-gradient(45deg, #1e3c72, #2a5298, #4a90e2)',
WebkitBackgroundClip: 'text',
WebkitTextFillColor: 'transparent',
fontWeight: 'bold',
textAlign: 'center',
flex: '1 1 auto'
},
headerButtons: {
display: 'flex',
gap: '10px',
flexWrap: 'wrap',
justifyContent: 'center'
},
historyBtn: {
backgroundColor: '#2563eb',
color: 'white',
border: 'none',
padding: '10px 15px',
borderRadius: '25px',
cursor: 'pointer',
fontSize: 'clamp(12px, 2vw, 14px)',
fontWeight: 'bold',
transition: 'all 0.3s ease',
whiteSpace: 'nowrap'
},
resetBtn: {
backgroundColor: '#2563eb',
color: 'white',
border: 'none',
padding: '10px 15px',
borderRadius: '25px',
cursor: 'pointer',
fontSize: 'clamp(12px, 2vw, 14px)',
fontWeight: 'bold',
transition: 'all 0.3s ease',
whiteSpace: 'nowrap'
},
historySection: {
backgroundColor: 'rgba(255, 255, 255, 0.95)',
padding: '15px',
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
marginBottom: '5px',
flexWrap: 'wrap',
gap: '5px'
},
historyDate: {
fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
color: '#666'
},
historyDetails: {
display: 'flex',
gap: '10px',
fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
color: '#666',
flexWrap: 'wrap'
},
emptyHistory: {
textAlign: 'center',
color: '#666',
fontStyle: 'italic'
},
// Main unified card container
unifiedCard: {
backgroundColor: 'rgba(255, 255, 255, 0.95)',
padding: '30px',
borderRadius: '15px',
boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
backdropFilter: 'blur(10px)',
border: '1px solid rgba(255, 255, 255, 0.2)'
},
// Individual sections within the card
cardSection: {
marginBottom: '30px',
paddingBottom: '20px',
borderBottom: '2px solid #e3f2fd'
},
sectionTitle: {
margin: '0 0 20px 0',
fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
fontWeight: 'bold',
color: 'black',
borderBottom: '2px solid black',
paddingBottom: '10px'
},
doctorSection: {
display: 'flex',
flexDirection: 'column',
gap: '20px'
},
quickDoctors: {
marginBottom: '15px'
},
doctorButtons: {
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
gap: '10px',
marginTop: '10px'
},
quickDoctorBtn: {
padding: '10px',
backgroundColor: '#10b981',
color: 'white',
border: 'none',
borderRadius: '8px',
cursor: 'pointer',
fontSize: 'clamp(10px, 2vw, 12px)',
fontWeight: 'bold',
transition: 'all 0.3s ease',
whiteSpace: 'nowrap',
overflow: 'hidden',
textOverflow: 'ellipsis'
},
inputGrid: {
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
gap: '20px'
},
inputGroup: {
marginBottom: '15px'
},
label: {
display: 'block',
marginBottom: '5px',
fontWeight: 'bold',
color: 'black',
fontSize: 'clamp(12px, 2.5vw, 14px)'
},
input: {
width: '100%',
padding: '12px',
border: '2px solid #bbdefb',
borderRadius: '8px',
fontSize: 'clamp(12px, 2.5vw, 14px)',
transition: 'all 0.3s ease',
boxSizing: 'border-box'
},
select: {
width: '100%',
padding: '12px',
border: '2px solid #bbdefb',
borderRadius: '8px',
fontSize: 'clamp(12px, 2.5vw, 14px)',
transition: 'all 0.3s ease',
boxSizing: 'border-box',
backgroundColor: 'white'
},
textarea: {
width: '100%',
padding: '12px',
border: '2px solid #bbdefb',
borderRadius: '8px',
fontSize: 'clamp(12px, 2.5vw, 14px)',
transition: 'all 0.3s ease',
boxSizing: 'border-box',
resize: 'vertical',
fontFamily: 'inherit'
},
quickServices: {
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
gap: '10px'
},
quickServiceBtn: {
padding: '10px',
backgroundColor: '#2563eb',
color: 'white',
border: 'none',
borderRadius: '8px',
cursor: 'pointer',
fontSize: 'clamp(10px, 2vw, 12px)',
fontWeight: 'bold',
transition: 'all 0.3s ease',
whiteSpace: 'nowrap',
overflow: 'hidden',
textOverflow: 'ellipsis'
},
itemsContainer: {
maxHeight: '400px',
overflowY: 'auto'
},
itemRow: {
display: 'flex',
alignItems: 'center',
gap: '8px',
marginBottom: '10px',
padding: '10px',
backgroundColor: '#f0f8ff',
borderRadius: '8px',
border: '1px solid #e3f2fd',
flexWrap: 'wrap'
},
itemInput: {
flex: '2 1 120px',
minWidth: '100px',
padding: '8px',
border: '1px solid #bbdefb',
borderRadius: '4px',
fontSize: 'clamp(12px, 2vw, 14px)'
},
qtyInput: {
flex: '0 1 60px',
minWidth: '50px',
padding: '8px',
border: '1px solid #bbdefb',
borderRadius: '4px',
fontSize: 'clamp(12px, 2vw, 14px)'
},
rateInput: {
flex: '1 1 80px',
minWidth: '70px',
padding: '8px',
border: '1px solid #bbdefb',
borderRadius: '4px',
fontSize: 'clamp(12px, 2vw, 14px)'
},
amount: {
flex: '1 1 80px',
fontWeight: 'bold',
color: 'black',
fontSize: 'clamp(12px, 2.5vw, 16px)',
textAlign: 'center',
minWidth: '60px'
},
removeBtn: {
backgroundColor: '#f44336',
color: 'white',
border: 'none',
borderRadius: '50%',
width: '35px',
height: '35px',
cursor: 'pointer',
fontSize: '12px',
transition: 'all 0.3s ease',
flexShrink: 0
},
addBtn: {
backgroundColor: '#2563eb',
color: 'white',
border: 'none',
padding: '12px 20px',
borderRadius: '8px',
cursor: 'pointer',
fontSize: 'clamp(12px, 2vw, 14px)',
fontWeight: 'bold',
transition: 'all 0.3s ease',
width: '100%'
},
paymentGrid: {
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
gap: '20px'
},
summaryTitle: {
margin: '0 0 20px 0',
fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
fontWeight: 'bold',
color: '#333',
textAlign: 'center'
},
summaryGrid: {
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
gap: '20px',
alignItems: 'start'
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
fontSize: 'clamp(14px, 2.5vw, 16px)',
borderBottom: '1px solid #e3f2fd'
},
totalRow: {
display: 'flex',
justifyContent: 'space-between',
padding: '15px 0',
fontSize: 'clamp(16px, 3vw, 20px)',
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
padding: '15px 20px',
border: 'none',
borderRadius: '10px',
cursor: 'pointer',
fontSize: 'clamp(14px, 2.5vw, 16px)',
fontWeight: 'bold',
transition: 'all 0.3s ease',
width: '100%'
},
payBtn: {
backgroundColor: '#2563eb',
color: 'white',
padding: '15px 20px',
border: 'none',
borderRadius: '10px',
cursor: 'pointer',
fontSize: 'clamp(14px, 2.5vw, 16px)',
fontWeight: 'bold',
transition: 'all 0.3s ease',
width: '100%'
}
};

export default ReceptionBilling;