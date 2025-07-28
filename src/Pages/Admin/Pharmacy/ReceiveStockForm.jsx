import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiCheck, HiPlus } from 'react-icons/hi';
import MedicineService from '../services/MedicineService';

const ReceiveStockForm = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [quantity, setQuantity] = useState('');
  const [batch, setBatch] = useState('');
  const [expiry, setExpiry] = useState('');
  const [supplier, setSupplier] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const data = await MedicineService.getAllMedicines();
        setMedicines(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMedicines();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await MedicineService.receiveStock({
        medicineId: selectedMedicine,
        quantity: parseInt(quantity),
        batch,
        expiry,
        supplier
      });
      setSuccess('Stock received successfully!');
      // Reset form
      setSelectedMedicine('');
      setQuantity('');
      setBatch('');
      setExpiry('');
      setSupplier('');
      // Refresh medicines list
      const data = await MedicineService.getAllMedicines();
      setMedicines(data);
    } catch (err) {
      setError(err.message || 'Failed to receive stock');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/admin/pharmacy')}
          className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
        >
          <HiArrowLeft className="mr-1" /> Back
        </button>
        <h1 className="text-2xl font-bold">Receive Stock</h1>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2" htmlFor="medicine">
              Medicine*
            </label>
            <select
              id="medicine"
              value={selectedMedicine}
              onChange={(e) => setSelectedMedicine(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a medicine</option>
              {medicines.map(medicine => (
                <option key={medicine.id} value={medicine.id}>
                  {medicine.name} (Current: {medicine.quantity})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="quantity">
              Quantity Received*
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="batch">
              Batch Number*
            </label>
            <input
              type="text"
              id="batch"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="expiry">
              Expiry Date*
            </label>
            <input
              type="date"
              id="expiry"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="supplier">
              Supplier
            </label>
            <input
              type="text"
              id="supplier"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
          >
            <HiCheck /> {loading ? 'Processing...' : 'Receive Stock'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/pharmacy/add')}
            className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg flex items-center gap-2"
          >
            <HiPlus /> Add New Medicine
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReceiveStockForm;