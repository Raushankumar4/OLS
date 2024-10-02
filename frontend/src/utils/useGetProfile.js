import { useEffect } from "react";
import axios from "axios";
import { USER_URL } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/store/slices/userSlice";

export const useGetProfile = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  // const refresh = useSelector((state) => state.user.refresh);

  useEffect(() => {
    const getProfile = async () => {
      if (!token) return;
      try {
        const { data } = await axios.get(`${USER_URL}/getmyprofile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        dispatch(setUser(data?.user));
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    getProfile();
  }, [token]);
};
