import { NavLink } from 'react-router-dom';
import { HiHome, HiUserGroup, HiUsers, HiCalendar, HiCog } from 'react-icons/hi';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navItems = [
    { name: 'Dashboard', icon: HiHome, path: '/admin' },
    { name: 'Doctors', icon: HiUserGroup, path: '/admin/doctors' },
    { name: 'Patients', icon: HiUsers, path: '/admin/patients' },
    { name: 'Appointments', icon: HiCalendar, path: '/admin/appointments' },
    { name: 'Settings', icon: HiCog, path: '/admin/settings' },
  ];

  return (
    <div
      className={`${sidebarOpen ? 'w-64' : 'w-20'} 
      bg-[#2563eb] text-white transition-all duration-300 flex flex-col`}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between border-b border-blue-400">
        {sidebarOpen ? (
          <h1 className="text-xl font-bold">Hospital Admin</h1>
        ) : (
          <h1 className="text-xl font-bold">HA</h1>
        )}
        <button
             onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 rounded-lg bg-[#2563eb] hover:bg-blue-800 text-white transition-colors duration-200"
          >
          {sidebarOpen ? '«' : '»'}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                end
               className={({ isActive }) =>
  `flex items-center text-white p-3 rounded-lg transition-colors ${
    isActive 
      ? 'bg-blue-900 pointer-events-none'  // Add pointer-events-none
      : 'hover:bg-blue-400'
  } ${!sidebarOpen ? 'justify-center' : ''}`
}
              >
                {/* Icon and Text (no z-index needed) */}
                <item.icon className="text-xl" />
                {sidebarOpen && <span className="ml-3">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Admin Profile Section */}
      <div className="p-4 border-t border-blue-400">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="font-bold">A</span>
          </div>
          {sidebarOpen && (
            <div className="ml-3">
              <p className="font-medium">Admin</p>
              <p className="text-xs text-white">Super Admin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;