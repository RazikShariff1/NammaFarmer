import React from "react";
import "./Home.css";
import localVideo from "../assets/nammaFarmer.mp4";

export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={localVideo}
          autoPlay
          muted
          loop
        ></video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 flex flex-col justify-center items-center text-white text-center px-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-wide animate-fadeIn">
            Empower Farmers, Grow Communities
          </h1>
          <button className="mt-8 px-12 py-4 bg-gradient-to-r from-green-400 to-teal-500 text-lg font-semibold rounded-full shadow-lg hover:scale-110 transform transition-all duration-300 animate-fadeIn delay-300">
            Explore Now
          </button>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-8 md:px-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-extrabold text-green-600 mb-6">
            A Vision for a Better Tomorrow
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            At NammaFarmer, we believe in the power of innovation to uplift
            agricultural communities. Our platform connects farmers with tools,
            markets, and support systems to create a sustainable and profitable
            ecosystem.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 md:px-20 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-extrabold text-green-600 mb-8">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Intelligent Insights",
                description:
                  "Get cutting-edge data analytics for smarter farming decisions.",
                icon: "📈",
              },
              {
                title: "Seamless Connectivity",
                description:
                  "Bridge the gap between farmers, buyers, and experts effortlessly.",
                icon: "🔗",
              },
              {
                title: "Eco-Friendly Practices",
                description:
                  "Access sustainable farming techniques for a greener future.",
                icon: "🌱",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-green-600 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Transform Your Farming Journey?
          </h2>
          <p className="text-lg md:text-xl mt-4 mb-8 max-w-xl mx-auto">
            Join thousands of farmers who have unlocked their potential with
            NammaFarmer.
          </p>
          <button className="px-12 py-4 bg-white text-green-600 font-semibold rounded-full shadow-lg hover:scale-105 transform transition-all duration-300">
            Get Started Today
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-8 md:px-20 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-5xl font-extrabold text-green-600 text-center mb-12">
            What Our Farmers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                quote:
                  "NammaFarmer revolutionized my farming practices. I now earn double with their insights!",
                name: "Anil Kumar",
                image: "https://via.placeholder.com/100",
              },
              {
                quote:
                  "Weather updates and market analytics have made all the difference for me.",
                name: "Sunitha Reddy",
                image: "https://via.placeholder.com/100",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center text-center"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mb-4"
                />
                <p className="italic text-gray-600 mb-4">"{testimonial.quote}"</p>
                <h4 className="font-semibold text-green-600">{testimonial.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} NammaFarmer. All Rights Reserved.
          </p>
          <p className="mt-2 text-sm">
            Made with ❤️ to empower farmers worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
}
