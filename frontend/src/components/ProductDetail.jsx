import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi'; // Import the success check icon

const ProductDetail = () => {
  const { productId } = useParams(); // Extract productId from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false); // For the alert
  const [alertMessage, setAlertMessage] = useState(""); // For the alert message
  const navigate = useNavigate(); // To navigate programmatically

  // Fetch product details from the backend
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) {
        setError('Product ID is missing');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:5000/listings/api/product/${productId}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching product details');
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Function to handle Add to Cart button click
  const handleAddToCart = () => {
    setAlertMessage("Product added to cart successfully!");
    setShowAlert(true);

    // Hide the alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8" style={{ width: "100vw" }}>
      {/* Back to Listings Button */}
      <div className="mb-6">
        <button
          className="bg-transparent text-blue-600 hover:text-blue-500 p-2 rounded-full border border-blue-600 hover:border-blue-500 transition duration-200"
          onClick={() => navigate('/listings')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m7 7l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {product ? (
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Product Image Section */}
          <div className="flex justify-center items-center mb-8 p-4 col-span-1">
            <img
              src={`http://127.0.0.1:5000/uploads/${product.image}`} // Assuming the image is served from the server
              alt={product.name}
              className="w-full h-[60vh] object-cover rounded-xl shadow-lg transform transition-all duration-500 hover:scale-110"
            />
          </div>

          {/* Product Info Section */}
          <div className="p-6 flex flex-col justify-between h-full col-span-1">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{product.name}</h2>
            <p className="text-lg text-gray-700 mb-6">{product.description}</p>
            <div className="flex flex-col md:flex-row items-start justify-between mb-6">
              <p className="text-4xl font-semibold text-gray-900">${product.price}</p>
              <p className="text-lg text-gray-500">{product.category}</p>
            </div>
            <div className="mb-6">
              <p className="text-gray-600 font-semibold">Quantity Available: <span className="text-gray-900">{product.quantity}</span></p>
              <p className="text-gray-600 font-semibold">Rating: <span className="text-yellow-500">{product.rating} / 5</span></p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row  items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Add to Cart Button */}
              <button
                className="bg-green-600 text-white py-4 px-10 rounded-full shadow-xl hover:bg-green-500 transition-all duration-300 w-full sm:w-auto"
                onClick={handleAddToCart} // Trigger alert when clicked
              >
                Add to Cart
              </button>
              {/* Buy Now Button */}
              <button
                className="bg-orange-600 text-white py-4 px-10 rounded-full shadow-xl hover:bg-orange-500 transition-all duration-300 w-full sm:w-auto"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Delivery Information Section */}
          <div className="bg-gray-100 p-8 rounded-xl mb-8 col-span-1 md:col-span-2">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Delivery Information</h3>
            <p className="text-lg text-gray-600">Estimated Delivery Time: <span className="text-gray-900">2-3 Days</span></p>
            <p className="text-lg text-gray-600">Delivery Cost: <span className="text-gray-900">$5.99</span></p>
            <p className="text-lg text-gray-600">Delivery Route: <span className="text-gray-900">From New York Warehouse</span></p>
          </div>

          {/* Offers Section */}
          <div className="bg-yellow-50 p-8 rounded-xl mb-8 col-span-1 md:col-span-2">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Special Offers</h3>
            <p className="text-lg text-gray-600">Get 10% off on your first purchase! Use code: <span className="text-yellow-500">FIRSTBUY</span></p>
          </div>
        </div>
      ) : (
        <div className="text-center p-10">No product found</div>
      )}

      {/* Show Alert */}
      {showAlert && (
  <div
    className="absolute left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md flex items-center space-x-2 shadow-lg"
    style={{ top: "80px", zIndex: 9999 }} // Adjusted top value and zIndex
  >
    <FiCheckCircle size={20} />
    <span>{alertMessage}</span>
  </div>
)}
    </div>
  );
};

export default ProductDetail;
