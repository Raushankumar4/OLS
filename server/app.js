import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.FRONTED_URI,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

//auth routes
import authRoute from "./routes/auth.route.js";
app.use("/api/v1/auth", authRoute);
// user routes
import userRoute from "./routes/user.route.js";
app.use("/api/v1/user", userRoute);
// course routes
import courseRoute from "./routes/course.route.js";
app.use("/api/v1/course", courseRoute);
// adimin routes
import adminRoute from "./routes/admin.route.js";
app.use("/api/v1/admin", adminRoute);

// app listen
app.get("/", (req, res) => {
  res.json({ message: "Server Running" });
});

export { app };
