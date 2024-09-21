import { Router } from "express";
import { userProfile } from "../controllers/user.controller.js";

const router = Router();

router.route("/profile/:id").get(userProfile);

export default router;
