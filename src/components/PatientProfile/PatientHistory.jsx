// PatientHistory.jsx - Updated with patientId support
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Search, X, Filter, Calendar, Stethoscope } from "lucide-react";

import Header from "./Header";
import SearchAndFilters from "./SearchAndFilters";
import TabNavigation from "./TabNavigation";
import SummaryCards from "./SummaryCards";
import PrescriptionTable from "./PrescriptionTable";
import PrescriptionModal from "./PrescriptionModal";
import BillingModal from "./BillingModal";
import FilterPanel from "./FilterPanel";
import { mockPrescriptions } from "../../data/mockData";
import { searchPrescriptions } from "../../Utils/SearchUtils";

const PatientHistory = () => {
  const navigate = useNavigate();
  const { patientId } = useParams(); // Get patientId from URL parameters
  
  const [prescriptions, setPrescriptions] = useState([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    selectedDate: "",
    selectedDoctor: "",
    selectedDepartment: "",
    selectedPaymentStatus: "",
    dateRange: { start: "", end: "" },
  });

  // Load prescriptions
  useEffect(() => {
    const fetchPrescriptions = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with actual API call using patientId
        // const response = await fetch(`/api/prescriptions/patient/${patientId}`);
        // const data = await response.json();
        
        // For now, using mock data - filter by patientId if needed
        const patientPrescriptions = mockPrescriptions.filter(p => 
          p.patientId === patientId || !p.patientId // fallback for mock data
        );
        
        setPrescriptions(patientPrescriptions);
        setFilteredPrescriptions(patientPrescriptions);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (patientId) {
      fetchPrescriptions();
    }
  }, [patientId]);

  // Filter prescriptions based on active tab, search query, and filters
  useEffect(() => {
    let filtered = prescriptions;

    // Filter by status first
    if (activeTab !== "all") {
      filtered = filtered.filter((p) => p.status === activeTab);
    }

    // Apply search and advanced filters
    filtered = searchPrescriptions(filtered, searchQuery, filters);

    // Apply payment status filter
    if (filters.selectedPaymentStatus) {
      filtered = filtered.filter(
        (prescription) =>
          prescription.billing.paymentStatus === filters.selectedPaymentStatus
      );
    }

    setFilteredPrescriptions(filtered);
  }, [prescriptions, activeTab, searchQuery, filters]);

  const handleViewDetails = (prescription) => {
    setSelectedPrescription(prescription);
    setIsModalOpen(true);
  };

  const handleViewBilling = (prescription) => {
    setSelectedPrescription(prescription);
    setIsBillingModalOpen(true);
  };

  const handleDateClick = (date) => {
    setFilters((prev) => ({
      ...prev,
      selectedDate: date,
    }));
  };

  // Handle back navigation to patient profile
  const handleBackToProfile = () => {
    navigate(`/patient/${patientId}`);
  };

  const activeFiltersCount = Object.values(filters).filter((value) =>
    typeof value === "object" ? value.start || value.end : value
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header navigate={navigate} />

      <div className="max-w-7xl mx-auto p-6">
        {/* Back to Profile Button */}
        <div className="mb-6">
          <button
            onClick={handleBackToProfile}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Profile
          </button>
        </div>

        {/* Patient History Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical History</h1>
          <p className="text-gray-600">Patient ID: {patientId}</p>
        </div>

        <SearchAndFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filters={filters}
          setFilters={setFilters}
          filteredPrescriptions={filteredPrescriptions}
          prescriptions={prescriptions}
          activeFiltersCount={activeFiltersCount}
          setIsFilterPanelOpen={setIsFilterPanelOpen}
        />

        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          prescriptions={prescriptions}
          filteredPrescriptions={filteredPrescriptions}
        />

        <SummaryCards filteredPrescriptions={filteredPrescriptions} />

        <PrescriptionTable
          isLoading={isLoading}
          filteredPrescriptions={filteredPrescriptions}
          searchQuery={searchQuery}
          activeFiltersCount={activeFiltersCount}
          filters={filters}
          setFilters={setFilters}
          handleViewDetails={handleViewDetails}
          handleViewBilling={handleViewBilling}
          handleDateClick={handleDateClick}
        />
      </div>

      {/* Modals */}
      {isModalOpen && selectedPrescription && (
        <PrescriptionModal
          prescription={selectedPrescription}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      
      {isBillingModalOpen && selectedPrescription && (
        <BillingModal
          prescription={selectedPrescription}
          onClose={() => setIsBillingModalOpen(false)}
        />
      )}
      
      {isFilterPanelOpen && (
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          prescriptions={prescriptions}
          isOpen={isFilterPanelOpen}
          onClose={() => setIsFilterPanelOpen(false)}
        />
      )}
    </div>
  );
};

export default PatientHistory;