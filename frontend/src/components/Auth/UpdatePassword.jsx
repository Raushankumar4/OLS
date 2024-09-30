import React, { useState } from "react";
import { InputField } from "../InputArea/InputField";
import axios from "axios";
import { USER_URL } from "../../constant";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../Toast/ToastNotify";
import LoadingButton from "../LoadingSpinner/isLoading";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

const UpdatePassword = ({ isOpen, onClose }) => {
  const [updatePassword, setUpdatePassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState({});
  const token = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.user?.user?._id);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newError = {};
    if (!updatePassword.currentPassword) {
      newError.currentPassword = "Current Password is required";
    }
    if (!updatePassword.newPassword) {
      newError.newPassword = "New Password is required";
    }
    if (!updatePassword.confirmNewPassword) {
      newError.confirmNewPassword = "Confirm New Password is required";
    }
    if (updatePassword.newPassword !== updatePassword.confirmNewPassword) {
      newError.confirmNewPassword = "Passwords do not match";
    }
    setError(newError);
    return Object.keys(newError).length === 0 ? null : newError;
  };

  const changePassword = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors) {
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.put(
        `${USER_URL}/update-password/${id}`,
        {
          currentPassword: updatePassword.currentPassword,
          newPassword: updatePassword.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      successToast(data?.message);
      navigate("/login");
    } catch (error) {
      errorToast(error?.response?.data?.message || error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 ${isOpen ? "block" : "hidden"}`}>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
      )}
      <motion.div
        className={`flex justify-center items-center fixed inset-0 ${
          isOpen ? "block" : "hidden"
        }`}
        initial="hidden"
        animate={isOpen ? "visible" : "exit"}
        exit="exit"
        variants={modalVariants}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
          <AiOutlineClose
            className="absolute top-4 right-4 text-gray-600 cursor-pointer hover:text-gray-800 transition"
            size={24}
            onClick={onClose}
          />
          <h2 className="text-2xl font-semibold mb-4">Update Password</h2>
          <form onSubmit={changePassword}>
            <InputField
              label="Current Password"
              type="password"
              name="currentPassword"
              placeholder="Enter your current password"
              value={updatePassword.currentPassword}
              error={error.currentPassword}
              onChange={(e) =>
                setUpdatePassword({
                  ...updatePassword,
                  currentPassword: e.target.value,
                })
              }
              disabled={isLoading}
            />
            <InputField
              label="New Password"
              type="password"
              name="newPassword"
              placeholder="Enter your new password"
              value={updatePassword.newPassword}
              onChange={(e) =>
                setUpdatePassword({
                  ...updatePassword,
                  newPassword: e.target.value,
                })
              }
              disabled={isLoading}
              error={error.newPassword}
            />
            <InputField
              label="Confirm New Password"
              type="password"
              name="confirmNewPassword"
              placeholder="Confirm your new password"
              value={updatePassword.confirmNewPassword}
              onChange={(e) =>
                setUpdatePassword({
                  ...updatePassword,
                  confirmNewPassword: e.target.value,
                })
              }
              disabled={isLoading}
              error={error.confirmNewPassword}
            />
            <button
              disabled={isLoading}
              type="submit"
              className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200"
            >
              {isLoading ? (
                <LoadingButton className="inline-block" />
              ) : (
                "Update Password"
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdatePassword;
