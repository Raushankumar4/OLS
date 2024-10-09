import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { COURSE } from "../constant";
import { successToast } from "../components/Toast/ToastNotify";

import { setlikeDislike } from "../redux/store/slices/courseSlice";

export const useLikeDislikeCourse = (courseId) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleLikeDislke = async () => {
    if (!token || !courseId) return;

    try {
      const { data } = await axios.put(
        `${COURSE}/like-course/${courseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(setlikeDislike(data?.likes));
      successToast(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleLikeDislke };
};
