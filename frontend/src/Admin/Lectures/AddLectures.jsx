import React, { useState, useRef } from "react";
import axios from "axios";
import { ADMIN } from "../../constant";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { InputField } from "../../components/InputArea/InputField";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const AddLectures = () => {
  const [lectures, setLectures] = useState([
    { title: "", description: "", duration: "", file: null },
  ]);
  const [videoPreviews, setVideoPreviews] = useState([null]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const token = useSelector((state) => state.auth.token);
  const { id } = useParams();
  const course = useSelector((state) => state.course.courses).find(
    (course) => course?._id === id
  );
  const fileInputRefs = useRef([]);

  const validateForm = () => {
    const newError = {};
    lectures.forEach((lecture, index) => {
      if (!lecture.title) newError[`title${index}`] = "Title is required";
      if (!lecture.description)
        newError[`description${index}`] = "Description is required";
      if (!lecture.duration) {
        newError[`duration${index}`] = "Duration is required";
      } else if (!/^\d+$/.test(lecture.duration)) {
        newError[`duration${index}`] = "Duration should be a number";
      }
      if (!lecture.file) newError[`file${index}`] = "File is required";
    });
    setError(newError);
    return Object.keys(newError).length === 0 ? null : newError;
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newLectures = [...lectures];
    newLectures[index][name] = value;
    setLectures(newLectures);
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const newLectures = [...lectures];
      newLectures[index].file = file;

      const newPreviews = [...videoPreviews];
      newPreviews[index] = URL.createObjectURL(file);
      setVideoPreviews(newPreviews);
      setLectures(newLectures);
    }
  };

  const handleRemovePreview = (index) => {
    const newLectures = [...lectures];
    newLectures[index].file = null;

    URL.revokeObjectURL(videoPreviews[index]);

    const newPreviews = [...videoPreviews];
    newPreviews[index] = null;
    setVideoPreviews(newPreviews);
    setLectures(newLectures);
  };

  const handleRemoveLecture = (index) => {
    const newLectures = lectures.filter((_, i) => i !== index);
    const newPreviews = videoPreviews.filter((_, i) => i !== index);
    setLectures(newLectures);
    setVideoPreviews(newPreviews);
    setError((prev) => {
      const updatedError = { ...prev };
      delete updatedError[`title${index}`];
      delete updatedError[`description${index}`];
      delete updatedError[`duration${index}`];
      delete updatedError[`file${index}`];
      return updatedError;
    });
  };

  const handleAddLecture = () => {
    setLectures([
      ...lectures,
      { title: "", description: "", duration: "", file: null },
    ]);
    setVideoPreviews([...videoPreviews, null]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors) return;

    setIsLoading(true);
    const formData = new FormData();
    lectures.forEach((lecture) => {
      formData.append("lectures", JSON.stringify(lecture));
    });

    lectures.forEach((lecture) => {
      if (lecture.file) {
        formData.append("files", lecture.file);
      }
    });

    try {
      const response = await axios.post(
        `${ADMIN}/add-lecture/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        alert("Lectures added successfully!");
        setLectures([{ title: "", description: "", duration: "", file: null }]);
        setVideoPreviews([null]);
        setError({});
      } else {
        alert(response.data.message || "Failed to add lectures");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("please add more than one lecture.");
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileInput = (index) => {
    fileInputRefs.current[index].click();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-xl font-bold mb-4 text-center">
        {course?.courseName}
        <h1>Note: Add More Than One Lecture</h1>
      </h2>
      {lectures.map((lecture, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Lecture {index + 1}</h3>

          {lectures.length > 1 && (
            <div className="flex justify-end">
              <button
                type="button"
                disabled={isLoading}
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveLecture(index)}
              >
                &#10005;
              </button>
            </div>
          )}

          <InputField
            label="Title"
            name="title"
            value={lecture.title}
            onChange={(event) => handleInputChange(index, event)}
            error={error[`title${index}`]}
            disabled={isLoading}
          />
          <InputField
            label="Description"
            name="description"
            value={lecture.description}
            onChange={(event) => handleInputChange(index, event)}
            error={error[`description${index}`]}
            disabled={isLoading}
          />
          <InputField
            label="Duration"
            name="duration"
            value={lecture.duration}
            onChange={(event) => handleInputChange(index, event)}
            error={error[`duration${index}`]}
            disabled={isLoading}
          />

          <div className="relative h-20 w-full">
            <input
              type="file"
              accept="video/*"
              ref={(el) => (fileInputRefs.current[index] = el)}
              className="hidden"
              onChange={(event) => handleFileChange(index, event)}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => triggerFileInput(index)}
              className="absolute left-0 top-8 w-full md:w-[40%] lg:w-[30%] bg-blue-800 rounded-md text-white p-2"
              disabled={isLoading}
            >
              Add lecture videos
            </button>
            <span className="block mt-1">
              {lecture.file ? lecture.file.name : "No file selected"}
            </span>
          </div>

          {videoPreviews[index] && (
            <div className="mt-2">
              <video
                width="100%"
                height="240"
                controls
                src={videoPreviews[index]}
                className="rounded-md h-60"
              />
              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleRemovePreview(index)}
                className="mt-2 text-red-500"
              >
                Remove Preview
              </button>
            </div>
          )}

          <hr className="my-4" />
        </div>
      ))}
      <div className="flex-1 space-x-4">
        <button
          type="button"
          onClick={handleAddLecture}
          disabled={isLoading}
          className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Add Another Lecture
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          {isLoading ? <LoadingSpinner className="inline-block" /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default AddLectures;
