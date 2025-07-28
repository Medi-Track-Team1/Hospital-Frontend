import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiCheck, HiSearch } from 'react-icons/hi';
import PrescriptionService from '../services/PrescriptionService';

const DispatchMedicineForm = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingPrescriptions = async () => {
      try {
        setLoading(true);
        const data = await PrescriptionService.getPendingPrescriptions();
        setPrescriptions(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPendingPrescriptions();
  }, []);

  const handleDispatch = async () => {
    if (!selectedPrescription) {
      setError('Please select a prescription to dispatch');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await PrescriptionService.dispatchPrescription(selectedPrescription);
      setSuccess('Medicine dispatched successfully!');
      // Refresh prescriptions list
      const data = await PrescriptionService.getPendingPrescriptions();
      setPrescriptions(data);
      setSelectedPrescription('');
    } catch (err) {
      setError(err.message || 'Failed to dispatch medicine');
    } finally {
      setLoading(false);
    }
  };

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.id.toString().includes(searchTerm)
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/admin/pharmacy')}
          className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
        >
          <HiArrowLeft className="mr-1" /> Back
        </button>
        <h1 className="text-2xl font-bold">Dispatch Medicine</h1>
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

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="relative mb-6">
          <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search prescriptions by patient, doctor, or ID..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading && !prescriptions.length ? (
          <div className="flex justify-center items-center h-32">Loading prescriptions...</div>
        ) : filteredPrescriptions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prescription ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPrescriptions.map(prescription => (
                  <tr key={prescription.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      #{prescription.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {prescription.patientName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Dr. {prescription.doctorName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(prescription.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedPrescription(prescription.id)}
                        className={`px-3 py-1 rounded-lg ${selectedPrescription === prescription.id ? 'bg-blue-600 text-white' : 'text-blue-600 hover:text-blue-900'}`}
                      >
                        {selectedPrescription === prescription.id ? 'Selected' : 'Select'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No pending prescriptions found
          </div>
        )}
      </div>

      {selectedPrescription && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Selected Prescription Details</h2>
          <div className="mb-6">
            {/* Here you would display the detailed prescription information */}
            <p>Prescription #{selectedPrescription} selected for dispatch</p>
            {/* In a real app, you would fetch and display the full prescription details */}
          </div>
          <button
            onClick={handleDispatch}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
          >
            <HiCheck /> {loading ? 'Processing...' : 'Confirm Dispatch'}
          </button>
        </div>
      )}
    </div>
  );
};

export default DispatchMedicineForm;