import { useState, useEffect } from "react";
import axios from "axios";
import { ADMIN } from "../constant";
import { errorToast, successToast } from "../components/Toast/ToastNotify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshCourse } from "../redux/store/slices/courseSlice";

const useUpdateCourse = (id) => {
  const course = useSelector((state) => state.course.courses);
  const findcourse = course?.find((course) => course?._id === id);

  const [userInput, setUserInput] = useState({
    courseName: findcourse?.courseName || "",
    description: findcourse?.description || "",
    price: findcourse?.price || "",
    language: findcourse?.language || "",
    courseLevel: findcourse?.courseLevel || "",
    courseTag: JSON.parse(findcourse?.courseTag) || [],
    category: findcourse?.category || "",
    createdBy: findcourse?.createdBy || "",
    overview: JSON.parse(findcourse?.overview) || [],
    image: null,
    topics: JSON.parse(findcourse?.topics) || [],
  });

  const [addTopic, setAddTopic] = useState("");
  const [addtag, setAddTag] = useState("");
  const [addOverview, setAddOverview] = useState("");
  const [imagePreview, setImagePreview] = useState(findcourse?.image);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.course.refresh);

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
    const trimmedTopic = addTopic.trim();
    if (trimmedTopic && !userInput.topics.includes(trimmedTopic)) {
      setUserInput((prevInput) => ({
        ...prevInput,
        topics: [...prevInput.topics, trimmedTopic],
      }));
      setAddTopic("");
    }
  };

  const handleOnAddOverview = () => {
    const trimmedOverview = addOverview.trim();
    if (trimmedOverview && !userInput.overview.includes(trimmedOverview)) {
      setUserInput((prevInput) => ({
        ...prevInput,
        overview: [...prevInput.overview, trimmedOverview],
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

  const addCourseTag = () => {
    const trimmedTag = addtag.trim();
    if (trimmedTag && !userInput.courseTag.includes(trimmedTag)) {
      setUserInput((prevInput) => ({
        ...prevInput,
        courseTag: [...prevInput.courseTag, trimmedTag],
      }));
      setAddTag("");
    }
  };

  const handleRemoveCourseTag = (tagToRemove) => {
    setUserInput((prevInput) => ({
      ...prevInput,
      courseTag: prevInput.courseTag.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
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
      formData.append("courseTag", JSON.stringify(userInput.courseTag));
      formData.append("category", userInput.category);
      formData.append("createdBy", userInput.createdBy);
      formData.append("overview", JSON.stringify(userInput.overview));
      formData.append("topics", JSON.stringify(userInput.topics));

      const { data } = await axios.put(
        `${ADMIN}/update-course/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      dispatch(refreshCourse(!refresh));
      successToast(data.message);
      navigate("/");
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
    addCourseTag,
    imagePreview,
    isLoading,
    handleOnChange,
    handleAddTopic,
    handleOnAddOverview,
    handleRemoveTopic,
    handleRemoveOverview,
    handleRemoveImage,
    handleOnSubmit,
    handleRemoveCourseTag,
    addtag,
    setAddTag,
  };
};

export default useUpdateCourse;
