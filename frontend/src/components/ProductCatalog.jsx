import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiFilter,
  FiSearch,
  FiShoppingCart,
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");
  const [showAlert, setShowAlert] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPrice, setFilterPrice] = useState([0, 750000]); 
  const navigate = useNavigate();

  const conversionRate = 75; 

  const showAlertMessage = (message, type = "info") => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/listings/api/products")
      .then((response) => {
        const productsInRupees = response.data.map((product) => ({
          ...product,
          price: product.price * conversionRate,
        }));
        setProducts(productsInRupees);
        setFilteredProducts(productsInRupees);
      })
      .catch((error) => {
        showAlertMessage("Error fetching listings!", "error");
        console.error(error);
      });
  }, []);

  const handleApplyFilters = () => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        filterCategory === "" || product.category === filterCategory;

      const matchesPrice =
        product.price >= filterPrice[0] && product.price <= filterPrice[1];

      return matchesCategory && matchesPrice;
    });
    setFilteredProducts(filtered);
    setShowFilters(false);
    showAlertMessage("Filters applied successfully!", "success");
  };

  const handleClearFilters = () => {
    setFilterCategory("");
    setFilterPrice([0, 750000]); 
    setFilteredProducts(products);
    setShowFilters(false);
    showAlertMessage("Filters cleared successfully!", "info");
  };

  const alertStyles = {
    success: { icon: <FiCheckCircle size={20} />, color: "bg-green-500" },
    error: { icon: <FiXCircle size={20} />, color: "bg-red-500" },
    warning: { icon: <FiAlertTriangle size={20} />, color: "bg-yellow-500" },
    info: { icon: <FiCheckCircle size={20} />, color: "bg-blue-500" },
  };

  const currentAlertStyle = alertStyles[alertType] || alertStyles.info;

  return (
    <div className="bg-gray-100 min-h-screen w-full relative" style={{ width: "100vw" }}>
      {showAlert && (
        <div
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 ${currentAlertStyle.color} text-white px-6 py-3 rounded-md flex items-center space-x-2 shadow-lg`}
        >
          {currentAlertStyle.icon}
          <span>{alertMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap justify-between items-center">
        <div className="flex items-center w-full sm:w-1/2 lg:w-1/3 bg-white rounded-full px-4 py-2 shadow-md">
          <FiSearch className="text-gray-500 mr-2" size={24} />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent focus:outline-none"
          />
        </div>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <button
            onClick={() => setShowFilters(true)}
            className="p-3 flex items-center space-x-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white shadow-md"
          >
            <FiFilter size={24} />
            <span>Filters</span>
          </button>
          <button className="p-3 flex items-center space-x-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md">
            <FiShoppingCart size={24} />
            <span>Cart</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts
            .filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product, index) => (
              <div
                key={product.product_id || `temp_${index}`}
                className="card bg-white border rounded-xl shadow-lg hover:shadow-2xl cursor-pointer"
                onClick={() => {
                  if (product.product_id) {
                    navigate(`/product/${product.product_id}`);
                  } else {
                    showAlertMessage("Product ID not found!", "error");
                  }
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h5 className="font-bold text-lg truncate">{product.name}</h5>
                  <p className="text-gray-600 text-sm mt-2 truncate">
                    {product.description}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-green-700 font-bold">
                      ₹{product.price.toFixed(2)}
                    </span>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (product.product_id) {
                          navigate(`/product/${product.product_id}`);
                        } else {
                          showAlertMessage("Product ID not found!", "error");
                        }
                      }}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found.</p>
        )}
      </div>

      {showFilters && (
        <aside className="w-80 bg-white shadow-lg p-6 fixed right-0 top-0 h-full z-40">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="mb-4">
            <label className="block font-medium">Category</label>
            <select
              className="w-full p-2 mt-2 border rounded"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Electronics">Vegitables</option>
              <option value="Clothing">fruits</option>
              <option value="Home">Grains</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium">Price Range</label>
            <input
              type="range"
              min="0"
              max="750000"
              value={filterPrice[1]}
              onChange={(e) =>
                setFilterPrice([filterPrice[0], parseInt(e.target.value)])
              }
              className="w-full"
            />
            <div className="flex justify-between text-sm">
              <span>₹{filterPrice[0]}</span>
              <span>₹{filterPrice[1]}</span>
            </div>
          </div>

          <button
            onClick={handleApplyFilters}
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Apply Filters
          </button>
          <button
            onClick={handleClearFilters}
            className="w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mt-2"
          >
            Clear Filters
          </button>
        </aside>
      )}
    </div>
  );
};

export default ProductCatalog;
