import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-700 p-6">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-8 space-y-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Get in Touch</h2>
        <p className="text-center text-gray-600">
          Have questions? We'd love to hear from you! Fill out the form, and our team will get back to you shortly.
        </p>
        <form action="#" method="POST" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="Write your message here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium rounded-lg shadow-lg hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
          >
            Send Message
          </button>
        </form>
        <div className="text-center text-gray-500">
          Or reach out to us directly:{" "}
          <a href="mailto:support@nammafarmer.com" className="text-green-600 hover:underline">
            support@nammafarmer.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;