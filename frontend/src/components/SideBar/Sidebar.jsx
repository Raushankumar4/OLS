import React from "react";
import { useNavigate } from "react-router-dom";
import { logOutuser } from "../Auth/logout";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = ({ isOpen, toggleSidebar, onLinkClick }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logOutuser(dispatch);
    navigate("/login");
  };

  return (
    <aside
      className={`bg-gray-800 text-white w-64 p-4 flex-shrink-0 transition-transform duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:block fixed lg:static h-full z-10`}
      aria-hidden={!isOpen}
      role="navigation"
    >
      <h2 className="text-xl font-bold mb-4">Student Dashboard</h2>
      <button
        className="lg:hidden mb-4 text-sm text-gray-400 hover:text-white"
        onClick={toggleSidebar}
      >
        Close
      </button>
      <ul>
        <li className="mb-2">
          <button
            onClick={() => onLinkClick("CourseProgress")}
            className="hover:underline"
          >
            Home
          </button>
        </li>
        <li className="mb-2">
          <button
            onClick={() => onLinkClick("profile")}
            className="hover:underline"
          >
            Profile
          </button>
        </li>
        <li className="mb-2">
          <button
            onClick={() => onLinkClick("mycourses")}
            className="hover:underline"
          >
            Courses
          </button>
        </li>
        <li className="mb-2">
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
