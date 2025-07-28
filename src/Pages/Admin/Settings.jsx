import { useState } from 'react';
import { HiCog, HiUser, HiShieldCheck, HiBell, HiDatabase } from 'react-icons/hi';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: 'Admin User',
    email: 'admin@hospital.com',
    phone: '(555) 123-4567',
    notifications: true,
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: HiUser },
    { id: 'security', name: 'Security', icon: HiShieldCheck },
    { id: 'notifications', name: 'Notifications', icon: HiBell },
    { id: 'data', name: 'Data Management', icon: HiDatabase },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-56 lg:w-64 bg-white rounded-xl shadow-sm p-3 md:p-4 h-fit">
        <div className="flex items-center mb-4 md:mb-6">
          <HiCog className="w-5 h-5 md:w-6 md:h-6 text-[#2563eb] mr-2" />
          <h2 className="text-lg md:text-xl font-bold text-gray-800">Settings</h2>
        </div>
        <nav>
          <ul className="space-y-1 md:space-y-2">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-2 py-2 md:px-3 md:py-2 rounded-lg transition-colors text-sm md:text-base ${
                    activeTab === tab.id
                      ? 'bg-[#2563eb] text-white'
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <tab.icon className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                  {tab.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-xl shadow-sm p-4 md:p-6">
        {activeTab === 'profile' && (
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 md:mb-6">Profile Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-sm md:text-base"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

        {activeTab === 'security' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 md:mb-6">Security Settings</h3>
            <div className="space-y-4 md:space-y-6">
              <div className="p-3 md:p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1 md:mb-2">Change Password</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">New Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-sm md:text-base"
                    />
                  </div>
                </div>
                <button className="mt-3 md:mt-4 px-4 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
                  Update Password
                </button>
              </div>

              <div className="p-3 md:p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1 md:mb-2">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600 mb-3 md:mb-4">
                  Add an extra layer of security to your account.
                </p>
                <button className="px-4 py-2 bg-white border border-[#2563eb] text-[#2563eb] rounded-lg hover:bg-blue-50 transition-colors text-sm md:text-base">
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 md:mb-6">Notification Settings</h3>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-between p-3 md:p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Receive important updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={formData.notifications}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 md:w-11 md:h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-[#2563eb]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 md:p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">Dark Mode</h4>
                  <p className="text-sm text-gray-600">Switch to dark theme</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="darkMode"
                    checked={formData.darkMode}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 md:w-11 md:h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-[#2563eb]"></div>
                </label>
              </div>
            </div>
            <div className="mt-4 md:mt-6 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
              >
                Save Preferences
              </button>
            </div>
          </form>
        )}

        {activeTab === 'data' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 md:mb-6">Data Management</h3>
            <div className="space-y-4 md:space-y-6">
              <div className="p-3 md:p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1 md:mb-2">Export Data</h4>
                <p className="text-sm text-gray-600 mb-3 md:mb-4">
                  Download a copy of your data in JSON or CSV format.
                </p>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <button className="px-4 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base">
                    Export as JSON
                  </button>
                  <button className="px-4 py-2 bg-white border border-[#2563eb] text-[#2563eb] rounded-lg hover:bg-blue-50 transition-colors text-sm md:text-base">
                    Export as CSV
                  </button>
                </div>
              </div>

              <div className="p-3 md:p-4 border border-red-200 rounded-lg bg-red-50">
                <h4 className="font-medium text-red-800 mb-1 md:mb-2">Delete Account</h4>
                <p className="text-sm text-red-600 mb-3 md:mb-4">
                  This will permanently delete your account and all associated data.
                </p>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm md:text-base">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;