import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_URL } from "../constant";
import axios from "axios";
import { setQuestions } from "../redux/store/slices/questionSlice";

export const useGetAllQuestions = () => {
  const token = useSelector((state) => state.auth.token);
  const refresh = useSelector((state) => state.question.refresh);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    const getAllQuestions = async () => {
      try {
        const { data } = await axios.get(`${USER_URL}/getQuestions`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        dispatch(setQuestions(data?.questions));
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      }
    };
    getAllQuestions();
  }, [token, refresh]);
};
