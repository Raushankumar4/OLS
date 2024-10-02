import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COURSE } from "../constant";
import axios from "axios";
import { setMyCourse } from "../redux/store/slices/courseSlice";

export const useGetMyCourse = (id) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMyCourse = async () => {
      if (!token || !id) return;

      try {
        const { data } = await axios.get(`${COURSE}/mycourse/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log(data);
        dispatch(setMyCourse(data?.userCourses));
      } catch (error) {
        console.error(error);
      }
    };

    getMyCourse();
  }, [token, id, dispatch]);
};
