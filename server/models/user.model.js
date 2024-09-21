import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: {
      type: String,
      required: true,
      mazLength: [8, "Password should be at least 8 characters"],
    },
    profileImage: { type: String },
    role: { type: String, default: "user" },
    mainRole: { type: String, default: "user" },
    subscriptions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
