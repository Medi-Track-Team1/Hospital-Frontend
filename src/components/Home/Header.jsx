import React, { useState, useEffect, useRef } from "react";
<<<<<<< HEAD
import { LogIn, Menu, X, ChevronDown } from "lucide-react";

const Header = ({ onLoginClick }) => {
=======
import { LogIn, LogOut, User } from "lucide-react";

const Header = () => {
>>>>>>> 3d3e55c54cf5ce068e1e951c24c7379021e134f0
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [departmentsTimeout, setDepartmentsTimeout] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const departments = [
    { name: "Cardiology", link: "/departments/cardiology" },
    { name: "Neurology", link: "/departments/neurology" },
    { name: "Hepatology", link: "/departments/hepatology" },
    { name: "Pediatrics", link: "/departments/pediatrics" },
    { name: "Eye Care", link: "/departments/Eyecare" },
    { name: "Dental", link: "/departments/Dental" },
    { name: "Fertility", link: "/departments/fertility" },
    { name: "Psychology", link: "/departments/psychology" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (departmentsTimeout) clearTimeout(departmentsTimeout);
    };
  }, [departmentsTimeout]);

<<<<<<< HEAD
  // Close mobile menu when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
=======
  const handleLoginClick = () => {
    setIsLoggedIn(true);
    setProfileDropdownOpen(false);
  };
>>>>>>> 3d3e55c54cf5ce068e1e951c24c7379021e134f0

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    setProfileDropdownOpen(false);
  };

<<<<<<< HEAD
  const mobileNavLinkClass = (href) =>
    `block px-4 py-3 text-white hover:bg-blue-700 border-b border-blue-500 transition duration-200
     ${activeTab === href ? "bg-blue-700 border-l-4 border-l-white" : ""}`;

  const handleNavClick = (href) => {
    setActiveTab(href);
    setIsMobileMenuOpen(false);
  };
=======
  const navLinkClass =
    "text-blue-100 hover:text-white hover:bg-blue-700 rounded-md px-2 py-1 transition duration-200";
>>>>>>> 3d3e55c54cf5ce068e1e951c24c7379021e134f0

  return (
    <div className="fixed top-0 left-0 w-full z-50 scroll-smooth">
      <nav className="bg-blue-600 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
<<<<<<< HEAD
            <div className="flex-shrink-0">
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                MediTrack
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              <a
                href="#hero"
                onClick={() => setActiveTab("#hero")}
                className={navLinkClass("#hero")}
              >
                Home
              </a>
              <a
                href="#about"
                onClick={() => setActiveTab("#about")}
                className={navLinkClass("#about")}
              >
                About
              </a>
              <a
                href="#services"
                onClick={() => setActiveTab("#services")}
                className={navLinkClass("#services")}
              >
                Services
              </a>

              {/* Desktop Departments dropdown */}
=======
            <h1 className="text-2xl font-bold text-white">MediTrack</h1>

            {/* Navbar links */}
            <div className="flex items-center space-x-6">
              <a href="/#hero" className={navLinkClass}>Home</a>
              <a href="/#about" className={navLinkClass}>About</a>
              <a href="/#services" className={navLinkClass}>Services</a>

              {/* Departments Dropdown */}
>>>>>>> 3d3e55c54cf5ce068e1e951c24c7379021e134f0
              <div
                className="relative"
                ref={profileRef}
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
<<<<<<< HEAD
                <a
                  href="#departments"
                  onClick={() => setActiveTab("#departments")}
                  className={`${navLinkClass(
                    "#departments"
                  )} flex items-center`}
                >
=======
                <a href="#departments" className={navLinkClass}>
>>>>>>> 3d3e55c54cf5ce068e1e951c24c7379021e134f0
                  Departments
                  <ChevronDown className="w-4 h-4 ml-1" />
                </a>
                {isDepartmentsOpen && (
                  <div className="absolute left-0 mt-2 w-96 bg-white border border-gray-200 shadow-lg rounded-md z-10 transition-all duration-200 ease-in-out p-2 grid grid-cols-2 gap-1">
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

<<<<<<< HEAD
              <a
                href="#doctors"
                onClick={() => setActiveTab("#doctors")}
                className={navLinkClass("#doctors")}
              >
                Doctors
              </a>
              <a
                href="#contact"
                onClick={() => setActiveTab("#contact")}
                className={navLinkClass("#contact")}
              >
                Contact
              </a>
              <a
                href="#appointment"
                onClick={() => setActiveTab("#appointment")}
                className={`${navLinkClass("#appointment")} hidden lg:block`}
=======
              <a href="/#doctors" className={navLinkClass}>Doctors</a>
              <a href="/#contact" className={navLinkClass}>Contact</a>
              <a
                href="/#appointment"
                className="text-white font-medium hover:text-gray-100 hover:underline transition duration-200"
>>>>>>> 3d3e55c54cf5ce068e1e951c24c7379021e134f0
              >
                Appointment
              </a>
            </div>

<<<<<<< HEAD
            {/* Desktop Login Button */}
            <div className="hidden md:flex items-center">
              <button
                onClick={onLoginClick}
                className="px-3 py-2 lg:px-4 lg:py-2 bg-white text-blue-600 rounded-full hover:bg-blue-100 flex items-center transition duration-200 text-sm lg:text-base"
              >
                <LogIn className="w-4 h-4 mr-1 lg:mr-2" />
                <span className="hidden sm:inline">Login</span>
                <span className="sm:hidden">Login</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile Login Button */}
              <button
                onClick={onLoginClick}
                className="px-2 py-1 bg-white text-blue-600 rounded-full hover:bg-blue-100 flex items-center transition duration-200"
              >
                <LogIn className="w-4 h-4" />
              </button>

              {/* Hamburger Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-blue-100 transition duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
=======
            {/* Login / Profile button */}
            <div className="relative" ref={profileRef}>
              {isLoggedIn ? (
                <div>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
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
>>>>>>> 3d3e55c54cf5ce068e1e951c24c7379021e134f0
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div
              ref={mobileMenuRef}
              className="md:hidden bg-blue-600 border-t border-blue-500"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a
                  href="#hero"
                  onClick={() => handleNavClick("#hero")}
                  className={mobileNavLinkClass("#hero")}
                >
                  Home
                </a>
                <a
                  href="#about"
                  onClick={() => handleNavClick("#about")}
                  className={mobileNavLinkClass("#about")}
                >
                  About
                </a>
                <a
                  href="#services"
                  onClick={() => handleNavClick("#services")}
                  className={mobileNavLinkClass("#services")}
                >
                  Services
                </a>

                {/* Mobile Departments */}
                <div>
                  <button
                    onClick={() => setIsDepartmentsOpen(!isDepartmentsOpen)}
                    className="flex items-center justify-between w-full px-4 py-3 text-white hover:bg-blue-700 border-b border-blue-500 transition duration-200"
                  >
                    <span>Departments</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isDepartmentsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isDepartmentsOpen && (
                    <div className="bg-blue-700">
                      {departments.map((dept, idx) => (
                        <a
                          key={idx}
                          href={dept.link}
                          className="block px-8 py-2 text-sm text-blue-100 hover:text-white hover:bg-blue-800 border-b border-blue-600 last:border-b-0"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {dept.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <a
                  href="#doctors"
                  onClick={() => handleNavClick("#doctors")}
                  className={mobileNavLinkClass("#doctors")}
                >
                  Doctors
                </a>
                <a
                  href="#contact"
                  onClick={() => handleNavClick("#contact")}
                  className={mobileNavLinkClass("#contact")}
                >
                  Contact
                </a>
                <a
                  href="#appointment"
                  onClick={() => handleNavClick("#appointment")}
                  className={mobileNavLinkClass("#appointment")}
                >
                  Make Appointment
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
