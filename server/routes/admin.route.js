import { Router } from "express";
import { createCourse } from "../controllers/adminCourse.controller.js";
import { upload } from "../middleware/multer.js";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";

const router = Router();

router
  .route("/create-course")
  .post(upload.single("image"), isAuthenticated, isAdmin, createCourse);

export default router;
