import React from 'react';
import './Home.css';
import heroImage from '../assets/nf1.jpg'; // Replace with a relevant SVG or PNG
import featureIcon1 from '../assets/nf2.jpg'; // Replace with icons for features
import featureIcon2 from '../assets/nf3.jpg';
import featureIcon3 from '../assets/nf4.jpg';
import vid from '../assets/nammaFarmer.mp4';

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero bg-gradient-to-r from-green-400 to-green-600 text-white py-12 px-6 rounded-lg mb-16">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <div className="video-container bg-gray-900 rounded-lg overflow-hidden shadow-lg aspect-w-16 aspect-h-9">
              <video src={vid} loop controls className="w-full h-full object-cover"></video>
            </div>
          </div>
          <div className="lg:w-1/2 lg:pl-12 text-center lg:text-left">
            <h1 className="text-4xl font-bold mb-4">Welcome to NammaFarmer</h1>
            <p className="text-lg mb-6">
              Empowering farmers to connect, grow, and thrive in a modern agricultural ecosystem.
            </p>
            <button className="bg-white text-green-600 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-100 transition">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features text-center mb-16 px-6">
        <h2 className="text-3xl font-bold text-green-600 mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="feature-card p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
            <img src={featureIcon1} alt="Connect icon" className="w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Connect with Buyers</h3>
            <p>Sell your produce directly to buyers and maximize your profits.</p>
          </div>
          <div className="feature-card p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
            <img src={featureIcon2} alt="Prices icon" className="w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Track Crop Prices</h3>
            <p>Stay informed with real-time updates on crop prices in your area.</p>
          </div>
          <div className="feature-card p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
            <img src={featureIcon3} alt="Advice icon" className="w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Access Expert Advice</h3>
            <p>Learn from agricultural experts to improve productivity.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials bg-gray-100 py-12 px-6 rounded-lg">
        <h2 className="text-3xl font-bold text-green-600 text-center mb-8">What Farmers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="testimonial-card bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="profile mb-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Ravi"
                className="w-16 h-16 rounded-full mx-auto"
              />
            </div>
            <p className="italic text-gray-700 mb-4">
              "NammaFarmer helped me sell my produce at the best price. It’s truly life-changing!"
            </p>
            <h4 className="text-gray-800 font-semibold">– Ravi, Farmer</h4>
          </div>
          <div className="testimonial-card bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="profile mb-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Meera"
                className="w-16 h-16 rounded-full mx-auto"
              />
            </div>
            <p className="italic text-gray-700 mb-4">
              "Connecting with local farmers has never been easier. Highly recommend!"
            </p>
            <h4 className="text-gray-800 font-semibold">– Meera, Buyer</h4>
          </div>
        </div>
      </section>
    </div>
  );
}
