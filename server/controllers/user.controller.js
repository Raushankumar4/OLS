import TryCatch from "../middleware/errorHandler.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

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
  const { name, profileImage } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    { name, profileImage },
    { new: true }
  );
  if (!user) return res.status(404).json({ message: "User not found" });
  return res
    .status(200)
    .json({ message: "Profile updated successfully", user });
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
