import React from "react";

const ImageUpload = ({
  userInput,
  handleOnChange,
  imagePreview,
  handleRemoveImage,
  error,
  isLoading,
}) => {
  return (
    <div className="mt-6">
      <label className="block text-md font-medium text-gray-700 mb-2">
        Course Image
      </label>
      <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 text-center">
        {!imagePreview ? (
          <>
            <p className="text-gray-500">
              Drag and drop your course image here
            </p>
            <p className="text-gray-500">or</p>
            <label className="mt-2 text-blue-600 hover:underline cursor-pointer">
              Browse
              <input
                onChange={handleOnChange}
                type="file"
                accept="image/*"
                name="image"
                className="hidden"
                disabled={isLoading}
                value={userInput.image}
              />
            </label>
            {error && <p className="text-red-500">{error.image}</p>}
          </>
        ) : (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-64 object-cover mt-4 rounded-lg shadow"
          />
        )}
        {imagePreview && (
          <button
            disabled={isLoading}
            type="button"
            onClick={handleRemoveImage}
            className="text-red-500 hover:text-red-700 mt-4 transition duration-200"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
