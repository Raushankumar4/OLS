import { useDispatch, useSelector } from "react-redux";
import { ADMIN } from "../constant";
import { refreshUser } from "../redux/store/slices/userSlice";
import axios from "axios";
import { successToast } from "../components/Toast/ToastNotify";

export const useUpdateRole = () => {
  const token = useSelector((state) => state.auth.token);
  console.log(token);
  const dispatch = useDispatch();

  const updateRole = async (id) => {
    if (!token || !id) return;
    try {
      const { data } = await axios.put(
        `${ADMIN}/update-role/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      successToast(data?.message);
      dispatch(refreshUser());
    } catch (error) {
      console.log(error);
    }
  };
  return { updateRole };
};
