import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteSingleCourse } from "../CreateCourse/deleteCourse";

const CourseController = () => {
  const courses = useSelector((state) => state.course.courses);
  const user = useSelector((state) => state.user.user);
  console.log(user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    window.confirm("Are you sure you want to delete this course?") &&
      deleteSingleCourse(id, token, navigate, dispatch);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold my-2 text-gray-800">
          Course Overview
        </h1>
        <Link
          to="/dashboard/create-new-course"
          className="bg-blue-600 text-white py-2 px-5 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Create Course
        </Link>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-md rounded-lg p-5 border border-gray-300 transition-transform transform hover:shadow-lg hover:scale-105"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {course?.courseName}
            </h2>
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <p className="text-gray-600">
                Students:{" "}
                <span className="font-semibold">
                  {user?.subscription.length}
                </span>
              </p>
              <p className="text-gray-600">
                Revenue:
                <span className="font-semibold">{course.revenue}0</span>
              </p>
            </div>
            <div className="flex justify-center md:justify-end space-x-2">
              <Link
                to={`/dashboard/upadate-course/${course?._id}`}
                className="text-blue-600 hover:text-blue-800 transition p-2 rounded-full bg-blue-100 hover:bg-blue-200"
                aria-label={`Edit ${course.title}`}
              >
                <FaEdit />
              </Link>
              <button
                onClick={() => handleDelete(course?._id)}
                className="text-red-600 hover:text-red-800 transition p-2 rounded-full bg-red-100 hover:bg-red-200"
                aria-label={`Delete ${course.title}`}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default CourseController;
