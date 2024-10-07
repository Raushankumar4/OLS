import React, { useState } from "react";
import CreateCourse from "../CreateCourse/CreateCourse";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CourseView = () => {
  const [currentView, setCurrentView] = useState("create-course");
  const courses = useSelector((state) => state.course.courses);

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
        <ul className="space-y-4">
          {courses?.map((course) => (
            <li
              key={course?._id}
              className="flex items-start p-4 bg-gray-100 rounded-md shadow-md"
            >
              <img
                src={course?.image}
                alt={course?.courseName}
                className="w-16 h-16 mr-4 rounded-md"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{course?.courseName}</h3>
                <p className="text-gray-700">{course?.description}</p>{" "}
              </div>
              <Link
                to={`/dashboard/add-lecture/${course?._id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Add Lecture
              </Link>
            </li>
          ))}
        </ul>
      )}

      {currentView === "setting" && (
        <div className="w-4 h-4 my-4 rounded-full">yo</div>
      )}
    </div>
  );
};

export default CourseView;
