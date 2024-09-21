import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { uploadOnCloudnary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import sendMail from "../middleware/sendMail.js";

// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
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
