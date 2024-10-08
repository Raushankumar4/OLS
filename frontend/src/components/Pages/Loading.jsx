import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex justify-center items-center mt-[10vw]">
      <div className="flex space-x-2">
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className="w-8 h-8 bg-purple-500 rounded-full"
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "loop",
              delay: index * 0.2,
            }}
          />
        ))}
      </div>
      <img
        src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
        className="rounded-full h-28 w-28 ml-4"
        alt="Loading"
      />
    </div>
  );
};

export default Loading;
