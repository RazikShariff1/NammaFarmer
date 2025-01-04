import React, { useState, useEffect } from "react";
import { FaTruck, FaCheckCircle, FaTimesCircle, FaBoxOpen } from "react-icons/fa";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { LoadScript } from "@react-google-maps/api";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

const containerStyle = {
  width: "100%",
  height: "400px",
};

const orders = [
  {
    id: "#12345",
    origin: { lat: 12.971598, lng: 77.594566 }, // Bangalore
    destination: { lat: 13.082680, lng: 80.270718 }, // Chennai
    status: "In Transit",
    delivery: "Expected in 2 days",
    statusColor: "blue",
  },
  {
    id: "#12346",
    origin: { lat: 28.704060, lng: 77.102493 }, // Delhi
    destination: { lat: 26.912434, lng: 75.787270 }, // Jaipur
    status: "Preparing",
    delivery: "Ready to ship soon",
    statusColor: "yellow",
  },
  {
    id: "#12347",
    origin: { lat: 22.572645, lng: 88.363892 }, // Kolkata
    destination: { lat: 19.076090, lng: 72.877426 }, // Mumbai
    status: "Delivered",
    delivery: "Delivered yesterday",
    statusColor: "green",
  },
];

export default function Otracking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [selectedOrder, setSelectedOrder] = useState(orders[0]);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!selectedOrder) return;

    if (!window.google || !window.google.maps) {
      setErrorMessage("Google Maps API not loaded.");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: selectedOrder.origin,
        destination: selectedOrder.destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
        } else {
          setErrorMessage(`Error fetching directions: ${status}`);
        }
      }
    );
  }, [selectedOrder]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      const results = orders.filter((order) => order.id.includes(term));
      setFilteredOrders(results);
    } else {
      setFilteredOrders(orders);
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBi-C56XsJ84jWJjvwFASXTQXXElQUASkI">
      <div className="max-w-screen-xl mx-auto p-8 space-y-10 bg-gray-50">
        {/* Section Header */}
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">Order Tracking</h1>
          <p className="text-sm text-gray-500 mt-2">
            Stay updated with real-time order data and performance insights.
          </p>
        </header>

        {/* Key Order Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Orders"
            value="256"
            description="Lifetime orders processed"
            icon={<FaBoxOpen />}
            color="blue"
          />
          <StatCard
            title="In Transit"
            value="12"
            description="Currently on the way"
            icon={<FaTruck />}
            color="purple"
          />
          <StatCard
            title="Delivered"
            value="230"
            description="Delivered successfully"
            icon={<FaCheckCircle />}
            color="green"
          />
          <StatCard
            title="Cancelled"
            value="14"
            description="Orders cancelled"
            icon={<FaTimesCircle />}
            color="red"
          />
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Order Trends</h2>
            <Line
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    label: "Orders Received",
                    data: [20, 40, 35, 60, 45, 70, 80],
                    borderColor: "rgba(96, 165, 250, 1)",
                    backgroundColor: "rgba(96, 165, 250, 0.2)",
                    borderWidth: 3,
                  },
                  {
                    label: "Orders Delivered",
                    data: [18, 35, 30, 55, 42, 68, 75],
                    borderColor: "rgba(34, 197, 94, 1)",
                    backgroundColor: "rgba(34, 197, 94, 0.2)",
                    borderWidth: 3,
                  },
                ],
              }}
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Status Distribution</h2>
            <Pie
              data={{
                labels: ["Delivered", "In Transit", "Cancelled"],
                datasets: [
                  {
                    data: [230, 12, 14],
                    backgroundColor: ["#22C55E", "#60A5FA", "#EF4444"],
                    hoverBackgroundColor: ["#16A34A", "#3B82F6", "#DC2626"],
                    borderWidth: 2,
                  },
                ],
              }}
            />
          </div>
        </div>

        {/* Map and Orders Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Google Map */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Route for {selectedOrder.id}</h2>
            <GoogleMap mapContainerStyle={containerStyle} center={selectedOrder.origin} zoom={6}>
              {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
            </GoogleMap>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>

          {/* Search and Orders */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Orders</h2>
            {/* Search Bar */}
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by Order ID"
              className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* Filtered Orders */}
            {filteredOrders.map((order) => (
              <button
                key={order.id}
                className="py-4 flex justify-between items-center w-full text-left focus:outline-none"
                onClick={() => setSelectedOrder(order)}
              >
                <div>
                  <h4 className="text-sm font-bold text-gray-800">{order.id}</h4>
                  <p className={`text-xs text-${order.statusColor}-600`}>{order.status}</p>
                  <p className="text-xs text-gray-500">{order.delivery}</p>
                </div>
                <FaTruck className={`text-2xl text-${order.statusColor}-600`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </LoadScript>
  );
}

function StatCard({ title, value, description, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 flex items-center space-x-4">
      <div className={`text-3xl text-${color}-600`}>{icon}</div>
      <div>
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
}
