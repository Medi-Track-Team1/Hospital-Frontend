const MedicineService = {
  // Initialize with sample data if localStorage is empty
  initSampleData: () => {
    if (!localStorage.getItem('pharmacy_medicines')) {
      const sampleMedicines = [
        { id: 1, name: 'Paracetamol', batch: 'B12345', quantity: 150, price: 5.99, expiry: '2024-12-31', supplier: 'MediCorp' },
        { id: 2, name: 'Ibuprofen', batch: 'B67890', quantity: 45, price: 7.50, expiry: '2025-06-30', supplier: 'PharmaPlus' },
        { id: 3, name: 'Amoxicillin', batch: 'B54321', quantity: 8, price: 12.99, expiry: '2024-09-30', supplier: 'HealthLine' },
        { id: 4, name: 'Loratadine', batch: 'B09876', quantity: 32, price: 8.25, expiry: '2025-03-31', supplier: 'MediCorp' },
        { id: 5, name: 'Omeprazole', batch: 'B13579', quantity: 5, price: 15.75, expiry: '2024-11-30', supplier: 'PharmaPlus' },
      ];
      localStorage.setItem('pharmacy_medicines', JSON.stringify(sampleMedicines));
    }

    if (!localStorage.getItem('pharmacy_prescriptions')) {
      const samplePrescriptions = [
        { id: 1, patientName: 'John Doe', doctorName: 'Smith', date: '2023-05-15', status: 'pending', medicines: [{ id: 1, name: 'Paracetamol', quantity: 30 }] },
        { id: 2, patientName: 'Jane Smith', doctorName: 'Johnson', date: '2023-05-16', status: 'pending', medicines: [{ id: 2, name: 'Ibuprofen', quantity: 20 }] },
        { id: 3, patientName: 'Robert Brown', doctorName: 'Williams', date: '2023-05-17', status: 'pending', medicines: [{ id: 3, name: 'Amoxicillin', quantity: 15 }] },
      ];
      localStorage.setItem('pharmacy_prescriptions', JSON.stringify(samplePrescriptions));
    }
  },

  getAllMedicines: async () => {
    try {
      const medicines = JSON.parse(localStorage.getItem('pharmacy_medicines') || []);
      return medicines;
    } catch (error) {
      throw 'Failed to fetch medicines';
    }
  },

  getMedicineById: async (id) => {
    try {
      const medicines = JSON.parse(localStorage.getItem('pharmacy_medicines') || []);
      const medicine = medicines.find(m => m.id === parseInt(id));
      if (!medicine) throw 'Medicine not found';
      return medicine;
    } catch (error) {
      throw error || 'Failed to fetch medicine';
    }
  },

  addMedicine: async (medicineData) => {
    try {
      const medicines = JSON.parse(localStorage.getItem('pharmacy_medicines') || []);
      const newId = medicines.length > 0 ? Math.max(...medicines.map(m => m.id)) + 1 : 1;
      const newMedicine = { ...medicineData, id: newId };
      medicines.push(newMedicine);
      localStorage.setItem('pharmacy_medicines', JSON.stringify(medicines));
      return newMedicine;
    } catch (error) {
      throw 'Failed to add medicine';
    }
  },

  updateMedicine: async (id, medicineData) => {
    try {
      const medicines = JSON.parse(localStorage.getItem('pharmacy_medicines') || []);
      const index = medicines.findIndex(m => m.id === parseInt(id));
      if (index === -1) throw 'Medicine not found';
      
      medicines[index] = { ...medicines[index], ...medicineData };
      localStorage.setItem('pharmacy_medicines', JSON.stringify(medicines));
      return medicines[index];
    } catch (error) {
      throw error || 'Failed to update medicine';
    }
  },

  deleteMedicine: async (id) => {
    try {
      let medicines = JSON.parse(localStorage.getItem('pharmacy_medicines') || []);
      medicines = medicines.filter(m => m.id !== parseInt(id));
      localStorage.setItem('pharmacy_medicines', JSON.stringify(medicines));
      return true;
    } catch (error) {
      throw 'Failed to delete medicine';
    }
  },

  receiveStock: async (stockData) => {
    try {
      const medicines = JSON.parse(localStorage.getItem('pharmacy_medicines') || []);
      const index = medicines.findIndex(m => m.id === parseInt(stockData.medicineId));
      if (index === -1) throw 'Medicine not found';
      
      // Update quantity
      medicines[index].quantity += parseInt(stockData.quantity);
      
      // Update batch and expiry if provided
      if (stockData.batch) medicines[index].batch = stockData.batch;
      if (stockData.expiry) medicines[index].expiry = stockData.expiry;
      if (stockData.supplier) medicines[index].supplier = stockData.supplier;
      
      localStorage.setItem('pharmacy_medicines', JSON.stringify(medicines));
      return medicines[index];
    } catch (error) {
      throw error || 'Failed to receive stock';
    }
  },

  checkLowStock: async (threshold = 10) => {
    try {
      const medicines = JSON.parse(localStorage.getItem('pharmacy_medicines') || []);
      return medicines.filter(m => m.quantity <= threshold);
    } catch (error) {
      throw 'Failed to check low stock';
    }
  }
};

// Initialize sample data on first load
MedicineService.initSampleData();

export default MedicineService;