import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { uploadOnCloudnary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import sendMail, { sendForgotmail } from "../middleware/sendMail.js";
import TryCatch from "../middleware/errorHandler.js";

import {
  generateToken,
  removeTokenCookie,
  setTokenCookie,
} from "../utils/generateToken.js";

// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length <= 6) {
      return res.status(400).json({
        message: " password must be longer than 6 characters",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    let profileImageUrl = null;

    if (req.file) {
      const profileImageLocalPath = req.file.path;
      try {
        const uploadProfile = await uploadOnCloudnary(profileImageLocalPath);
        if (uploadProfile && uploadProfile.url) {
          profileImageUrl = uploadProfile.url;
        } else {
          return res
            .status(500)
            .json({ message: "Error uploading file to Cloudinary" });
        }
      } catch (error) {
        console.log("Error uploading file to Cloudinary:", error.message);
      }
    }

    user = {
      name,
      email,
      password: hashPassword,
      profileImage: profileImageUrl || null,
    };

    const otp = Math.floor(1000 + Math.random() * 9000);
    const activationToken = jwt.sign({ user, otp }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    const data = { user, otp };
    await sendMail(email, "Online Learning System", data);

    res.status(200).json({ message: "OTP sent to your mail", activationToken });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// verfiy otp

export const verifyOtp = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;

  const verify = jwt.verify(activationToken, process.env.SECRET_KEY);
  if (!verify) return res.status(400).json({ message: "Otp Expired" });
  if (verify.otp !== otp) {
    return res.status(400).json({ message: "invalid otp" });
  }
  // if both condition are true the user can registe
  const user = await User.create({
    name: verify.user.name,
    email: verify.user.email,
    password: verify.user.password,
    profileImage: verify.user.profileImage,
  });
  res
    .status(200)
    .json({ message: "User created successfully", user, success: true });
});

// login

export const login = TryCatch(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken(user._id);
  setTokenCookie(res, token);
  if (!token) return res.status(500).json({ message: "Internal server error" });
  res.status(200).json({
    message: `${user.name} `,
    user,
    token,
    success: true,
  });
});

// logout
export const logout = TryCatch(async (req, res) => {
  removeTokenCookie(res);
  return res
    .status(200)
    .json({ message: "log out successfully", success: true });
});

// forgot password

export const forgotPassword = TryCatch(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "No User this email" });

  const token = jwt.sign({ email }, process.env.forgot_Secret);

  const data = {
    email,
    token,
  };
  await sendForgotmail("LEARNING_HUB", data);

  user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;

  await user.save();

  res.json({
    message: "Forgot password Link is send to your email",
  });
});

// reset password
export const resetPassword = TryCatch(async (req, res) => {
  const decodedData = jwt.verify(req.query.token, process.env.forgot_Secret);

  console.log(req.query.token);

  const user = await User.findOne({ email: decodedData.email });

  if (!user)
    return res.status(404).json({
      message: "No User this email",
    });
  if (user.resetPasswordExpire === null)
    return res.status(400).json({
      message: "Token Expire",
    });
  if (user.resetPasswordExpire < Date.now()) {
    return res.status(400).json({
      message: "Token Expire",
    });
  }
  const password = await bcrypt.hash(req.body.password, 10);

  user.password = password;

  user.resetPasswordExpire = null;

  await user.save();

  res.json({
    message: "Password Reset Successfully",
  });
});
