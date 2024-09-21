import { Router } from "express";
import { registerUser, verifyOtp } from "../controllers/auth.controller.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router.route("/register").post(upload.single("profileImage"), registerUser);
router.route("/verfiy").post(verifyOtp);

export default router;
