import { Router } from "express";
import {
  otherUsers,
  updatePassword,
  updateProfile,
  userProfile,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router.route("/profile/:id").get(isAuthenticated, userProfile);
router
  .route("/update-profile/:id")
  .put(isAuthenticated, upload.single("profileImage"), updateProfile);
router.route("/update-password/:id").put(isAuthenticated, updatePassword);
router.route("/get-other-user/:id").get(isAuthenticated, otherUsers);

export default router;
