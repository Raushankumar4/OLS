import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ courses }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    const { width, height, left, top } =
      cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    setTilt({
      x: y * 10,
      y: -x * 10,
    });
  };

  useEffect(() => {
    const card = cardRef.current;
    card.addEventListener("mousemove", handleMouseMove);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="max-w-xs w-full bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl border border-gray-200"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <img
        src={courses?.image}
        alt="Course"
        className="w-full h-56 object-cover transition-transform duration-500 transform hover:scale-110"
      />

      <div className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-900 hover:text-blue-600 transition duration-300">
          {courses?.courseName}
        </h2>
        <p className="text-gray-700 mt-2 text-sm sm:text-base leading-relaxed">
          {courses?.description}
        </p>

        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
          <span className="text-lg sm:text-2xl font-bold text-gray-900">
            ₹{courses?.price}
          </span>

          <motion.button
            onClick={() => navigate(`/coursedetails/${courses?._id}`)}
            className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200 ease-in-out"
            whileTap={{ scale: 0.95 }}
          >
            Enroll Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
