import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";

// Sample Data

// Profit/Loss Data
const profitLossData = [
  { month: "Jan", revenue: 2000, expense: 1500 },
  { month: "Feb", revenue: 2500, expense: 2800 },
  { month: "Mar", revenue: 3000, expense: 2000 },
  { month: "Apr", revenue: 4000, expense: 3500 },
  { month: "May", revenue: 4500, expense: 5000 },
  { month: "Jun", revenue: 5000, expense: 4600 },
  { month: "Jul", revenue: 5500, expense: 4800 },
  { month: "Aug", revenue: 6000, expense: 5300 },
  { month: "Sep", revenue: 6500, expense: 5700 },
  { month: "Oct", revenue: 7000, expense: 6000 },
  { month: "Nov", revenue: 7200, expense: 6400 },
  { month: "Dec", revenue: 7500, expense: 6800 },
];

// Weather Data
const weatherData = [
  { day: "Mon", temp: 30, humidity: 70, rainfall: 5 },
  { day: "Tue", temp: 28, humidity: 65, rainfall: 0 },
  { day: "Wed", temp: 29, humidity: 68, rainfall: 2 },
  { day: "Thu", temp: 31, humidity: 72, rainfall: 10 },
  { day: "Fri", temp: 27, humidity: 60, rainfall: 0 },
  { day: "Sat", temp: 25, humidity: 55, rainfall: 1 },
  { day: "Sun", temp: 26, humidity: 58, rainfall: 3 },
];

// Soil Data
const soilData = [
  { date: "Week 1", moisture: 80, pH: 6.5 },
  { date: "Week 2", moisture: 75, pH: 6.8 },
  { date: "Week 3", moisture: 70, pH: 7.0 },
  { date: "Week 4", moisture: 65, pH: 7.2 },
];

// Market Prices Data
const marketPrices = [
  { crop: "Wheat", price: 220 },
  { crop: "Rice", price: 280 },
  { crop: "Corn", price: 180 },
];

export default function Analytics() {
  return (
    <div className="max-w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        Farm Analytics Dashboard
      </h1>

      {/* Weather Insights */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Weekly Weather Insights
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weatherData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="temp" stroke="#ff7300" strokeWidth={3} />
            <Line type="monotone" dataKey="humidity" stroke="#387908" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Profit/Loss Analysis */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Monthly Profit/Loss Analysis
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={profitLossData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4caf50" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4caf50" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff6f61" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ff6f61" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#4caf50"
              fill="url(#revenueGradient)"
              strokeWidth={3}
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#ff6f61"
              fill="url(#expenseGradient)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </section>

      {/* Soil Analysis */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Soil Analysis
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={soilData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="moisture" fill="#2196f3" />
            <Bar dataKey="pH" fill="#ff9800" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Market Prices */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Current Market Prices
        </h2>
        <ul className="text-gray-800 dark:text-gray-100">
          {marketPrices.map((item, index) => (
            <li key={index} className="mb-2">
              <span className="font-bold">{item.crop}:</span> ₹{item.price}/kg
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
