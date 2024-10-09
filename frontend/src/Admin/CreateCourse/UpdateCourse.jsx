import React, { useEffect } from "react";
import { InputField } from "../../components/InputArea/InputField";
import ImageUpload from "./ImageUpload";
import FormSubmit from "./FormSubmit";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useUpdateCourse from "../../hooks/useUpdateCourse";
import UpdateCourseCard from "./UpdateCourseCard";
import UpdateTopicOverview from "./UpdateTopicOverview";
import UpdateCouresCategory from "./UpdateCouresCategory";

const UpdateCourse = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const {
    userInput,
    addTopic,
    setAddTopic,
    addOverview,
    setAddOverview,
    imagePreview,
    isLoading,
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
  } = useUpdateCourse(id);

  const handleAddLecture = () => {
    navigate(`/dashboard/add-lecture/${id}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="p-8 w-full max-w-4xl relative">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Update Course
        </h2>

        {/* Add Lecture Button positioned at the top right */}
        <div className="absolute top-6 right-6">
          <button
            type="button"
            onClick={handleAddLecture}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Add Lecture
          </button>
        </div>

        <form onSubmit={handleOnSubmit}>
          <UpdateCourseCard
            userInput={userInput}
            handleOnChange={handleOnChange}
            isLoading={isLoading}
          />

          <UpdateTopicOverview
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
            isLoading={isLoading}
          />
          <UpdateCouresCategory
            userInput={userInput}
            handleOnChange={handleOnChange}
            isLoading={isLoading}
          />
          <InputField
            onChange={handleOnChange}
            name="createdBy"
            label="Created By"
            disabled={isLoading}
            placeholder="Instructor Name"
            value={userInput.createdBy}
          />
          <ImageUpload
            userInput={userInput}
            handleOnChange={handleOnChange}
            imagePreview={imagePreview}
            handleRemoveImage={handleRemoveImage}
            isLoading={isLoading}
          />
          <FormSubmit isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
