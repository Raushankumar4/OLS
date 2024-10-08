import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import { server } from "../../constant";
import { deleteLecture } from "./deleteLecture";

const LectureView = () => {
  const { id } = useParams();
  const { courseLectures } = useSelector((state) => state.course);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleNavigate = () => {
    navigate(-1);
  };

  const lecture = courseLectures?.find((lecture) => lecture?._id === id);

  if (!lecture) {
    return <div className="text-center text-gray-600">Lecture not found.</div>;
  }

  const handleDeleteLecture = (id) => {
    window.confirm("Are you sure you want to delete this lecture?") &&
      deleteLecture(id, token, dispatch);
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <header className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {lecture?.title}
        </h1>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 mt-4">
          <Link
            to={`/dashboard/edit-lecture/${id}`}
            className="text-blue-600 hover:text-blue-800 flex items-center"
            aria-label={`Edit ${lecture?.title}`}
          >
            <FaEdit className="mr-1" /> Edit
          </Link>
          <button
            onClick={() => handleDeleteLecture(id)}
            className="text-red-600 hover:text-red-800 flex items-center"
            aria-label={`Delete ${lecture?.title}`}
          >
            <FaTrash className="mr-1" /> Delete
          </button>
          <Link
            onClick={handleNavigate}
            className="text-gray-600 hover:text-gray-800"
            aria-label="Go Back"
          >
            Go Back
          </Link>
        </div>
      </header>

      <main>
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300 max-w-full">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Description
          </h2>
          <p className="text-gray-700 mb-4">{lecture?.description}</p>

          <h2 className="text-xl md:text-2xl font-semibold mb-4">Video</h2>
          <div className="flex justify-center mb-4">
            <video controls className="w-full max-w-xl rounded-md shadow-md">
              <source src={`${server}/${lecture?.video}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <h2 className="text-xl md:text-2xl font-semibold mb-4">Duration</h2>
          <p className="text-gray-700">{lecture?.duration} minutes</p>
        </div>
      </main>
    </div>
  );
};

export default LectureView;
