//checkout payment

import TryCatch from "../middleware/errorHandler.js";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";
import crypto from "crypto";
import { Payment } from "../models/payment.model.js";
import { Progress } from "../models/progress.model.js";
import { instance } from "../server.js";

export const checkoutPayment = TryCatch(async (req, res) => {
  const user = await User.findById(req.params.id);
  const course = await Course.findById(req.params.id);
  if (user.subscription.includes(course._id)) {
    return res
      .status(401)
      .json({ message: "Already subscribed", success: false });
  }
  const options = {
    amount: Number(course.price * 100),
    currency: "INR",
    receipt: `rcptid_${course._id}`,
  };

  const order = await instance.orders.create(options);
  return res.status(200).json({ order, success: true });
});

// verify payment
export const verifyPayment = TryCatch(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    const user = await User.findById(req.params.id);
    const course = await Course.findById(req.params.id);

    user.subscription.push(course._id);

    await Progress.create({
      course: course._id,
      completedLectures: [],
      user: req.user._id,
    });
    await user.save();

    return res
      .status(200)
      .json({ message: "Payment verified successfully", success: true });
  } else {
    return res
      .status(401)
      .json({ message: "Payment verification failed", success: false });
  }
});
