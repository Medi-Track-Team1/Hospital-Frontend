import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useNavigate, useParams } from "react-router-dom";
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
  
  const [appointments, setAppointments] = useState([]);

  const [appointmentHistory,setAppointmentHistory] = useState([]);
const { id: doctorId } = useParams();

  useEffect(() => {
    if (doctorId) {
      listAppointmentsByDoctorId(doctorId)
        .then((res) => {
          const data = res.data;
          setAppointments(Array.isArray(data) ? data : data.appointments || []);
        })
        .catch(() => setAppointments([]));

      listCompletedAppointmentsByDoctorId(doctorId)
        .then((res) => {
          const data = res.data;
          setAppointmentHistory(Array.isArray(data) ? data : data.appointments || []);
        })
        .catch(() => setAppointmentHistory([]));
    }
  }, [doctorId]);
  

  
  

   

  
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
                                <p className="font-medium">{appointment.patientName}</p>
                               
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
                                <p className="font-medium">{appointment.patientName}</p>
                                
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