import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Filter,
  Download,
  ChevronDown,
  X,
  Loader,
  DollarSign,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";

function App() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedBillDetails, setSelectedBillDetails] = useState(null);

  useEffect(() => {
    const fetchBillingHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        let url = "/api/billing/history";
        if (selectedPatient) {
          url += `?patientId=${encodeURIComponent(selectedPatient)}`;
        }

        const response = await axios.get(url);

        console.log("API raw data:", response.data);

        if (response.data && response.data.success && response.data.data) {
          const normalizedBills = response.data.data.map((bill) => {
            console.log("Processing bill:", bill);

            const medicines = Array.isArray(bill.medicines)
              ? bill.medicines
              : [];
            const tests = Array.isArray(bill.tests) ? bill.tests : [];

            console.log("Medicines:", medicines);
            console.log("Tests:", tests);

            const items = [
              ...medicines.map((item) => ({
                name: item?.medicineName || "Unnamed Item",
                medicineName: item?.medicineName || null,
                quantity: item?.quantity || 0,
                unitPrice: item?.unitPrice ?? 0,
                totalPrice: item?.totalPrice ?? 0,
                type: item?.medicineName?.toLowerCase().includes("injection")
                  ? "injection"
                  : "medicine",
              })),
              ...tests.map((item) => ({
                name: item?.medicineName || "Unnamed Test",
                medicineName: item?.medicineName || null,
                quantity: item?.quantity || 0,
                unitPrice: item?.unitPrice ?? 0,
                totalPrice: item?.totalPrice ?? 0,
                type: "test",
              })),
            ];

            return {
              id: `${bill.appointmentId || ""}-${bill.patientId || ""}-${
                bill.createdAt || ""
              }`,
              appointmentId: bill.appointmentId || null,
              patientId: bill.patientId || null,
              patientName:
                bill.patientName || `Patient ${bill.patientId || "Unknown"}`,
              doctorName: bill.doctorName || "Unknown",
              billDate: bill.createdAt
                ? new Date(bill.createdAt).toISOString().split("T")[0]
                : new Date().toISOString().split("T")[0],
              createdAt: bill.createdAt || null,
              items,
              total: bill.totalAmount ?? 0,
              totalAmount: bill.totalAmount ?? 0,
              status: bill.status || "paid",
            };
          });

          console.log("Normalized bills set to state:", normalizedBills);
          setBills(normalizedBills);
        } else {
          setBills([]);
        }
      } catch (err) {
        console.error("Failed to fetch billing history:", err);
        setError("Failed to fetch billing history. Please try again.");
        setBills([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBillingHistory();
  }, [selectedPatient]);

  const filteredAndSortedBills = useMemo(() => {
    let filtered = bills.filter((bill) => {
      const matchesSearch =
        bill.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (bill.patientId || "").toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDateRange =
        (!dateRange.start || bill.billDate >= dateRange.start) &&
        (!dateRange.end || bill.billDate <= dateRange.end);

      const matchesPatient =
        !selectedPatient || bill.patientId === selectedPatient;

      return matchesSearch && matchesDateRange && matchesPatient;
    });

    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "date":
          aValue = new Date(a.billDate || a.createdAt || "");
          bValue = new Date(b.billDate || b.createdAt || "");
          break;
        case "amount":
          aValue = a.total || a.totalAmount || 0;
          bValue = b.total || b.totalAmount || 0;
          break;
        case "patient":
          aValue = (a.patientName || "").toLowerCase();
          bValue = (b.patientName || "").toLowerCase();
          break;
        default:
          return 0;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [bills, searchTerm, sortBy, sortOrder, dateRange, selectedPatient]);

  const totalRevenue = filteredAndSortedBills.reduce(
    (sum, bill) => sum + (bill.total || bill.totalAmount || 0),
    0
  );
  const paidBills = filteredAndSortedBills.filter(
    (bill) => bill.status === "paid"
  );
  const pendingBills = filteredAndSortedBills.filter(
    (bill) => bill.status === "pending"
  );
  const overdueBills = filteredAndSortedBills.filter(
    (bill) => bill.status === "overdue"
  );

  const exportData = () => {
    const csvContent = [
      ["Patient Name", "Patient ID", "Date", "Total", "Status", "Doctor"],
      ...filteredAndSortedBills.map((bill) => [
        bill.patientName || "",
        bill.patientId,
        bill.billDate ||
          new Date(bill.createdAt || "").toISOString().split("T")[0],
        bill.total || bill.totalAmount || 0,
        bill.status || "paid",
        bill.doctorName,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "billing-history.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "#10B981";
      case "pending":
        return "#F59E0B";
      case "overdue":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setDateRange({ start: "", end: "" });
    setSelectedPatient("");
    setSortBy("date");
    setSortOrder("desc");
  };

  const handleBillClick = (bill) => {
    console.log("Selected bill items:", bill.items);
    setSelectedBillDetails(bill);
  };

  const closeModal = () => {
    setSelectedBillDetails(null);
  };

  const refreshData = () => {
    setSelectedPatient((prev) => prev);
  };

  // Loading state - initial load
  if (loading && bills.length === 0) {
    return (
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f8fafc",
          minHeight: "100vh",
          fontFamily:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "60px 40px",
            borderRadius: "16px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            textAlign: "center",
            maxWidth: "400px",
          }}
        >
          <Loader
            size={48}
            style={{
              color: "#3B82F6",
              marginBottom: "20px",
              animation: "spin 1s linear infinite",
            }}
          />
          <h3
            style={{
              color: "#1F2937",
              fontSize: "20px",
              margin: "0 0 8px 0",
              fontWeight: "600",
            }}
          >
            Loading Billing History
          </h3>
          <p
            style={{
              color: "#6B7280",
              fontSize: "14px",
              margin: "0",
            }}
          >
            Please wait while we fetch your data...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f8fafc",
          minHeight: "100vh",
          fontFamily:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "60px 40px",
            borderRadius: "16px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            textAlign: "center",
            maxWidth: "500px",
            border: "1px solid #FEE2E2",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              backgroundColor: "#FEE2E2",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <X size={30} color="#DC2626" />
          </div>
          <h3
            style={{
              color: "#DC2626",
              fontSize: "20px",
              margin: "0 0 12px 0",
              fontWeight: "600",
            }}
          >
            Error Loading Data
          </h3>
          <p
            style={{
              color: "#6B7280",
              fontSize: "14px",
              margin: "0 0 20px 0",
              lineHeight: "1.5",
            }}
          >
            {error}
          </p>
          <button
            onClick={refreshData}
            style={{
              padding: "12px 24px",
              backgroundColor: "#3B82F6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#2563EB")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#3B82F6")
            }
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Loading overlay for subsequent loads */}
      {loading && bills.length > 0 && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            }}
          >
            <Loader
              size={24}
              style={{
                color: "#3B82F6",
                animation: "spin 1s linear infinite",
              }}
            />
            <span style={{ color: "#1F2937", fontWeight: "500" }}>
              Updating data...
            </span>
          </div>
        </div>
      )}

      {/* Analytics Cards */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {[
          {
            title: "Total Revenue",
            value: `₹${totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            color: "#10B981",
            bg: "#ECFDF5",
          },
          {
            title: "Total Bills",
            value: filteredAndSortedBills.length,
            icon: FileText,
            color: "#3B82F6",
            bg: "#EFF6FF",
          },
          {
            title: "Paid Bills",
            value: paidBills.length,
            icon: TrendingUp,
            color: "#10B981",
            bg: "#ECFDF5",
          },
          {
            title: "Pending/Overdue",
            value: pendingBills.length + overdueBills.length,
            icon: Users,
            color: "#F59E0B",
            bg: "#FFFBEB",
          },
        ].map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                padding: "24px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                border: "1px solid #e5e7eb",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "12px",
                    backgroundColor: stat.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconComponent size={24} color={stat.color} />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6B7280",
                      margin: "0 0 4px 0",
                      fontWeight: "500",
                    }}
                  >
                    {stat.title}
                  </p>
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#1F2937",
                      margin: "0",
                    }}
                  >
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters and Search */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          border: "1px solid #e5e7eb",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          {/* Search input */}
          <div style={{ position: "relative", flex: "1", minWidth: "250px" }}>
            <Search
              size={20}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#6B7280",
              }}
            />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.2s ease",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#3B82F6")}
              onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
            />
          </div>

          {/* Sort selectors */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: "12px 16px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="patient">Sort by Patient</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
              padding: "12px 16px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 20px",
              backgroundColor: "#3B82F6",
              borderRadius: "8px",
              border: "none",
              color: "white",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#2563EB")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#3B82F6")
            }
            aria-expanded={showFilters}
            aria-controls="filter-section"
          >
            <Filter size={16} />
            Filters
            <ChevronDown
              size={16}
              style={{
                transition: "transform 0.3s",
                transform: showFilters ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>

          {/* Export button */}
          <button
            onClick={exportData}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 20px",
              backgroundColor: "#10B981",
              borderRadius: "8px",
              border: "none",
              color: "white",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#059669")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#10B981")
            }
          >
            <Download size={16} />
            Export CSV
          </button>

          {/* Clear filters button */}
          <button
            onClick={clearFilters}
            style={{
              padding: "12px 20px",
              backgroundColor: "#EF4444",
              borderRadius: "8px",
              border: "none",
              color: "white",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#DC2626")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#EF4444")
            }
          >
            Clear Filters
          </button>
        </div>

        {/* Filters section */}
        {showFilters && (
          <div
            id="filter-section"
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              marginTop: "16px",
            }}
          >
            {/* Date range filters */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="start-date"
                style={{ marginBottom: "4px", fontWeight: "600" }}
              >
                Start Date
              </label>
              <input
                id="start-date"
                type="date"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, start: e.target.value }))
                }
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="end-date"
                style={{ marginBottom: "4px", fontWeight: "600" }}
              >
                End Date
              </label>
              <input
                id="end-date"
                type="date"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, end: e.target.value }))
                }
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>

            {/* Patient ID filter */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: "200px",
              }}
            >
              <label
                htmlFor="patient-id"
                style={{ marginBottom: "4px", fontWeight: "600" }}
              >
                Patient ID
              </label>
              <input
                id="patient-id"
                type="text"
                placeholder="Enter patient ID"
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Billing History Table */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          border: "1px solid #e5e7eb",
          overflowX: "auto",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: "16px",
                  borderBottom: "2px solid #e5e7eb",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#6B7280",
                  minWidth: "140px",
                }}
              >
                Patient
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "16px",
                  borderBottom: "2px solid #e5e7eb",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#6B7280",
                  minWidth: "170px",
                }}
              >
                Doctor
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "16px",
                  borderBottom: "2px solid #e5e7eb",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#6B7280",
                  minWidth: "110px",
                }}
              >
                Date
              </th>
              <th
                style={{
                  textAlign: "right",
                  padding: "16px",
                  borderBottom: "2px solid #e5e7eb",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#6B7280",
                  minWidth: "110px",
                }}
              >
                Amount
              </th>
              <th
                style={{
                  textAlign: "center",
                  padding: "16px",
                  borderBottom: "2px solid #e5e7eb",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#6B7280",
                  minWidth: "120px",
                }}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedBills.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    textAlign: "center",
                    padding: "16px",
                    color: "#9CA3AF",
                    fontWeight: "500",
                  }}
                >
                  No billing records found.
                </td>
              </tr>
            )}
            {filteredAndSortedBills.map((bill) => (
              <tr
                key={bill.id}
                style={{
                  cursor: "pointer",
                  borderBottom: "1px solid #e5e7eb",
                  transition: "background-color 0.2s ease",
                }}
                onClick={() => handleBillClick(bill)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#F3F4F6")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleBillClick(bill);
                  }
                }}
                aria-label={`View details for bill of ${
                  bill.patientName
                }, date ${bill.billDate}, amount ₹${
                  bill.total || bill.totalAmount
                }`}
              >
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ fontWeight: "600", color: "#1F2937" }}>
                    {bill.patientName}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6B7280" }}>
                    {bill.patientId}
                  </div>
                </td>
                <td style={{ padding: "12px 16px", color: "#374151" }}>
                  {bill.doctorName}
                </td>
                <td style={{ padding: "12px 16px", color: "#374151" }}>
                  {bill.billDate}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    textAlign: "right",
                    fontWeight: "600",
                  }}
                >
                  ₹{(bill.total || bill.totalAmount || 0).toLocaleString()}
                </td>
                <td style={{ padding: "12px 16px", textAlign: "center" }}>
                  <span
                    style={{
                      color: "white",
                      backgroundColor: getStatusColor(bill.status),
                      borderRadius: "9999px",
                      padding: "4px 12px",
                      fontSize: "12px",
                      fontWeight: "600",
                      textTransform: "capitalize",
                      display: "inline-block",
                      minWidth: "70px",
                    }}
                    aria-label={`Status: ${bill.status}`}
                  >
                    {bill.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Billing Details Modal */}
      {selectedBillDetails && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="bill-details-title"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3000,
            padding: "20px",
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "80vh",
              overflowY: "auto",
              padding: "24px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              aria-label="Close bill details"
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#6B7280",
                fontSize: "20px",
              }}
            >
              <X size={24} />
            </button>

            <h2
              id="bill-details-title"
              style={{
                marginBottom: "16px",
                fontWeight: "700",
                fontSize: "20px",
                color: "#1F2937",
              }}
            >
              Billing Details - {selectedBillDetails.patientName}
            </h2>

            <p>
              <strong>Patient ID:</strong> {selectedBillDetails.patientId}
            </p>
            <p>
              <strong>Doctor:</strong> {selectedBillDetails.doctorName}
            </p>
            <p>
              <strong>Date:</strong> {selectedBillDetails.billDate}
            </p>

            <h3 style={{ marginTop: "24px", fontWeight: "600" }}>
              Items (Medicines & Tests)
            </h3>

            {selectedBillDetails.items.length === 0 ? (
              <p>No items found for this bill.</p>
            ) : (
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "12px",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "8px",
                        borderBottom: "1px solid #e5e7eb",
                        fontWeight: "600",
                      }}
                    >
                      Name
                    </th>
                    <th
                      style={{
                        textAlign: "right",
                        padding: "8px",
                        borderBottom: "1px solid #e5e7eb",
                        fontWeight: "600",
                        width: "80px",
                      }}
                    >
                      Qty
                    </th>
                    <th
                      style={{
                        textAlign: "right",
                        padding: "8px",
                        borderBottom: "1px solid #e5e7eb",
                        fontWeight: "600",
                        width: "100px",
                      }}
                    >
                      Unit Price
                    </th>
                    <th
                      style={{
                        textAlign: "right",
                        padding: "8px",
                        borderBottom: "1px solid #e5e7eb",
                        fontWeight: "600",
                        width: "120px",
                      }}
                    >
                      Total Price
                    </th>
                    <th
                      style={{
                        textAlign: "center",
                        padding: "8px",
                        borderBottom: "1px solid #e5e7eb",
                        fontWeight: "600",
                        width: "100px",
                      }}
                    >
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBillDetails.items.map((item, idx) => (
                    <tr key={`${item.medicineName || item.name}-${idx}`}>
                      <td style={{ padding: "8px", color: "#374151" }}>
                        {item.name}
                      </td>
                      <td style={{ padding: "8px", textAlign: "right" }}>
                        {item.quantity || "-"}
                      </td>
                      <td style={{ padding: "8px", textAlign: "right" }}>
                        ₹{item.unitPrice?.toLocaleString() || "-"}
                      </td>
                      <td style={{ padding: "8px", textAlign: "right" }}>
                        ₹{item.totalPrice?.toLocaleString() || "-"}
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          textAlign: "center",
                          textTransform: "capitalize",
                          color:
                            item.type === "medicine"
                              ? "#10B981"
                              : item.type === "test"
                              ? "#3B82F6"
                              : item.type === "injection"
                              ? "#F59E0B"
                              : "#6B7280",
                          fontWeight: "600",
                        }}
                      >
                        {item.type}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <h3
              style={{
                marginTop: "24px",
                fontWeight: "700",
                fontSize: "18px",
                textAlign: "right",
              }}
            >
              Total: ₹
              {(
                selectedBillDetails.total ||
                selectedBillDetails.totalAmount ||
                0
              ).toLocaleString()}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
