// components/Header.jsx
import React from "react";
import { ArrowLeft } from "lucide-react";

const Header = ({ navigate }) => {
  return (
    <div className="bg-[#097DD1] text-white px-4 py-3 shadow-md">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center p-3 rounded-lg border border-transparent hover:border-blue-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-blue-600"
        >
          <ArrowLeft size={20} color="white" />
        </button>
        <div>
          <h1 className="text-lg font-semibold">Patient History</h1>
          <p className="text-sm text-white/80">
            Comprehensive medical prescription records with detailed billing
            management, advanced search, and direct PDF downloads
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;