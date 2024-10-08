import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN } from "../constant";
import { setCourseLectures } from "../redux/store/slices/courseSlice";
import { errorToast } from "../components/Toast/ToastNotify";

export const useGetCourseLectures = (courseId) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.course.refresh);

  useEffect(() => {
    if (!token || !courseId) return;

    const getCourseAllLectures = async () => {
      try {
        const { data } = await axios.get(
          `${ADMIN}/get-all-lecture/${courseId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        dispatch(setCourseLectures(data?.lectures));
      } catch (error) {
        errorToast(error.response?.data?.message || error.message);
      }
    };
    getCourseAllLectures();
  }, [token, refresh]);
};
