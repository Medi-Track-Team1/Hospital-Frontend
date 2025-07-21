import React, { useState, useEffect, useRef } from "react";
import {
  LogIn,
  LogOut,
  User,
} from "lucide-react";

const MedilabHeader = () => {
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
  const [departmentsTimeout, setDepartmentsTimeout] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  const departments = [
    { name: "Cardiology", link: "/departments/cardiology" },
    { name: "Neurology", link: "/departments/neurology" },
    { name: "Hepatology", link: "/departments/hepatology" },
    { name: "Pediatrics", link: "#pediatrics" },
    { name: "Eye Care", link: "#eye-care" },
    { name: "Dental Care", link: "#dental-care" },
    { name: "Fertility", link: "/departments/fertility" },
    { name: "Psychology", link: "/departments/psychology" }
    
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (departmentsTimeout) clearTimeout(departmentsTimeout);
    };
  }, [departmentsTimeout]);

  const handleLoginClick = () => {
    setIsLoggedIn(true);
    setProfileDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    setProfileDropdownOpen(false);
  };

  const navLinkClass =
    "text-blue-100 hover:text-white hover:bg-blue-700 rounded-md px-2 py-1 transition duration-200";

  return (
    <div className="fixed top-0 left-0 w-full z-50 scroll-smooth">
      <nav className="bg-blue-600 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-white">MediTrack</h1>

            {/* Navbar links */}
            <div className="flex items-center space-x-6">
              <a href="/#hero" className={navLinkClass}>
                Home
              </a>
              <a href="/#about" className={navLinkClass}>
                About
              </a>
              <a href="/#services" className={navLinkClass}>
                Services
              </a>

              {/* Departments dropdown */}
              <div
                className="relative"
                onMouseEnter={() => {
                  if (departmentsTimeout) clearTimeout(departmentsTimeout);
                  setIsDepartmentsOpen(true);
                }}
                onMouseLeave={() => {
                  const timeout = setTimeout(() => {
                    setIsDepartmentsOpen(false);
                  }, 200);
                  setDepartmentsTimeout(timeout);
                }}
              >
                <a href="#departments" className={navLinkClass}>
                  Departments
                </a>
                {isDepartmentsOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-10 transition-all duration-200 ease-in-out">
                    {departments.map((dept, idx) => (
                      <a
                        key={idx}
                        href={dept.link}
                        className="block px-4 py-2 text-sm text-black hover:bg-blue-50 hover:text-blue-600"
                      >
                        {dept.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a href="/#doctors" className={navLinkClass}>
                Doctors
              </a>
              <a href="/#contact" className={navLinkClass}>
                Contact
              </a>
              <a
                href="/#appointment"
                className="text-white font-medium hover:text-gray-100 hover:underline transition duration-200"
              >
                Make Appointment
              </a>
            </div>

            {/* Login / Profile button */}
            <div className="relative" ref={profileRef}>
              {isLoggedIn ? (
                <div>
                  <button
                    onClick={() =>
                      setProfileDropdownOpen(!profileDropdownOpen)
                    }
                    className="px-4 py-2 bg-white text-blue-600 rounded-full hover:bg-blue-100 flex items-center transition duration-200"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </button>
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-md rounded-md z-50">
                      <button
                        onClick={handleLogoutClick}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <LogOut className="w-4 h-4 inline mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="px-4 py-2 bg-white text-blue-600 rounded-full hover:bg-blue-100 flex items-center transition duration-200"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MedilabHeader;
