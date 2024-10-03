import React from "react";
import { InputField } from "../../components/InputArea/InputField";

const TopicsOverview = ({
  userInput,
  addTopic,
  setAddTopic,
  addOverview,
  setAddOverview,
  handleAddTopic,
  handleOnAddOverview,
  handleRemoveTopic,
  handleRemoveOverview,
  addCourseTag,
  handleRemoveCourseTag,
  addtag,
  setAddTag,
  error,
  isLoading,
}) => {
  return (
    <div>
      {/* Add Topics */}
      <div className="space-x-2 mb-4">
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
      {/* Render topics */}
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
      {/* Render overview */}
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
      <div>
        <h3 className="text-xl font-semibold">Add Course Tags</h3>
        <input
          type="text"
          value={addtag}
          onChange={(e) => setAddTag(e.target.value)}
          placeholder="Add a tag"
          className="border rounded p-2 mb-2"
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={addCourseTag}
          className="bg-blue-500 text-white rounded px-4 py-2"
          disabled={isLoading}
        >
          Add Tag
        </button>
      </div>

      <div>
        {userInput.courseTag.map((tag) => (
          <span key={tag} className="mr-2 inline-block">
            {tag}
            <button
              type="button"
              onClick={() => handleRemoveCourseTag(tag)}
              className="ml-2 text-red-500"
            >
              Remove
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TopicsOverview;
