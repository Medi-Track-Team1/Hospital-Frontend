import React, { useState, useEffect, useRef } from "react";

import { LogIn } from "lucide-react";

const Header = ({ onLoginClick }) => {
  const [isDepartmentsOpen, setIsDepartmentsOpen] = useState(false);
  const [departmentsTimeout, setDepartmentsTimeout] = useState(null);
  const [activeTab, setActiveTab] = useState("#hero");

  const profileRef = useRef(null);

  const departments = [
    { name: "Cardiology", link: "/departments/cardiology" },
    { name: "Neurology", link:"/departments/neurology" },
    { name: "Hepatology", link: "/departments/hepatology" },
    { name: "Pediatrics", link: "/departments/pediatrics" },
    { name: "Eye Care", link: "/departments/Eyecare" },
    { name: "Dental", link: "/departments/Dental" },
    { name: "Fertility", link: "/departments/fertility" },
    { name: "Psychology", link: "/departments/psychology" }
    
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsDepartmentsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (departmentsTimeout) clearTimeout(departmentsTimeout);
    };
  }, [departmentsTimeout]);


  const navLinkClass = (href) =>
    `relative px-2 py-1 text-blue-100 hover:text-white transition duration-200
     after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px]
     after:bg-white after:w-full after:origin-left after:scale-x-0
     after:transition-transform after:duration-300 hover:after:scale-x-100
     ${activeTab === href ? "after:scale-x-100 text-white" : ""}`;


  return (
    <div className="fixed top-0 left-0 w-full z-50 scroll-smooth">
      <nav className="bg-blue-600 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-white">MediTrack</h1>

            {/* Navbar links */}
            <div className="flex items-center space-x-6">

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

                <a
                  href="#departments"
                  onClick={() => setActiveTab("#departments")}
                  className={navLinkClass("#departments")}
                >
                  Departments
                </a>

                {isDepartmentsOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-10">
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
                className={navLinkClass("#appointment")}
              >
                Make Appointment
              </a>
            </div>

            <div className="flex gap-2 items-center">
              <button
                onClick={onLoginClick}
                className="px-4 py-2 bg-white text-blue-600 rounded-full hover:bg-blue-100 flex items-center transition duration-200"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </button>

            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
