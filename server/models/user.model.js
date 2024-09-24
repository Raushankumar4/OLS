import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Minimum password length is 8 characters"],
      maxlength: [16, "Maximum password length is 16 characters"],
      trim: true,
      match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,16}$/,
    },
    profileImage: { type: String },
    role: { type: String, default: "user" },
    mainRole: { type: String, default: "user" },
    subscription: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
