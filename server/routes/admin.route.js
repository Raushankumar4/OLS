import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourse,
  getAllStats,
  getSingleCourse,
  upadateRole,
  updateCourse,
} from "../controllers/admin.controller.js";
import { upload } from "../middleware/multer.js";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  addLectures,
  deleteAllLecture,
  deleteLecture,
  getAllLecture,
  getSingleLecture,
  updateLecture,
} from "../controllers/lecture.controller.js";

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
router.route("/get-all-course").get(isAuthenticated, getAllCourse);
router
  .route("/get-single-course/:id")
  .get(isAuthenticated, isAdmin, getSingleCourse);
router
  .route("/add-lecture/:id")
  .post(isAuthenticated, isAdmin, upload.single("video"), addLectures);
router
  .route("/update-lecture/:id")
  .put(isAuthenticated, isAdmin, upload.single("video"), updateLecture);
router
  .route("/delete-lecture/:id")
  .delete(isAuthenticated, isAdmin, deleteLecture);
router.route("/get-all-lecture/:id").get(isAuthenticated, getAllLecture);
router.route("/get-single-lecture/:id").get(isAuthenticated, getSingleLecture);
router
  .route("/delete-all-lectures/:id")
  .delete(isAuthenticated, deleteAllLecture);
router.route("/update-role/:id").put(isAuthenticated, isAdmin, upadateRole);
router.route("/get-all-stats").get(getAllStats);

export default router;
