import React from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion";

const toastVariants = {
  initial: { opacity: 0, y: -20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const successToast = (message) => {
  toast.custom(
    (t) => (
      <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={toastVariants}
        transition={{ duration: 0.3 }}
        className={`flex items-center rounded-lg shadow-lg transition-transform transform hover:scale-105`}
      >
        <AiOutlineCheckCircle className="text-3xl mr-2" />
        <span>{message} </span>
      </motion.div>
    ),
    {
      duration: 3000,
    }
  );
};

const errorToast = (message) => {
  toast.custom(
    (t) => (
      <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={toastVariants}
        transition={{ duration: 0.3 }}
        className={`flex items-center  rounded-lg shadow-lg transition-transform transform hover:scale-105`}
      >
        <AiOutlineCloseCircle className="text-3xl mr-2 p-2" />
        <span className="">{message} </span>
      </motion.div>
    ),
    {
      duration: 3000,
    }
  );
};

export { successToast, errorToast };
