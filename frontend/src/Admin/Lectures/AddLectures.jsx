import React from "react";
import { InputField } from "../../components/InputArea/InputField";
import { useAddLectures } from "../../hooks/useAddLectures";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../components/Pages/Loading";

const AddLectures = () => {
  const { id } = useParams();
  const courses = useSelector((state) => state.course.courses).find(
    (course) => course?._id === id
  );

  const {
    lecture,
    handleLectureChange,
    imagePreview,
    setImagePreview,
    handletoAddLecture,
    error,
    loading,
  } = useAddLectures(id);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form
          onSubmit={handletoAddLecture}
          className="max-w-2xl mx-auto p-6 space-y-6"
        >
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
            {courses?.courseName}
          </h2>

          <div className="mb-4">
            <InputField
              label="Title"
              name="title"
              value={lecture.title}
              onChange={handleLectureChange}
              error={error?.title}
              disabled={false}
            />
          </div>

          <div className="mb-4">
            <InputField
              label="Description"
              name="description"
              value={lecture.description}
              onChange={handleLectureChange}
              error={error?.description}
              disabled={false}
            />
          </div>

          <div className="mb-4">
            <InputField
              label="Duration"
              name="duration"
              value={lecture.duration}
              onChange={handleLectureChange}
              error={error?.duration}
              disabled={false}
            />
          </div>

          <div className="relative h-20 w-full mb-4 space-y-4">
            {error && <p className="text-red-500">{error.video}</p>}
            {imagePreview && <p className="text-green-500">Video added</p>}

            {!imagePreview && (
              <input
                type="file"
                accept="video/*"
                onChange={handleLectureChange}
                disabled={false}
                name="video"
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer file:transition-all file:duration-300 file:ease-in-out"
              />
            )}

            {!imagePreview && (
              <button
                type="button"
                className="absolute  left-0 top-8 w-full bg-blue-800 rounded-md text-white p-2"
                disabled={false}
              >
                Add Lecture Video
              </button>
            )}
          </div>
          {imagePreview && (
            <div className="mt-2">
              <video
                width="100%"
                height="240"
                controls
                className="rounded-md h-60"
                src={imagePreview}
              >
                {/* Video preview source goes here */}
              </video>
              <button
                type="button"
                className="mt-2 text-red-500"
                onClick={() => setImagePreview(null)}
              >
                &#x2716; Remove Preview
              </button>
            </div>
          )}
          {!imagePreview && (
            <span className="block mt-1">Video should be less than 100mb</span>
          )}

          <div className="flex justify-between space-x-4">
            <button
              type="submit"
              className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default AddLectures;

<div className="mt-2">
  <video width="100%" height="240" controls className="rounded-md h-60">
    {/* Video preview source goes here */}
  </video>
  <button type="button" className="mt-2 text-red-500">
    Remove Preview
  </button>
</div>;
