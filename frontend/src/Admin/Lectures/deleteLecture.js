import axios from "axios";
import { ADMIN } from "../../constant";
import { deleteCourseLecture } from "../../redux/store/slices/courseSlice";
import { successToast } from "../../components/Toast/ToastNotify";

export const deleteLecture = async (id, token, dispatch) => {
  try {
    if (!token || !id) return;
    const { data } = await axios.delete(`${ADMIN}/delete-lecture/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    successToast(data?.message);
    dispatch(deleteCourseLecture(id));
    console.log(data?.message);
  } catch (error) {
    errorToast(error.response?.data?.message || error.message);
  }
};
