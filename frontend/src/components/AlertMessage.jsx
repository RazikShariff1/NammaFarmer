import { useState, useEffect } from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi"; // Import the success and error icons

export default function AlertMessage({ showAlert, alertMessage, alertType }) {
  return (
    showAlert && (
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md flex items-center space-x-2 shadow-lg transition-all duration-300 ease-in-out`}
        style={{
          top: "80px",
          zIndex: 9999,
          opacity: showAlert ? 1 : 0,
          visibility: showAlert ? "visible" : "hidden",
        }}
      >
        {alertType === "success" ? (
          <>
            <FiCheckCircle size={20} className="text-white" />
            <span className="text-white">{alertMessage}</span>
          </>
        ) : (
          <>
            <FiXCircle size={20} className="text-white" />
            <span className="text-white">{alertMessage}</span>
          </>
        )}
      </div>
    )
  );
}

