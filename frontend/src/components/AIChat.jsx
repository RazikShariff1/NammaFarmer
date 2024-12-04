import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Import Axios
import ChatLogo from "../assets/nfai.gif";

export default function AIChat() {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [dynamicPrompts, setDynamicPrompts] = useState([]);
  const chatEndRef = useRef(null);

  // List of pre-defined prompts
  const prompts = [
    { text: "Tell me about current market trends.", icon: "trending_up" },
    { text: "Give me tips for effective farming.", icon: "eco" },
    { text: "What are the latest agricultural tools?", icon: "construction" },
    { text: "How do I prevent crop diseases?", icon: "healing" },
    { text: "What fertilizers are best for rice?", icon: "science" },
    { text: "How to improve soil quality?", icon: "terrain" },
    { text: "Tips for organic farming.", icon: "spa" },
    { text: "Explain hydroponic farming.", icon: "water_drop" },
    { text: "What crops grow best in winter?", icon: "ac_unit" },
    { text: "How to control pests naturally?", icon: "bug_report" },
    { text: "Share the latest agriculture news.", icon: "newspaper" },
    { text: "Explain smart farming technologies.", icon: "smartphone" },
    { text: "Best irrigation techniques?", icon: "water" },
    { text: "How to set up a greenhouse?", icon: "house" },
    { text: "What is vertical farming?", icon: "vertical_align_top" },
    { text: "How to boost crop yield?", icon: "trending_up" },
    { text: "Latest advancements in agri-tech.", icon: "devices_other" },
    { text: "Best practices for seed storage.", icon: "inventory" },
    { text: "How to start sustainable farming?", icon: "eco" },
    { text: "What are the benefits of crop rotation?", icon: "repeat" },
  ];

  useEffect(() => {
    // Randomly pick 4-5 prompts from the list
    const shuffled = prompts.sort(() => 0.5 - Math.random());
    setDynamicPrompts(shuffled.slice(0, 5));
  }, []);

  const sendMessage = async () => {
    if (userMessage.trim() === "") return;

    // Add user message to chat
    const newMessage = { text: userMessage, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserMessage(""); // Clear the input field

    // Simulate bot typing
    setIsTyping(true);

    try {
      // Send request to the backend
      const response = await axios.post("http://127.0.0.1:5000/api/message", {
        message: userMessage,
      });

      setIsTyping(false); // Stop typing indicator

      // Handle the response from the backend
      const botResponse = {
        text: response.data.response, // Get the actual response from backend
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      setIsTyping(false);
      console.error("Error fetching the response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Sorry, there was an issue with the backend. Please try again.",
          sender: "bot",
        },
      ]);
    }
  };

  return (
    <section className="py-20 bg-gray-100 text-gray-900">
      <div className="container mx-auto max-w-4xl px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-6 text-center">
          AI Chat Assistant
        </h2>
        <p className="text-gray-600 text-lg text-center mb-8">
          Get real-time answers to your agricultural queries, crop insights, and more!
        </p>

        {/* Chat Window */}
        <div className="border border-gray-300 rounded-[35px] shadow-lg bg-white overflow-hidden">
          <div className="p-4 h-[350px] overflow-y-auto space-y-4">
            {messages.length === 0 && !isTyping ? (
              <div className="text-center">
                <img
                  src={ChatLogo}
                  alt="Chat Logo"
                  className="mx-auto w-20 h-20 mb-4"
                  style={{ objectFit: "cover" }}
                />
                <p className="text-lg font-semibold text-gray-600 mb-4">
                  How can I assist you today?
                </p>
                <div className="flex justify-center gap-3 flex-wrap">
                  {dynamicPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setUserMessage(prompt.text)}
                      className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full shadow-sm hover:bg-gray-200 transition"
                    >
                      <span className="material-icons text-sm mr-2">
                        {prompt.icon}
                      </span>
                      {prompt.text}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`p-3 rounded-lg text-sm max-w-sm shadow-lg ${
                      msg.sender === "user" ? "bg-gradient-to-r from-green-400 to-teal-400 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-150"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Field */}
          <div className="p-4 border-t border-gray-200 flex items-center bg-gray-50">
            <input
              type="text"
              placeholder="Type your message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm transition"
            />
            <button
              onClick={sendMessage}
              className="ml-4 px-5 py-3 bg-gradient-to-r from-green-400 to-teal-400 text-white font-semibold rounded-full shadow-lg hover:scale-105 transform transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

