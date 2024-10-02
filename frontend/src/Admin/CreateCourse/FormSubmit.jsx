import React from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const FormSubmit = ({ isLoading }) => {
  return (
    <button
      disabled={isLoading}
      type="submit"
      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 mt-4 transition duration-200"
    >
      {isLoading ? (
        <LoadingSpinner className="inline-block" />
      ) : (
        "Create Course"
      )}
    </button>
  );
};

export default FormSubmit;
