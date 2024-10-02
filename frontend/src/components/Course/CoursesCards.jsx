import React from "react";
import Courses from "./Courses";

const CoursesCards = () => {
  return (
    <div className="min-h-screen flex items-center justify-center lg:p-6  md:p-6 mx-4 ">
      <div className="w-full">
        <Courses />
      </div>
    </div>
  );
};

export default CoursesCards;
