import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router.route("/register").post(upload.single("profileImage"), registerUser);

export default router;
