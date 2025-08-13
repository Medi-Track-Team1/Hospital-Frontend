// components/SummaryCards.jsx
import React from "react";
import { FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";

const SummaryCards = ({ filteredPrescriptions }) => {
  const cards = [
    {
      title: "Total Prescriptions",
      value: filteredPrescriptions.length,
      icon: FileText,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Paid Bills",
      value: filteredPrescriptions.filter(
        (p) => p.billing.paymentStatus === "paid"
      ).length,
      icon: CheckCircle,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Pending Bills",
      value: filteredPrescriptions.filter(
        (p) => p.billing.paymentStatus === "pending"
      ).length,
      icon: Clock,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Overdue Bills",
      value: filteredPrescriptions.filter(
        (p) => p.billing.paymentStatus === "overdue"
      ).length,
      icon: AlertCircle,
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 ${card.bgColor} rounded-lg`}>
                <IconComponent className={card.iconColor} size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;