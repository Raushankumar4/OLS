import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CourseCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const categories = [
    "Web Development",
    "Data Science",
    "Graphic Design",
    "Marketing",
    "Design",
  ];

  const courses = useSelector((state) => state.course.courses);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredCourses(
        courses?.filter((course) => course?.category === selectedCategory)
      );
    } else {
      setFilteredCourses(courses);
    }
  }, [courses, selectedCategory]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Categories Section */}
      <div className="w-full md:w-1/4 p-4 bg-gray-100 border-r">
        <h2 className="text-lg font-bold mb-4">Categories</h2>
        <ul>
          <li
            className={`py-2 cursor-pointer ${
              !selectedCategory ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All Courses
          </li>
          {categories.map((category) => (
            <li
              key={category}
              className={`py-2 cursor-pointer ${
                selectedCategory === category
                  ? "bg-gray-300"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Courses Section */}
      <div className="w-full md:w-3/4 p-4">
        <h2 className="text-lg font-bold mb-4">Courses</h2>
        {filteredCourses && filteredCourses?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses?.map((course) => (
              <div
                key={course.courseName}
                className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={course?.image}
                  alt={course?.courseName}
                  className="w-full h-32 object-cover rounded-t-lg mb-4"
                />
                <h3 className="font-semibold text-xl">{course?.courseName}</h3>
                <p className="text-gray-600 mb-2">{course?.description}</p>
                <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
                  View Course
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No courses found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CourseCategories;
