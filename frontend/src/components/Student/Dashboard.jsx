import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../../components/SideBar/Sidebar";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content Area */}
      <main className="flex-grow p-4 bg-gray-100 overflow-auto">
        <h1 className="text-2xl font-bold mb-4"> {user?.name}!</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
