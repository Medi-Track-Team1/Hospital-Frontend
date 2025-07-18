import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
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
    { name: "Cardiology", link: "/cardiology" },
    { name: "Neurology", link: "#neurology" },
    { name: "Hepatology", link: "#hepatology" },
    { name: "Pediatrics", link: "#pediatrics" },
    { name: "Eye Care", link: "#eye-care" },
    { name: "Dental Care", link: "#dental-care" },
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

  return (
    <div className="fixed top-0 left-0 w-full z-50 scroll-smooth">
      {/* Top header */}
      <div className="bg-blue-600 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span className="text-sm">contact@example.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span className="text-sm">+1 5589 55488 55</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-3">
              <Facebook className="h-4 w-4 hover:text-blue-200 cursor-pointer" />
              <Instagram className="h-4 w-4 hover:text-blue-200 cursor-pointer" />
              <Linkedin className="h-4 w-4 hover:text-blue-200 cursor-pointer" />
            </div>
            <X className="h-4 w-4 hover:text-blue-200 cursor-pointer ml-4" />
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-gray-700">MediTrack</h1>

            {/* Navbar links */}
            <div className="flex items-center space-x-8">
              <a href="#hero" className="text-blue-600 font-medium">
                Home
              </a>
              <a href="#about" className="text-gray-600 hover:text-blue-600">
                About
              </a>
              <a href="#services" className="text-gray-600 hover:text-blue-600">
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
                  }, 200); // Delay before hiding
                  setDepartmentsTimeout(timeout);
                }}
              >
                <a
                  href="#departments"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Departments
                </a>
                {isDepartmentsOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-10">
                    {departments.map((dept, idx) => (
                      <a
                        key={idx}
                        href={dept.link}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {dept.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a href="#doctors" className="text-gray-600 hover:text-blue-600">
                Doctors
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600">
                Contact
              </a>
              <a href="#appointment" className="text-gray-600 font-medium">
                Make Appointment
              </a>
            </div>

            {/* Login / Profile button */}
            <div className="relative" ref={profileRef}>
              {isLoggedIn ? (
                <div>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center"
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center"
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
