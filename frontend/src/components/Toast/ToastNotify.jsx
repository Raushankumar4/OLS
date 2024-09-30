import React from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion";

const toastVariants = {
  initial: { opacity: 0, y: -20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const notificationStyles =
  "flex items-center p-2 bg-white shadow-lg rounded-lg border-l-4 transition-transform transform hover:scale-105";

const successToast = (message) => {
  toast.custom(
    (t) => (
      <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={toastVariants}
        transition={{ duration: 0.3 }}
        className={`${notificationStyles} border-green-500`}
      >
        <AiOutlineCheckCircle className="text-green-500 text-3xl mr-2" />
        <div>
          <span className="font-bold">Success!</span>
          <p>{message}</p>
        </div>
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
        className={`${notificationStyles} border-red-500`}
      >
        <AiOutlineCloseCircle className="text-red-500 text-3xl mr-2" />
        <div>
          <span className="font-bold">Error!</span>
          <p>{message}</p>
        </div>
      </motion.div>
    ),
    {
      duration: 3000,
    }
  );
};

export { successToast, errorToast };
