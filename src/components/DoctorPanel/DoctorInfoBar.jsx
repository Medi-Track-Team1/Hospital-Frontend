import React from "react";

const DoctorInfoBar = () => {
  return (
    <div className="w-full bg-white shadow-sm py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6">
        <img
          src="/doctor.jpg"
          alt="Dr. Sravani"
          className="w-32 h-32 md:w-40 md:h-40 rounded-lg object-cover shadow-md"
        />
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Dr. Sravani
          </h2>
          <p className="text-base font-medium text-blue-600 mb-1">
            Chief Executive Officer, Joint Managing Director, Head, Consultant
          </p>
          <p className="text-sm text-gray-700 leading-relaxed max-w-2xl">
            MBBS, MS (General Surgery), DNB (General Surgery), DNB (Surgical Gastroenterology), Fellowship in Bariatric Surgery, Ph.D., FACS, FALS, FMAS, FICS, FIBC
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfoBar;
