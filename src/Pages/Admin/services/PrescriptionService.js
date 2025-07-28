const PrescriptionService = {
  getPendingPrescriptions: async () => {
    try {
      const prescriptions = JSON.parse(localStorage.getItem('pharmacy_prescriptions') || []);
      return prescriptions.filter(p => p.status === 'pending');
    } catch (error) {
      throw 'Failed to fetch pending prescriptions';
    }
  },

  validatePrescription: async (prescriptionId) => {
    try {
      const prescriptions = JSON.parse(localStorage.getItem('pharmacy_prescriptions') || []);
      const index = prescriptions.findIndex(p => p.id === parseInt(prescriptionId));
      if (index === -1) throw 'Prescription not found';
      
      prescriptions[index].status = 'validated';
      localStorage.setItem('pharmacy_prescriptions', JSON.stringify(prescriptions));
      return prescriptions[index];
    } catch (error) {
      throw error || 'Failed to validate prescription';
    }
  },

  rejectPrescription: async (prescriptionId) => {
    try {
      const prescriptions = JSON.parse(localStorage.getItem('pharmacy_prescriptions') || []);
      const index = prescriptions.findIndex(p => p.id === parseInt(prescriptionId));
      if (index === -1) throw 'Prescription not found';
      
      prescriptions[index].status = 'rejected';
      localStorage.setItem('pharmacy_prescriptions', JSON.stringify(prescriptions));
      return prescriptions[index];
    } catch (error) {
      throw error || 'Failed to reject prescription';
    }
  },

  dispatchPrescription: async (prescriptionId) => {
    try {
      const prescriptions = JSON.parse(localStorage.getItem('pharmacy_prescriptions') || []);
      const medicines = JSON.parse(localStorage.getItem('pharmacy_medicines') || []);
      
      const prescriptionIndex = prescriptions.findIndex(p => p.id === parseInt(prescriptionId));
      if (prescriptionIndex === -1) throw 'Prescription not found';
      
      // Deduct medicines from inventory
      for (const item of prescriptions[prescriptionIndex].medicines) {
        const medicineIndex = medicines.findIndex(m => m.id === item.id);
        if (medicineIndex !== -1) {
          medicines[medicineIndex].quantity -= item.quantity;
          if (medicines[medicineIndex].quantity < 0) {
            throw `Not enough stock for ${item.name}`;
          }
        }
      }
      
      prescriptions[prescriptionIndex].status = 'dispatched';
      
      localStorage.setItem('pharmacy_medicines', JSON.stringify(medicines));
      localStorage.setItem('pharmacy_prescriptions', JSON.stringify(prescriptions));
      
      return prescriptions[prescriptionIndex];
    } catch (error) {
      throw error || 'Failed to dispatch prescription';
    }
  },

  checkMedicineAvailability: async (prescriptionId) => {
    try {
      const prescriptions = JSON.parse(localStorage.getItem('pharmacy_prescriptions') || []);
      const medicines = JSON.parse(localStorage.getItem('pharmacy_medicines') || []);
      
      const prescription = prescriptions.find(p => p.id === parseInt(prescriptionId));
      if (!prescription) throw 'Prescription not found';
      
      const issues = [];
      let allAvailable = true;
      
      for (const item of prescription.medicines) {
        const medicine = medicines.find(m => m.id === item.id);
        if (!medicine) {
          issues.push(`${item.name} not found in inventory`);
          allAvailable = false;
        } else if (medicine.quantity < item.quantity) {
          issues.push(`Not enough stock for ${item.name} (need ${item.quantity}, have ${medicine.quantity})`);
          allAvailable = false;
        } else if (new Date(medicine.expiry) < new Date()) {
          issues.push(`${item.name} batch ${medicine.batch} has expired`);
          allAvailable = false;
        }
      }
      
      return {
        available: allAvailable,
        issues
      };
    } catch (error) {
      throw error || 'Failed to check medicine availability';
    }
  }
};

export default PrescriptionService;