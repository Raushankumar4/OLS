import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden m-2">
      <img
        src={course?.imageUrl || "https://via.placeholder.com/300"}
        alt={course?.title || "Course Image"}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{course?.title}</h2>
        <p className="text-gray-700">
          {course?.description || "No description available."}
        </p>
        <div className="mt-4">
          <Link
            to={`/coursedetails/${course?._id}`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
