import { Router } from "express";
import {
  getAllLikes,
  likeCourse,
  myCourse,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  checkoutPayment,
  verifyPayment,
} from "../controllers/payment.controller.js";

const router = Router();

router.route("/mycourse/:id").get(isAuthenticated, myCourse);
router.route("/course/checkout/:id").post(isAuthenticated, checkoutPayment);
router.route("/verfication/:id").post(isAuthenticated, verifyPayment);
router.route("/like-course/:id").put(isAuthenticated, likeCourse);
router.route("/get-all-likes/:id").get(isAuthenticated, getAllLikes);

export default router;
