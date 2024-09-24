import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema(
  {
    courseName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    topics: [{ type: String, required: true }],
    price: { type: Number, required: true },
    category: { type: String, required: true },
    language: { type: String, required: true },
    courseLevel: { type: String, required: true },
    numberOfReviews: { type: Number, required: true },
    courseOverview: { type: String, required: true },
    courseTag: { type: String, required: true },
    duration: { type: String, required: true },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", CourseSchema);
