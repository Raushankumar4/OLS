import React, { useState } from "react";
import { InputField } from "../InputArea/InputField";
import axios from "axios";
import { AUTH_URL } from "../../contsant";
import { errorToast, successToast } from "../Toast/ToastNotify";
import { useDispatch } from "react-redux";
import { setActivationToken } from "../../redux/store/slices/authSlice";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userInput, setUserInput] = useState({
    profileImage: null,
    name: "",
    email: "",
    password: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const naviagate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!userInput.name) {
      newErrors.name = "Name is required";
    }
    if (!userInput.email) {
      newErrors.email = "email is required";
    }
    if (!userInput.password) {
      newErrors.password = "Password required";
    } else if (userInput.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 ? null : newErrors;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profileImage") {
      const file = files[0];
      setUserInput({ ...userInput, [name]: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setUserInput({ ...userInput, [name]: value });
    }
  };

  const handleRemoveImage = () => {
    setUserInput({ ...userInput, profileImage: null });
    setImagePreview(null);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (validateForm()) return;
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("profileImage", userInput.profileImage);
      formData.append("name", userInput.name);
      formData.append("email", userInput.email);
      formData.append("password", userInput.password);
      const { data } = await axios.post(`${AUTH_URL}/register`, formData);
      setIsLoading(false);
      dispatch(setActivationToken(data?.activationToken));
      successToast(data?.message);
      naviagate("/verifyOtp");
    } catch (error) {
      errorToast(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="flex w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="w-1/2 hidden md:block">
          <img
            src="./kid.png"
            alt="E-Learning"
            className="w-fit h-auto pt-6 object-cover overflow-hidden"
          />
        </div>
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <form onSubmit={registerUser}>
            <div className="mb-6 text-center">
              <input
                type="file"
                accept="image/*"
                name="profileImage"
                onChange={handleChange}
                className="hidden"
                id="profileImageInput"
              />
              <label htmlFor="profileImageInput" className="cursor-pointer">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="w-20 h-20 object-cover rounded-full border-2 border-blue-600 mx-auto mb-2"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full border-2 border-gray-300 bg-gray-200 dark:border-gray-600 dark:bg-gray-700 flex items-center justify-center text-gray-400 mx-auto mb-2">
                    <span className="text-3xl">+</span>
                  </div>
                )}
              </label>
              {imagePreview && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-red-500 underline"
                >
                  Remove Image
                </button>
              )}
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
                Student Signup
              </h2>
            </div>
            <InputField
              onChange={handleChange}
              label="Name"
              name="name"
              placeholder="Enter your name"
              disabled={isLoading}
              error={errors.name}
              className="mb-4"
            />

            <InputField
              label="Email"
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Enter your email"
              disabled={isLoading}
              error={errors.email}
              className="mb-4"
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={isLoading}
              className="mb-4"
              error={errors.password}
            />

            <button
              disabled={isLoading}
              type="submit"
              className={`w-full py-2 px-4 text-white rounded ${
                isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-500"
              } transition`}
            >
              {isLoading ? <LoadingSpinner /> : "Register"}
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
