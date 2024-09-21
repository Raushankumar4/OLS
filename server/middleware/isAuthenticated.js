import TryCatch from "./errorHandler.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = TryCatch(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "No token provided ,User not authenticated" });
  }

  const token = authorization.split(" ")[1];
  // verfiy token

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);

  if (!decoded) {
    return res
      .status(401)
      .json({ message: "User not authenticated, token expired" });
  }

  req.user = decoded.user;

  next();
});
