import React from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useLocation } from "react-router-dom";

const FormSubmit = ({ isLoading }) => {
  const location = useLocation();
  const show = location.pathname === "/dashboard/create-new-course";
  return (
    <button
      disabled={isLoading}
      type="submit"
      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 mt-4 transition duration-200"
    >
      {isLoading ? (
        <LoadingSpinner className="inline-block" />
      ) : (
        <span>{show ? "Create Course" : "Update Course"}</span>
      )}
    </button>
  );
};

export default FormSubmit;
