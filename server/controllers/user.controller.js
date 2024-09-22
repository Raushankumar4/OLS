import TryCatch from "../middleware/errorHandler.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { uploadOnCloudnary } from "../utils/cloudinary.js";

// user profile
export const userProfile = TryCatch(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.status(200).json({ user });
});

// update profile

export const updateProfile = TryCatch(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  let profileImageLocalPath = req.file ? req.file.path : null;

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  // update
  const update = {};
  if (name) update.name = name;
  if (profileImageLocalPath) {
    const profileImage = await uploadOnCloudnary(profileImageLocalPath);
    update.profileImage = profileImage.url;
  }

  const updateProfile = await User.findByIdAndUpdate(id, update, {
    new: true,
  }).select("-password");
  if (!updateProfile)
    return res.status(400).json({ message: "Failed to update profile" });

  return res.status(200).json({
    message: "Profile updated successfully",
    updateProfile,
    success: true,
  });
});

// update user password

export const updatePassword = TryCatch(async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword)
    return res.status(400).json({ message: "All fields are required" });
  if (currentPassword === newPassword)
    return res
      .status(400)
      .json({ message: "Current password and new password cannot be same" });
  if (newPassword.length <= 6) {
    return res.status(400).json({
      message: "New password must be longer than 6 characters",
      success: false,
    });
  }
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Current password is incorrect" });
  const hashPassword = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(id, { password: hashPassword });
  return res
    .status(200)
    .json({ message: "Password updated successfully", success: true });
});

// get other users

export const otherUsers = TryCatch(async (req, res) => {
  const { id } = req.params;
  const otherUser = await User.find({ _id: { $ne: id } }).select("-password");
  if (!otherUser) return res.status(404).json({ message: "User not found" });
  return res.status(200).json({ otherUser });
});
