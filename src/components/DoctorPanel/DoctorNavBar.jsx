import React, { useState } from "react";
import { MdAccountCircle } from "react-icons/md";

const DoctorNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight font-serif">
          Doctor Panel
        </h1>
        <div
          className="relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <MdAccountCircle className="text-3xl cursor-pointer" />

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-28 bg-white text-black shadow-lg rounded-md overflow-hidden">
              <button
                onClick={() => alert("Signing out...")}
                className="block w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
              >
                Signout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DoctorNavbar;
