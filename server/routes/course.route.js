import { Router } from "express";
import { myCourse } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  checkoutPayment,
  verifyPayment,
} from "../controllers/payment.controller.js";

const router = Router();

router.route("/mycourse").get(isAuthenticated, myCourse);
router.route("/course/checkout/:id").post(isAuthenticated, checkoutPayment);
router.route("/verfication/:id").post(isAuthenticated, verifyPayment);

export default router;
