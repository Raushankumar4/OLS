import React from "react";
import { useSelector } from "react-redux";
import CourseCard from "./CourseCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useLocation } from "react-router-dom";
import CourseCategories from "./CourseCategories";

const Courses = () => {
  const courses = useSelector((state) => state.course.courses);
  const locattion = useLocation();

  const show = locattion.pathname === "/";

  return (
    <div>
      {show && (
        <div className="p-4">
          {courses && courses?.length === 0 ? (
            <div>
              <h1 className="text-xl text-center">No Course Available</h1>
            </div>
          ) : (
            <div>
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={10}
                slidesPerView={1}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                  1280: {
                    slidesPerView: 4,
                  },
                }}
              >
                {courses?.map((course) => (
                  <SwiperSlide key={course?._id} className="p-2">
                    <CourseCard courses={course} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      )}

      {!show && (
        <div className="">
          <CourseCategories />
        </div>
      )}
    </div>
  );
};

export default Courses;
