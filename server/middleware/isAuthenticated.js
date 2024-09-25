import TryCatch from "./errorHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAuthenticated = TryCatch(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "No token provided, User not authenticated" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData._id);
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid token, user not authenticated" });
  }
});

// for admin

export const isAdmin = TryCatch(async (req, res, next) => {
  const user = req.user;
  if (user.role !== "admin") {
    return res.status(403).json({ message: "Only admin can access this !" });
  }
  next();
});
