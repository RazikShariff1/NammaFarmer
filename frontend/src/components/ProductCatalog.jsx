import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiFilter, FiSearch, FiShoppingCart, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPrice, setFilterPrice] = useState([0, 10000]); // Example price range
  const navigate = useNavigate();

  // Fetch product listings from backend
  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/listings/api/listings') // Replace with your backend URL
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize filteredProducts with all products
      })
      .catch((error) => {
        setShowAlert(true);
        setAlertMessage('Error fetching listings!');
        console.error(error);
      });
  }, []);

  // Apply filters and update filtered products
  const handleApplyFilters = () => {
    const filtered = products.filter((product) => {
      // Filter by category if selected
      const matchesCategory =
        filterCategory === '' || product.category === filterCategory;

      // Filter by price range
      const matchesPrice = product.price >= filterPrice[0] && product.price <= filterPrice[1];

      return matchesCategory && matchesPrice;
    });
    setFilteredProducts(filtered);
    setShowFilters(false);
    setAlertMessage('Filters applied!');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // Clear filters and show all products
  const handleClearFilters = () => {
    setFilterCategory('');
    setFilterPrice([0, 10000]); // Reset price range
    setFilteredProducts(products);
    setShowFilters(false);
    setAlertMessage('Filters cleared!');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full relative" style={{width:"100vw"}}>
      {/* Alert Message */}
      {showAlert && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md flex items-center space-x-2 shadow-lg">
          <FiCheckCircle size={20} />
          <span>{alertMessage}</span>
        </div>
      )}

      {/* Header with Search and Filters */}
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

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-5 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts
            .filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product) => (
              <div
                key={product.listing_id}
                className="card bg-white border rounded-xl shadow-lg hover:shadow-2xl cursor-pointer"
                onClick={() => navigate(`/product/${product.product_id}`)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h5 className="font-bold text-lg truncate">{product.name}</h5>
                  <p className="text-gray-600 text-sm mt-2 truncate">{product.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-green-700 font-bold">${product.price.toFixed(2)}</span>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product.product_id}`);
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

      {/* Filters Sidebar */}
      {showFilters && (
        <aside className="w-80 bg-white shadow-lg p-6 fixed right-0 top-0 h-full z-40">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          
          {/* Category Filter */}
          <div className="mb-4">
            <label className="block font-medium">Category</label>
            <select
              className="w-full p-2 mt-2 border rounded"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Home">Home</option>
              {/* Add other categories as necessary */}
            </select>
          </div>

          {/* Price Filter */}
          <div className="mb-4">
            <label className="block font-medium">Price Range</label>
            <input
              type="range"
              min="0"
              max="10000"
              value={filterPrice[1]}
              onChange={(e) => setFilterPrice([filterPrice[0], e.target.value])}
              className="w-full"
            />
            <div className="flex justify-between text-sm">
              <span>${filterPrice[0]}</span>
              <span>${filterPrice[1]}</span>
            </div>
          </div>

          {/* Buttons */}
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
