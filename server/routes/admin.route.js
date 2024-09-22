import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourse,
  getSingleCourse,
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
router
  .route("/delete-course/:id")
  .delete(isAuthenticated, isAdmin, deleteCourse);
router.route("/get-all-course").get(isAuthenticated, isAdmin, getAllCourse);
router
  .route("/get-single-course/:id")
  .get(isAuthenticated, isAdmin, getSingleCourse);

export default router;
