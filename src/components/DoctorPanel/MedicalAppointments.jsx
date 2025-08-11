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
  MdEdit,
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
} from "../../services/DoctorPanel/AppointmentService";
import { getPrescriptionByAppointmentId } from "../../services/DoctorPanel/PrescriptionService";
import PatientHistoryModal from "../../Pages/DoctorPanel/PatientHistoryModal";
import EditPrescribeModal from "./EditPrescribeModal";

export const MedicalAppointments = () => {
  const { toast } = useToast();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPrescribeModal, setShowPrescribeModal] = useState(false);
  const [showViewPrescriptionModal, setShowViewPrescriptionModal] = useState(false);
  const [viewHistoryPatient, setViewHistoryPatient] = useState(null);
 // Add this line after the other state declarations (around line 27)
const [isCancelling, setIsCancelling] = useState(false);
  const [cancelAppointment, setCancelAppointment] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [revisitAppointment, setRevisitAppointment] = useState(null);
  const [revisitDate, setRevisitDate] = useState("");
  const [revisitTime, setRevisitTime] = useState(null);
  const [revisitReason, setRevisitReason] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showEditPrescriptionModal, setShowEditPrescriptionModal] = useState(false);
const [editPrescriptionData, setEditPrescriptionData] = useState(null);
  // SIMPLIFIED STATE - Only store all appointments in one place
  const [allAppointments, setAllAppointments] = useState([]);
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
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  // FIXED: Simplified computed values with better duplicate handling
  const upcomingAppointments = (() => {
    const upcoming = allAppointments.filter((apt) => {
      const status = apt.status?.toUpperCase();
      return status === "PENDING" || status === "CONFIRMED" || status === "ACCEPTED";
    });

    // Remove duplicates
    const seen = new Set();
    const unique = upcoming.filter(apt => {
      const key = getRowKey(apt);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Sort by date/time
    return unique.sort((a, b) => {
      const parseDateTime = (appointment) => {
        try {
          if (appointment.appointmentDateTime) {
            return new Date(appointment.appointmentDateTime);
          } else {
            const dateTime = new Date(`${appointment.date} ${appointment.time}`);
            return isNaN(dateTime.getTime()) ? new Date(0) : dateTime;
          }
        } catch (error) {
          console.error("Error parsing date for appointment:", appointment, error);
          return new Date(0);
        }
      };

      return parseDateTime(a) - parseDateTime(b);
    });
  })();

  const completedAppointments = (() => {
    const completed = allAppointments.filter((apt) => {
      const status = apt.status?.toUpperCase();
      return status === "COMPLETED";
    });

    // Remove duplicates
    const seen = new Set();
    const unique = completed.filter(apt => {
      const key = getRowKey(apt);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Sort by date/time (most recent first)
    return unique.sort((a, b) => {
      const aDateTime = new Date(`${a.date} ${a.time}`);
      const bDateTime = new Date(`${b.date} ${b.time}`);
      return bDateTime - aDateTime;
    });
  })();

  const canceledAppointments = (() => {
    const canceled = allAppointments.filter((apt) => {
      const status = apt.status?.toUpperCase();
      return status === "CANCELED" || status === "CANCELLED";
    });

    // Remove duplicates
    const seen = new Set();
    const unique = canceled.filter(apt => {
      const key = getRowKey(apt);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Sort by date/time (most recent first)
    return unique.sort((a, b) => {
      const aDateTime = new Date(`${a.date} ${a.time}`);
      const bDateTime = new Date(`${b.date} ${b.time}`);
      return bDateTime - aDateTime;
    });
  })();

  const appointmentHistory = (() => {
    const history = allAppointments.filter((apt) => {
      const status = apt.status?.toUpperCase();
      return status === "COMPLETED" || status === "CANCELED" || status === "CANCELLED";
    });

    // Remove duplicates
    const seen = new Set();
    const unique = history.filter(apt => {
      const key = getRowKey(apt);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Sort by date/time (most recent first)
    return unique.sort((a, b) => {
      const aDateTime = new Date(`${a.date} ${a.time}`);
      const bDateTime = new Date(`${b.date} ${b.time}`);
      return bDateTime - aDateTime;
    });
  })();

  useEffect(() => {
    if (doctorId) {
      fetchAppointments();
    }
  }, [doctorId]);

  // FIXED: Simplified fetch function that combines all appointments
  const fetchAppointments = async () => {
    try {
      console.log("Fetching appointments for doctor:", doctorId);
      
      // Fetch from both endpoints
      const [upcomingResponse, completedResponse] = await Promise.allSettled([
        listUpcomingAppointmentsByDoctorId(doctorId),
        listCompletedAppointmentsByDoctorId(doctorId)
      ]);

      let allFetchedAppointments = [];

      // Process upcoming appointments
      if (upcomingResponse.status === 'fulfilled') {
        const upcomingData = upcomingResponse.value.data;
        const upcomingAppointments = Array.isArray(upcomingData) 
          ? upcomingData 
          : upcomingData.appointments || [];
        
        console.log("Fetched upcoming appointments:", upcomingAppointments.length);
        allFetchedAppointments = [...allFetchedAppointments, ...upcomingAppointments];
      } else {
        console.warn("Failed to fetch upcoming appointments:", upcomingResponse.reason);
      }

      // Process completed appointments
      if (completedResponse.status === 'fulfilled') {
        const completedData = completedResponse.value.data;
        const completedAppointments = Array.isArray(completedData) 
          ? completedData 
          : completedData.appointments || [];
        
        console.log("Fetched completed appointments:", completedAppointments.length);
        allFetchedAppointments = [...allFetchedAppointments, ...completedAppointments];
      } else {
        console.warn("Failed to fetch completed appointments:", completedResponse.reason);
      }

      // Transform all appointments to consistent format
      const transformedAppointments = allFetchedAppointments.map((apt) => ({
        ...apt,
        date: apt.appointmentDateTime
          ? new Date(apt.appointmentDateTime).toISOString().split("T")[0]
          : apt.date,
        time: apt.appointmentDateTime
          ? new Date(apt.appointmentDateTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : apt.time,
        status: apt.status?.toLowerCase() || "pending",
      }));

      // Remove duplicates based on appointment ID
      const seen = new Set();
      const uniqueAppointments = transformedAppointments.filter(apt => {
        const key = getRowKey(apt);
        if (seen.has(key)) {
          console.log("Removing duplicate appointment:", key);
          return false;
        }
        seen.add(key);
        return true;
      });

      console.log("Final unique appointments:", uniqueAppointments.length);
      setAllAppointments(uniqueAppointments);

    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAllAppointments([]);
      toast({
        title: "Error",
        description: "Failed to fetch appointments. Please refresh the page.",
        variant: "destructive",
      });
    }
  };

  const handleRevisit = (appointment) => {
    setRevisitAppointment(appointment);
    setRevisitDate("");
    setRevisitTime(null);
    setRevisitReason("");
  };
const handleEditPrescription = async (appointment) => {
  if (isAppointmentCanceled(appointment)) {
    toast({
      title: "Cannot Edit Prescription",
      description: "Prescriptions cannot be edited for canceled appointments.",
      variant: "destructive",
    });
    return;
  }

  try {
    const appointmentId = getAppointmentIdForPrescription(appointment);
    const response = await getPrescriptionByAppointmentId(appointmentId);
    const prescription = response.data;

    if (prescription) {
      // Set the prescription data and appointment info for editing
      setEditPrescriptionData({
        prescription: prescription,
        appointmentId: appointmentId,
        doctorId: doctorId,
        patientId: appointment.patientId || appointment.patient?.id,
        patientName: appointment.patientName || appointment.patient?.name,
      });
      setShowEditPrescriptionModal(true);
    } else {
      toast({
        title: "No Prescription Found",
        description: "No prescription exists for this appointment to edit.",
        variant: "destructive",
      });
    }
  } catch (error) {
    console.error("Error fetching prescription for edit:", error);
    toast({
      title: "Error",
      description: "Failed to fetch prescription for editing. Please try again.",
      variant: "destructive",
    });
  }
};
const handleEditPrescriptionSuccess = async (updatedPrescription) => {
  console.log("Prescription updated successfully:", updatedPrescription);

  toast({
    title: "Success",
    description: "Prescription updated successfully!",
  });

  // Close modal
  setShowEditPrescriptionModal(false);
  setEditPrescriptionData(null);

  // Refresh appointments to show any updates
  await fetchAppointments();
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
        time: appointmentDateTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        reason: revisitReason,
        notes: `Revisit appointment for previous appointment: ${
          revisitAppointment.appointmentId || revisitAppointment.id
        }`,
        status: "pending",
      };

      const response = await createAppointment(newAppointmentData);
      await fetchAppointments();

      toast({
        title: "Revisit Scheduled Successfully",
        description: `New appointment scheduled for ${
          revisitAppointment.patientName
        } on ${format(appointmentDateTime, "MMM dd, yyyy")} at ${
          newAppointmentData.time
        }.`,
      });

      setRevisitAppointment(null);
      setRevisitDate("");
      setRevisitTime(null);
      setRevisitReason("");
    } catch (error) {
      console.error("Error creating revisit appointment:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create revisit appointment";
      toast({
        title: "Error Creating Revisit",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmittingRevisit(false);
    }
  };

  // FIXED: Much simpler prescription success handler
  const handlePrescriptionSuccess = async (prescription) => {
    console.log("Prescription created successfully:", prescription);

    // Show success message
    toast({
      title: "Success",
      description: "Prescription created successfully! Appointment moved to history.",
    });

    // Close modal
    setShowPrescribeModal(false);
    setSelectedAppointment(null);

    // Refresh appointments from server - this will get the updated status
    await fetchAppointments();
  };

  const handleViewPrescription = async (appointment) => {
    if (isAppointmentCanceled(appointment)) {
      toast({
        title: "Cannot View Prescription",
        description:
          "Prescriptions cannot be viewed for canceled appointments.",
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
        description:
          "Cannot create prescription: Patient information is missing from appointment data.",
        variant: "destructive",
      });
      return;
    }

    setSelectedAppointment({
      ...appointment,
      patientId: patientId,
      patientName: patientName,
    });
    setShowPrescribeModal(true);
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: "bg-orange-100 text-orange-700 border-orange-200",
      cancelled: "bg-red-100 text-red-700 border-red-200",
      completed: "bg-green-100 text-green-700 border-green-200",
    };
    return variants[status] || variants.pending;
  };

// Replace the existing handleCancelConfirm function with this updated version
const handleCancelConfirm = async () => {
  if (!cancelReason.trim()) {
    toast({
      title: "Error",
      description: "Please provide a reason for cancellation.",
      variant: "destructive",
    });
    return;
  }

  setIsCancelling(true); // Add this line

  try {
    await cancelAppointmentById(
      cancelAppointment.appointmentId || cancelAppointment.id
    );
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
  } finally {
    setIsCancelling(false); // Add this line
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
            count={completedAppointments.length}
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
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Upcoming Appointments
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Appointment History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <Card>
              <CardContent className="p-0">
                <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
                  <div className="flex items-center space-x-2">
                    <MdCalendarToday className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">
                      Upcoming Appointments
                    </h3>
                    <Badge
                      variant="secondary"
                      className="ml-auto bg-white/20 text-white"
                    >
                      {upcomingAppointments.length} appointments
                    </Badge>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px]">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-3 font-medium w-[200px]">
                          Patient
                        </th>
                        <th className="text-left p-3 font-medium w-[140px]">
                          Date & Time
                        </th>
                        <th className="text-left p-3 font-medium w-[150px]">
                          Reason
                        </th>
                        <th className="text-left p-3 font-medium w-[100px]">
                          Status
                        </th>
                        <th className="text-left p-3 font-medium w-[310px]">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingAppointments.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="text-center p-8 text-gray-500"
                          >
                            No pending appointments found for this doctor.
                          </td>
                        </tr>
                      ) : (
                        upcomingAppointments.map((appointment) => (
                          <tr
                            key={getRowKey(appointment)}
                            className="border-b hover:bg-muted/50"
                          >
                            <td className="p-3 text-sm">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                                  <MdPerson className="h-4 w-4 text-primary-foreground" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="font-medium truncate">
                                    {appointment.patientName}
                                  </p>
                                  <p className="text-xs text-gray-500 truncate">
                                    ID:{" "}
                                    {getAppointmentIdForPrescription(
                                      appointment
                                    )}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 text-sm">
                              <div className="flex items-center space-x-2">
                                <MdSchedule className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <p className="font-medium text-xs">
                                    {appointment.date}
                                  </p>
                                  <p className="font-medium text-xs">
                                    {appointment.time}
                                  </p>
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
                              <Badge
                                className={`border text-xs ${getStatusBadge(
                                  appointment.status
                                )}`}
                              >
                                {appointment.status.charAt(0).toUpperCase() +
                                  appointment.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="p-3 text-sm">
                              <div className="flex items-center gap-1 flex-nowrap">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs px-2 py-1 h-7 whitespace-nowrap"
                                  onClick={() =>
                                    handleCreatePrescription(appointment)
                                  }
                                >
                                  <MdDescription className="h-3 w-3 mr-1" />
                                  Prescription
                                </Button>

                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs px-2 py-1 h-7 whitespace-nowrap"
                                  onClick={() => handleViewHistory(appointment)}
                                >
                                  <MdVisibility className="h-3 w-3 mr-1" />
                                  History
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
                                  onClick={() =>
                                    setCancelAppointment(appointment)
                                  }
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
                    <h3 className="text-lg font-semibold">
                      Appointment History
                    </h3>
                    <Badge
                      variant="secondary"
                      className="ml-auto bg-white/20 text-white"
                    >
                      {appointmentHistory.length} completed
                    </Badge>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-3 font-medium w-[200px]">
                          Patient
                        </th>
                        <th className="text-left p-3 font-medium w-[140px]">
                          Date & Time
                        </th>
                        <th className="text-left p-3 font-medium w-[150px]">
                          Reason
                        </th>
                        <th className="text-left p-3 font-medium w-[100px]">
                          Status
                        </th>
                        <th className="text-left p-3 font-medium w-[210px]">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointmentHistory.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="text-center p-8 text-gray-500"
                          >
                            No completed appointments found for this doctor.
                          </td>
                        </tr>
                      ) : (
                        appointmentHistory.map((appointment) => (
                          <tr
                            key={getRowKey(appointment)}
                            className="border-b hover:bg-muted/50"
                          >
                            <td className="p-3 text-sm">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                                  <MdPerson className="h-4 w-4 text-primary-foreground" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="font-medium truncate">
                                    {appointment.patientName}
                                  </p>
                                  <p className="text-xs text-gray-500 truncate">
                                    ID:{" "}
                                    {getAppointmentIdForPrescription(
                                      appointment
                                    )}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 text-sm">
                              <div className="flex items-center space-x-2">
                                <MdSchedule className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <p className="font-medium text-xs">
                                    {appointment.date}
                                  </p>
                                  <p className="font-medium text-xs">
                                    {appointment.time}
                                  </p>
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
                              <Badge
                                className={`border text-xs ${getStatusBadge(
                                  appointment.status
                                )}`}
                              >
                                {appointment.status.charAt(0).toUpperCase() +
                                  appointment.status.slice(1)}
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
                                  onClick={() =>
                                    handleViewPrescription(appointment)
                                  }
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
                                 <Button
      size="sm"
      variant="outline"
      className={`text-xs px-2 py-1 h-7 whitespace-nowrap ${
        isAppointmentCanceled(appointment)
          ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200"
          : "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200"
      }`}
      onClick={() => handleEditPrescription(appointment)}
      disabled={isAppointmentCanceled(appointment)}
      title={
        isAppointmentCanceled(appointment)
          ? "Prescription cannot be edited for canceled appointments"
          : "Edit Prescription"
      }
    >
      <MdEdit className="h-3 w-3 mr-1" />
      Edit
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
{/* Edit Prescription Modal */}
{showEditPrescriptionModal && editPrescriptionData && (
  <EditPrescribeModal
    isOpen={showEditPrescriptionModal}
    appointmentId={editPrescriptionData.appointmentId}
    doctorId={editPrescriptionData.doctorId}
    patientId={editPrescriptionData.patientId}
    patientName={editPrescriptionData.patientName}
    existingPrescription={editPrescriptionData.prescription}
    onClose={() => {
      setShowEditPrescriptionModal(false);
      setEditPrescriptionData(null);
    }}
    onSuccess={handleEditPrescriptionSuccess}
  />
)}
      {/* Revisit Modal */}
      {revisitAppointment && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold text-blue-600">
              Schedule Revisit
            </h2>
            <p className="text-sm text-gray-600">
              Schedule a follow-up appointment for{" "}
              <strong>
                {revisitAppointment.patient?.name ||
                  revisitAppointment.patientName}
              </strong>
              .
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
                  min={new Date().toISOString().split("T")[0]}
                  disabled={isSubmittingRevisit}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <DatePicker
                  selected={revisitTime}
                  onChange={(date) => setRevisitTime(date)}
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
                  !revisitDate ||
                  !revisitTime ||
                  !revisitReason.trim() ||
                  isSubmittingRevisit
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={
                  !revisitDate ||
                  !revisitTime ||
                  !revisitReason.trim() ||
                  isSubmittingRevisit
                }
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
      <h2 className="text-lg font-semibold text-red-600">
        Cancel Appointment
      </h2>
      <p className="text-sm text-gray-600">
        Please provide a reason for cancelling the appointment with{" "}
        <strong>
          {cancelAppointment.patient?.name ||
            cancelAppointment.patientName}
        </strong>
        .
      </p>
      <textarea
        rows={4}
        className="w-full border rounded p-2 text-sm"
        placeholder="Enter cancellation reason..."
        value={cancelReason}
        onChange={(e) => setCancelReason(e.target.value)}
        disabled={isCancelling}
      />
      <div className="flex justify-end space-x-2">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          onClick={() => {
            setCancelAppointment(null);
            setCancelReason("");
          }}
          disabled={isCancelling}
        >
          Close
        </button>
        <button
          className={`px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center ${
            !cancelReason.trim() || isCancelling ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!cancelReason.trim() || isCancelling}
          onClick={handleCancelConfirm}
        >
          {isCancelling ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Cancelling...
            </>
          ) : (
            "Confirm Cancel"
          )}
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};
