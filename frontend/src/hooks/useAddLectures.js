import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ADMIN } from "../constant";
import { successToast } from "../components/Toast/ToastNotify";
import { useNavigate } from "react-router-dom";

export const useAddLectures = (id) => {
  const [lecture, setLecture] = useState({
    title: "",
    description: "",
    duration: "",
    video: null,
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState({});
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!lecture.title) newErrors.title = "Title is required";

    if (!lecture.description) newErrors.description = "Description is required";

    if (!lecture.duration) newErrors.duration = "Duration is required";

    if (!lecture.video) newErrors.video = "Video is required";

    setError(newErrors);
    return Object.keys(newErrors).length === 0 ? null : newErrors;
  };

  const handleLectureChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "video") {
      const file = files[0];
      setLecture((prevInput) => ({ ...prevInput, [name]: file }));
      const newImagePreview = URL.createObjectURL(file);
      setImagePreview(newImagePreview);
    } else {
      setLecture((prevInput) => ({ ...prevInput, [name]: value }));
    }
  };

  const handletoAddLecture = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validationErrors = validateForm();
    if (validationErrors) return;
    if (!token || !id) return;
    const formData = new FormData();
    if (lecture.video) formData.append("video", lecture.video);
    formData.append("title", lecture.title);
    formData.append("description", lecture.description);
    formData.append("duration", lecture.duration);
    try {
      const { data } = await axios.post(
        `${ADMIN}/add-lecture/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      successToast(data?.message);
      navigate(-1);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    lecture,
    handleLectureChange,
    imagePreview,
    setImagePreview,
    handletoAddLecture,
    error,
    loading,
  };
};
