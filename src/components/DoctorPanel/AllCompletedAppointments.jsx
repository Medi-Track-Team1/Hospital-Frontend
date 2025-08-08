import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdPerson,
  MdSchedule,
  MdDescription,
  MdSearch,
  MdFilterList,
  MdCheckCircle,
  MdClose,
} from "react-icons/md";
import { useToast } from "../../hooks/DoctorPanelHooks/use-toast";
import ViewPrescriptionModal from "./ViewPrescriptionModal";
import { getPrescriptionByAppointmentId } from '../../services/DoctorPanel/PrescriptionService';
import axios from 'axios';

export const AllCompletedAppointments = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [allCompletedAppointments, setAllCompletedAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedDateRange, setSelectedDateRange] = useState("all");
  const [showViewPrescriptionModal, setShowViewPrescriptionModal] = useState(false);
  const [currentPrescription, setCurrentPrescription] = useState(null);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchAllCompletedAppointments();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedDepartment, selectedDateRange, allCompletedAppointments]);

  // Fetch all completed appointments from all doctors
  const fetchAllCompletedAppointments = async () => {
    try {
      setLoading(true);
      
      // API endpoint to get all completed appointments (you'll need to create this endpoint)
      const response = await axios.get(
        'https://doctorpanel-backend.onrender.com/api/appointments/completed/all'
      );
      
      const appointments = response.data || [];
      console.log("All completed appointments:", appointments);
      
      setAllCompletedAppointments(appointments);
      
      // Extract unique departments for filter
      const uniqueDepartments = [...new Set(appointments.map(apt => apt.department))];
      setDepartments(uniqueDepartments);
      
    } catch (error) {
      console.error("Error fetching all completed appointments:", error);
      toast({
        title: "Error",
        description: "Failed to fetch completed appointments. Please try again.",
        variant: "destructive",
      });
      setAllCompletedAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  // Apply search and filter logic
  const applyFilters = () => {
    let filtered = [...allCompletedAppointments];

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(apt => 
        apt.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.appointmentId?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Department filter
    if (selectedDepartment !== "all") {
      filtered = filtered.filter(apt => apt.department === selectedDepartment);
    }

    // Date range filter
    if (selectedDateRange !== "all") {
      const today = new Date();
      const filterDate = new Date();
      
      switch (selectedDateRange) {
        case "week":
          filterDate.setDate(today.getDate() - 7);
          break;
        case "month":
          filterDate.setMonth(today.getMonth() - 1);
          break;
        case "3months":
          filterDate.setMonth(today.getMonth() - 3);
          break;
        default:
          filterDate.setFullYear(1900); // Show all
      }
      
      filtered = filtered.filter(apt => {
        const aptDate = new Date(apt.date);
        return aptDate >= filterDate;
      });
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => {
      const aDateTime = new Date(`${a.date} ${a.time}`);
      const bDateTime = new Date(`${b.date} ${b.time}`);
      return bDateTime - aDateTime;
    });

    setFilteredAppointments(filtered);
  };

  // Handle viewing prescription
  const handleViewPrescription = async (appointment) => {
    try {
      console.log("Viewing prescription for appointment:", appointment);
      const appointmentId = appointment.appointmentId || appointment.id;
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

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDepartment("all");
    setSelectedDateRange("all");
  };

  const getRowKey = (appointment) => {
    return appointment.appointmentId || appointment._id || appointment.id;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-gray-600">Loading completed appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2"
            >
              <MdArrowBack className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Completed Appointments</h1>
              <p className="text-gray-600 mt-1">View all completed appointments across all doctors</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-lg px-3 py-1">
              <MdCheckCircle className="h-4 w-4 mr-1" />
              {filteredAppointments.length} appointments
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              
              {/* Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Search</label>
                <div className="relative">
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search patients, doctors, or appointment ID..."
                    className="w-full pl-10 pr-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Department Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Department</label>
                <select
                  className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Date Range Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Date Range</label>
                <select
                  className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="3months">Last 3 Months</option>
                </select>
              </div>

              {/* Clear Filters */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="flex items-center space-x-1"
                >
                  <MdClose className="h-4 w-4" />
                  <span>Clear</span>
                </Button>
                <Button
                  onClick={fetchAllCompletedAppointments}
                  className="flex items-center space-x-1"
                >
                  <MdFilterList className="h-4 w-4" />
                  <span>Refresh</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments Table */}
        <Card>
          <CardContent className="p-0">
            <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
              <div className="flex items-center space-x-2">
                <MdCheckCircle className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Completed Appointments History</h3>
                <Badge variant="secondary" className="ml-auto bg-white/20 text-white">
                  {filteredAppointments.length} results
                </Badge>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">Patient</th>
                    <th className="text-left p-4 font-medium">Doctor</th>
                    <th className="text-left p-4 font-medium">Department</th>
                    <th className="text-left p-4 font-medium">Date & Time</th>
                    <th className="text-left p-4 font-medium">Reason</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center p-8 text-gray-500">
                        {allCompletedAppointments.length === 0 
                          ? "No completed appointments found." 
                          : "No appointments match your search criteria."}
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((appointment) => (
                      <tr key={getRowKey(appointment)} className="border-b hover:bg-muted/50">
                        
                        {/* Patient */}
                        <td className="p-3 text-sm">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                              <MdPerson className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{appointment.patientName}</p>
                              <p className="text-xs text-gray-500">ID: {appointment.appointmentId || appointment.id}</p>
                            </div>
                          </div>
                        </td>

                        {/* Doctor */}
                        <td className="p-3 text-sm">
                          <div>
                            <p className="font-medium">{appointment.doctorName || 'Dr. Unknown'}</p>
                            <p className="text-xs text-gray-500">ID: {appointment.doctorId}</p>
                          </div>
                        </td>

                        {/* Department */}
                        <td className="p-3 text-sm">
                          <Badge variant="outline" className="text-xs">
                            {appointment.department}
                          </Badge>
                        </td>

                        {/* Date & Time */}
                        <td className="p-3 text-sm">
                          <div className="flex items-center space-x-2">
                            <MdSchedule className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{appointment.date}</p>
                              <p className="text-xs text-gray-600">{appointment.time}</p>
                            </div>
                          </div>
                        </td>

                        {/* Reason */}
                        <td className="p-3 text-sm max-w-xs">
                          <p className="truncate" title={appointment.reason}>
                            {appointment.reason}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="p-3 text-sm">
                          <Badge className="border bg-green-100 text-green-700 border-green-200">
                            Completed
                          </Badge>
                        </td>

                        {/* Actions */}
                        <td className="p-3 text-sm">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                            onClick={() => handleViewPrescription(appointment)}
                          >
                            <MdDescription className="h-3 w-3 mr-1" />
                            View Prescription
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Prescription Modal */}
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
    </div>
  );
};