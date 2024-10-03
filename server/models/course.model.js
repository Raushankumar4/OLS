import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema(
  {
    courseName: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    topics: { type: [String], required: true },
    overview: { type: [String], required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
    language: { type: String, required: true },
    courseLevel: { type: String, required: true },
    courseTag: { type: [String], required: true },
    createdBy: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", CourseSchema);
