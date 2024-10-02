import React from "react";
import { useGetMyCourse } from "../../hooks/useGetMyCourse";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyCourse = () => {
  const userId = useSelector((state) => state.user.user?._id);
  const myCourse = useSelector((state) => state.course.myCourse);
  useGetMyCourse(userId);
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
            Buy Course
          </Link>
        </div>
      ) : (
        myCourse?.map((course) => {
          return (
            <div key={course._id} className="p-4">
              <p>{course.title}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyCourse;
