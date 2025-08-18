// PatientHistory.jsx - Final Cleaned Up (All Records Only)
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Header from "./Header";
import SearchAndFilters from "./SearchAndFilters";
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

  // Load prescriptions (all records for patient)
  useEffect(() => {
    const fetchPrescriptions = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with actual API call using patientId
        // const response = await fetch(`/api/prescriptions/patient/${patientId}`);
        // const data = await response.json();

        // For now, using mock data - filter by patientId if needed
        const patientPrescriptions = mockPrescriptions.filter(
          (p) => p.patientId === patientId || !p.patientId // fallback for mock data
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

  // Apply search & filters (all records only)
  useEffect(() => {
    let filtered = prescriptions;

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
  }, [prescriptions, searchQuery, filters]);

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
        

        {/* Patient History Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Medical History
          </h1>
          <p className="text-gray-600">Patient ID: {patientId}</p>
        </div>

        {/* Search + Filters */}
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

        {/* ✅ All Records Title (below filters, above table) */}
        <div className="mt-6 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            All Medical Records
          </h2>
        </div>

        {/* Prescription Table */}
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
