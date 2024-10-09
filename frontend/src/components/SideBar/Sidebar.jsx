import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toogleModel } from "../../redux/store/slices/modalSlice";
import { Link, useNavigate } from "react-router-dom";
import { logOutuser } from "../Auth/logout";

const Sidebar = () => {
  const { isOpen } = useSelector((state) => state.modal);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleSidebar = () => {
    dispatch(toogleModel());
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await logOutuser(dispatch);
    navigate("/login");
  };

  return (
    <div className="flex flex-col z-50">
      <button
        onClick={toggleSidebar}
        className="p-4 text-gray-700 focus:outline-none lg:hidden"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>

      <aside
        className={`fixed lg:static lg:block lg:bg-transparent lg:shadow-none 
          w-64 h-full bg-white shadow-lg transition-transform duration-300 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold">E Learning</h2>
          <ul className="mt-4">
            <li className="py-2">
              <Link to="/">Home</Link>
            </li>
            <li className="py-2">
              <Link
                onClick={() => {
                  isOpen && toggleSidebar();
                }}
                to="/dashboard/profile"
              >
                Profile
              </Link>
            </li>

            {user?.role === "admin" && (
              <li className="py-2">
                <Link
                  onClick={() => {
                    isOpen && toggleSidebar();
                  }}
                  to="/dashboard/course-controller"
                >
                  Coureses
                </Link>
              </li>
            )}
            {user?.role === "user" ||
              ("admin" && (
                <li className="py-2">
                  <Link
                    onClick={() => {
                      isOpen && toggleSidebar();
                    }}
                    to="/dashboard/mycourse"
                  >
                    My Course
                  </Link>
                </li>
              ))}
            {user?.mainRole === "superadmin" && (
              <li className="py-2">
                <Link
                  onClick={() => {
                    isOpen && toggleSidebar();
                  }}
                  to="/dashboard/otherUsers"
                >
                  Update Role
                </Link>
              </li>
            )}
            <li className="py-2">
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
