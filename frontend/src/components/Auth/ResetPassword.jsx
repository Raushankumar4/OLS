import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { USER_URL } from "../../constant";
import { InputField } from "../InputArea/InputField";
import { errorToast, successToast } from "../Toast/ToastNotify";
import LoadingButton from "../LoadingSpinner/isLoading";

const ResetPassword = () => {
  const { token } = useParams();
  console.log(token);

  const [userInput, setUserInput] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!userInput.password) {
      newErrors.password = "Password is required";
    }
    if (!userInput.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (userInput.password !== userInput.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0 ? null : newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors) return;

    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${USER_URL}/resetPassword?token=${token}`,
        {
          password: userInput.password,
        }
      );

      successToast(data?.message);
      navigate("/login");
    } catch (err) {
      errorToast(err?.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <InputField
              label="New Password"
              type="password"
              name="password"
              disabled={isLoading}
              value={userInput.password}
              onChange={(e) =>
                setUserInput({ ...userInput, password: e.target.value })
              }
              error={error.password}
              placeholder="Enter new password"
            />
            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={userInput.confirmPassword}
              disabled={isLoading}
              onChange={(e) =>
                setUserInput((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              error={error.confirmPassword}
              placeholder="Confirm new password"
            />
          </div>
          <LoadingButton isLoading={isLoading} type="submit">
            Reset Password
          </LoadingButton>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
