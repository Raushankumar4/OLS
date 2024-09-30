import axios from "axios";
import { AUTH_URL } from "../../constant";
import { logout } from "../../redux/store/slices/authSlice";
import { errorToast, successToast } from "../Toast/ToastNotify";
import { setUser } from "../../redux/store/slices/userSlice";

export const logOutuser = async (dispatch) => {
  try {
    const { data } = await axios.post(`${AUTH_URL}/logout`);
    dispatch(logout());
    dispatch(setUser(null));
    successToast(data.message);
    console.log(data.message);
  } catch (error) {
    console.log(error);
    errorToast(error.response?.data?.message || error.message);
  }
};
