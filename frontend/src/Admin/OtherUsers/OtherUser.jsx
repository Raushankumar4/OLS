import React from "react";
import { useSelector } from "react-redux";
import { useUpdateRole } from "../../hooks/useUpdateRole";
import { useGetOtherUsers } from "../../hooks/useGetOtherUsers";

const OtherUser = () => {
  const { otherUsers, user } = useSelector((state) => state.user);
  useGetOtherUsers(user?._id);

  const { updateRole } = useUpdateRole();

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {otherUsers?.map((user) => (
          <div
            key={user?._id}
            className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <img
              className="rounded-full w-24 h-24 mb-4 border-2 border-gray-300"
              src={user?.profileImage}
              alt={user?.name}
            />
            <h3 className="text-xl font-semibold">{user?.name}</h3>
            <p className="text-gray-600">{user?.email}</p>
            <span className="inline-block text-xs font-semibold text-white bg-green-600 rounded-full px-3 py-1 mt-2">
              {user?.role}
            </span>
            <button
              className="bg-blue-600 text-white p-2 rounded-md mt-4 w-full hover:bg-blue-700 transition duration-300"
              onClick={() => updateRole(user?._id)}
            >
              Update Role
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherUser;
