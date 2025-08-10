import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  MdCalendarToday,
  MdPerson,
  MdCheckCircle,
  MdSchedule,
  MdDescription,
  MdVisibility,
  MdRefresh,
  MdCancel,
} from "react-icons/md";
import { AppointmentCard } from "./AppointmentCard";
import { PatientDetailsModal } from "./PatientDetailsModal";
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
import PatientHistoryModal from "../../Pages/DoctorPanel/PatientHistoryModal";

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

  // Truncate text function
  const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  // Computed values for filtered and sorted appointments
// More robust sorting with better date handling:
const upcomingAppointments = allAppointments
  .filter(apt => {
    const status = apt.status?.toUpperCase();
    return status === "PENDING" || status === "CONFIRMED" || status === "ACCEPTED";
  })
  .sort((a, b) => {
    // Handle different date formats and edge cases
    const parseDateTime = (appointment) => {
      try {
        // Try different date parsing approaches
        let dateTime;
        
        if (appointment.appointmentDateTime) {
          // If appointmentDateTime exists, use it directly
          dateTime = new Date(appointment.appointmentDateTime);
        } else {
          // Fallback to date + time combination
          const dateStr = appointment.date;
          const timeStr = appointment.time;
          
          if (!dateStr || !timeStr) {
            return new Date(0); // Return epoch for invalid dates (will sort to beginning)
          }
          
          // Combine date and time
          dateTime = new Date(`${dateStr} ${timeStr}`);
        }
        
        // Check if the date is valid
        if (isNaN(dateTime.getTime())) {
          console.warn(`Invalid date for appointment:`, appointment);
          return new Date(0);
        }
        
        return dateTime;
      } catch (error) {
        console.error(`Error parsing date for appointment:`, appointment, error);
        return new Date(0);
      }
    };
    
    const aDateTime = parseDateTime(a);
    const bDateTime = parseDateTime(b);
    
    // Ascending order: earliest appointments first
    return aDateTime - bDateTime;
  });

  // Add this helper function at the top of your component
const removeDuplicateAppointments = (appointments) => {
  const seen = new Set();
  return appointments.filter(apt => {
    const key = getRowKey(apt);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

// Then modify your computed values:
const completedAppointmentsFiltered = removeDuplicateAppointments(
  allAppointments
    .filter(apt => {
      const status = apt.status?.toUpperCase();
      return status === "COMPLETED";
    })
    .concat(completedAppointments.filter(apt => {
      const status = apt.status?.toUpperCase();
      return status === "COMPLETED";
    }))
    .sort((a, b) => {
      const aDateTime = new Date(`${a.date} ${a.time}`);
      const bDateTime = new Date(`${b.date} ${b.time}`);
      return bDateTime - aDateTime;
    })
);

  const canceledAppointments = allAppointments
    .filter(apt => {
      const status = apt.status?.toUpperCase();
      return status === "CANCELED" || status === "CANCELLED";
    })
    .concat(completedAppointments.filter(apt => {
      const status = apt.status?.toUpperCase();
      return status === "CANCELED" || status === "CANCELLED";
    }))
    .sort((a, b) => {
      const aDateTime = new Date(`${a.date} ${a.time}`);
      const bDateTime = new Date(`${b.date} ${b.time}`);
      return bDateTime - aDateTime;
    });

  const appointmentHistory = allAppointments
    .filter(apt => {
      const status = apt.status?.toUpperCase();
      return status === "COMPLETED" || status === "CANCELED" || status === "CANCELLED"
    })
    .concat(completedAppointments)
    .sort((a, b) => {
      const aDateTime = new Date(`${a.date} ${a.time}`);
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
      const upcomingResponse = await listUpcomingAppointmentsByDoctorId(doctorId);
      const upcomingData = upcomingResponse.data;
      const upcomingAppointments = Array.isArray(upcomingData) ? upcomingData : upcomingData.appointments || [];
      
      const transformedUpcoming = upcomingAppointments.map(apt => ({
        ...apt,
        date: apt.appointmentDateTime ? new Date(apt.appointmentDateTime).toISOString().split('T')[0] : apt.date,
        time: apt.appointmentDateTime ? new Date(apt.appointmentDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : apt.time,
        status: apt.status?.toLowerCase() || 'pending'
      }));

      try {
        const completedResponse = await listCompletedAppointmentsByDoctorId(doctorId);
        const completedData = completedResponse.data;
        const completedAppointments = Array.isArray(completedData) ? completedData : completedData.appointments || [];
        
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

const handleViewHistory = (appointment) => {
  const patientId = appointment.patientId || appointment.patient?.id;
  const patientName = appointment.patientName || appointment.patient?.name;
  
  setViewHistoryPatient({ id: patientId, name: patientName });
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

      const response = await createAppointment(newAppointmentData);
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

  const handlePrescriptionSuccess = async (prescription) => {
    console.log('Prescription created:', prescription);
    
    try {
      const appointmentId = getAppointmentIdForPrescription(selectedAppointment);
      
      const appointmentToComplete = allAppointments.find(apt => 
        getAppointmentIdForPrescription(apt) === appointmentId
      );
      
      if (appointmentToComplete) {
        const completedAppointment = {
          ...appointmentToComplete,
          status: "completed"
        };
        
        setAllAppointments(prev => 
          prev.filter(apt => getAppointmentIdForPrescription(apt) !== appointmentId)
        );
        
        setCompletedAppointments(prev => [completedAppointment, ...prev]);
        
        toast({
          title: "Success",
          description: "Prescription created successfully! Appointment moved to history.",
        });
        
        setShowPrescribeModal(false);
        setSelectedAppointment(null);
        
        setTimeout(() => {
          fetchAppointments();
        }, 1000);
        
      } else {
        console.warn("Appointment not found in upcoming list");
        toast({
          title: "Success",
          description: "Prescription created successfully!",
        });
        
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
      const appointmentId = getAppointmentIdForPrescription(appointment);
      const response = await getPrescriptionByAppointmentId(appointmentId);
      const prescription = response.data;
      
      if (prescription) {
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
    
    if (!patientId || !patientName) {
      toast({
        title: "Error", 
        description: "Cannot create prescription: Patient information is missing from appointment data.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedAppointment({
      ...appointment,
      patientId: patientId,
      patientName: patientName
    });
    setShowPrescribeModal(true);
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
    <div className="min-h-screen bg-background p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AppointmentCard
            title="Upcoming Appointments"
            count={upcomingAppointments.length}
            icon={<MdCalendarToday className="h-6 w-6 text-primary" />}
            bgColor="bg-medical-blue-light"
          />
         
          <AppointmentCard
            title="Completed"
            count={completedAppointmentsFiltered.length}
            icon={<MdCheckCircle className="h-6 w-6 text-green-600" />}
            bgColor="bg-green-50"
          />

          <AppointmentCard
            title="Canceled"
            count={canceledAppointments.length}
            icon={<MdCancel className="h-6 w-6 text-red-600" />}
            bgColor="bg-red-50"
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
                  <table className="w-full min-w-[900px]">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-3 font-medium w-[200px]">Patient</th>
                        <th className="text-left p-3 font-medium w-[140px]">Date & Time</th>
                        <th className="text-left p-3 font-medium w-[150px]">Reason</th>
                        <th className="text-left p-3 font-medium w-[100px]">Status</th>
                        <th className="text-left p-3 font-medium w-[310px]">Actions</th>
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
                            <td className="p-3 text-sm">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                                  <MdPerson className="h-4 w-4 text-primary-foreground" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="font-medium truncate">{appointment.patientName}</p>
                                  <p className="text-xs text-gray-500 truncate">ID: {getAppointmentIdForPrescription(appointment)}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 text-sm">
                              <div className="flex items-center space-x-2">
                                <MdSchedule className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <p className="font-medium text-xs">{appointment.date}</p>
                                  <p className="font-medium text-xs">{appointment.time}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 text-sm">
                              <div className="max-w-[150px]">
                                <span 
                                  className="block truncate" 
                                  title={appointment.reason}
                                >
                                  {truncateText(appointment.reason, 25)}
                                </span>
                              </div>
                            </td>
                            <td className="p-3 text-sm">
                              <Badge className={`border text-xs ${getStatusBadge(appointment.status)}`}>
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm">
                              <div className="flex items-center gap-1 flex-nowrap">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs px-2 py-1 h-7 whitespace-nowrap"
                                  onClick={() => handleCreatePrescription(appointment)}
                                >
                                  <MdDescription className="h-3 w-3 mr-1" />
                                  Prescription
                                </Button>
                                

                               <Button
  size="sm"
  variant="outline"
  className="text-xs"
  onClick={() => handleViewHistory(appointment)}
>
  <MdVisibility className="h-3 w-3 mr-1" />
  View History
</Button>


                                <button
                                  className="px-2 py-1 text-xs rounded-md bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200 transition-colors h-7 whitespace-nowrap"
                                  onClick={() => handleRevisit(appointment)}
                                >
                                  <MdRefresh className="h-3 w-3 mr-1 inline" />
                                  Revisit
                                </button>

                                <button
                                  className="px-2 py-1 text-xs rounded-md bg-red-100 text-red-700 border border-red-200 hover:bg-red-200 transition-colors h-7 whitespace-nowrap"
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
                  <table className="w-full min-w-[800px]">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-3 font-medium w-[200px]">Patient</th>
                        <th className="text-left p-3 font-medium w-[140px]">Date & Time</th>
                        <th className="text-left p-3 font-medium w-[150px]">Reason</th>
                        <th className="text-left p-3 font-medium w-[100px]">Status</th>
                        <th className="text-left p-3 font-medium w-[210px]">Actions</th>
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
                            <td className="p-3 text-sm">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                                  <MdPerson className="h-4 w-4 text-primary-foreground" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="font-medium truncate">{appointment.patientName}</p>
                                  <p className="text-xs text-gray-500 truncate">ID: {getAppointmentIdForPrescription(appointment)}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 text-sm">
                              <div className="flex items-center space-x-2">
                                <MdSchedule className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <p className="font-medium text-xs">{appointment.date}</p>
                                  <p className="font-medium text-xs">{appointment.time}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 text-sm">
                              <div className="max-w-[150px]">
                                <span 
                                  className="block truncate" 
                                  title={appointment.reason}
                                >
                                  {truncateText(appointment.reason, 25)}
                                </span>
                              </div>
                            </td>
                            <td className="p-3 text-sm">
                              <Badge className={`border text-xs ${getStatusBadge(appointment.status)}`}>
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm">
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className={`text-xs px-2 py-1 h-7 whitespace-nowrap ${
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
                                  Prescription
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

{viewHistoryPatient && (
  <PatientHistoryModal
    isOpen={!!viewHistoryPatient}
    onClose={() => setViewHistoryPatient(null)}
    patientId={viewHistoryPatient.id}
    patientName={viewHistoryPatient.name}
    doctorId={doctorId}
  />
)}

      {/* Revisit Modal */}
      {revisitAppointment && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4 max-h-[90vh] overflow-y-auto">
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
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
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