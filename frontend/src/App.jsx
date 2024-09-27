import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <div className="dark:bg-gray-900">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
