import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from "../redux/store/slices/userSlice";
import { USER_URL } from "../constant";
import axios from "axios";

export const useGetOtherUsers = (id) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.user.refresh);
  useEffect(() => {
    if (!token) return;
    const getOtherUsers = async () => {
      try {
        const { data } = await axios.get(`${USER_URL}/get-other-user/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log(data);

        dispatch(setOtherUsers(data?.otherUser));
      } catch (error) {
        console.log(error);
      }
    };
    getOtherUsers();
  }, [token, refresh]);
};
