import React from "react";
import CourseDetails from "./CourseDetails";
import TopicsOverview from "./TopicOverview";
import CategorySelect from "./CategorySelect";
import { InputField } from "../../components/InputArea/InputField";
import ImageUpload from "./ImageUpload";
import FormSubmit from "./FormSubmit";
import useCreateCourse from "../../hooks/useCreateCourse";

const CreateCourse = () => {
  const {
    userInput,
    addTopic,
    setAddTopic,
    addOverview,
    setAddOverview,
    imagePreview,
    isLoading,
    error,
    handleOnChange,
    handleAddTopic,
    handleOnAddOverview,
    handleRemoveTopic,
    handleRemoveOverview,
    handleRemoveImage,
    handleOnSubmit,
  } = useCreateCourse();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-4xl border border-gray-300">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Create a New Course
        </h2>
        <form onSubmit={handleOnSubmit}>
          <CourseDetails
            userInput={userInput}
            handleOnChange={handleOnChange}
            error={error}
            isLoading={isLoading}
          />
          <TopicsOverview
            userInput={userInput}
            addTopic={addTopic}
            setAddTopic={setAddTopic}
            addOverview={addOverview}
            setAddOverview={setAddOverview}
            handleAddTopic={handleAddTopic}
            handleOnAddOverview={handleOnAddOverview}
            handleRemoveTopic={handleRemoveTopic}
            handleRemoveOverview={handleRemoveOverview}
            error={error}
            isLoading={isLoading}
          />
          <CategorySelect
            userInput={userInput}
            handleOnChange={handleOnChange}
            error={error}
            isLoading={isLoading}
          />
          <InputField
            onChange={handleOnChange}
            name="createdBy"
            label="Created By"
            disabled={isLoading}
            error={error.createdBy}
            placeholder="Instructor Name"
            value={userInput.createdBy}
          />
          <ImageUpload
            userInput={userInput}
            handleOnChange={handleOnChange}
            imagePreview={imagePreview}
            handleRemoveImage={handleRemoveImage}
            error={error}
            isLoading={isLoading}
          />
          <FormSubmit isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
