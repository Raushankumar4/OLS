import React, { useState } from "react";
import { AUTH_URL } from "../../constant";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { errorToast, successToast } from "../Toast/ToastNotify";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // For error messages
  const activationToken = useSelector((state) => state.auth.activationToken);
  const navigate = useNavigate();
  console.log(activationToken);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow only numbers and limit input to one character
    if (!/^\d*$/.test(value) || value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input
    if (value && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move back to previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const otpNumber = Number(otp.join(""));
      const { data } = await axios.post(`${AUTH_URL}/verfiy`, {
        otp: otpNumber,
        activationToken,
      });
      successToast(data.message);
      navigate("/login");
      setIsLoading(false);
    } catch (error) {
      errorToast(error.response.data.message || error.message);
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Verify OTP</h2>
        {error && (
          <div className="mb-4 text-red-500 text-center">{error}</div>
        )}{" "}
        {/* Error message display */}
        <div className="flex justify-between mb-4 space-x-2">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:border-blue-500"
            />
          ))}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 ${
            isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white font-semibold rounded-lg transition duration-200`}
        >
          {isLoading ? <LoadingSpinner /> : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
