import React, { useState, useEffect } from 'react';
import { FiFilter, FiSearch } from 'react-icons/fi';

const products = [
  { id: 1, name: 'Wheat', category: 'Grain', price: 10, image: 'https://source.unsplash.com/300x300/?wheat', description: 'High-quality wheat for all your baking needs.' },
  { id: 2, name: 'Carrot', category: 'Vegetable', price: 5, image: 'https://source.unsplash.com/300x300/?carrot', description: 'Fresh and crunchy carrots.' },
  { id: 3, name: 'Corn', category: 'Grain', price: 8, image: 'https://source.unsplash.com/300x300/?corn', description: 'Sweet and organic corn.' },
  { id: 4, name: 'Tomato', category: 'Vegetable', price: 6, image: 'https://source.unsplash.com/300x300/?tomato', description: 'Juicy tomatoes from organic farms.' },
  { id: 5, name: 'Apple', category: 'Fruit', price: 12, image: 'https://source.unsplash.com/300x300/?apple', description: 'Crisp and sweet apples.' },
  { id: 6, name: 'Banana', category: 'Fruit', price: 8, image: 'https://source.unsplash.com/300x300/?banana', description: 'Perfectly ripe bananas.' },
  { id: 7, name: 'Mango', category: 'Fruit', price: 15, image: 'https://source.unsplash.com/300x300/?mango', description: 'Delicious and tropical mangoes.' },
  { id: 8, name: 'Strawberry', category: 'Fruit', price: 18, image: 'https://source.unsplash.com/300x300/?strawberry', description: 'Fresh and flavorful strawberries.' },
];


const categories = ['Grain', 'Vegetable', 'Fruit'];

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const applyFilters = () => {
    setShowFilters(false);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="bg-gray-100 min-h-screen" style={{ width: "100vw" }}>
      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center w-full max-w-md bg-white rounded-full px-4 py-2 shadow-md ring-1 ring-gray-300 transition-all focus-within:ring-2 focus-within:ring-blue-500">
          <FiSearch className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent focus:outline-none placeholder-gray-400"
          />
        </div>
        <button
          onClick={() => setShowFilters(true)}
          className="ml-4 p-3 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-all"
        >
          <FiFilter size={24} />
        </button>
      </div>

      {/* Carousel Section */}
      

      {/* Product Cards Section */}
      <div className="max-w-7xl mx-auto px-5 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="card bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={product.image}
              className="card-img-top rounded-t-lg"
              alt={product.name}
            />
            <div className="card-body p-4">
              <h5 className="card-title font-semibold text-lg">{product.name}</h5>
              <p className="card-text text-gray-600 text-sm">{product.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-green-600 font-bold text-lg">
                  ${product.price}
                </span>
                <a
                  href="#"
                  className="btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Sidebar */}
      {showFilters && (
        <aside className="w-80 bg-white shadow-lg p-6 fixed right-0 top-0 h-full z-40 transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Categories</h3>
            {categories.map((category) => (
              <label key={category} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                  className="mr-2"
                />
                {category}
              </label>
            ))}
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Price Range</h3>
            <div className="flex items-center">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([+e.target.value, priceRange[1]])
                }
                className="w-16 p-1 border border-gray-300 rounded-md mr-2"
              />
              <span className="mx-2">-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], +e.target.value])
                }
                className="w-16 p-1 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={applyFilters}
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all"
          >
            Apply Filters
          </button>
        </aside>
      )}
    </div>
  );
};

export default ProductCatalog;
