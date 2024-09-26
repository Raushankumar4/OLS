import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="w-6 h-6 border-4 border-t-transparent  rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
