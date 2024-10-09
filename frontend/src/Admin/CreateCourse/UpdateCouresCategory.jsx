import React from "react";
import Select from "../../components/InputArea/Select";

const UpdateCouresCategory = ({ userInput, handleOnChange, isLoading }) => {
  const categoryOptions = [
    { value: "programming", label: "Programming" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
  ];

  return (
    <Select
      name="category"
      label="Course Category"
      onChange={handleOnChange}
      options={categoryOptions}
      value={userInput.category}
      disabled={isLoading}
    />
  );
};

export default UpdateCouresCategory;
