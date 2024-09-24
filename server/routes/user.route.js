import { Router } from "express";
import {
  otherUsers,
  updatePassword,
  updateProfile,
  userProfile,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { upload } from "../middleware/multer.js";
import {
  addProgress,
  getYourProgress,
} from "../controllers/courseProgress.controller.js";

const router = Router();

router.route("/profile/:id").get(isAuthenticated, userProfile);
router
  .route("/update-profile/:id")
  .put(isAuthenticated, upload.single("profileImage"), updateProfile);
router.route("/update-password/:id").put(isAuthenticated, updatePassword);
router.route("/get-other-user/:id").get(isAuthenticated, otherUsers);
router.route("/courseProgress").post(isAuthenticated, addProgress);
router.route("/yourProgress").get(isAuthenticated, getYourProgress);

export default router;
