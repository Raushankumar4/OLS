import React, { useState, useEffect } from "react";
import Sidebar from "../SideBar/SideBar";
import Profile from "../Student/Profile";
import Courses from "../Course/Courses";
import CourseProgress from "./CourseProgres";
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [activeView, setActiveView] = useState("CourseProgress");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (view) => {
    setActiveView(view);
    if (isOpen) toggleSidebar();
  };

  const renderActiveView = () => {
    switch (activeView) {
      case "profile":
        return <Profile />;
      case "mycourses":
        return <Courses />;
      default:
        return <CourseProgress />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Mobile Hamburger Button */}
      <div className="lg:hidden">
        <button
          aria-label="Toggle sidebar"
          className="p-2 text-white bg-gray-800"
          onClick={toggleSidebar}
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        onLinkClick={handleLinkClick}
      />

      {/* Main Content */}
      <main
        className={`flex-grow p-4 bg-gray-100 overflow-auto transition-all duration-300 ${
          isOpen ? "lg:ml-64" : ""
        }`}
      >
        <h1 className="text-2xl font-bold mb-4">Welcome Back, Student!</h1>
        {renderActiveView()}
      </main>
    </div>
  );
};

export default Dashboard;
