import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
  const allCourses = useSelector((state) => state.course.courses);
  const { id } = useParams();
  const findCourse = allCourses?.find((course) => course?._id === id);

  const courseTags = (() => {
    try {
      return JSON.parse(findCourse?.courseTag) || [];
    } catch (e) {
      console.error(e);
      return [];
    }
  })();

  const courseTopics = (() => {
    try {
      return JSON.parse(findCourse?.topics) || [];
    } catch (e) {
      console.error(e);
      return [];
    }
  })();
  const courseOvers = (() => {
    try {
      return JSON.parse(findCourse?.overview) || [];
    } catch (e) {
      console.error(e);
      return [];
    }
  })();

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-[110vh] dark:bg-gray-900 flex flex-col md:flex-row">
      {/* Left Side: Course Image, Buy Option, and Student Reviews */}
      <div className="flex-none w-full md:w-1/3 p-4">
        <img
          className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
          src={findCourse?.image}
          alt={findCourse?.courseName || "Course Image"}
        />
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Price: ${findCourse?.price}
          </h3>
          <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition w-full">
            Enroll Now
          </button>
        </div>

        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Tags:
        </h4>
        <div className="flex flex-wrap mt-2">
          {courseTags.length > 0 ? (
            courseTags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
              >
                {tag}
              </span>
            ))
          ) : (
            <span>No tags available</span>
          )}
        </div>

        {/* Student Reviews */}
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Student Reviews:
          </h4>
          <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg mt-2">
            <p className="text-gray-800 dark:text-gray-200">
              <strong>Hena:</strong> "Fantastic course! Helped me understand
              React in no time."
            </p>
            <p className="text-gray-800 dark:text-gray-200">
              <strong>Emily:</strong> "Great explanations and examples, highly
              recommend!"
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Course Details */}
      <div className="flex-grow p-4">
        <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          {findCourse?.courseName}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {findCourse?.description}
        </p>

        <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
          Instructor: {findCourse?.createdBy || "Unknown"}
        </h4>

        <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
          Course Language:
        </h4>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {findCourse?.language || "N/A"}
        </p>

        <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
          Course Content:
        </h4>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2">
          {courseTopics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>

        <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
          What You'll Learn:
        </h4>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {courseOvers?.map((over) => (
            <li key={over}>{over}</li>
          ))}
        </p>
      </div>
    </div>
  );
};

export default CourseDetails;
