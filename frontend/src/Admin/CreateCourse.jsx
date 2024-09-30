import React, { useState, useEffect } from "react";
import { InputField } from "../components/InputArea/InputField";
import Textarea from "../components/InputArea/Textarea";
import Select from "../components/InputArea/Select";
import axios from "axios";
import { ADMIN } from "../constant";
import { errorToast, successToast } from "../components/Toast/ToastNotify";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const CreateCourse = () => {
  const categoryOptions = [
    { value: "programming", label: "Programming" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
  ];

  const [userInput, setUserInput] = useState({
    courseName: "",
    description: "",
    price: "",
    language: "",
    courseLevel: "",
    courseTag: "",
    category: "",
    createdBy: "",
    overview: [],
    image: null || "",
    topics: [],
  });

  const [addTopic, setAddTopic] = useState("");
  const [addOverview, setAddOverview] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!userInput.courseName) {
      newErrors.courseName = "Course name is required";
    }
    if (!userInput.description) {
      newErrors.description = "Description is required";
    }
    if (!userInput.price) {
      newErrors.price = "Price is required";
    }
    if (!userInput.language) {
      newErrors.language = "Language is required";
    }
    if (!userInput.courseLevel) {
      newErrors.courseLevel = "Course level is required";
    }
    if (!userInput.category) {
      newErrors.category = "Category is required";
    }
    if (!userInput.createdBy) {
      newErrors.createdBy = "Created by is required";
    }
    if (!userInput.overview) {
      newErrors.overview = "Overview is required";
    }
    if (!userInput.image) {
      newErrors.image = "Image is required";
    }

    if (!userInput.topics) {
      newErrors.topics = "Topics are required";
    }

    if (!userInput.courseTag) {
      newErrors.courseTag = "Course tag is required";
    }
    if (!userInput.overview) {
      newErrors.overview = "required";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0 ? null : newErrors;
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setUserInput((prevInput) => ({
        ...prevInput,
        [name]: file,
      }));
      const newImagePreview = URL.createObjectURL(file);
      setImagePreview(newImagePreview);
    } else {
      setUserInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
    }
  };

  const handleAddTopic = () => {
    if (addTopic.trim() && !userInput.topics.includes(addTopic.trim())) {
      setUserInput((prevInput) => ({
        ...prevInput,
        topics: [...prevInput.topics, addTopic.trim()],
      }));
      setAddTopic("");
    }
  };

  const handleOnAddOverview = () => {
    if (
      addOverview.trim() &&
      !userInput.overview.includes(addOverview.trim())
    ) {
      setUserInput((prevInput) => ({
        ...prevInput,
        overview: [...prevInput.overview, addOverview.trim()],
      }));
      setAddOverview("");
    }
  };

  const handleRemoveOverview = (overviewToRemove) => {
    setUserInput((prevInput) => ({
      ...prevInput,
      overview: prevInput.overview.filter(
        (overview) => overview !== overviewToRemove
      ),
    }));
  };

  const handleRemoveTopic = (topicToRemove) => {
    setUserInput((prevInput) => ({
      ...prevInput,
      topics: prevInput.topics.filter((topic) => topic !== topicToRemove),
    }));
  };

  const handleRemoveImage = () => {
    setUserInput((prevInput) => ({
      ...prevInput,
      image: null,
    }));
    setImagePreview(null);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (userInput.image) {
        formData.append("image", userInput.image);
      }
      formData.append("courseName", userInput.courseName);
      formData.append("description", userInput.description);
      formData.append("price", userInput.price);
      formData.append("language", userInput.language);
      formData.append("courseLevel", userInput.courseLevel);
      formData.append("courseTag", userInput.courseTag);
      formData.append("category", userInput.category);
      formData.append("createdBy", userInput.createdBy);
      formData.append("overview", userInput.overview);
      formData.append("topics", userInput.topics);
      const { data } = await axios.post(`${ADMIN}/create-course`, formData);
      console.log(data);
      successToast(data.message);
    } catch (error) {
      errorToast(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-4xl border border-gray-300">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Create a New Course
        </h2>
        <form onSubmit={handleOnSubmit}>
          {/* Course Name */}
          <InputField
            onChange={handleOnChange}
            name="courseName"
            label="Course Name"
            disabled={isLoading}
            error={error.courseName}
            placeholder="Enter course name"
          />

          {/* Course Description */}
          <Textarea
            label="Course Description"
            placeholder="Course description"
            name="description"
            onChange={handleOnChange}
            disabled={isLoading}
            error={error.description}
          />

          {/* Price, Language, Course Level, Course Tag */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <InputField
              onChange={handleOnChange}
              name="price"
              label="Course Price"
              disabled={isLoading}
              error={error.price}
              placeholder="Enter price"
            />
            <InputField
              name="language"
              label="Course Language"
              onChange={handleOnChange}
              disabled={isLoading}
              error={error.language}
              placeholder="Enter language"
            />
            <InputField
              name="courseLevel"
              label="Course Level"
              onChange={handleOnChange}
              disabled={isLoading}
              error={error.courseLevel}
              placeholder="Enter course level"
            />
            <InputField
              name="courseTag"
              label="Course Tag"
              onChange={handleOnChange}
              disabled={isLoading}
              error={error.courseTag}
              placeholder="Enter course tag"
            />
          </div>

          {/* Add Topics */}
          <div className=" space-x-2 mb-4">
            <InputField
              type="text"
              value={addTopic}
              disabled={isLoading}
              onChange={(e) => setAddTopic(e.target.value)}
              placeholder="Add Topic"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTopic();
                }
              }}
              error={error.topics}
            />
            <button
              type="button"
              disabled={isLoading}
              onClick={handleAddTopic}
              className="bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 transition duration-200"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {userInput.topics.map((topic) => (
              <span
                key={topic}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center space-x-2 shadow"
              >
                <span>{topic}</span>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleRemoveTopic(topic)}
                  className="text-red-500 hover:text-red-700 transition duration-200"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>

          {/* Add Overview */}
          <div className="mb-4">
            <InputField
              onChange={(e) => setAddOverview(e.target.value)}
              name="overview"
              label="What You'll Learn:"
              value={addOverview}
              disabled={isLoading}
              error={error.overview}
              placeholder="Enter a description of what you'll learn in this course"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleOnAddOverview();
                }
              }}
            />
            <button
              type="button"
              disabled={isLoading}
              onClick={handleOnAddOverview}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-700 transition duration-200"
            >
              Add
            </button>
            <div className="flex flex-wrap gap-2 mt-2">
              {userInput.overview.map((overview) => (
                <div
                  key={overview}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center space-x-2 shadow"
                >
                  <span>{overview}</span>
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleRemoveOverview(overview)}
                    className="text-red-500 hover:text-red-700 transition duration-200"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Select Category */}
          <Select
            name="category"
            label="Course Category"
            onChange={handleOnChange}
            options={categoryOptions}
            value={userInput.category}
            disabled={isLoading}
            error={error.category}
          />

          <InputField
            onChange={handleOnChange}
            name="createdBy"
            label="Created By"
            disabled={isLoading}
            error={error.createdBy}
            placeholder="Instructor Name"
          />

          {/* Image Upload Section */}
          <div className="mt-6">
            <label className="block text-md font-medium text-gray-700 mb-2">
              Course Image
            </label>
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 text-center">
              {!imagePreview ? (
                <>
                  <p className="text-gray-500">
                    Drag and drop your course image here
                  </p>
                  <p className="text-gray-500">or</p>
                  <label className="mt-2 text-blue-600 hover:underline cursor-pointer">
                    Browse
                    <input
                      onChange={handleOnChange}
                      type="file"
                      accept="image/*"
                      name="image"
                      className="hidden"
                      disabled={isLoading}
                    />
                  </label>
                  {error.image && <p className="text-red-500">{error.image}</p>}
                </>
              ) : (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover mt-4 rounded-lg shadow"
                />
              )}
              {imagePreview && (
                <button
                  disabled={isLoading}
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-red-500 hover:text-red-700 mt-4 transition duration-200"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 mt-4 transition duration-200"
          >
            {isLoading ? (
              <LoadingSpinner className="inline-block" />
            ) : (
              "Create Course"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
