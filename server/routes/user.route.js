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
  downloadCertificate,
  getYourProgress,
} from "../controllers/courseProgress.controller.js";
import {
  askQuestion,
  deleteQuestion,
  getAllQuestion,
  updateQuestion,
} from "../controllers/askQuestion.js";
import {
  addReply,
  deleteReply,
  getAllReply,
  updateReply,
} from "../controllers/replyQuestion.controller.js";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

const router = Router();

router.route("/getmyprofile").get(isAuthenticated, userProfile);
router
  .route("/update-profile/:id")
  .put(isAuthenticated, upload.single("profileImage"), updateProfile);
router.route("/update-password/:id").put(isAuthenticated, updatePassword);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword").post(resetPassword);
router.route("/get-other-user/:id").get(isAuthenticated, otherUsers);
router.route("/addProgress").post(isAuthenticated, addProgress);
router.route("/getYourProgress").get(isAuthenticated, getYourProgress);
router.route("/getCertficate/:id").get(isAuthenticated, downloadCertificate);
router.route("/askQuestion").post(isAuthenticated, askQuestion);
router.route("/getQuestions").get(isAuthenticated, getAllQuestion);
router.route("/deleteQuestion/:id").delete(isAuthenticated, deleteQuestion);
router.route("/updateQuestion/:id").put(isAuthenticated, updateQuestion);
router.route("/replyQuestions").post(isAuthenticated, addReply);
router.route("/getAllReply").get(isAuthenticated, getAllReply);
router.route("/deleteReply/:id").delete(isAuthenticated, deleteReply);
router.route("/updateReply/:id").put(isAuthenticated, updateReply);

export default router;
