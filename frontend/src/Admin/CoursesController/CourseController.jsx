import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const courses = [
  { id: 1, title: "React for Beginners", students: 50, revenue: "$500" },
  { id: 2, title: "Advanced JavaScript", students: 30, revenue: "$300" },
  { id: 3, title: "CSS Grid and Flexbox", students: 20, revenue: "$200" },
];

const CourseController = () => {
  const handleEdit = (id) => {
    console.log("Edit course with id:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete course with id:", id);
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
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-md rounded-lg p-5 border border-gray-300 transition-transform transform hover:shadow-lg hover:scale-105"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {course.title}
            </h2>
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <p className="text-gray-600">
                Students:{" "}
                <span className="font-semibold">{course.students}</span>
              </p>
              <p className="text-gray-600">
                Revenue: <span className="font-semibold">{course.revenue}</span>
              </p>
            </div>
            <div className="flex justify-center md:justify-end space-x-2">
              <button
                onClick={() => handleEdit(course.id)}
                className="text-blue-600 hover:text-blue-800 transition p-2 rounded-full bg-blue-100 hover:bg-blue-200"
                aria-label={`Edit ${course.title}`}
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(course.id)}
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
