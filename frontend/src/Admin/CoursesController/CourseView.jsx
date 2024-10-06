import React, { useState } from "react";
import CreateCourse from "../CreateCourse/CreateCourse";

const CourseView = () => {
  const [currentView, setCurrentView] = useState("create-course");

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="h-screen w-full  ">
      <div className="bg-gray-200 w-fit rounded-md  p-2 m-4">
        <header className="flex ">
          <button
            onClick={() => {
              handleViewChange("create-course");
              handleActive();
            }}
            className={`${
              currentView === "create-course"
                ? "bg-gray-800 p-2 mx-2 shadow-lg text-white rounded-lg "
                : "p-2 mx-2 bg-gray-200 rounded-lg"
            }`}
          >
            Curriculum
          </button>
          <button
            onClick={() => handleViewChange("landing-page")}
            className={`${
              currentView === "landing-page"
                ? "bg-gray-800 p-2 mx-2 text-white shadow-lg rounded-lg "
                : "p-2 mx-2 bg-gray-200 rounded-lg"
            }`}
          >
            Course Landing Page
          </button>
          <button
            onClick={() => handleViewChange("setting")}
            className={`${
              currentView === "setting"
                ? "bg-gray-800 p-2 mx-2 shadow-lg text-white rounded-lg "
                : "p-2 mx-2 bg-gray-200 rounded-lg"
            }`}
          >
            Setting
          </button>
        </header>
      </div>
      {currentView === "create-course" && (
        <div className="">
          <CreateCourse />
        </div>
      )}

      {currentView === "landing-page" && (
        <div>
          <CreateCourse />
        </div>
      )}

      {currentView === "setting" && (
        <div className="w-4 h-4 my-4 rounded-full">yo</div>
      )}
    </div>
  );
};

export default CourseView;
