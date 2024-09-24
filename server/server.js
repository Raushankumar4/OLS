import dotenv from "dotenv";
import { app } from "./app.js";
import { dataBaseConnectin } from "./database/databae.js";
import Razorpay from "razorpay";

dotenv.config();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const PORT = process.env.PORT || 6000;

dataBaseConnectin()
  .then(() => {
    app.listen(PORT || 8000, (req, res) => {
      console.log(`Server is running on port ${PORT || 6000}`);
    });
  })
  .catch((error) => {
    console.log("DB CONNECTION FAILED", error.message);
  });
