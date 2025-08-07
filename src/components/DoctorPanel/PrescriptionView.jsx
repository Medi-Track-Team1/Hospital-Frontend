import React from "react";

const PrescriptionView = ({ prescription, onClose, appointmentId }) => {
  console.log("PrescriptionView received prescription:", prescription);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  const formatTiming = (timing) => {
    if (!timing || !Array.isArray(timing)) return "N/A";
    return timing.join(", ");
  };

  return (
    <div className="w-full bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-6 rounded-t-xl">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Prescription Details</h2>
            <p className="text-green-100 text-sm mt-1">
              Appointment ID: {appointmentId}
            </p>
            <p className="text-green-100 text-sm">
              Created: {formatDate(prescription?.createdAt)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-green-100 text-sm">Doctor ID</p>
            <p className="text-white font-semibold">{prescription?.doctorId || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-h-[70vh] overflow-y-auto p-8 space-y-8">
        
        {/* Medicines Section */}
        {prescription?.medicines && prescription.medicines.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              Prescribed Medicines ({prescription.medicines.length})
            </h3>
            <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="border-r border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Medicine Name</th>
                      <th className="border-r border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Batch</th>
                      <th className="border-r border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Dosage</th>
                      <th className="border-r border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Quantity</th>
                      <th className="border-r border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Duration (Days)</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Timing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {prescription.medicines.map((medicine, index) => (
                      <tr key={index} className="hover:bg-blue-25">
                        <td className="border-r border-gray-200 px-4 py-3 font-semibold text-blue-600">
                          {medicine.name || "N/A"}
                        </td>
                        <td className="border-r border-gray-200 px-4 py-3">
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                            {medicine.batch || "N/A"}
                          </span>
                        </td>
                        <td className="border-r border-gray-200 px-4 py-3 text-gray-600">
                          {medicine.dosage || "N/A"}
                        </td>
                        <td className="border-r border-gray-200 px-4 py-3 text-center">
                          {medicine.quantity || "N/A"}
                        </td>
                        <td className="border-r border-gray-200 px-4 py-3 text-center">
                          {medicine.duration || "N/A"}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {medicine.timing && medicine.timing.length > 0 ? (
                              medicine.timing.map((time, timeIndex) => (
                                <span 
                                  key={timeIndex}
                                  className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                                >
                                  {time}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-400 text-xs">No timing specified</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Injections Section */}
        {prescription?.injections && prescription.injections.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              Prescribed Injections ({prescription.injections.length})
            </h3>
            <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-green-50">
                    <tr>
                      <th className="border-r border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Injection Name</th>
                      <th className="border-r border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Batch</th>
                      <th className="border-r border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Dosage</th>
                      <th className="border-r border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Quantity</th>
                      <th className="border-r border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Schedule</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {prescription.injections.map((injection, index) => (
                      <tr key={index} className="hover:bg-green-25">
                        <td className="border-r border-gray-200 px-4 py-3 font-semibold text-green-600">
                          {injection.name || "N/A"}
                        </td>
                        <td className="border-r border-gray-200 px-4 py-3">
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                            {injection.batch || "N/A"}
                          </span>
                        </td>
                        <td className="border-r border-gray-200 px-4 py-3 text-gray-600">
                          {injection.dosage || "N/A"}
                        </td>
                        <td className="border-r border-gray-200 px-4 py-3 text-center">
                          {injection.quantity || "N/A"}
                        </td>
                        <td className="border-r border-gray-200 px-4 py-3">
                          {injection.schedule || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {injection.notes || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Diet Plan Section */}
        {prescription?.dietPlan && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              Diet Plan
            </h3>
            <div className="border-2 border-orange-200 rounded-xl p-6 bg-orange-50">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {prescription.dietPlan}
              </p>
            </div>
          </div>
        )}

        {/* Recommended Tests Section */}
        {prescription?.recommendedTests && prescription.recommendedTests.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              Recommended Tests ({prescription.recommendedTests.length})
            </h3>
            <div className="border-2 border-red-200 rounded-xl p-6 bg-red-50">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {prescription.recommendedTests.map((test, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 bg-white p-3 rounded-lg border border-red-200"
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">{test}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Additional Information */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h4 className="text-md font-semibold text-gray-800 mb-3">Prescription Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {prescription?.medicines?.length || 0}
              </div>
              <div className="text-gray-600">Medicines</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {prescription?.injections?.length || 0}
              </div>
              <div className="text-gray-600">Injections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {prescription?.recommendedTests?.length || 0}
              </div>
              <div className="text-gray-600">Tests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {prescription?.dietPlan ? "Yes" : "No"}
              </div>
              <div className="text-gray-600">Diet Plan</div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {(!prescription?.medicines || prescription.medicines.length === 0) &&
         (!prescription?.injections || prescription.injections.length === 0) &&
         !prescription?.dietPlan &&
         (!prescription?.recommendedTests || prescription.recommendedTests.length === 0) && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">📋</div>
            <p className="text-gray-500">No prescription details found.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-100 px-8 py-6 flex justify-end border-t-2 border-gray-200 rounded-b-xl">
        <button 
          onClick={onClose}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-medium transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PrescriptionView;