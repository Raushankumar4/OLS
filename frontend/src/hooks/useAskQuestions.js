import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_URL } from "../constant";
import { useState } from "react";
import { refreshQuestion } from "../redux/store/slices/questionSlice";

export const useAskQuestion = (courseId, userId) => {
  const token = useSelector((state) => state.auth.token);
  const [askQuestion, setAskQuestion] = useState({
    userId,
    courseId,
    question: "",
  });
  const dispatch = useDispatch();
  const handleOnChange = (e) => {
    setAskQuestion((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    if (!token) return;
    try {
      const { data } = await axios.post(
        `${USER_URL}/askQuestion`,
        {
          ...askQuestion,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(refreshQuestion());
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  return { askQuestion, handleOnChange, handleAskQuestion };
};
