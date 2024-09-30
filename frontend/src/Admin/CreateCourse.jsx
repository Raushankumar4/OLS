import React, { useState, useEffect } from "react";
import { InputField } from "../components/InputArea/InputField";
import Textarea from "../components/InputArea/Textarea";
import Select from "../components/InputArea/Select";

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
    overview: "",
    image: null,
    topics: [],
  });

  const [addTopic, setAddTopic] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

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
    } else if (name === "category") {
      setUserInput((prevInput) => ({
        ...prevInput,
        category: value,
      }));
    } else {
      setUserInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
    }
  };

  const handleOnsubmit = (e) => {
    e.preventDefault();
    console.log(userInput);
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create a New Course
        </h2>
        <form onSubmit={handleOnsubmit}>
          {/* Course Name */}
          <InputField
            onChange={handleOnChange}
            name="courseName"
            label="Course Name"
            value={userInput.courseName}
          />

          {/* Course Description */}
          <Textarea
            label="Course Description"
            placeholder="Course description"
            name="description"
            onChange={handleOnChange}
          />

          {/* Price Section */}
          <div className="flex flex-col w-full md:flex-row mb-4 md:space-x-4">
            <InputField
              onChange={handleOnChange}
              name="price"
              label="Course Price"
              className="flex-1"
            />
            <InputField
              name="language"
              label="Course Language"
              className="flex-1"
              onChange={handleOnChange}
            />
            <InputField
              name="courseLevel"
              label="Course Level"
              className="flex-1"
              onChange={handleOnChange}
            />
            <InputField
              name="courseTag"
              label="Course Tag"
              className="flex-1"
              onChange={handleOnChange}
            />
          </div>

          {/* Add Topics */}
          <div className="flex items-center space-x-2">
            <InputField
              type="text"
              value={addTopic}
              onChange={(e) => setAddTopic(e.target.value)}
              placeholder="Add Topic"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTopic();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddTopic}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg text-base hover:bg-gray-700"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {userInput.topics.map((topic) => (
              <span
                key={topic}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center space-x-2"
              >
                <span>{topic}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTopic(topic)}
                  className="text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>

          {/* Select Category */}
          <Select
            name="category"
            label="Course Category"
            onChange={handleOnChange}
            options={categoryOptions}
            value={userInput.category}
          />
          <InputField
            onChange={handleOnChange}
            name="createdBy"
            label="Created By"
          />

          {/* Image Upload Section */}
          <div className="mt-6">
            <label className="block text-md font-medium text-gray-700 mb-2">
              Course Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
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
                    />
                  </label>
                </>
              ) : (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover mt-4"
                />
              )}

              {imagePreview && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-red-500 hover:text-red-700 mt-4"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 mt-4"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
