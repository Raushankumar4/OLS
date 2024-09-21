import { Router } from "express";
import {
  updatePassword,
  updateProfile,
  userProfile,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/profile/:id").get(userProfile);
router.route("/update-profile/:id").put(updateProfile);
router.route("/update-password/:id").put(updatePassword);

export default router;
