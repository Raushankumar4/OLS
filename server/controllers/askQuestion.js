// add question

import TryCatch from "../middleware/errorHandler.js";
import { Question } from "../models/askQuestion.model.js";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";

export const askQuestion = TryCatch(async (req, res) => {
  const { question, userId, courseId } = req.body;
  const user = await User.findById(userId);
  const course = await Course.findById(courseId);
  if (!user || !course || !question) {
    return res
      .status(404)
      .json({ message: "User or Course not found", success: false });
  }
  if (!user.subscription.includes(courseId)) {
    return res.status(401).json({
      message: "Only subscribed user can ask question",
      success: false,
    });
  }

  const newQuestion = await Question.create({
    question: question,
    userId: user._id,
    courseId: course._id,
  });

  course.questions.push(newQuestion._id);
  await course.save();

  return res
    .status(200)
    .json({ message: "Question added successfully", success: true });
});

// get all question

export const getAllQuestion = TryCatch(async (req, res) => {
  const questions = await Question.find().populate({
    path: "userId",
    select: "name profileImage email",
  });
  if (questions.length === 0) {
    return res
      .status(404)
      .json({ message: "No question found", success: false });
  }

  return res
    .status(200)
    .json({ message: "All questions", questions, success: true });
});

// deleteQuestion

export const deleteQuestion = TryCatch(async (req, res) => {
  const { id } = req.params;
  const question = await Question.findByIdAndDelete(id);

  if (!question) {
    return res
      .status(404)
      .json({ message: "Question not found", success: false });
  }
  const course = await Course.findById(question.courseId);
  course.questions.pull(question._id);
  await course.save();
  return res
    .status(200)
    .json({ message: "Question deleted successfully", success: true });
});

// update question

export const updateQuestion = TryCatch(async (req, res) => {
  const { id } = req.params;
  const { question } = req.body;
  if (!question) {
    return res.status(404).json({ message: "All fields are required" });
  }
  const updatedQuestion = await Question.findByIdAndUpdate(
    id,
    { question },
    { new: true }
  );
  if (!updatedQuestion) {
    return res
      .status(404)
      .json({ message: "Question not found", success: false });
  }
  return res
    .status(200)
    .json({ message: "Question updated successfully", success: true });
});
