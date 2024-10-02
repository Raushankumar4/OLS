import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { useGetAllCourse } from "./hooks/useGetAllCourse";
import { useGetProfile } from "./utils/useGetProfile";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.user.user?._id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  useGetAllCourse();
  useGetProfile(userId);

  return (
    <div className="dark:bg-gray-900">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
