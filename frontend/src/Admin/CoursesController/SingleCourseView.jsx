import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetCourseLectures } from "../../hooks/useGetCourseLectures";
import { deleteLecture } from "../Lectures/deleteLecture";

const SingleCourseView = () => {
  const [newLecture, setNewLecture] = useState("");
  const { id } = useParams();
  const { courses, courseLectures } = useSelector((state) => state.course);
  const course = courses?.find((course) => course?._id === id);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  useGetCourseLectures(id);

  const handleDeleteLecture = (id) => {
    if (window.confirm("Are you sure you want to delete this lecture?")) {
      deleteLecture(id, token, dispatch);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <header className="mb-8">
        <h1 className="text-4xl font-bold my-2 text-gray-800">
          {course?.courseName}
        </h1>
        <img
          src={course?.image}
          alt="Course"
          className="w-full h-48 object-cover mb-4 rounded-md"
        />
        <p className="text-gray-600 mb-4">{course?.description}</p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Lectures</h2>
          <div className="space-y-4">
            {courseLectures?.map((lecture, index) => (
              <div
                key={lecture?._id}
                className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 border border-gray-300"
              >
                <span>
                  Lecture {index + 1}: {lecture?.description}
                </span>
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/dashboard/view-lecture/${lecture?._id}`}
                    className="text-green-600 hover:text-green-800"
                  >
                    <FaEye />
                  </Link>
                  <button
                    onClick={() =>
                      navigate(`/dashboard/edit-lecture/${lecture?._id}`)
                    }
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteLecture(lecture?._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link
              to={"/dashboard/add-lecture/" + id}
              className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-md flex items-center"
            >
              <FaPlus className="mr-2" /> Add Lecture
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SingleCourseView;
