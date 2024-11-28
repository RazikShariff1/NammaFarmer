import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaSave, FaUpload } from "react-icons/fa";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_URL = "http://localhost:5000/sellproduce"; // Replace with your Flask backend URL

export default function SellProduce() {
  const [listings, setListings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    status: "Available",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch listings on load
  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await axios.get(`${API_URL}/listings`);
      setListings(response.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const newListing = {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity, 10),
        image: imagePreview,
      };
      const response = await axios.post(`${API_URL}/listings`, newListing);
      setListings([...listings, response.data]);
      setFormData({ name: "", category: "", price: "", quantity: "", description: "", status: "Available", image: "" });
      setImagePreview(null);
    } catch (error) {
      console.error("Error adding listing:", error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData(item);
    setImagePreview(item.image);
  };

  const handleSave = async (id) => {
    try {
      const updatedListing = {
        ...formData,
        image: imagePreview,
      };
      await axios.put(`${API_URL}/listings/${id}`, updatedListing);
      setListings((prev) => prev.map((item) => (item.id === id ? { ...item, ...updatedListing } : item)));
      setEditingId(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error updating listing:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/listings/${id}`);
      setListings((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const chartData = {
    labels: listings.map((item) => item.name),
    datasets: [
      {
        label: "Sales",
        data: listings.map((item) => item.sales || 0),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Profit",
        data: listings.map((item) => item.profit || 0),
        backgroundColor: "rgba(153, 102, 255, 0.5)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Sales and Profit Chart" },
    },
  };

  return (
    <div className="max-w-screen-xl mx-auto p-8 space-y-8 bg-gray-50" style={{ width: "73vw" }}>
      {/* Product Upload Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">List Your Produce</h2>
        <form className="space-y-4" onSubmit={handleAdd}>
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-300"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-300"
              required
            >
              <option value="">Select a category</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Dairy">Dairy</option>
              <option value="Grains">Grains</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="text-sm font-medium text-gray-700">
              Price (per unit)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-300"
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Enter quantity"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-300"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter a brief description of the product"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-300"
              required
            ></textarea>
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-300"
              required
            >
              <option value="Available">Available</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="imageUpload" className="text-sm font-medium text-gray-700">
              Upload Product Image
            </label>
            <div className="mt-2 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="imageUpload"
                className="cursor-pointer flex items-center space-x-3 text-gray-600"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded-lg shadow-lg"
                  />
                ) : (
                  <>
                    <FaUpload className="text-teal-500 text-2xl" />
                    <span>Drag & drop or click to upload</span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            List Product
          </button>
        </form>

      </div>

      {/* Active Listings Section */}
      {/* Active Listings Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Active Listings</h2>
        <div className="space-y-4">
          {listings.map((item) => (
            <div key={item.id} className="flex items-center justify-between space-x-4 border-b pb-4">
              {/* Product Info Section */}
              <div className="flex space-x-4">
                <img
                  src={item.image || "https://via.placeholder.com/50"}
                  alt={item.name}
                  className="h-16 w-16 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-xs text-gray-500">{item.category} | {item.status}</p>
                </div>
              </div>

              {/* Action Buttons Section */}
              <div className="space-x-4">
                {editingId === item.id ? (
                  <button
                    onClick={() => handleSave(item.id)}
                    className="text-teal-500 hover:text-teal-700"
                  >
                    <FaSave />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Chart Section */}
      <div>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
