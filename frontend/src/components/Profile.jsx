import React from "react";
import { FaEdit, FaMapMarkerAlt } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Profile() {
  return (
    <div className="max-w-screen-xl mx-auto p-10 space-y-10 bg-gray-50" style={{width:"73vw"}}>
      {/* Profile Overview Section */}
      <div className="bg-gradient-to-br from-teal-600 to-green-800 text-white rounded-xl p-8 flex flex-col lg:flex-row items-center shadow-2xl gap-8">
        {/* Profile Picture */}
        <div className="relative">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-40 h-40 rounded-full border-4 border-white shadow-lg"
          />
          <button className="absolute bottom-2 right-2 bg-white text-teal-600 rounded-full p-2 shadow-md hover:bg-gray-100 transition">
            <FaEdit />
          </button>
        </div>

        {/* Personal Details */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-5xl font-bold">Razik Shariff</h1>
          <p className="text-lg text-teal-200 mt-2">Shariff@example.com</p>
          <p className="flex items-center justify-center lg:justify-start gap-2 mt-4">
            <FaMapMarkerAlt />
            <span>Bangalore, India</span>
          </p>
          <p className="mt-2">
            <span className="font-medium">Member Since:</span> March 2022
          </p>
        </div>
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Textual Insights */}
        <InsightCard
          title="Monthly Revenue"
          value="$4,200"
          description="Earnings this month"
          color="teal"
        />
        <InsightCard
          title="Top Product"
          value="Organic Apples"
          description="150 units sold"
          color="blue"
        />
        
        {/* Graphical Insights */}
        <InsightCard
          title="Customer Satisfaction"
          value="94%"
          description="Positive Feedback"
          progress={94}
          color="purple"
        />
        <InsightCard
          title="Active Orders"
          value="12"
          description="Currently in progress"
          color="yellow"
          chartData={{
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            datasets: [
              {
                label: "Orders",
                data: [8, 9, 12, 10],
                fill: true,
                backgroundColor: "rgba(255, 204, 0, 0.2)",
                borderColor: "yellow",
                borderWidth: 2,
              },
            ],
          }}
        />
        
        {/* Progress Insights */}
        <InsightCard
          title="Lifetime Revenue"
          value="$36,000"
          description="Total earnings"
          progress={80}
          color="teal"
        />
        <InsightCard
          title="Unread Messages"
          value="5"
          description="New inquiries"
          color="red"
          progress={50}
        />
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Recent Activity</h2>
        <ul className="space-y-6">
          <RecentActivityItem
            activity="Order #1234 delivered"
            timestamp="2 days ago"
          />
          <RecentActivityItem
            activity="New message from Buyer A"
            timestamp="4 days ago"
          />
          <RecentActivityItem
            activity="Added 'Organic Mangoes' to inventory"
            timestamp="1 week ago"
          />
          <RecentActivityItem
            activity="Order #1227 delayed due to weather"
            timestamp="10 days ago"
          />
        </ul>
      </div>
    </div>
  );
}

function InsightCard({ title, value, description, progress, color, chartData }) {
  const progressBarColor = `bg-${color}-500`;
  const textColor = `text-${color}-600`;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <h3 className={`text-xl font-semibold ${textColor}`}>{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      <h4 className={`text-4xl font-bold mt-4 ${textColor}`}>{value}</h4>

      {/* If there's a progress bar */}
      {progress && (
        <div className="mt-4">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className={`h-full ${progressBarColor} rounded-full`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-1">{progress}% completed</p>
        </div>
      )}

      {/* Chart Section for Graphical Insights */}
      {chartData && (
        <div className="mt-4 h-48">
          <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      )}
    </div>
  );
}

function RecentActivityItem({ activity, timestamp }) {
  return (
    <li className="flex justify-between items-center">
      <p className="text-gray-800 font-medium">{activity}</p>
      <span className="text-gray-500 text-sm">{timestamp}</span>
    </li>
  );
}
