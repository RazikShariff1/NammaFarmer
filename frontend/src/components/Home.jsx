import React from 'react';
import './Home.css';
import heroImage from '../assets/nf1.jpg'; // Replace with a relevant SVG or PNG
import featureIcon1 from '../assets/nf2.jpg'; // Replace with icons for features
import featureIcon2 from '../assets/nf3.jpg';
import featureIcon3 from '../assets/nf4.jpg';
// import vid from '../assets/nammaFarmer.mp4';

import localVideo from "../assets/nammaFarmer.mp4"; // Replace with your local video file

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Video Section */}
      <section className="relative w-full h-[50vh] overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={localVideo}
          autoPlay
          muted
          loop
        ></video>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Empower Farmers, Grow Communities
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl">
            Revolutionize farming with NammaFarmer—your gateway to better
            markets, smarter tools, and expert advice.
          </p>
          <button className="mt-6 px-8 py-4 bg-green-600 text-lg font-medium rounded-lg shadow-lg hover:bg-green-700 transition">
            Get Started
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-green-600">
              Transforming Agriculture with Technology
            </h2>
            <p className="text-gray-600 mt-4 text-lg leading-relaxed">
              At NammaFarmer, we bridge the gap between farmers, buyers, and
              experts, ensuring access to crucial resources like market
              insights, weather updates, and community support. Start your
              journey towards better farming today!
            </p>
            <button className="mt-6 px-6 py-3 bg-green-600 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-green-700 transition">
              Learn More
            </button>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <img
              src={heroImage}
              alt="Farming illustration"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-20 bg-green-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-600">
            Smart Tools for Smarter Farming
          </h2>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            NammaFarmer offers a comprehensive suite of tools designed to help
            farmers make informed decisions and grow sustainably.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <img
              src={featureIcon1}
              alt="Weather Updates"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-700">
              Weather Forecasts
            </h3>
            <p className="text-gray-500 mt-2">
              Stay ahead with accurate weather forecasts tailored for farming
              needs.
            </p>
          </div>
          <div className="flex flex-col items-center text-center bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <img
              src={featureIcon2}
              alt="Crop Prices"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-700">
              Market Insights
            </h3>
            <p className="text-gray-500 mt-2">
              Track real-time crop prices and trends to maximize profitability.
            </p>
          </div>
          <div className="flex flex-col items-center text-center bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <img
              src={featureIcon3}
              alt="Expert Advice"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-700">
              Expert Tips
            </h3>
            <p className="text-gray-500 mt-2">
              Learn from agriculture experts to enhance your farming practices.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-600">
            Trusted by Farmers Across the Country
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <p className="text-gray-600 italic">
                "Thanks to NammaFarmer, I have access to the latest crop prices
                and market trends. It’s a lifesaver!"
              </p>
              <h4 className="mt-4 font-semibold text-green-600">- Priya</h4>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <p className="text-gray-600 italic">
                "Weather updates and expert tips have made farming so much
                easier for me. Highly recommend!"
              </p>
              <h4 className="mt-4 font-semibold text-green-600">- Rajesh</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}