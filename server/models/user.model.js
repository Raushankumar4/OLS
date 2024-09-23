import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: {
      type: String,
      required: true,
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
