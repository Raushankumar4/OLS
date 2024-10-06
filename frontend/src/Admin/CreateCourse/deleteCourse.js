import axios from "axios";
import { ADMIN } from "../../constant";
import { errorToast, successToast } from "../../components/Toast/ToastNotify";
import { deleteCourse } from "../../redux/store/slices/courseSlice";

export const deleteSingleCourse = async (
  courseId,
  token,
  navigate,
  dispatch
) => {
  try {
    if (!token || !courseId) return;
    const { data } = await axios.delete(`${ADMIN}/delete-course/${courseId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    dispatch(deleteCourse(courseId));
    successToast(data?.message);
    navigate("/");
  } catch (error) {
    errorToast(error.response?.data?.message || error.message);
  }
};
