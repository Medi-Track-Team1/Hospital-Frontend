import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";


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
} from "react-icons/md";
import { AppointmentCard } from "./AppointmentCard";
import { PatientDetailsModal } from "./PatientDetailsModal";
import { RescheduleModal } from "./RescheduleModal";
import { useToast } from "../../hooks/DoctorPanelHooks/use-toast";
import PrescribeModal from "./PrescribeModal";

export const MedicalAppointments = () => {
  const { toast } = useToast();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPrescribeModal, setShowPrescribeModal] = useState(false);
  const [viewHistoryPatient, setViewHistoryPatient] = useState(null);
  const navigate = useNavigate();
  const [rescheduleAppointment, setRescheduleAppointment] = useState(null);
  const [cancelAppointment, setCancelAppointment] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      patient: {
        name: "Sarah Johnson",
        type: "in-person",
        patientId: "P1-2024-001",
        dateOfBirth: "March 15, 1990",
        age: 34,
        gender: "Female",
        bloodType: "A+",
        maritalStatus: "Married",
        phone: "(555) 123-4567",
        email: "sarah.johnson@email.com",
        address: "123 Main Street, Springfield, IL 62701",
        occupation: "Software Engineer",
        language: "English"
      },
      dateTime: "Today 09:00 AM",
      duration: "30 min",
      type: "Consultation",
      reason: "Hypertension follow-up",
      priority: "high",
      status: "pending",
      isAccepted: false
    },
    {
      id: "2",
      patient: {
        name: "Michael Chen",
        type: "video-call",
        patientId: "P1-2024-002",
        dateOfBirth: "July 22, 1985",
        age: 39,
        gender: "Male",
        bloodType: "B+",
        maritalStatus: "Single",
        phone: "(555) 234-5678",
        email: "michael.chen@email.com",
        address: "456 Oak Avenue, Springfield, IL 62702",
        occupation: "Marketing Manager",
        language: "English"
      },
      dateTime: "Today 10:30 AM",
      duration: "45 min",
      type: "Check-up",
      reason: "Diabetes management",
      priority: "medium",
      status: "accepted",
      isAccepted: true
    },
    {
      id: "3",
      patient: {
        name: "Jennifer Wilson",
        type: "video-call",
        patientId: "P1-2024-003",
        dateOfBirth: "November 8, 1992",
        age: 32,
        gender: "Female",
        bloodType: "O-",
        maritalStatus: "Married",
        phone: "(555) 345-6789",
        email: "jennifer.wilson@email.com",
        address: "789 Pine Street, Springfield, IL 62703",
        occupation: "Teacher",
        language: "English"
      },
      dateTime: "Tomorrow 10:00 AM",
      duration: "30 min",
      type: "Consultation",
      reason: "General checkup",
      priority: "low",
      status: "pending",
      isAccepted: false
    },
    {
      id: "4",
      patient: {
        name: "Robert Davis",
        type: "in-person",
        patientId: "P1-2024-004",
        dateOfBirth: "April 12, 1978",
        age: 46,
        gender: "Male",
        bloodType: "AB+",
        maritalStatus: "Divorced",
        phone: "(555) 456-7890",
        email: "robert.davis@email.com",
        address: "321 Elm Street, Springfield, IL 62704",
        occupation: "Accountant",
        language: "English"
      },
      dateTime: "Jan 25 11:30 AM",
      duration: "60 min",
      type: "Surgery Consultation",
      reason: "Knee surgery consultation",
      priority: "high",
      status: "pending",
      isAccepted: false
    }
  ]);

  const [appointmentHistory] = useState([
    {
      id: "h1",
      patient: {
        name: "Emily Rodriguez",
        type: "in-person",
        patientId: "P1-2024-005",
        dateOfBirth: "September 3, 1988",
        age: 36,
        gender: "Female",
        bloodType: "A-",
        maritalStatus: "Married",
        phone: "(555) 567-8901",
        email: "emily.rodriguez@email.com",
        address: "654 Maple Drive, Springfield, IL 62705",
        occupation: "Nurse",
        language: "English"
      },
      dateTime: "Jan 15 02:00 PM",
      duration: "60 min",
      type: "Therapy",
      reason: "Anxiety counseling",
      priority: "medium",
      status: "completed",
      isAccepted: true
    },
    {
      id: "h2",
      patient: {
        name: "David Thompson",
        type: "in-person",
        patientId: "P1-2024-006",
        dateOfBirth: "December 17, 1975",
        age: 49,
        gender: "Male",
        bloodType: "O+",
        maritalStatus: "Married",
        phone: "(555) 678-9012",
        email: "david.thompson@email.com",
        address: "987 Cedar Lane, Springfield, IL 62706",
        occupation: "Engineer",
        language: "English"
      },
      dateTime: "Jan 14 03:30 PM",
      duration: "30 min",
      type: "Follow-up",
      reason: "Arthritis treatment review",
      priority: "low",
      status: "completed",
      isAccepted: true
    },
    {
      id: "h3",
      patient: {
        name: "Maria Garcia",
        type: "video-call",
        patientId: "P1-2024-007",
        dateOfBirth: "May 25, 1993",
        age: 31,
        gender: "Female",
        bloodType: "B-",
        maritalStatus: "Single",
        phone: "(555) 789-0123",
        email: "maria.garcia@email.com",
        address: "147 Birch Road, Springfield, IL 62707",
        occupation: "Graphic Designer",
        language: "Spanish"
      },
      dateTime: "Jan 12 07:00 PM",
      duration: "45 min",
      type: "Consultation",
      reason: "Blood pressure monitoring",
      priority: "medium",
      status: "completed",
      isAccepted: true
    }
  ]);

  const handleAccept = (appointmentId) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId
          ? { ...apt, status: "accepted", isAccepted: true }
          : apt
      )
    );

    toast({
      title: "Appointment Accepted",
      description: "The appointment has been successfully accepted.",
    });
  };

  const handleReschedule = (appointmentId) => {
    const appointment = appointments.find((apt) => apt.id === appointmentId);
    if (appointment) {
      setRescheduleAppointment(appointment);
    }
  };

  const handleRescheduleConfirm = (appointmentId, newDate, newTime) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId
          ? {
              ...apt,
              dateTime: `${format(newDate, "MMM dd")} ${newTime}`,
              status: "pending",
              isAccepted: false,
            }
          : apt
      )
    );

    toast({
      title: "Appointment Rescheduled",
      description: `Appointment has been rescheduled to ${format(
        newDate,
        "MMM dd"
      )} at ${newTime}.`,
    });
  };

  
  const getStatusBadge = (status) => {
    const variants = {
      pending: "bg-orange-100 text-orange-700 border-orange-200",
      accepted: "bg-blue-100 text-blue-700 border-blue-200",
      completed: "bg-green-100 text-green-700 border-green-200",
    };
    return variants[status] || variants.pending;
  };

  return (
    <div className="min-h-screen bg-background p-100">

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
                        
                    
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appointment) => (
                        <tr key={appointment.id} className="border-b hover:bg-muted/50">
                          <td className="p-2 text-sm">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                <MdPerson className="h-4 w-4 text-primary-foreground" />
                              </div>
                              <div>
                                <p className="font-medium">{appointment.patient.name}</p>
                               
                              </div>
                            </div>
                          </td>
                          <td className="p-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <MdSchedule className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="font-medium">{appointment.dateTime}</p>
                               
                              </div>
                            </div>
                          </td>
                          
                          <td className="p-3 text-sm">{appointment.reason}</td>
                          
                          
                          <td className="p-2 text-sm">
                            <div className="flex items-center space-x-2">
                            
                              
                              <Button
  size="sm"
  variant="outline"
  className="text-xs"
  onClick={() => setShowPrescribeModal(true)}
  
>
  <MdDescription className="h-3 w-3 mr-1" />
  Prescription
</Button>
<Button
                                size="sm"
                                variant="outline"
                                onClick={() => navigate("/doctor-panel/patienthistory")}
                                className="text-xs"
                              >
                                <MdVisibility className="h-3 w-3 mr-1" />
                                View History
                              </Button>

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
                       
                        
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointmentHistory.map((appointment) => (
                        <tr key={appointment.id} className="border-b hover:bg-muted/50">
                          <td className="p-2 text-sm">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                <MdPerson className="h-4 w-4 text-primary-foreground" />
                              </div>
                              <div>
                                <p className="font-medium">{appointment.patient.name}</p>
                                
                              </div>
                            </div>
                          </td>
                          <td className="p-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <MdSchedule className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="font-medium">{appointment.dateTime}</p>
                                
                              </div>
                            </div>
                          </td>
                          
                          <td className="p-3 text-sm">{appointment.reason}</td>
                          
                         
                          <td className="p-2 text-sm">
                            <div className="flex items-center space-x-2">
                              
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs"
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
          patientName={rescheduleAppointment.patient.name}
        />
      )}
      {showPrescribeModal && (
  <PrescribeModal
    isOpen={showPrescribeModal}
    onClose={() => setShowPrescribeModal(false)}
  />
)}

{cancelAppointment && (
  <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 space-y-4">
      <h2 className="text-lg font-semibold text-red-600">Cancel Appointment</h2>
      <p className="text-sm text-gray-600">
        Please provide a reason for cancelling the appointment with <strong>{cancelAppointment.patient.name}</strong>.
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
          onClick={() => setCancelAppointment(null)}
        >
          Close
        </button>
        <button
          className={`px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ${
            !cancelReason.trim() ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!cancelReason.trim()}
          onClick={() => {
            // Add your cancellation logic here
            console.log("Cancelled appointment:", cancelAppointment);
            console.log("Reason:", cancelReason);
            
            setCancelAppointment(null);
            setCancelReason("");
          }}
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