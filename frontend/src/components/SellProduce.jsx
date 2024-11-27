import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaSave, FaUpload } from "react-icons/fa";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SellProduce() {
  const [listings, setListings] = useState([
    { id: 1, name: "Organic Tomatoes", category: "Vegetables", price: 2.5, quantity: 20, sales: 200, profit: 150, description: "Fresh organic tomatoes", status: "Available", image: "" },
    { id: 2, name: "Fresh Spinach", category: "Vegetables", price: 1.2, quantity: 50, sales: 300, profit: 220, description: "Organic spinach leaves", status: "Available", image: "" },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", category: "", price: "", quantity: "", description: "", status: "Available", image: "" });
  const [imagePreview, setImagePreview] = useState(null);

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData(item);
    setImagePreview(item.image);
  };

  const handleSave = (id) => {
    setListings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...formData, image: imagePreview || item.image } : item))
    );
    setEditingId(null);
    setImagePreview(null);
  };

  const handleDelete = (id) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
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

  const handleAdd = (e) => {
    e.preventDefault();
    const newItem = {
      id: listings.length + 1,
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity, 10),
      sales: 0,
      profit: 0,
      description: formData.description,
      status: formData.status,
      image: imagePreview,
    };
    setListings((prev) => [...prev, newItem]);
    setFormData({ name: "", category: "", price: "", quantity: "", description: "", status: "Available", image: "" });
    setImagePreview(null);
  };

  const chartData = {
    labels: listings.map((item) => item.name),
    datasets: [
      {
        label: "Sales",
        data: listings.map((item) => item.sales),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Profit",
        data: listings.map((item) => item.profit),
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
    <div className="max-w-screen-xl mx-auto p-8 space-y-8 bg-gray-50" style={{width:"73vw"}}>
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
            />
          </div>

          {/* Category Selector */}
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
            >
              <option>Fruits</option>
              <option>Vegetables</option>
              <option>Dairy</option>
              <option>Grains</option>
            </select>
          </div>

          {/* Price & Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              />
            </div>
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
              />
            </div>
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
            >
              <option>Available</option>
              <option>Out of Stock</option>
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
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Active Listings</h2>
        <div className="space-y-4">
          {listings.map((item) => (
            <div key={item.id} className="flex items-center justify-between space-x-4 border-b pb-4">
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
      <div className="bg-white rounded-xl shadow-lg p-6">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
