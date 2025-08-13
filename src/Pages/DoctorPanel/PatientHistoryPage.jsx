import { useEffect, useState } from "react";
import { 
  ArrowLeft,
  User,
  Clock,
  FileText,
  CheckCircle,
  X,
  Calendar,
  Loader2
} from "lucide-react";

const PatientHistoryPage = ({ 
  patientId, 
  doctorId, 
  onBack,
  patientName: propPatientName 
}) => {
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showViewPrescriptionModal, setShowViewPrescriptionModal] = useState(false);
  const [currentPrescription, setCurrentPrescription] = useState(null);
  const [patientName, setPatientName] = useState(propPatientName || "");
  const [toast, setToast] = useState(null);

  // Real API calls - you need to import these services
  const listCompletedAppointmentsByDoctorId = async (doctorId) => {
    try {
      const response = await fetch(`https://appoitment-backend.onrender.com/api/appointments/doctor/${doctorId}/completed`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('Error fetching completed appointments:', error);
      throw error;
    }
  };

  const getPrescriptionByAppointmentId = async (appointmentId) => {
    try {
      const response = await fetch(`https://doctorpanel-backend.onrender.com/api/prescriptions/appointment/${appointmentId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("No prescription found");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('Error fetching prescription:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (doctorId) {
      fetchPatientHistory();
    }
  }, [doctorId, patientId]);

  const showToast = (title, description, variant = "default") => {
    setToast({ title, description, variant });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchPatientHistory = async () => {
    try {
      setLoading(true);
      
      // Fetch all completed appointments by doctor
      const response = await listCompletedAppointmentsByDoctorId(doctorId);
      const allCompletedAppointments = response.data || [];
      
      // Filter appointments for the specific patient
      let patientAppointments = [];
      let foundPatientName = "";
      
      if (patientId && patientId !== 'undefined') {
        // If we have a specific patientId, filter by it
        patientAppointments = allCompletedAppointments.filter(apt => 
          apt.patientId === patientId || 
          (apt.patient && apt.patient.id === patientId) ||
          (apt.patient && apt.patient.patientId === patientId)
        );
        
        // Get patient name from the first appointment
        if (patientAppointments.length > 0) {
          foundPatientName = patientAppointments[0].patientName || 
                           patientAppointments[0].patient?.name || 
                           patientAppointments[0].patient?.patientName || 
                           "Unknown Patient";
        }
      } else {
        // If no specific patientId, show all completed appointments
        patientAppointments = allCompletedAppointments;
        foundPatientName = "All Patients";
      }
      
      // Transform appointments to ensure consistent date/time format
      const transformedAppointments = patientAppointments.map(apt => ({
        ...apt,
        date: apt.appointmentDateTime ? 
          new Date(apt.appointmentDateTime).toISOString().split('T')[0] : 
          apt.date,
        time: apt.appointmentDateTime ? 
          new Date(apt.appointmentDateTime).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true 
          }) : 
          apt.time,
        displayPatientName: apt.patientName || 
                          apt.patient?.name || 
                          apt.patient?.patientName || 
                          "Unknown Patient"
      }));
      
      // Sort by date (most recent first)
      transformedAppointments.sort((a, b) => {
        const aDateTime = new Date(`${a.date} ${a.time}`);
        const bDateTime = new Date(`${b.date} ${b.time}`);
        return bDateTime - aDateTime;
      });
      
      setCompletedAppointments(transformedAppointments);
      setPatientName(foundPatientName);
      
    } catch (error) {
      console.error("Error fetching patient history:", error);
      showToast(
        "Error",
        "Failed to fetch patient appointment history.",
        "destructive"
      );
      setCompletedAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewPrescription = async (appointment) => {
    try {
      console.log("Viewing prescription for appointment:", appointment);
      
      // Get appointment ID
      const appointmentId = appointment.appointmentId || appointment.id;
      console.log("Using appointmentId:", appointmentId);
      
      const response = await getPrescriptionByAppointmentId(appointmentId);
      const prescription = response.data;
      
      if (prescription) {
        console.log("Found prescription:", prescription);
        setCurrentPrescription(prescription);
        setShowViewPrescriptionModal(true);
      } else {
        showToast(
          "No Prescription Found",
          "No prescription exists for this appointment.",
          "destructive"
        );
      }
    } catch (error) {
      console.error("Error fetching prescription:", error);
      
      if (error.response?.status === 404 || error.message.includes("No prescription")) {
        showToast(
          "No Prescription Found",
          "No prescription exists for this appointment.",
          "destructive"
        );
      } else {
        showToast(
          "Error", 
          "Failed to fetch prescription. Please try again.",
          "destructive"
        );
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusLower = status?.toLowerCase();
    const variants = {
      completed: "bg-green-100 text-green-700 border-green-200",
      canceled: "bg-red-100 text-red-700 border-red-200",
      cancelled: "bg-red-100 text-red-700 border-red-200",
    };
    return variants[statusLower] || variants.completed;
  };

  const isAppointmentCanceled = (appointment) => {
    const status = appointment.status?.toLowerCase();
    return status === "canceled" || status === "cancelled";
  };

  const ViewPrescriptionModal = ({ isOpen, onClose, prescription }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Prescription Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Prescription ID</p>
                <p className="font-medium">{prescription.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date Prescribed</p>
                <p className="font-medium">{prescription.prescribedDate}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Medications</h3>
              <div className="space-y-3">
                {prescription.medications.map((med, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium text-gray-900">{med.name}</p>
                        <p className="text-sm text-gray-500">Dosage: {med.dosage}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Frequency: {med.frequency}</p>
                        <p className="text-sm text-gray-500">Duration: {med.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {prescription.notes && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {prescription.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Toast Notification */}
        {toast && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            toast.variant === 'destructive' 
              ? 'bg-red-100 text-red-700 border border-red-200' 
              : 'bg-green-100 text-green-700 border border-green-200'
          }`}>
            <div className="font-semibold">{toast.title}</div>
            <div className="text-sm">{toast.description}</div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {patientId && patientId !== 'undefined' ? 'Patient History' : 'All Appointments History'}
              </h1>
              <p className="text-gray-600">
                {patientId && patientId !== 'undefined' 
                  ? `Completed appointments for ${patientName}`
                  : 'All completed appointments'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-700">Completed Appointments</span>
            </div>
            <div className="text-2xl font-bold text-green-700">
              {completedAppointments.filter(apt => !isAppointmentCanceled(apt)).length}
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-2">
              <X className="h-5 w-5 text-red-600" />
              <span className="font-medium text-red-700">Cancelled Appointments</span>
            </div>
            <div className="text-2xl font-bold text-red-700">
              {completedAppointments.filter(apt => isAppointmentCanceled(apt)).length}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-700">Total History</span>
            </div>
            <div className="text-2xl font-bold text-blue-700">
              {completedAppointments.length}
            </div>
          </div>
        </div>

        {/* Appointments History Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Appointment History</h3>
              </div>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                {completedAppointments.length} appointments
              </span>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
              <p className="text-gray-500 mt-2">Loading appointment history...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {(!patientId || patientId === 'undefined') && (
                      <th className="text-left p-4 font-medium text-gray-700">Patient</th>
                    )}
                    <th className="text-left p-4 font-medium text-gray-700">Date & Time</th>
                    <th className="text-left p-4 font-medium text-gray-700">Reason</th>
                    <th className="text-left p-4 font-medium text-gray-700">Status</th>
                    <th className="text-left p-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {completedAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={(!patientId || patientId === 'undefined') ? 5 : 4} className="text-center p-8 text-gray-500">
                        {patientId && patientId !== 'undefined' 
                          ? `No appointment history found for ${patientName}.`
                          : 'No completed appointments found.'
                        }
                      </td>
                    </tr>
                  ) : (
                    completedAppointments.map((appointment) => (
                      <tr key={appointment.appointmentId || appointment.id} className="border-b hover:bg-gray-50">
                        {(!patientId || patientId === 'undefined') && (
                          <td className="p-4 text-sm">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <p className="font-medium">{appointment.displayPatientName}</p>
                                <p className="text-xs text-gray-500">
                                  ID: {appointment.patientId || appointment.patient?.id || 'N/A'}
                                </p>
                              </div>
                            </div>
                          </td>
                        )}
                        <td className="p-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="font-medium">{appointment.date}</p>
                              <p className="font-medium">{appointment.time}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm">{appointment.reason || 'General Consultation'}</td>
                        <td className="p-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs border ${getStatusBadge(appointment.status)}`}>
                            {appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1)}
                          </span>
                        </td>
                        <td className="p-4 text-sm">
                          <button
                            className={`flex items-center space-x-1 px-3 py-1 text-xs border rounded-md transition-colors ${
                              isAppointmentCanceled(appointment)
                                ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200"
                                : "border-blue-300 text-blue-700 hover:bg-blue-50"
                            }`}
                            onClick={() => handleViewPrescription(appointment)}
                            disabled={isAppointmentCanceled(appointment)}
                            title={
                              isAppointmentCanceled(appointment)
                                ? "Prescription cannot be viewed for cancelled appointments"
                                : "View Prescription"
                            }
                          >
                            <FileText className="h-3 w-3" />
                            <span>View Prescription</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* View Prescription Modal */}
      <ViewPrescriptionModal
        isOpen={showViewPrescriptionModal}
        onClose={() => {
          setShowViewPrescriptionModal(false);
          setCurrentPrescription(null);
        }}
        prescription={currentPrescription}
      />
    </div>
  );
};

export default PatientHistoryPage;