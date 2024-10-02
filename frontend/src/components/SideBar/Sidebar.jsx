import React from "react";
import { useNavigate } from "react-router-dom";
import { logOutuser } from "../Auth/logout";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = ({ isOpen, toggleSidebar, onLinkClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

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
      <h2 className="text-xl font-bold mb-4">
        {user?.role === "admin" ? "Admin Dashboard" : "Student Dashboard"}
      </h2>
      <button
        className="lg:hidden mb-4 text-sm text-gray-400 hover:text-white"
        onClick={toggleSidebar}
      >
        Close
      </button>
      <ul>
        <li className="mb-2">
          <button
            onClick={() => {
              const route =
                user?.role === "admin" ? "Adminhome" : "CourseProgress";
              onLinkClick(route);
            }}
            className="hover:underline"
          >
            Home
          </button>
        </li>
        <li className="mb-2">
          <button
            onClick={() => {
              const route =
                user?.mainRole === "superAdmin" ? "Adminprofile" : "profile";
              onLinkClick(route);
            }}
            className="hover:underline"
          >
            Profile
          </button>
        </li>
        <li className="mb-2">
          <button
            onClick={() => {
              const route =
                user?.role === "admin" ? "Adminprofile" : "mycourses";
              onLinkClick(route);
            }}
            className="hover:underline"
          >
            My Courses
          </button>
        </li>

        {user?.role === "admin" && (
          <ul>
            <li className="mb-2">
              <button
                onClick={() => {
                  onLinkClick("CreateCourse");
                }}
                className="hover:underline"
              >
                Create Course
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => {
                  onLinkClick("CreateLecture");
                }}
                className="hover:underline"
              >
                Create Lecture
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => {
                  const route =
                    user?.role === "admin" ? "AdminCourses" : "mycourses";
                  onLinkClick(route);
                }}
                className="hover:underline"
              >
                {user?.role === "admin" ? "All Courses" : "My Courses"}
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => {
                  onLinkClick("CreateLecture");
                }}
                className="hover:underline"
              >
                All Lectures
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => {
                  onLinkClick("CreateLecture");
                }}
                className="hover:underline"
              >
                Update Role
              </button>
            </li>
          </ul>
        )}

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
