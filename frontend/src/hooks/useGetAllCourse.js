import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN } from "../constant";
import axios from "axios";
import { setCourse } from "../redux/store/slices/courseSlice";

export const useGetAllCourse = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const reffresh = useSelector((state) => state.course.refresh);

  useEffect(() => {
    const getAllCourse = async () => {
      if (!token) return;
      try {
        const { data } = await axios.get(`${ADMIN}/get-all-course`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        dispatch(setCourse(data?.courses));
      } catch (error) {
        console.log(error);
      }
    };

    getAllCourse();
  }, [token, reffresh]);
};
