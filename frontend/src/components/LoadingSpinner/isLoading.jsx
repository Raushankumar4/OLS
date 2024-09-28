import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const LoadingButton = ({ isLoading, children, ...props }) => {
  return (
    <button
      disabled={isLoading}
      {...props}
      className={`w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isLoading ? <LoadingSpinner className="inline-block" /> : children}
    </button>
  );
};

export default LoadingButton;
