import React from "react";

const courses = [
  {
    id: 1,
    title: "React for Beginners",
    description: "Learn the basics of React.js",
    instructor: "Jane Doe",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Deep dive into JavaScript concepts",
    instructor: "John Smith",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "CSS Masterclass",
    description: "Become a CSS expert with this course",
    instructor: "Emily Johnson",
    image: "https://via.placeholder.com/150",
  },
  // Add more courses as needed
];

const Courses = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 h-screen  dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white pt-8">
        Available Courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              className="w-full h-48 object-cover"
              src={course.image}
              alt={course.title}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {course.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {course.description}
              </p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                Instructor: {course.instructor}
              </p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
