import React, { useEffect } from "react";
import TopicsOverview from "./TopicOverview";
import CategorySelect from "./CategorySelect";
import { InputField } from "../../components/InputArea/InputField";
import ImageUpload from "./ImageUpload";
import FormSubmit from "./FormSubmit";
import useCreateCourse from "../../hooks/useCreateCourse";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateCourseCard from "./CreateCourseCard";

const CreateCourse = () => {
  const user = useSelector((state) => state.user.user);
  const navivgate = useNavigate();

  useEffect(() => {
    if (user && user?.role !== "admin") {
      navivgate("/");
    }
  }, [user, navivgate]);
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
    addCourseTag,
    handleRemoveCourseTag,
    addtag,
    setAddTag,
  } = useCreateCourse();

  return (
    <div className="flex items-center justify-center min-h-screen  p-6">
      <div className=" p-8 w-full max-w-4xl ">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Create a New Course
        </h2>
        <form onSubmit={handleOnSubmit}>
          <CreateCourseCard
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
            addCourseTag={addCourseTag}
            handleRemoveCourseTag={handleRemoveCourseTag}
            addtag={addtag}
            setAddTag={setAddTag}
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
