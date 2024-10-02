import React from "react";
import { useSelector } from "react-redux";
import CourseCard from "./CourseCard";
import Slider from "react-slick";

const Courses = () => {
  const allcourses = useSelector((state) => state.course.courses);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
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
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="md:p-6 p-1 mx-8 h-auto dark:bg-gray-900">
      <Slider {...settings}>
        {allcourses &&
          allcourses.map((course) => (
            <div key={course?._id} className="p-6 md:p-2 lg:p-4">
              <CourseCard courses={course} />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default Courses;
