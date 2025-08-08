import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
import ViewPrescriptionModal from "./ViewPrescriptionModel";
import {
  listUpcomingAppointmentsByDoctorId,
  listCompletedAppointmentsByDoctorId,
  createAppointment,
  cancelAppointmentById,
} from '../../services/DoctorPanel/AppointmentService';
import { getPrescriptionByAppointmentId } from '../../services/DoctorPanel/PrescriptionService';

export const MedicalAppointments = () => {
  const { toast } = useToast();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPrescribeModal, setShowPrescribeModal] = useState(false);
  const [showViewPrescriptionModal, setShowViewPrescriptionModal] = useState(false);
  const [viewHistoryPatient, setViewHistoryPatient] = useState(null);
  const navigate = useNavigate();
  const [rescheduleAppointment, setRescheduleAppointment] = useState(null);
  const [cancelAppointment, setCancelAppointment] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [revisitAppointment, setRevisitAppointment] = useState(null);
  const [revisitDate, setRevisitDate] = useState("");
  const [revisitTime, setRevisitTime] = useState(null);
  const [revisitReason, setRevisitReason] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [allAppointments, setAllAppointments] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [currentPrescription, setCurrentPrescription] = useState(null);
  const [isSubmittingRevisit, setIsSubmittingRevisit] = useState(false);
  
  const { id: doctorId } = useParams();

  // Helper functions
  const getRowKey = (appointment) => {
    return appointment.appointmentId || appointment._id || appointment.id;
  };

  const getAppointmentIdForPrescription = (appointment) => {
    return appointment.appointmentId || appointment.id;
  };

  const isAppointmentCanceled = (appointment) => {
    const status = appointment.status?.toUpperCase();
    return status === "CANCELED" || status === "CANCELLED";
  };

  // Computed values for filtered and sorted appointments
  const upcomingAppointments = allAppointments
    .filter(apt => {
      const status = apt.status?.toUpperCase();
      return status === "PENDING" || status === "CONFIRMED" || status === "ACCEPTED";
    })
    .sort((a, b) => {
      const aDateTime = new Date(`${a.date} ${a.time}`);
      const bDateTime = new Date(`${b.date} ${b.time}`);
      return aDateTime - bDateTime;
    });

  const appointmentHistory = allAppointments
    .filter(apt => {
      const status = apt.status?.toUpperCase();
      return status === "COMPLETED" || status === "CANCELED" || status === "CANCELLED"
    })
    .sort((a, b) => {
      const aDateTime = new Date(`${a.date} ${b.time}`);
      const bDateTime = new Date(`${b.date} ${b.time}`);
      return bDateTime - aDateTime;
    });

  useEffect(() => {
    if (doctorId) {
      fetchAppointments();
    }
  }, [doctorId]);

  const fetchAppointments = async () => {
    try {
      // Fetch upcoming appointments
      
      const upcomingResponse = await listUpcomingAppointmentsByDoctorId(doctorId);
      const upcomingData = upcomingResponse.data;
      const upcomingAppointments = Array.isArray(upcomingData) ? upcomingData : upcomingData.appointments || [];
      
      // Transform upcoming appointments
      const transformedUpcoming = upcomingAppointments.map(apt => ({
        ...apt,
        date: apt.appointmentDateTime ? new Date(apt.appointmentDateTime).toISOString().split('T')[0] : apt.date,
        time: apt.appointmentDateTime ? new Date(apt.appointmentDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : apt.time,
        status: apt.status?.toLowerCase() || 'pending'
      }));

      // Fetch completed appointments
      try {
        const completedResponse = await listCompletedAppointmentsByDoctorId(doctorId);
        const completedData = completedResponse.data;
        const completedAppointments = Array.isArray(completedData) ? completedData : completedData.appointments || [];
        
        // Transform completed appointments
        const transformedCompleted = completedAppointments.map(apt => ({
          ...apt,
          date: apt.appointmentDateTime ? new Date(apt.appointmentDateTime).toISOString().split('T')[0] : apt.date,
          time: apt.appointmentDateTime ? new Date(apt.appointmentDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : apt.time,
          status: apt.status?.toLowerCase() || 'completed'
        }));

        setCompletedAppointments(transformedCompleted);
      } catch (completedError) {
        console.log("No completed appointments found or error fetching:", completedError);
        setCompletedAppointments([]);
      }

      setAllAppointments(transformedUpcoming);
      
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAllAppointments([]);
      setCompletedAppointments([]);
    }
  };

  const handleRevisit = (appointment) => {
    setRevisitAppointment(appointment);
    setRevisitDate("");
    setRevisitTime(null);
    setRevisitReason("");
  };

  const handleRevisitConfirm = async () => {
    if (!revisitDate || !revisitTime || !revisitReason.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields for the revisit appointment.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingRevisit(true);

    try {
      const randomFourDigits = Math.floor(1000 + Math.random() * 9000);
      const newAppointmentId = `APP-${randomFourDigits}`;

      const appointmentDateTime = new Date(revisitDate);
      appointmentDateTime.setHours(revisitTime.getHours());
      appointmentDateTime.setMinutes(revisitTime.getMinutes());
      appointmentDateTime.setSeconds(0);

      const { id, _id, ...baseAppointment } = revisitAppointment;

      const newAppointmentData = {
        ...baseAppointment,
        appointmentId: newAppointmentId,
        appointmentDateTime: appointmentDateTime.toISOString(),
        date: format(appointmentDateTime, "yyyy-MM-dd"),
        time: appointmentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        reason: revisitReason,
        notes: `Revisit appointment for previous appointment: ${revisitAppointment.appointmentId || revisitAppointment.id}`,
        status: "pending"
      };

      console.log("Creating revisit appointment:", newAppointmentData);

      const response = await createAppointment(newAppointmentData);
      console.log("Revisit appointment created:", response.data);

      await fetchAppointments();

      toast({
        title: "Revisit Scheduled Successfully",
        description: `New appointment scheduled for ${revisitAppointment.patientName} on ${format(appointmentDateTime, "MMM dd, yyyy")} at ${newAppointmentData.time}.`,
      });

      setRevisitAppointment(null);
      setRevisitDate("");
      setRevisitTime(null);
      setRevisitReason("");
    } catch (error) {
      console.error("Error creating revisit appointment:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to create revisit appointment";
      toast({
        title: "Error Creating Revisit",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmittingRevisit(false);
    }
  };

  // ✅ UPDATED: Enhanced function to handle prescription success and immediate UI update
  const handlePrescriptionSuccess = async (prescription) => {
    console.log('Prescription created:', prescription);
    
    try {
      // Get the appointment ID for the prescription
      const appointmentId = getAppointmentIdForPrescription(selectedAppointment);
      
      // Find the appointment in upcoming appointments
      const appointmentToComplete = allAppointments.find(apt => 
        getAppointmentIdForPrescription(apt) === appointmentId
      );
      
      if (appointmentToComplete) {
        // Create the completed appointment object
        const completedAppointment = {
          ...appointmentToComplete,
          status: "completed"
        };
        
        // Update state immediately for instant UI feedback
        setAllAppointments(prev => 
          prev.filter(apt => getAppointmentIdForPrescription(apt) !== appointmentId)
        );
        
        setCompletedAppointments(prev => [completedAppointment, ...prev]);
        
        // Show success message
        toast({
          title: "Success",
          description: "Prescription created successfully! Appointment moved to history.",
        });
        
        // Close the modal
        setShowPrescribeModal(false);
        setSelectedAppointment(null);
        
        // Refresh appointments from backend to ensure consistency (optional but recommended)
        setTimeout(() => {
          fetchAppointments();
        }, 1000);
        
      } else {
        console.warn("Appointment not found in upcoming list");
        toast({
          title: "Success",
          description: "Prescription created successfully!",
        });
        
        // Still close the modal and refresh
        setShowPrescribeModal(false);
        setSelectedAppointment(null);
        fetchAppointments();
      }
    } catch (error) {
      console.error("Error handling prescription success:", error);
      toast({
        title: "Success",
        description: "Prescription created successfully!",
      });
      
      // Close modal and refresh on any error
      setShowPrescribeModal(false);
      setSelectedAppointment(null);
      fetchAppointments();
    }
  };

  const handleViewPrescription = async (appointment) => {
    if (isAppointmentCanceled(appointment)) {
      toast({
        title: "Cannot View Prescription",
        description: "Prescriptions cannot be viewed for canceled appointments.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("Viewing prescription for appointment:", appointment);
      const appointmentId = getAppointmentIdForPrescription(appointment);
      console.log("Using appointmentId:", appointmentId);
      
      const response = await getPrescriptionByAppointmentId(appointmentId);
      const prescription = response.data;
      
      if (prescription) {
        console.log("Found prescription:", prescription);
        setCurrentPrescription(prescription);
        setShowViewPrescriptionModal(true);
      } else {
        toast({
          title: "No Prescription Found",
          description: "No prescription exists for this appointment.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching prescription:", error);
      toast({
        title: "Error",
        description: "Failed to fetch prescription. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCreatePrescription = (appointment) => {
    console.log("Creating prescription for appointment:", appointment);
    console.log("Full appointment object:", JSON.stringify(appointment, null, 2));
    
    let patientId = null;
    let patientName = null;
    
    if (appointment.patientId) {
      patientId = appointment.patientId;
    } else if (appointment.patient?.id) {
      patientId = appointment.patient.id;
    } else if (appointment.patient?.patientId) {
      patientId = appointment.patient.patientId;
    }
    
    if (appointment.patientName) {
      patientName = appointment.patientName;
    } else if (appointment.patient?.name) {
      patientName = appointment.patient.name;
    } else if (appointment.patient?.patientName) {
      patientName = appointment.patient.patientName;
    }
    
    console.log("After extraction - patientId:", patientId, "patientName:", patientName);
    
    if (!patientId || !patientName) {
      console.error("Missing patient data:", { patientId, patientName, appointment });
      toast({
        title: "Error", 
        description: "Cannot create prescription: Patient information is missing from appointment data. Please check appointment details.",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Successfully extracted patient details:", { patientId, patientName });
    console.log("Using appointmentId:", getAppointmentIdForPrescription(appointment), appointment);
    
    setSelectedAppointment({
      ...appointment,
      patientId: patientId,
      patientName: patientName
    });
    setShowPrescribeModal(true);
  };

  const debugAppointmentData = (appointment) => {
    console.group("🔍 Appointment Data Debug");
    console.log("appointment.patientId:", appointment.patientId);
    console.log("appointment.patientName:", appointment.patientName);
    console.log("appointment.patient:", appointment.patient);
    console.log("appointment.patient?.id:", appointment.patient?.id);
    console.log("appointment.patient?.name:", appointment.patient?.name);
    console.log("Full appointment keys:", Object.keys(appointment));
    console.groupEnd();
  };

  const handleCompleteAppointment = (appointment) => {
    const appointmentId = getAppointmentIdForPrescription(appointment);
    
    const completedAppointment = {
      ...appointment,
      status: "completed"
    };
    
    setAllAppointments(prev => 
      prev.filter(apt => getAppointmentIdForPrescription(apt) !== appointmentId)
    );
    
    setCompletedAppointments(prev => [...prev, completedAppointment]);
    
    toast({
      title: "Appointment Completed",
      description: `Appointment for ${appointment.patientName} has been marked as completed.`,
    });
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: "bg-orange-100 text-orange-700 border-orange-200",
      canceled: "bg-red-100 text-red-700 border-red-200",
      completed: "bg-green-100 text-green-700 border-green-200",
    };
    return variants[status] || variants.pending;
  };

  const handleCancelConfirm = async () => {
    if (!cancelReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for cancellation.",
        variant: "destructive",
      });
      return;
    }

    try {
      await cancelAppointmentById(cancelAppointment.appointmentId || cancelAppointment.id);
      await fetchAppointments();

      toast({
        title: "Appointment Cancelled",
        description: `Appointment for ${cancelAppointment.patientName} has been cancelled.`,
      });

      setCancelAppointment(null);
      setCancelReason("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel appointment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AppointmentCard
            title="Upcoming Appointments"
            count={upcomingAppointments.length}
            icon={<MdCalendarToday className="h-6 w-6 text-primary" />}
            bgColor="bg-medical-blue-light"
          />
          <AppointmentCard
            title="Pending Approval"
            count={upcomingAppointments.filter((apt) => apt.status === "pending").length}
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
                      {upcomingAppointments.length} appointments
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
                      {upcomingAppointments.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center p-8 text-gray-500">
                            No pending appointments found for this doctor.
                          </td>
                        </tr>
                      ) : (
                        upcomingAppointments.map((appointment) => (
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
                                    debugAppointmentData(appointment);
                                    handleCreatePrescription(appointment);
                                  }}
                                >
                                  <MdDescription className="h-3 w-3 mr-1" />
                                  Prescription
                                </Button>
                                
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs"
                                >
                                  <MdVisibility className="h-3 w-3 mr-1" />
                                  View History
                                </Button>

                                <button
                                  className="px-3 py-1 text-xs rounded-md bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200 hover:text-blue-900 transition-colors"
                                  onClick={() => handleRevisit(appointment)}
                                >
                                  <MdRefresh className="h-3 w-3 mr-1 inline" />
                                  Revisit
                                </button>

                                <button
                                  className="px-3 py-1 text-xs rounded-md bg-red-100 text-red-700 border border-red-200 hover:bg-red-200 hover:text-red-900 transition-colors"
                                  onClick={() => setCancelAppointment(appointment)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
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
                      {appointmentHistory.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center p-8 text-gray-500">
                            No completed appointments found for this doctor.
                          </td>
                        </tr>
                      ) : (
                        appointmentHistory.map((appointment) => (
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
                                  className={`text-xs ${
                                    isAppointmentCanceled(appointment)
                                      ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200"
                                      : ""
                                  }`}
                                  onClick={() => handleViewPrescription(appointment)}
                                  disabled={isAppointmentCanceled(appointment)}
                                  title={
                                    isAppointmentCanceled(appointment)
                                      ? "Prescription cannot be viewed for canceled appointments"
                                      : "View Prescription"
                                  }
                                >
                                  <MdDescription className="h-3 w-3 mr-1" />
                                  View Prescription
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
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

      {showPrescribeModal && selectedAppointment && (
        <PrescribeModal
          isOpen={showPrescribeModal}
          appointmentId={getAppointmentIdForPrescription(selectedAppointment)}
          doctorId={doctorId}
          patientId={selectedAppointment.patientId}
          patientName={selectedAppointment.patientName}
          onClose={() => {
            setShowPrescribeModal(false);
            setSelectedAppointment(null);
          }}
          onSuccess={handlePrescriptionSuccess}
        />
      )}

      {showViewPrescriptionModal && currentPrescription && (
        <ViewPrescriptionModal
          isOpen={showViewPrescriptionModal}
          onClose={() => {
            setShowViewPrescriptionModal(false);
            setCurrentPrescription(null);
          }}
          prescription={currentPrescription}
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
                  disabled={isSubmittingRevisit}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <DatePicker
                  selected={revisitTime}
                  onChange={date => setRevisitTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="hh:mm aa"
                  className="w-full border rounded p-2 text-sm"
                  disabled={isSubmittingRevisit}
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
                  disabled={isSubmittingRevisit}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
                onClick={() => setRevisitAppointment(null)}
                disabled={isSubmittingRevisit}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center ${
                  !revisitDate || !revisitTime || !revisitReason.trim() || isSubmittingRevisit
                    ? "opacity-50 cursor-not-allowed" 
                    : ""
                }`}
                disabled={!revisitDate || !revisitTime || !revisitReason.trim() || isSubmittingRevisit}
                onClick={handleRevisitConfirm}
              >
                {isSubmittingRevisit ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  "Schedule Revisit"
                )}
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