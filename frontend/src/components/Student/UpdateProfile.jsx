import React, { useEffect, useState } from "react";
import { InputField } from "../InputArea/InputField";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_URL } from "../../constant";
import { errorToast, successToast } from "../Toast/ToastNotify";
import { updateUser } from "../../redux/store/slices/userSlice";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

const UpdateProfile = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState({
    name: user?.name || "",
    profileImage: null,
  });

  const [imagePreview, setImagePreview] = useState(user?.profileImage || null);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (user) {
      setUserProfile({
        name: user.name,
        profileImage: null,
      });
      setImagePreview(user.profileImage);
    }
  }, [user, isOpen]);

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      const file = files[0];
      setUserProfile((prev) => ({ ...prev, [name]: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setUserProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveImage = () => {
    setUserProfile((prev) => ({ ...prev, profileImage: null }));
    setImagePreview(null);
  };

  const updateUserProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userProfile.name);
    if (userProfile.profileImage) {
      formData.append("profileImage", userProfile.profileImage);
    }
    setIsLoading(true);
    try {
      const { data } = await axios.put(
        `${USER_URL}/update-profile/${user?._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      successToast(data?.message);
      dispatch(updateUser(data.updateProfile));
      onClose();
    } catch (error) {
      errorToast(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4`}>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm"></div>
      )}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md max-w-md w-full"
        initial="hidden"
        animate={isOpen ? "visible" : "exit"}
        exit="exit"
        variants={modalVariants}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <AiOutlineClose
            className="text-gray-600 cursor-pointer hover:text-gray-800 transition"
            size={24}
            onClick={onClose}
          />
        </div>

        <form onSubmit={updateUserProfile}>
          {/* Profile Image */}
          <div className="flex flex-col items-center mb-4">
            {!imagePreview && (
              <label className="flex items-center justify-center w-32 h-32 rounded-full border-2 border-gray-300 cursor-pointer overflow-hidden mb-2">
                <input
                  onChange={handleOnChange}
                  accept="image/*"
                  name="profileImage"
                  type="file"
                  className="hidden"
                />
                <span className="text-gray-500">Upload</span>
              </label>
            )}
            {imagePreview && (
              <div className="mb-2">
                <img
                  className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                  src={imagePreview}
                  alt="Profile"
                />
              </div>
            )}
            {imagePreview && (
              <button
                onClick={handleRemoveImage}
                disabled={isLoading}
                className="text-red-500 hover:text-red-600 mb-4"
                type="button"
              >
                Remove
              </button>
            )}
          </div>

          <InputField
            label="Name"
            onChange={handleOnChange}
            type="text"
            name="name"
            value={userProfile.name}
            disabled={isLoading}
          />

          <InputField
            label="Email"
            type="email"
            disabled
            className="bg-gray-200"
            value={user?.email || ""}
          />

          <textarea
            placeholder="About Me"
            className="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="2"
          />

          <div className="">
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
              {isLoading ? <LoadingSpinner /> : "Save"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateProfile;
