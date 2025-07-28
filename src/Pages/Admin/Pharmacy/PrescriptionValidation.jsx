import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiCheck, HiX, HiSearch } from 'react-icons/hi';
import PrescriptionService from '../services/PrescriptionService';

const PrescriptionValidation = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationStatus, setValidationStatus] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingPrescriptions = async () => {
      try {
        setLoading(true);
        const data = await PrescriptionService.getPendingPrescriptions();
        setPrescriptions(data);
        
        // Initialize validation status
        const status = {};
        data.forEach(prescription => {
          status[prescription.id] = {
            validated: false,
            canValidate: false,
            issues: []
          };
        });
        setValidationStatus(status);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPendingPrescriptions();
  }, []);

  const checkPrescriptionAvailability = async (prescriptionId) => {
    try {
      const result = await PrescriptionService.checkMedicineAvailability(prescriptionId);
      setValidationStatus(prev => ({
        ...prev,
        [prescriptionId]: {
          validated: false,
          canValidate: result.available,
          issues: result.issues || []
        }
      }));
      return result.available;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const handleValidate = async (prescriptionId) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await PrescriptionService.validatePrescription(prescriptionId);
      setSuccess(`Prescription #${prescriptionId} validated successfully!`);
      // Refresh prescriptions list
      const data = await PrescriptionService.getPendingPrescriptions();
      setPrescriptions(data);
    } catch (err) {
      setError(err.message || 'Failed to validate prescription');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (prescriptionId) => {
    if (!window.confirm('Are you sure you want to reject this prescription?')) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await PrescriptionService.rejectPrescription(prescriptionId);
      setSuccess(`Prescription #${prescriptionId} rejected successfully!`);
      // Refresh prescriptions list
      const data = await PrescriptionService.getPendingPrescriptions();
      setPrescriptions(data);
    } catch (err) {
      setError(err.message || 'Failed to reject prescription');
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
        <h1 className="text-2xl font-bold">Prescription Validation</h1>
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
                    Actions
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
                        Pending Validation
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={async () => {
                          const canValidate = await checkPrescriptionAvailability(prescription.id);
                          if (canValidate) {
                            handleValidate(prescription.id);
                          }
                        }}
                        disabled={loading}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg flex items-center gap-1"
                      >
                        <HiCheck /> Validate
                      </button>
                      <button
                        onClick={() => handleReject(prescription.id)}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg flex items-center gap-1"
                      >
                        <HiX /> Reject
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

      {/* Validation Issues Display */}
      {Object.entries(validationStatus).map(([prescriptionId, status]) => {
        if (status.issues.length > 0) {
          return (
            <div key={prescriptionId} className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
              <h3 className="font-medium text-red-800">Issues with Prescription #{prescriptionId}</h3>
              <ul className="list-disc list-inside text-red-700 mt-2">
                {status.issues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default PrescriptionValidation;