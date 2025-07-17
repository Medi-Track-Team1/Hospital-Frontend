import React, { useState, useEffect } from "react";

const Departments = () => {
  const [activeTab, setActiveTab] = useState("cardiology");

  // Add smooth scroll behavior on load
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const departments = [
    {
      id: "cardiology",
      name: "Cardiology",
      title: "Cardiology Department",
      description:
        "Comprehensive cardiovascular care with state-of-the-art diagnostic and treatment facilities.",
      content:
        "Our cardiology department provides advanced cardiac care including interventional procedures, heart surgery, and comprehensive cardiac rehabilitation.",
      image:
        "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    },
    {
      id: "neurology",
      name: "Neurology",
      title: "Neurology Department",
      description:
        "Expert neurological care for brain, spine, and nervous system disorders.",
      content:
        "We offer comprehensive care for stroke, epilepsy, Parkinson's disease, and multiple sclerosis using advanced imaging and treatments.",
      image:
        "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    },
    {
      id: "pediatrics",
      name: "Pediatrics",
      title: "Pediatrics Department",
      description:
        "Specialized medical care for infants, children, and adolescents.",
      content:
        "From birth to adolescence, we provide preventive care, childhood illness treatment, and child-friendly services.",
      image:
        "https://images.pexels.com/photos/6194026/pexels-photo-6194026.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    },
    {
      id: "orthopedics",
      name: "Orthopedics",
      title: "Orthopedics Department",
      description:
        "Advanced musculoskeletal care including joint replacement and sports medicine.",
      content:
        "We offer surgical and non-surgical treatments for fractures, arthritis, injuries, and spine conditions.",
      image:
        "https://images.pexels.com/photos/4491940/pexels-photo-4491940.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    },
    {
      id: "emergency",
      name: "Emergency",
      title: "Emergency Department",
      description:
        "24/7 emergency medical services with rapid response capabilities.",
      content:
        "We provide 24/7 emergency medical care, equipped for all emergencies with life support capabilities.",
      image:
        "https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    },
  ];

  const activeDepartment = departments.find((dept) => dept.id === activeTab);

  return (
    <section id="departments" className="py-20 bg-gray-50 scroll-smooth">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Departments
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive medical departments staffed by experienced specialists
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Department Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-2">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setActiveTab(dept.id)}
                  className={`w-full text-left px-6 py-4 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === dept.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  {dept.name}
                </button>
              ))}
            </div>
          </div>

          {/* Department Content */}
          <div className="lg:col-span-3">
            {activeDepartment && (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/3 p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {activeDepartment.title}
                    </h3>
                    <p className="text-blue-600 font-medium mb-4">
                      {activeDepartment.description}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {activeDepartment.content}
                    </p>
                  </div>
                  <div className="md:w-1/3 h-64 md:h-auto">
                    <img
                      src={activeDepartment.image}
                      alt={activeDepartment.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Departments;
