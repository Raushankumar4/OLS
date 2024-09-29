import React, { useState } from "react";
import { useSelector } from "react-redux";
import UpdateProfile from "./UpdateProfile";
import { useGetProfile } from "../../utils/useGetProfile";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const [isModalOpen, setModalOpen] = useState(false);
  useGetProfile();

  return (
    <div className="max-w-4xl mx-auto mb-6 bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6 flex-wrap">
        <div className="flex items-center">
          <img
            src={
              user?.profileImage ||
              "https://www.tech101.in/wp-content/uploads/2018/07/blank-profile-picture.png"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full border border-gray-300 mr-4"
          />
          <div>
            <h2 className="text-2xl font-semibold">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Edit
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
        <p className="text-gray-700">Date of Birth: January 1, 2000</p>
        <p className="text-gray-700">Phone: 123-456-7890</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Enrolled Courses</h3>
        <ul className="list-disc list-inside">
          <li className="text-gray-700">
            {user?.enrolledCourses || "No courses enrolled"}
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">About Me</h3>
        <p className="text-gray-700">
          A passionate learner who enjoys exploring new fields of knowledge.
        </p>
      </div>

      <UpdateProfile isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Profile;
