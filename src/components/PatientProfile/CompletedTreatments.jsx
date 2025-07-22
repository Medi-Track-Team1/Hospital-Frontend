import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Stethoscope,
  FileText,
  Search,
  CheckCircle,
  Pill
} from "lucide-react";
import { mockPrescriptions,PrescriptionModal } from "./PatientHistory";



const CompletedTreatments = () => {
  const [completedPrescriptions, setCompletedPrescriptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const completed = mockPrescriptions.filter(p => p.status === "completed");
    setCompletedPrescriptions(completed);
  }, []);

  const filteredPrescriptions = completedPrescriptions.filter(p =>
    p.doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.medications.some(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleBack = () => navigate('/doctor-panel');

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric"
    });

  const formatTime = (timeString) =>
    new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric", minute: "2-digit", hour12: true
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-4 sticky top-0 z-40 shadow">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleBack}
            className="p-3 rounded-lg hover:bg-blue-500"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-semibold">Completed Treatments</h1>
            <p className="text-blue-100 text-sm">
              View all finished prescriptions and care records
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by doctor, diagnosis, or medication..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border shadow-sm overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Diagnosis</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPrescriptions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No completed prescriptions found.
                  </td>
                </tr>
              ) : (
                filteredPrescriptions.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-blue-600" />
                        <span>{formatDate(p.date)} at {formatTime(p.time)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-2">
                        <Stethoscope size={16} className="text-green-600" />
                        <div>
                          <p className="text-sm font-medium">{p.doctor.name}</p>
                          <p className="text-xs text-gray-500">{p.doctor.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{p.diagnosis}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => { setSelectedPrescription(p); setIsModalOpen(true); }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && selectedPrescription && (
          <PrescriptionModal
            prescription={selectedPrescription}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CompletedTreatments;
