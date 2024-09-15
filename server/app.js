import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Server Running" });
});

export { app };
