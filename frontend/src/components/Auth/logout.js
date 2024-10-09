import axios from "axios";
import { AUTH_URL } from "../../constant";
import { logout } from "../../redux/store/slices/authSlice";
import { errorToast, successToast } from "../Toast/ToastNotify";
import { setOtherUsers, setUser } from "../../redux/store/slices/userSlice";
import {
  setCourse,
  setCourseLectures,
  setMyCourse,
} from "../../redux/store/slices/courseSlice";
import { setQuestions } from "../../redux/store/slices/questionSlice";

export const logOutuser = async (dispatch) => {
  try {
    const { data } = await axios.post(`${AUTH_URL}/logout`);
    dispatch(logout());
    dispatch(setUser(null));
    dispatch(setCourse(null));
    dispatch(setMyCourse(null));
    dispatch(setCourseLectures(null));
    dispatch(setOtherUsers(null));
    dispatch(setQuestions(null));
    successToast(data.message);
    console.log(data.message);
  } catch (error) {
    console.log(error);
    errorToast(error.response?.data?.message || error.message);
  }
};
