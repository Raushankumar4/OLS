import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MyCourseCard from "./MyCourseCard";
import { useGetMyCourse } from "../../hooks/useGetMyCourse";

const MyCourse = () => {
  const myCourse = useSelector((state) => state.course.myCourse);
  const { user } = useSelector((state) => state.user);
  useGetMyCourse(user?._id);
  console.log(myCourse);

  return (
    <div className="max-w-4xl mx-auto grid place-items-center min-h-[60vh]">
      {myCourse && myCourse?.length === 0 ? (
        <div className="flex flex-col items-center space-y-6">
          <p>No course found</p>
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            to="/courses"
          >
            Add Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myCourse &&
            myCourse?.map((course) => (
              <MyCourseCard key={course?._id} course={course} />
            ))}
        </div>
      )}
    </div>
  );
};

export default MyCourse;
