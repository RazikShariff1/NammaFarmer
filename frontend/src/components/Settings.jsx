import React, { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const toggleNotifications = () => setNotifications(!notifications);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="max-w-full mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 overflow-x-auto">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Settings</h2>

      {/* Notifications Settings */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Notifications</h3>
        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-700 dark:text-gray-300">Enable Notifications</span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={toggleNotifications}
            className="toggle-checkbox"
          />
        </div>
      </div>

      {/* Dark Mode Settings */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Appearance</h3>
        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-700 dark:text-gray-300">Enable Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
            className="toggle-checkbox"
          />
        </div>
      </div>

      {/* Language Settings */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Language</h3>
        <select className="mt-4 p-2 border rounded-lg w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="french">French</option>
        </select>
      </div>

      {/* Save Changes Button */}
      <div className="mt-6">
        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
}
