import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ courses }) => {
  return (
    <div className="max-w-sm w-full rounded-lg overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105 m-4 border border-gray-300">
      <img
        className="w-full h-40 object-cover md:h-50 lg:h-64"
        src={courses?.image}
        alt={courses?.courseName}
      />
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition duration-200">
            {courses?.courseName}
          </h2>
          <p className="text-gray-700 text-sm mb-4">
            {courses?.description.length > 100
              ? `${courses.description.slice(0, 40)}...`
              : courses.description}
          </p>
        </div>
        <div className="flex justify-between items-center text-gray-500 text-xs">
          <span>{courses?.createdBy}</span>
          <span>{courses?.date}</span>
        </div>
        <Link
          to={`/coursedetails/${courses?._id}`}
          className="mt-4 block py-2 bg-blue-500 text-white text-center rounded-lg hover:bg-blue-600 transition duration-200 shadow-md"
        >
          View Course
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
