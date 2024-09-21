// get user

import TryCatch from "../middleware/errorHandler.js";
import { User } from "../models/user.model.js";

export const userProfile = TryCatch(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.status(200).json({ user });
});
