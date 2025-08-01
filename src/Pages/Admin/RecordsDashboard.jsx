import { useState } from 'react';
import { HiCalendar, HiCurrencyDollar, HiUserGroup, HiChartBar, HiChevronDown, HiDownload, HiClipboardCopy } from 'react-icons/hi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RecordsDashboard = () => {
  // Date filter state
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateFilter, setDateFilter] = useState('today');
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Sample data - replace with API calls
  const [metrics, setMetrics] = useState({
    revenue: 12540,
    appointments: 328,
    newPatients: 87,
    cancellationRate: 4.2
  });

  // Sample appointment data
  const [appointments, setAppointments] = useState([
    { id: 1, patient: "John Doe", date: "2023-06-15", time: "10:00 AM", service: "Checkup", amount: 120, status: "Completed" },
    { id: 2, patient: "Jane Smith", date: "2023-06-14", time: "02:30 PM", service: "Dental Cleaning", amount: 95, status: "Completed" },
    { id: 3, patient: "Robert Johnson", date: "2023-06-14", time: "09:15 AM", service: "X-Ray", amount: 150, status: "No-show" },
    { id: 4, patient: "Sarah Williams", date: "2023-06-13", time: "11:45 AM", service: "Consultation", amount: 80, status: "Completed" },
    { id: 5, patient: "Michael Brown", date: "2023-06-12", time: "03:00 PM", service: "Surgery", amount: 450, status: "Completed" },
    { id: 6, patient: "Emily Davis", date: "2023-06-11", time: "01:30 PM", service: "Follow-up", amount: 60, status: "Cancelled" },
  ]);

  // Filter options
  const filterOptions = [
    { value: 'today', label: 'Today' },
    { value: 'lastWeek', label: 'Last Week' },
    { value: 'lastMonth', label: 'Last Month' },
    { value: 'specificDate', label: 'Specific Date' }
  ];

  // Get current filter label
  const currentFilterLabel = filterOptions.find(opt => opt.value === dateFilter)?.label;

  // Filter data by date
  const filterData = () => {
    console.log('Filtering for:', dateFilter, selectedDate);
    
    // Simulate loading
    setTimeout(() => {
      let newMetrics = { ...metrics };
      let filteredAppointments = [...appointments];
      
      switch(dateFilter) {
        case 'today':
          newMetrics = {
            revenue: 1850,
            appointments: 24,
            newPatients: 6,
            cancellationRate: 2.5
          };
          filteredAppointments = appointments.slice(0, 2);
          break;
        case 'lastWeek':
          newMetrics = {
            revenue: 8920,
            appointments: 112,
            newPatients: 28,
            cancellationRate: 3.8
          };
          filteredAppointments = appointments;
          break;
        case 'lastMonth':
          newMetrics = {
            revenue: 35400,
            appointments: 428,
            newPatients: 97,
            cancellationRate: 4.1
          };
          filteredAppointments = appointments.concat([
            { id: 7, patient: "David Wilson", date: "2023-06-10", time: "10:30 AM", service: "Checkup", amount: 120, status: "Completed" },
            { id: 8, patient: "Lisa Moore", date: "2023-06-09", time: "04:15 PM", service: "Cleaning", amount: 95, status: "Completed" }
          ]);
          break;
        case 'specificDate':
          newMetrics = {
            revenue: 2450,
            appointments: 32,
            newPatients: 8,
            cancellationRate: 3.2
          };
          filteredAppointments = appointments.slice(1, 4);
          break;
        default:
          // All time data
          newMetrics = {
            revenue: 12540,
            appointments: 328,
            newPatients: 87,
            cancellationRate: 4.2
          };
      }
      
      setMetrics(newMetrics);
      setAppointments(filteredAppointments);
    }, 500);
  };

  // Handle date filter change
  const handleDateFilterChange = (filter) => {
    setDateFilter(filter);
    setShowDropdown(false);
    if (filter !== 'specificDate') {
      setSelectedDate(null);
    }
  };

  // Export data as CSV
  const exportToCSV = () => {
    const headers = ["Patient", "Date", "Time", "Service", "Amount", "Status"];
    const csvContent = [
      headers.join(","),
      ...appointments.map(app => [
        `"${app.patient}"`,
        app.date,
        app.time,
        `"${app.service}"`,
        app.amount,
        app.status
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `appointments_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy data to clipboard
  const copyToClipboard = () => {
    const text = appointments.map(app => 
      `${app.patient}\t${app.date}\t${app.time}\t${app.service}\t$${app.amount}\t${app.status}`
    ).join("\n");
    
    navigator.clipboard.writeText(text).then(() => {
      alert("Appointment data copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Records Dashboard</h1>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              <HiCalendar className="text-gray-400 mr-2" />
              {currentFilterLabel}
              <HiChevronDown className="ml-2 h-4 w-4 text-gray-400" />
            </button>
            
            {showDropdown && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleDateFilterChange(option.value)}
                      className={`block px-4 py-2 text-sm w-full text-left ${dateFilter === option.value ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {dateFilter === 'specificDate' && (
            <div className="flex items-center border rounded-lg px-3 py-2">
              <HiCalendar className="text-gray-400 mr-2" />
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                placeholderText="Select date"
                className="focus:outline-none"
              />
            </div>
          )}
          
          <button
            onClick={filterData}
            className="px-4 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-blue-700 transition-colors"
            disabled={dateFilter === 'specificDate' && !selectedDate}
          >
            Apply Filter
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold mt-1">${metrics.revenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <HiCurrencyDollar className="w-6 h-6 text-[#2563eb]" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {dateFilter === 'today' ? 'Today' : 
             dateFilter === 'lastWeek' ? 'Last 7 days' : 
             dateFilter === 'lastMonth' ? 'Last 30 days' : 
             selectedDate ? selectedDate.toLocaleDateString() : 'All time'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Appointments</p>
              <p className="text-2xl font-bold mt-1">{metrics.appointments.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <HiUserGroup className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Completed: {Math.round(metrics.appointments * 0.92)}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">New Patients</p>
              <p className="text-2xl font-bold mt-1">{metrics.newPatients}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <HiUserGroup className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {dateFilter === 'all' ? 'Total' : 'In period'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Cancellation Rate</p>
              <p className="text-2xl font-bold mt-1">{metrics.cancellationRate}%</p>
            </div>
            <div className="p-3 bg-red-50 rounded-full">
              <HiChartBar className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Industry avg: 5.1%</p>
        </div>
      </div>

      {/* Appointments Table with Export Options */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="font-medium">Appointment Records</h3>
            <p className="text-sm text-gray-500">
              Showing {appointments.length} appointments for {dateFilter === 'today' ? 'today' : 
                           dateFilter === 'lastWeek' ? 'the last week' : 
                           dateFilter === 'lastMonth' ? 'the last month' : 
                           selectedDate ? selectedDate.toLocaleDateString() : 'all time'}
            </p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={copyToClipboard}
              className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
            >
              <HiClipboardCopy className="mr-1" /> Copy
            </button>
            <button 
              onClick={exportToCSV}
              className="flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm"
            >
              <HiDownload className="mr-1" /> Export CSV
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{appointment.patient}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${appointment.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      appointment.status === "Completed" 
                        ? "bg-green-100 text-green-800" 
                        : appointment.status === "Cancelled" 
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}>
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecordsDashboard;