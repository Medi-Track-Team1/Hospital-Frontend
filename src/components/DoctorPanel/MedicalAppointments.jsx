import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import DatePicker from "react-datepicker";

import {
  MdCalendarToday,
  MdPerson,
  MdCheckCircle,
  MdSchedule,
  MdVideocam,
  MdLocationOn,
  MdDescription,
  MdEditCalendar,
  MdVisibility,
  MdRefresh,
} from "react-icons/md";
import { AppointmentCard } from "./AppointmentCard";
import { PatientDetailsModal } from "./PatientDetailsModal";
import { RescheduleModal } from "./RescheduleModal";
import { useToast } from "../../hooks/DoctorPanelHooks/use-toast";
import PrescribeModal from "./PrescribeModal";
import {
  listAppointmentsByDoctorId,
  listCompletedAppointmentsByDoctorId,
} from '../../services/DoctorPanel/AppointmentService';

export const MedicalAppointments = () => {
  const { toast } = useToast();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPrescribeModal, setShowPrescribeModal] = useState(false);
  const [viewHistoryPatient, setViewHistoryPatient] = useState(null);
  const navigate = useNavigate();
  const [rescheduleAppointment, setRescheduleAppointment] = useState(null);
  const [cancelAppointment, setCancelAppointment] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [revisitAppointment, setRevisitAppointment] = useState(null);
  const [revisitDate, setRevisitDate] = useState("");
  const [revisitTime, setRevisitTime] = useState("");
  const [revisitReason, setRevisitReason] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  
  const { id: doctorId } = useParams();

  useEffect(() => {
    if (doctorId) {
      listAppointmentsByDoctorId(doctorId)
        .then((res) => {
          const data = res.data;
          console.log("Appointments data:", data); // Debug log
          setAppointments(Array.isArray(data) ? data : data.appointments || []);
        })
        .catch(() => setAppointments([]));

      listCompletedAppointmentsByDoctorId(doctorId)
        .then((res) => {
          const data = res.data;
          console.log("Appointment history data:", data); // Debug log
          setAppointmentHistory(Array.isArray(data) ? data : data.appointments || []);
        })
        .catch(() => setAppointmentHistory([]));
    }
  }, [doctorId]);

  const handleRevisit = (appointment) => {
    setRevisitAppointment(appointment);
    setRevisitDate("");
    setRevisitTime("");
    setRevisitReason("");
  };

  const handleRevisitConfirm = () => {
    if (!revisitDate || !revisitTime || !revisitReason.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields for the revisit appointment.",
        variant: "destructive",
      });
      return;
    }

    const newAppointment = {
      id: `new-${Date.now()}`,
      patient: revisitAppointment.patient,
      dateTime: `${format(new Date(revisitDate), "MMM dd")} ${revisitTime}`,
      duration: "30 min",
      type: "Follow-up",
      reason: revisitReason,
      priority: "medium",
      status: "pending",
      isAccepted: false
    };

    setAppointments((prev) => [...prev, newAppointment]);
    
    toast({
      title: "Revisit Scheduled",
      description: `New appointment scheduled for ${revisitAppointment.patient?.name || revisitAppointment.patientName} on ${format(new Date(revisitDate), "MMM dd")} at ${revisitTime}.`,
    });

    setRevisitAppointment(null);
    setRevisitDate("");
    setRevisitTime("");
    setRevisitReason("");
  };

  // Helper function to get the table row key (for React key prop)
  const getRowKey = (appointment) => {
    return appointment.appointmentId || appointment._id || appointment.id;
  };

  // Helper function to get the correct appointment ID for prescriptions
  const getAppointmentIdForPrescription = (appointment) => {
    // Use appointmentId field for prescriptions (business logic ID like "apt_1237")
    return appointment.appointmentId || appointment.id;
  };
  
  const getStatusBadge = (status) => {
    const variants = {
      pending: "bg-orange-100 text-orange-700 border-orange-200",
      accepted: "bg-blue-100 text-blue-700 border-blue-200",
      completed: "bg-green-100 text-green-700 border-green-200",
    };
    return variants[status] || variants.pending;
  };

  const handleCancelConfirm = () => {
    if (!cancelReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for cancellation.",
        variant: "destructive",
      });
      return;
    }

    // Remove the appointment from the list
    setAppointments(prev => prev.filter(apt => getRowKey(apt) !== getRowKey(cancelAppointment)));
    
    toast({
      title: "Appointment Cancelled",
      description: `Appointment for ${cancelAppointment.patientName} has been cancelled.`,
    });

    setCancelAppointment(null);
    setCancelReason("");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AppointmentCard
            title="Upcoming Appointments"
            count={appointments.filter((apt) => apt.status !== "completed").length}
            icon={<MdCalendarToday className="h-6 w-6 text-primary" />}
            bgColor="bg-medical-blue-light"
          />
          <AppointmentCard
            title="Pending Approval"
            count={appointments.filter((apt) => apt.status === "pending").length}
            icon={<MdPerson className="h-6 w-6 text-orange-600" />}
            bgColor="bg-orange-50"
          />
          <AppointmentCard
            title="Completed"
            count={appointmentHistory.length}
            icon={<MdCheckCircle className="h-6 w-6 text-green-600" />}
            bgColor="bg-green-50"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Upcoming Appointments
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Appointment History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <Card>
              <CardContent className="p-0">
                <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
                  <div className="flex items-center space-x-2">
                    <MdCalendarToday className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
                    <Badge variant="secondary" className="ml-auto bg-white/20 text-white">
                      {appointments.filter(apt => apt.status !== "completed").length} appointments
                    </Badge>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-medium">Patient</th>
                        <th className="text-left p-4 font-medium">Date & Time</th>
                        <th className="text-left p-4 font-medium">Reason</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appointment) => (
                        <tr key={getRowKey(appointment)} className="border-b hover:bg-muted/50">
                          <td className="p-2 text-sm">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                <MdPerson className="h-4 w-4 text-primary-foreground" />
                              </div>
                              <div>
                                <p className="font-medium">{appointment.patientName}</p>
                                <p className="text-xs text-gray-500">ID: {appointment.appointmentId}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <MdSchedule className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="font-medium">{appointment.date}</p>
                                <p className="font-medium">{appointment.time}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-sm">{appointment.reason}</td>
                          <td className="p-2 text-sm">
                            <Badge className={`border ${getStatusBadge(appointment.status)}`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="p-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs"
                                onClick={() => {
                                  console.log("Opening prescription modal for appointment:", appointment);
                                  console.log("Using appointmentId:", getAppointmentIdForPrescription(appointment));
                                  setSelectedAppointment(appointment);
                                  setShowPrescribeModal(true);
                                }}
                              >
                                <MdDescription className="h-3 w-3 mr-1" />
                                Prescription
                              </Button>
                              
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => navigate("/doctor/:id/patienthistory")}
                                className="text-xs"
                              >
                                <MdVisibility className="h-3 w-3 mr-1" />
                                View History
                              </Button>

                              <button
                                className="px-3 py-1 text-xs border rounded-md bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                                onClick={() => handleRevisit(appointment)}
                              >
                                <MdRefresh className="h-3 w-3 mr-1 inline" />
                                Revisit
                              </button>

                              <button
                                className="px-3 py-1 text-xs border rounded-md bg-red-500 text-white border-red-500 hover:bg-red-600"
                                onClick={() => setCancelAppointment(appointment)}
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardContent className="p-0">
                <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
                  <div className="flex items-center space-x-2">
                    <MdCheckCircle className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Appointment History</h3>
                    <Badge variant="secondary" className="ml-auto bg-white/20 text-white">
                      {appointmentHistory.length} completed
                    </Badge>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-medium">Patient</th>
                        <th className="text-left p-4 font-medium">Date & Time</th>
                        <th className="text-left p-4 font-medium">Reason</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointmentHistory.map((appointment) => (
                        <tr key={getRowKey(appointment)} className="border-b hover:bg-muted/50">
                          <td className="p-2 text-sm">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                <MdPerson className="h-4 w-4 text-primary-foreground" />
                              </div>
                              <div>
                                <p className="font-medium">{appointment.patientName}</p>
                                <p className="text-xs text-gray-500">ID: {getAppointmentIdForPrescription(appointment)}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <MdSchedule className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="font-medium">{appointment.date}</p>
                                <p className="font-medium">{appointment.time}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-sm">{appointment.reason}</td>
                          <td className="p-2 text-sm">
                            <Badge className={`border ${getStatusBadge(appointment.status)}`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="p-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs"
                                onClick={() => {
                                  console.log("Viewing prescription for appointment:", appointment);
                                  console.log("Using appointmentId:", getAppointmentIdForPrescription(appointment));
                                  setSelectedAppointment(appointment);
                                  setShowPrescribeModal(true);
                                }}
                              >
                                <MdDescription className="h-3 w-3 mr-1" />
                                View Prescription
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Modals */}
      {selectedPatient && (
        <PatientDetailsModal
          isOpen={!!selectedPatient}
          onClose={() => setSelectedPatient(null)}
          patient={selectedPatient}
        />
      )}

      {rescheduleAppointment && (
        <RescheduleModal
          isOpen={!!rescheduleAppointment}
          onClose={() => setRescheduleAppointment(null)}
          onReschedule={(date, time) =>
            handleRescheduleConfirm(rescheduleAppointment.id, date, time)
          }
          patientName={rescheduleAppointment.patient?.name || rescheduleAppointment.patientName}
        />
      )}

      {/* Fixed PrescribeModal with correct appointmentId */}
      {showPrescribeModal && selectedAppointment && (
        <PrescribeModal
          isOpen={showPrescribeModal}
          appointmentId={getAppointmentIdForPrescription(selectedAppointment)} // Use business logic ID
          doctorId={doctorId}
          onClose={() => {
            setShowPrescribeModal(false);
            setSelectedAppointment(null);
          }}
          onSuccess={(prescription) => {
            console.log('Prescription created:', prescription);
            toast({
              title: "Success",
              description: "Prescription created successfully!",
            });
          }}
        />
      )}

      {/* Revisit Modal */}
      {revisitAppointment && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 space-y-4">
            <h2 className="text-lg font-semibold text-blue-600">Schedule Revisit</h2>
            <p className="text-sm text-gray-600">
              Schedule a follow-up appointment for <strong>{revisitAppointment.patient?.name || revisitAppointment.patientName}</strong>.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full border rounded p-2 text-sm"
                  value={revisitDate}
                  onChange={(e) => setRevisitDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  className="w-full border rounded p-2 text-sm"
                  value={revisitTime}
                  onChange={(e) => setRevisitTime(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Revisit
                </label>
                <textarea
                  rows={3}
                  className="w-full border rounded p-2 text-sm"
                  placeholder="Enter reason for follow-up appointment..."
                  value={revisitReason}
                  onChange={(e) => setRevisitReason(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                onClick={() => setRevisitAppointment(null)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
                  !revisitDate || !revisitTime || !revisitReason.trim() 
                    ? "opacity-50 cursor-not-allowed" 
                    : ""
                }`}
                disabled={!revisitDate || !revisitTime || !revisitReason.trim()}
                onClick={handleRevisitConfirm}
              >
                Schedule Revisit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Appointment Modal */}
      {cancelAppointment && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 space-y-4">
            <h2 className="text-lg font-semibold text-red-600">Cancel Appointment</h2>
            <p className="text-sm text-gray-600">
              Please provide a reason for cancelling the appointment with <strong>{cancelAppointment.patient?.name || cancelAppointment.patientName}</strong>.
            </p>
            <textarea
              rows={4}
              className="w-full border rounded p-2 text-sm"
              placeholder="Enter cancellation reason..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                onClick={() => {
                  setCancelAppointment(null);
                  setCancelReason("");
                }}
              >
                Close
              </button>
              <button
                className={`px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ${
                  !cancelReason.trim() ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!cancelReason.trim()}
                onClick={handleCancelConfirm}
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};