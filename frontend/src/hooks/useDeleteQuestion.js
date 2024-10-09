import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { USER_URL } from "../constant";
import { deleteQuestion as deleteQuestionAction } from "../redux/store/slices/questionSlice";

export const useDeleteQuestion = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleDeleteQuestion = async (id) => {
    if (!token) return;
    try {
      const { data } = await axios.delete(`${USER_URL}/deleteQuestion/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      dispatch(deleteQuestionAction(id));
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  return { handleDeleteQuestion };
};
