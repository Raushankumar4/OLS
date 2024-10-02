import axios from "axios";
import { useDispatch } from "react-redux";
import { AUTH_URL } from "../constant.js";
import { errorToast, successToast } from "../components/Toast/ToastNotify.jsx";
import { useState } from "react";
import { login } from "../redux/store/slices/authSlice.js";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const dispatch = useDispatch();

  const validateForm = (userInput) => {
    const newErrors = {};
    if (!userInput.email) {
      newErrors.email = "Email is required";
    }
    if (!userInput.password) {
      newErrors.password = "Password is required";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0 ? null : newErrors;
  };

  const loginUser = async (userInput, navigate) => {
    const validationErrors = validateForm(userInput);
    if (validationErrors) return;

    try {
      setIsLoading(true);
      const { data } = await axios.post(`${AUTH_URL}/login`, userInput);
      dispatch(login({ token: data?.token }));
      successToast(data?.message);
      navigate("/courses");
    } catch (error) {
      errorToast(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, loginUser };
};

export default useLogin;
