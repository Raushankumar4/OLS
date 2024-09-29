import React, { useState } from "react";
import { InputField } from "../InputArea/InputField";
import axios from "axios";
import { USER_URL } from "../../constant";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../Toast/ToastNotify";
import LoadingButton from "../LoadingSpinner/isLoading";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter a valid email.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(`${USER_URL}/forgotPassword`, {
        email,
      });
      successToast(response.data.message);
      navigate("/login");
    } catch (error) {
      errorToast(error.response?.data.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          Forgot Your Password?
        </h2>
        <p className="text-center mb-4">
          Enter your email address below to receive a password reset link.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <InputField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
              error={error}
              name="email"
              label="Email"
              type="email"
              disabled={isLoading}
            />
          </div>
          <LoadingButton isLoading={isLoading} type="submit">
            Send Password Reset Link
          </LoadingButton>
        </form>
        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-500 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
