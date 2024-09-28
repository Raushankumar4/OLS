import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";

const App = () => {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/");
  //   }
  // }, [isAuthenticated, navigate]);

  return (
    <div className="dark:bg-gray-900">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
