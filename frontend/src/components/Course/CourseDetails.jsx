import React from "react";

const CourseDetails = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 min-h-[110vh] dark:bg-gray-900 flex flex-col md:flex-row">
      {/* Left Side: Course Image, Buy Option, and Student Reviews */}
      <div className="flex-none w-full md:w-1/3 p-4">
        <img
          className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
          src="https://via.placeholder.com/600x400"
          alt="React for Beginners"
        />
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Price: $49
          </h3>
          <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition w-full">
            Enroll Now
          </button>
        </div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Tags:
        </h4>
        <div className="flex flex-wrap mt-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            React
          </span>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            JavaScript
          </span>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            Frontend
          </span>
          <span className="bg-blue-100 mt-2 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            Web Development
          </span>
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
          React for Beginners
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Learn the fundamentals of React.js in this comprehensive course
          designed for beginners. Build your skills with hands-on projects and
          real-world examples.
        </p>

        <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
          Instructor: Jane Doe
        </h4>

        <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
          Course Language:
        </h4>
        <p className="text-gray-600 dark:text-gray-300 mt-2">English</p>

        <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
          Course Content:
        </h4>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2">
          <li>Introduction to React</li>
          <li>Components and Props</li>
          <li>State and Lifecycle</li>
          <li>Handling Events</li>
          <li>Conditional Rendering</li>
          <li>Lists and Keys</li>
          <li>Forms in React</li>
          <li>Routing with React Router</li>
        </ul>

        <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4">
          What You'll Learn:
        </h4>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          - Understand the basics of React and its ecosystem.
          <br />
          - Build single-page applications with React.
          <br />
          - Manage component state and lifecycle methods effectively.
          <br />- Create dynamic and responsive web applications.
        </p>
      </div>
    </div>
  );
};

export default CourseDetails;
