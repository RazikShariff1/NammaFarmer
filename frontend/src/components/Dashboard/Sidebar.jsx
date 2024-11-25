import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaChartLine, FaShoppingCart, FaTruck, FaWallet, FaUser, FaCog, FaQuestionCircle, FaBell, FaMapMarkerAlt } from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Dashboard", icon: <FaHome /> },
    { to: "/market-insights", label: "Market Insights", icon: <FaChartLine /> },
    { to: "/sell-produce", label: "Sell Produce", icon: <FaShoppingCart /> },
    { to: "/order-tracking", label: "Order Tracking", icon: <FaTruck /> },
    { to: "/financial", label: "Financial", icon: <FaWallet /> },
    { to: "/profile", label: "Profile", icon: <FaUser /> },
    { to: "/settings", label: "Settings", icon: <FaCog /> },
    { to: "/support", label: "Support & Resources", icon: <FaQuestionCircle /> },
    { to: "/nearby-markets", label: "Nearby Buyers/Markets", icon: <FaMapMarkerAlt /> },
    { to: "/notifications", label: "Notifications", icon: <FaBell /> },
  ];

  return (
    <aside className="w-64 bg-white h-full shadow-md">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-700">Dashboard</h2>
      </div>
      <nav>
        <ul className="space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                to={link.to}
                className={`flex items-center space-x-3 px-4 py-2 rounded-md font-medium ${
                  location.pathname === link.to
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
