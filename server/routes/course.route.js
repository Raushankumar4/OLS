import { Router } from "express";
import { myCourse } from "../controllers/user.controller.js";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";

const router = Router();

router.route("/mycourse").get(isAuthenticated, isAdmin, myCourse);

export default router;
