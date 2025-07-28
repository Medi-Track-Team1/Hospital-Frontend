import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HiPlus, 
  HiMinus, 
  HiSearch, 
  HiExclamation,
  HiArrowUp,
  HiArrowDown,
  HiOutlineRefresh
} from 'react-icons/hi';
import MedicineService from '../services/MedicineService';

const PharmacyInventory = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [lowStockThreshold, setLowStockThreshold] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const data = await MedicineService.getAllMedicines();
      setMedicines(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        await MedicineService.deleteMedicine(id);
        fetchMedicines();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Filter medicines based on search term
  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.batch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort medicines
  const sortedMedicines = [...filteredMedicines].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Handle sort request
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Check for low stock
  const lowStockMedicines = medicines.filter(medicine => medicine.quantity <= lowStockThreshold);

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Pharmacy Inventory Management</h1>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={fetchMedicines}
            className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-lg flex items-center gap-2"
          >
            <HiOutlineRefresh /> Refresh
          </button>
          <Link 
            to="/admin/pharmacy/add" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <HiPlus /> Add Medicine
          </Link>
          <Link 
            to="/admin/pharmacy/dispatch" 
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <HiMinus /> Dispatch
          </Link>
        </div>
      </div>

      {/* Search and Alerts */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search medicines by name or batch..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {lowStockMedicines.length > 0 && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-lg flex items-center gap-2">
            <HiExclamation className="text-xl" />
            <span>{lowStockMedicines.length} items below stock threshold ({lowStockThreshold})</span>
          </div>
        )}
      </div>

      {/* Inventory Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('name')}
              >
                <div className="flex items-center gap-1">
                  Medicine Name
                  {sortConfig.key === 'name' && (
                    sortConfig.direction === 'asc' ? <HiArrowUp /> : <HiArrowDown />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Batch Number
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('quantity')}
              >
                <div className="flex items-center gap-1">
                  Quantity
                  {sortConfig.key === 'quantity' && (
                    sortConfig.direction === 'asc' ? <HiArrowUp /> : <HiArrowDown />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('price')}
              >
                <div className="flex items-center gap-1">
                  Price
                  {sortConfig.key === 'price' && (
                    sortConfig.direction === 'asc' ? <HiArrowUp /> : <HiArrowDown />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedMedicines.length > 0 ? (
              sortedMedicines.map((medicine) => (
                <tr 
                  key={medicine.id} 
                  className={medicine.quantity <= lowStockThreshold ? 'bg-red-50' : ''}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {medicine.name}
                        {medicine.quantity <= lowStockThreshold && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Low Stock
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {medicine.batch}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {medicine.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${medicine.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(medicine.expiry).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => navigate(`/admin/pharmacy/edit/${medicine.id}`)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(medicine.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No medicines found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Stock Management Panel */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Incoming Stock */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Incoming Stock</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Pending Orders:</span>
              <span className="font-medium">5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Expected Today:</span>
              <span className="font-medium">2</span>
            </div>
            <Link 
              to="/admin/pharmacy/receive" 
              className="block w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-center"
            >
              Receive Stock
            </Link>
          </div>
        </div>

        {/* Prescription Validation */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Prescription Validation</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Pending Validation:</span>
              <span className="font-medium">8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Ready for Dispatch:</span>
              <span className="font-medium">3</span>
            </div>
            <Link 
              to="/admin/pharmacy/prescriptions" 
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-center"
            >
              Validate Prescriptions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyInventory;