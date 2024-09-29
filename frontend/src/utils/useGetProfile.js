import { useEffect } from "react";
import axios from "../axiosConfig";
import { USER_URL } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/store/slices/userSlice";

export const useGetProfile = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  console.log(token);

  useEffect(() => {
    const getProfile = async () => {
      const { data } = await axios.get(`${USER_URL}/getmyprofile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.user);
      dispatch(setUser({ user: data.user }));
    };

    getProfile();
  }, [token, dispatch]);
};
