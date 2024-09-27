import React, { useState } from "react";
import { FaMoon, FaSun, FaBars, FaTimes, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setProfileOpen(!profileOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={`bg-white dark:bg-gray-800 p-4 shadow-md sticky top-0 z-50`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800 dark:text-white hidden md:block">
          ELearning
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? (
              <FaTimes className="text-gray-800 dark:text-white" />
            ) : (
              <FaBars className="text-gray-800 dark:text-white" />
            )}
          </button>
        </div>
        <div
          className={`hidden md:flex space-x-6 ${
            isOpen ? "flex-col md:flex-row" : ""
          }`}
        >
          <Link
            to="/"
            className="text-gray-800 dark:text-white hover:underline"
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="text-gray-800 dark:text-white hover:underline"
          >
            Courses
          </Link>
          <Link
            to="/about"
            className="text-gray-800 dark:text-white hover:underline"
          >
            About
          </Link>
          <Link
            to="/policy"
            className="text-gray-800 dark:text-white hover:underline"
          >
            Policy
          </Link>
          <Link
            to="/faq"
            className="text-gray-800 dark:text-white hover:underline"
          >
            FAQ
          </Link>
          <button onClick={toggleDarkMode} className="flex items-center">
            {darkMode ? (
              <FaMoon className="dark:text-gray-100 " />
            ) : (
              <FaSun className="text-yellow-500" />
            )}
          </button>
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center focus:outline-none"
            >
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User Profile"
                className="rounded-full h-8 w-8"
              />
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-1 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Profile
                </Link>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-2">
          <div className="flex flex-col space-y-2">
            <button onClick={toggleDarkMode} className="flex items-center">
              {darkMode ? (
                <FaMoon className="dark:text-gray-100 " />
              ) : (
                <FaSun className="text-yellow-500" />
              )}
            </button>
            <Link
              to="/"
              className="block text-gray-800 dark:text-white hover:underline"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="block text-gray-800 dark:text-white hover:underline"
            >
              Courses
            </Link>
            <Link
              to="/about"
              className="block text-gray-800 dark:text-white hover:underline"
            >
              About
            </Link>
            <Link
              to="/policy"
              className="block text-gray-800 dark:text-white hover:underline"
            >
              Policy
            </Link>
            <Link
              to="/faq"
              className="block text-gray-800 dark:text-white hover:underline"
            >
              FAQ
            </Link>
          </div>
        </div>
      )}

      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 p-2 bg-blue-600 text-white rounded-full shadow-lg z-50 hover:bg-blue-700 transition duration-300"
      >
        <FaChevronUp />
      </button>
    </nav>
  );
};

export default Navbar;
