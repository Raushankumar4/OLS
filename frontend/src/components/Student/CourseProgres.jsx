import React from "react";

const CourseProgress = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
        <h2 className="font-semibold">Course Progress</h2>
        <p>75% completed</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
        <h2 className="font-semibold">Upcoming Assignments</h2>
        <p>2 due next week</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
        <h2 className="font-semibold">Notifications</h2>
        <p>You have new messages</p>
      </div>
    </div>
  );
};

export default CourseProgress;
