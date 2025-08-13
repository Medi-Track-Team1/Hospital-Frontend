// First, let's create a proper toast implementation that works without external dependencies

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
  MdClose,
} from "react-icons/md";
import { AppointmentCard } from "./AppointmentCard";
import { PatientDetailsModal } from "./PatientDetailsModal";
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

// Custom Toast Component - Self-contained solution
const CustomToast = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, toast.duration || 5000);
    return () => clearTimeout(timer);
  }, [onClose, toast.duration]);

  const getToastStyles = (variant) => {
    switch (variant) {
      case 'destructive':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getIconColor = (variant) => {
    switch (variant) {
      case 'destructive':
        return 'text-red-600';
      case 'success':
        return 'text-green-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full border rounded-lg shadow-lg p-4 ${getToastStyles(toast.variant)}`}>
      <div className="flex items-start">
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{toast.title}</h4>
          {toast.description && (
            <p className="text-sm mt-1 opacity-90">{toast.description}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className={`ml-2 p-1 rounded-full hover:bg-black/10 transition-colors ${getIconColor(toast.variant)}`}
        >
          <MdClose className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// Custom useToast hook implementation
const useCustomToast = () => {
  const [toasts, setToasts] = useState([]);

  const toast = ({ title, description, variant = "default", duration = 5000 }) => {
    const id = Date.now().toString();
    const newToast = { id, title, description, variant, duration };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return {
    toast,
    toasts,
    removeToast
  };
};

export const MedicalAppointments = () => {
  // Replace useToast with our custom implementation
  const { toast, toasts, removeToast } = useCustomToast();

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPrescribeModal, setShowPrescribeModal] = useState(false);
  const [showViewPrescriptionModal, setShowViewPrescriptionModal] = useState(false);
  const [viewHistoryPatient, setViewHistoryPatient] = useState(null);
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

  // Simplified showToast function
  const showToast = (title, description, variant = "default") => {
    console.log("Showing toast:", { title, description, variant });
    toast({
      title,
      description,
      variant,
      duration: 5000,
    });
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

  // FIXED: Enhanced fetchAppointments function with proper date validation
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

      // Helper function to safely parse dates - FIXED FOR ARRAY FORMAT
      const parseDateTime = (dateTimeValue) => {
        if (!dateTimeValue) return null;
        
        try {
          let parsedDate;
          
          // Handle array format [year, month, day, hour, minute]
          if (Array.isArray(dateTimeValue) && dateTimeValue.length >= 3) {
            const [year, month, day, hour = 0, minute = 0] = dateTimeValue;
            // Note: JavaScript Date constructor expects month to be 0-indexed (0-11)
            // But your data appears to use 1-indexed months (1-12)
            parsedDate = new Date(year, month - 1, day, hour, minute);
          }
          // Handle string format
          else if (typeof dateTimeValue === 'string') {
            parsedDate = new Date(dateTimeValue);
          }
          // Handle Date object
          else if (dateTimeValue instanceof Date) {
            parsedDate = dateTimeValue;
          }
          // Try to convert other formats
          else {
            parsedDate = new Date(dateTimeValue);
          }
          
          // Validate the parsed date
          if (isNaN(parsedDate.getTime())) {
            console.warn("Invalid date value:", dateTimeValue);
            return null;
          }
          
          return parsedDate;
        } catch (error) {
          console.warn("Error parsing date:", dateTimeValue, error);
          return null;
        }
      };

      // Helper function to format time safely
      const formatTime = (dateTime) => {
        if (!dateTime) return "12:00 AM";
        
        try {
          return dateTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
        } catch (error) {
          console.warn("Error formatting time:", dateTime, error);
          return "12:00 AM";
        }
      };

      // Helper function to format date safely
      const formatDate = (dateTime) => {
        if (!dateTime) return new Date().toISOString().split("T")[0];
        
        try {
          return dateTime.toISOString().split("T")[0];
        } catch (error) {
          console.warn("Error formatting date:", dateTime, error);
          return new Date().toISOString().split("T")[0];
        }
      };

      // Transform all appointments to consistent format with FIXED date handling
      const transformedAppointments = allFetchedAppointments.map((apt, index) => {
        try {
          let appointmentDate = null;
          let appointmentTime = "12:00 AM";
          
          // Try to parse appointmentDateTime first
          if (apt.appointmentDateTime) {
            const parsedDateTime = parseDateTime(apt.appointmentDateTime);
            if (parsedDateTime) {
              appointmentDate = formatDate(parsedDateTime);
              appointmentTime = formatTime(parsedDateTime);
              console.log(`Parsed appointment ${apt.appointmentId || apt.id}: ${appointmentDate} ${appointmentTime}`);
            }
          }
          
          // If no valid appointmentDateTime, try individual date and time fields
          if (!appointmentDate && apt.date) {
            const parsedDate = parseDateTime(apt.date);
            if (parsedDate) {
              appointmentDate = formatDate(parsedDate);
              // Keep the parsed time from appointmentDateTime or use existing time
              if (appointmentTime === "12:00 AM" && apt.time) {
                appointmentTime = apt.time;
              }
            }
          }
          
          // Use existing time if available and we haven't set a proper time yet
          if (apt.time && appointmentTime === "12:00 AM") {
            appointmentTime = apt.time;
          }
          
          // Fallback to current date if nothing works
          if (!appointmentDate) {
            console.warn(`No valid date found for appointment ${apt.appointmentId || apt.id || index}, using current date`);
            appointmentDate = new Date().toISOString().split("T")[0];
          }

          return {
            ...apt,
            date: appointmentDate,
            time: appointmentTime,
            status: apt.status?.toLowerCase() || "pending",
          };
        } catch (error) {
          console.error(`Error transforming appointment ${apt.appointmentId || apt.id || index}:`, error);
          console.error("Problematic appointment data:", apt);
          
          // Return a safe fallback appointment
          return {
            ...apt,
            date: new Date().toISOString().split("T")[0],
            time: "12:00 AM",
            status: apt.status?.toLowerCase() || "pending",
          };
        }
      });

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
      console.log("Sample transformed appointment:", uniqueAppointments[0]);
      
      setAllAppointments(uniqueAppointments);

    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAllAppointments([]);
      showToast(
        "Error",
        "Failed to fetch appointments. Please refresh the page.",
        "destructive"
      );
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
      showToast(
        "Cannot Edit Prescription",
        "Prescriptions cannot be edited for canceled appointments.",
        "destructive"
      );
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
        showToast(
          "No Prescription Found",
          "No prescription exists for this appointment to edit.",
          "destructive"
        );
      }
    } catch (error) {
      console.error("Error fetching prescription for edit:", error);
      showToast(
        "Error",
        "Failed to fetch prescription for editing. Please try again.",
        "destructive"
      );
    }
  };

  const handleEditPrescriptionSuccess = async (updatedPrescription) => {
    console.log("Prescription updated successfully:", updatedPrescription);

    showToast(
      "Success",
      "Prescription updated successfully!",
      "success"
    );

    // Close modal
    setShowEditPrescriptionModal(false);
    setEditPrescriptionData(null);

    // Add a small delay before refreshing
    setTimeout(async () => {
      await fetchAppointments();
    }, 1000);
  };

  const handleViewHistory = (appointment) => {
    const patientId = appointment.patientId || appointment.patient?.id;
    const patientName = appointment.patientName || appointment.patient?.name;

    setViewHistoryPatient({ id: patientId, name: patientName });
  };

  const handleRevisitConfirm = async () => {
    if (!revisitDate || !revisitTime || !revisitReason.trim()) {
      showToast(
        "Error",
        "Please fill in all fields for the revisit appointment.",
        "destructive"
      );
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
      
      showToast(
        "Revisit Scheduled Successfully",
        `New appointment scheduled for ${
          revisitAppointment.patientName
        } on ${format(appointmentDateTime, "MMM dd, yyyy")} at ${
          newAppointmentData.time
        }.`,
        "success"
      );

      setRevisitAppointment(null);
      setRevisitDate("");
      setRevisitTime(null);
      setRevisitReason("");

      // Add delay before refreshing
      setTimeout(async () => {
        await fetchAppointments();
      }, 1000);

    } catch (error) {
      console.error("Error creating revisit appointment:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create revisit appointment";
      showToast(
        "Error Creating Revisit",
        errorMessage,
        "destructive"
      );
    } finally {
      setIsSubmittingRevisit(false);
    }
  };

  // FIXED: Much simpler prescription success handler
  const handlePrescriptionSuccess = async (prescription) => {
    console.log("Prescription created successfully:", prescription);

    // Show success message
    showToast(
      "Success",
      "Prescription created successfully! Appointment moved to history.",
      "success"
    );

    // Close modal
    setShowPrescribeModal(false);
    setSelectedAppointment(null);

    // Add delay before refreshing to ensure backend is updated
    setTimeout(async () => {
      await fetchAppointments();
    }, 1000);
  };

  const handleViewPrescription = async (appointment) => {
    if (isAppointmentCanceled(appointment)) {
      showToast(
        "Cannot View Prescription",
        "Prescriptions cannot be viewed for canceled appointments.",
        "destructive"
      );
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
        showToast(
          "No Prescription Found",
          "No prescription exists for this appointment.",
          "destructive"
        );
      }
    } catch (error) {
      console.error("Error fetching prescription:", error);
      showToast(
        "Error",
        "Failed to fetch prescription. Please try again.",
        "destructive"
      );
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
      showToast(
        "Error",
        "Cannot create prescription: Patient information is missing from appointment data.",
        "destructive"
      );
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

  // UPDATED: handleCancelConfirm function with reason parameter
  const handleCancelConfirm = async () => {
    if (!cancelReason.trim()) {
      showToast(
        "Error",
        "Please provide a reason for cancellation.",
        "destructive"
      );
      return;
    }

    setIsCancelling(true);

    try {
      // ✅ FIXED: Pass the cancellation reason to the service function
      await cancelAppointmentById(
        cancelAppointment.appointmentId || cancelAppointment.id,
        cancelReason.trim()  // Pass the reason as second parameter
      );

      showToast(
        "Appointment Cancelled",
        `Appointment for ${cancelAppointment.patientName} has been cancelled. Email notification sent with reason.`,
        "success"
      );

      setCancelAppointment(null);
      setCancelReason("");

      // Add delay before refreshing
      setTimeout(async () => {
        await fetchAppointments();
      }, 1000);

    } catch (error) {
      console.error("Error cancelling appointment:", error);
      
      // Better error handling
      let errorMessage = "Failed to cancel appointment. Please try again.";
      if (error.response?.status === 400) {
        errorMessage = "Invalid cancellation reason provided.";
      } else if (error.response?.status === 404) {
        errorMessage = "Appointment not found.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      showToast(
        "Error",
        errorMessage,
        "destructive"
      );
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <CustomToast
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

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
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-sm">⚠</span>
              </div>
              <h2 className="text-lg font-semibold text-red-600">
                Cancel Appointment
              </h2>
            </div>
            
            <p className="text-sm text-gray-600">
              Please provide a reason for cancelling the appointment with{" "}
              <strong>{cancelAppointment.patientName}</strong>.
              <br />
              <span className="text-xs text-gray-500 mt-1 block">
                The patient will receive an email with this cancellation reason.
              </span>
            </p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cancellation Reason <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Please enter a detailed reason for cancellation (e.g., doctor unavailable due to emergency, facility maintenance, etc.)..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                disabled={isCancelling}
                maxLength={500}
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">
                  {cancelReason.length}/500 characters
                </span>
                {!cancelReason.trim() && (
                  <span className="text-xs text-red-500">
                    Reason is required
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                onClick={() => {
                  setCancelAppointment(null);
                  setCancelReason("");
                }}
                disabled={isCancelling}
              >
                Keep Appointment
              </button>
              <button
                className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center ${
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
                  <>
                    <span className="mr-2">📧</span>
                    Cancel & Send Email
                  </>
                )}
              </button>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
              <div className="flex">
                <span className="text-yellow-600 mr-2">💡</span>
                <div>
                  <p className="text-sm font-medium text-yellow-800">What happens next?</p>
                  <p className="text-xs text-yellow-700 mt-1">
                    The patient will receive an email notification with your cancellation reason and can reschedule if needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};