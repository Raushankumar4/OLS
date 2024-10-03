import React from "react";
import { InputField } from "../../components/InputArea/InputField";
import Textarea from "../../components/InputArea/Textarea";

const CourseDetails = ({ userInput, handleOnChange, error, isLoading }) => {
  return (
    <div>
      <InputField
        onChange={handleOnChange}
        name="courseName"
        label="Course Name"
        disabled={isLoading}
        error={error.courseName}
        placeholder="Enter course name"
        value={userInput.courseName}
      />
      <Textarea
        label="Course Description"
        placeholder="Course description"
        name="description"
        onChange={handleOnChange}
        disabled={isLoading}
        error={error.description}
        value={userInput.description}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <InputField
          onChange={handleOnChange}
          name="price"
          label="Course Price"
          disabled={isLoading}
          error={error.price}
          placeholder="Enter price"
          type="number"
          value={userInput.price}
        />
        <InputField
          onChange={handleOnChange}
          name="language"
          label="Course Language"
          disabled={isLoading}
          error={error.language}
          placeholder="Enter language"
          value={userInput.language}
        />
        <InputField
          onChange={handleOnChange}
          name="courseLevel"
          label="Course Level"
          disabled={isLoading}
          error={error.courseLevel}
          placeholder="Enter course level"
          value={userInput.courseLevel}
        />
      </div>
    </div>
  );
};

export default CourseDetails;
