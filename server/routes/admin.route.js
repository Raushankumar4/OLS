import { Router } from "express";
import {
  createCourse,
  updateCourse,
} from "../controllers/adminCourse.controller.js";
import { upload } from "../middleware/multer.js";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";

const router = Router();

router
  .route("/create-course")
  .post(upload.single("image"), isAuthenticated, isAdmin, createCourse);
router
  .route("/update-course/:id")
  .put(isAuthenticated, isAdmin, upload.single("image"), updateCourse);

export default router;
