import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
const CourseCard = () => {
  const { id } = useParams();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const courseSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Featured Courses
        </h2>
        <Slider {...courseSettings} className="mt-10 md:mx-8  mx-8">
          {Array(4)
            .fill()
            .map((_, index) => (
              <div key={index} className="grid gap-2">
                <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden mx-2 ">
                  <img
                    src="https://img.freepik.com/free-vector/software-development-programming-coding-learning-information-technology-courses-it-courses-all-levels-computing-hi-tech-course-concept_335657-191.jpg"
                    alt={`Course ${index + 1}`}
                    className="w-full h-40 object-cover"
                  />
                  <div className="grid gap-2 p-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Course Title {index + 1}
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      Short description of the course content goes here.
                    </p>
                    {isAuthenticated && (
                      <Link
                        to={`/coursedetails/${id}`}
                        className="mt-4  bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                      >
                        View Course
                      </Link>
                    )}
                    {!isAuthenticated && (
                      <Link
                        to="/register"
                        className="mt-4  bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                      >
                        View Course
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default CourseCard;
