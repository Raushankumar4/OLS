import React from "react";
import { InputField } from "../../components/InputArea/InputField";
import { useNavigate, useParams } from "react-router-dom";

import { server } from "../../constant";
import Loading from "../../components/Pages/Loading";
import { useUpdateLecture } from "../../hooks/useUpdateLecture";

function UpadateLecture() {
  const { id } = useParams();

  const {
    lecture,
    handleLectureChange,
    videoPreview,
    setVideoPreview,
    handleUpdateLecture,
    loading,
  } = useUpdateLecture(id);

  const naviate = useNavigate();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="flex justify-between space-y-2 ">
            <h1 className="font-bold text-xl">Update Lecture</h1>
            <button
              onClick={() => naviate(-1)}
              className="bg-blue-600 text-white py-2 px-5 rounded-lg text-md"
            >
              Go back
            </button>
          </div>
          <form
            onSubmit={handleUpdateLecture}
            className="max-w-2xl mx-auto p-6 space-y-6"
          >
            <InputField
              value={lecture?.title}
              onChange={handleLectureChange}
              name="title"
              label="title"
            />
            <InputField
              value={lecture?.description}
              name="description"
              label="description"
              onChange={handleLectureChange}
            />
            <InputField
              value={lecture?.duration}
              onChange={handleLectureChange}
              name="duration"
              label="duration"
            />
            <InputField
              name="video"
              type="file"
              accept="video/*"
              label="videoUrl"
              onChange={handleLectureChange}
            />
            {videoPreview && (
              <div className="mt-2">
                <video
                  width="100%"
                  height="240"
                  controls
                  controlsList="nodownload"
                  className="rounded-md h-60"
                  src={`${server}/${videoPreview}`}
                >
                  {/* Video preview source goes here */}
                </video>
                <button
                  type="button"
                  className="mt-2 text-red-500"
                  onClick={() => setVideoPreview(null)}
                >
                  &#x2716; Remove Preview
                </button>
              </div>
            )}
            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 mt-4 transition duration-200">
              Update
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default UpadateLecture;
