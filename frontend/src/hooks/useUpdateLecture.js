import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ADMIN } from "../constant";
import { successToast } from "../components/Toast/ToastNotify";
import { useNavigate } from "react-router-dom";

export const useUpdateLecture = (id) => {
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const singleLecture = useSelector(
    (state) => state.course.courseLectures
  ).find((lecture) => lecture?._id === id);
  console.log(singleLecture);
  const [lecture, setLecture] = useState({
    title: singleLecture?.title || "",
    description: singleLecture?.description || "",
    duration: singleLecture?.duration || "",
    video: null,
  });
  const [videoPreview, setVideoPreview] = useState(
    singleLecture?.video || null
  );

  const handleLectureChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "video") {
      const file = files[0];
      setLecture((prevInput) => ({ ...prevInput, [name]: file }));
      const newVideoPreview = URL.createObjectURL(file);
      setVideoPreview(newVideoPreview);
    } else {
      setLecture((prevInput) => ({ ...prevInput, [name]: value }));
    }
  };

  const handleUpdateLecture = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!token || !id) return;
    const formData = new FormData();
    if (lecture.video) formData.append("video", lecture.video);
    formData.append("title", lecture.title);
    formData.append("description", lecture.description);
    formData.append("duration", lecture.duration);
    try {
      const { data } = await axios.put(
        `${ADMIN}/update-lecture/${id}`,
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
    videoPreview,
    setVideoPreview,
    handleUpdateLecture,
    loading,
  };
};
