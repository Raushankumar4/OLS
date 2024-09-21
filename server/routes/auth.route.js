import { Router } from "express";
import {
  login,
  logout,
  registerUser,
  verifyOtp,
} from "../controllers/auth.controller.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router.route("/register").post(upload.single("profileImage"), registerUser);
router.route("/verfiy").post(verifyOtp);
router.route("/login").post(login);
router.route("/logout").post(logout);

export default router;
