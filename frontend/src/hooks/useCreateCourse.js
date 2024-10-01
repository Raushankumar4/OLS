import { useState, useEffect } from "react";
import axios from "axios";
import { ADMIN } from "../constant";
import { errorToast, successToast } from "../components/Toast/ToastNotify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useCreateCourse = () => {
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
    image: null,
    topics: [],
  });

  const [addTopic, setAddTopic] = useState("");
  const [addOverview, setAddOverview] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const validateForm = () => {
    const newErrors = {};
    if (!userInput.courseName) newErrors.courseName = "Course name is required";
    if (!userInput.description)
      newErrors.description = "Description is required";
    if (!userInput.price) newErrors.price = "Price is required";
    if (!userInput.language) newErrors.language = "Language is required";
    if (!userInput.courseLevel)
      newErrors.courseLevel = "Course level is required";
    if (!userInput.category) newErrors.category = "Category is required";
    if (!userInput.createdBy) newErrors.createdBy = "Created by is required";
    if (!userInput.image) newErrors.image = "Image is required";
    if (userInput.topics.length === 0)
      newErrors.topics = "At least one topic is required";
    if (!userInput.courseTag) newErrors.courseTag = "Course tag is required";
    if (userInput.overview.length === 0)
      newErrors.overview = "Overview is required";

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
      setUserInput((prevInput) => ({ ...prevInput, [name]: file }));
      const newImagePreview = URL.createObjectURL(file);
      setImagePreview(newImagePreview);
    } else {
      setUserInput((prevInput) => ({ ...prevInput, [name]: value }));
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
    setUserInput((prevInput) => ({ ...prevInput, image: null }));
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

      const { data } = await axios.post(`${ADMIN}/create-course`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      successToast(data.message);
      navigate("/createLectures");
    } catch (error) {
      errorToast(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
};

export default useCreateCourse;
