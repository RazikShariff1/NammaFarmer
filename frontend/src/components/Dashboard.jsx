import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
  return (
    <div className="dashboard min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to NammaFarmer Dashboard</h1>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Weather Card */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700">Today's Weather</h2>
            <div className="mt-4 text-gray-600">
              <p className="text-lg">Sunny</p>
              <p className="text-sm">25°C / 77°F</p>
              <p className="text-sm">Humidity: 60%</p>
            </div>
          </div>

          {/* Crop Stats Card */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700">Farm Statistics</h2>
            <div className="mt-4 text-gray-600">
              <p className="text-lg">Total Yield: 500kg</p>
              <p className="text-sm">Average Crop Quality: 85%</p>
              <p className="text-sm">Market Value: ₹50,000</p>
            </div>
          </div>

          {/* Community Card */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700">Community Updates</h2>
            <div className="mt-4 text-gray-600">
              <p className="text-sm">Join the latest discussions with other farmers. Share tips and advice!</p>
              <Link to="/community" className="text-blue-500 hover:underline">Go to Community</Link>
            </div>
          </div>
        </section>

        {/* Schedule and Reminders */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700">Upcoming Tasks</h2>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg text-gray-600">Planting Season: Rice</p>
              <p className="text-sm text-gray-400">In 3 days</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg text-gray-600">Harvesting Season: Wheat</p>
              <p className="text-sm text-gray-400">In 7 days</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg text-gray-600">Fertilizer Application</p>
              <p className="text-sm text-gray-400">In 14 days</p>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Crop Management Guide */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700">Crop Management Guide</h2>
            <p className="mt-4 text-sm text-gray-600">
              Learn the best practices for managing your crops and ensuring optimal growth.
            </p>
            <Link to="/guide" className="text-blue-500 hover:underline mt-4 block">Read the Guide</Link>
          </div>

          {/* Market Insights */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700">Market Insights</h2>
            <p className="mt-4 text-sm text-gray-600">
              Stay informed about the latest market trends and how to sell your produce at the best price.
            </p>
            <Link to="/market" className="text-blue-500 hover:underline mt-4 block">Explore Insights</Link>
          </div>

          {/* Support Contact */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700">Need Help?</h2>
            <p className="mt-4 text-sm text-gray-600">
              If you have any questions or need support, feel free to reach out to us.
            </p>
            <Link to="/support" className="text-blue-500 hover:underline mt-4 block">Contact Support</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
