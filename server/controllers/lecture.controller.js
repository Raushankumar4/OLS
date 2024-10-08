import TryCatch from "../middleware/errorHandler.js";
import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudnary } from "../utils/cloudinary.js";

export const addLectures = TryCatch(async (req, res) => {
  const { id } = req.params;
  const { title, description, duration } = req.body;

  const course = await Course.findById(id);
  if (!course) {
    return res
      .status(404)
      .json({ message: "Course not found", success: false });
  }

  if (!title || !description || !duration || !req.file) {
    return res
      .status(400)
      .json({ message: "Missing required fields", success: false });
  }

  const lecture = await Lecture.create({
    title,
    description,
    duration,
    course: course._id,
    video: req.file.path.replace(/\\/g, "/"),
  });

  if (!lecture) {
    return res
      .status(500)
      .json({ message: "Error creating lecture", success: false });
  }

  return res
    .status(201)
    .json({ message: "Lecture added successfully", lecture, success: true });
});

// delete lecture
export const deleteLecture = TryCatch(async (req, res) => {
  const { id } = req.params;
  const lecture = await Lecture.findByIdAndDelete(id);
  const user = await User.findById(req.user._id);
  if (user.role !== "admin") {
    return res
      .status(401)
      .json({ message: "Only admin can access", success: false });
  }
  if (!lecture) {
    return res
      .status(404)
      .json({ message: "Lecture not found", success: false });
  }
  return res
    .status(200)
    .json({ message: "Lecture deleted successfully", success: true });
});

// get all lecture
export const getAllLecture = TryCatch(async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) {
    return res
      .status(404)
      .json({ message: "Course not found", success: false });
  }
  const lectures = await Lecture.find({ course: course._id });
  if (lectures.length === 0) {
    return res
      .status(404)
      .json({ message: "No lectures found", success: false });
  }
  const user = await User.findById(req.user._id);
  if (user.role !== "admin") {
    return res
      .status(401)
      .json({ message: "Only admin can access", success: false });
  }

  return res
    .status(200)
    .json({ message: "All lectures", lectures, success: true });
});

// fetch lecture
export const getSingleLecture = TryCatch(async (req, res) => {
  const { id } = req.params;
  const lecture = await Lecture.findById(id);

  if (!lecture) {
    return res
      .status(404)
      .json({ message: "Lecture not found", success: false });
  }
  const user = await User.findById(req.user._id);
  if (user.role !== "admin") {
    return res
      .status(401)
      .json({ message: "Only admin can access", success: false });
  }
  if (!user.subscription.includes(lecture.course)) {
    return res
      .status(401)
      .json({ message: "Only subscribed user can access", success: false });
  }
  return res.status(200).json({ message: "lecture", lecture, success: true });
});

// delete all lecture
export const deleteAllLecture = TryCatch(async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) {
    return res
      .status(404)
      .json({ message: "Course not found", success: false });
  }
  const user = await User.findById(req.user._id);
  if (user.role !== "admin") {
    return res
      .status(401)
      .json({ message: "Only admin can access", success: false });
  }
  await Lecture.deleteMany({ course: course._id });
  return res
    .status(200)
    .json({ message: "Lectures deleted successfully", success: true });
});
// update lecture

export const updateLecture = TryCatch(async (req, res) => {
  const { id } = req.params;
  const { title, description, duration } = req.body;
  let videolocalPath = req.file ? req.file.path : null;
  let uploadVideo;

  const lecture = await Lecture.findById(id);
  if (!lecture) {
    return res
      .status(404)
      .json({ message: "Lecture not found", success: false });
  }
  const user = await User.findById(req.user._id);
  if (user.role !== "admin") {
    return res
      .status(401)
      .json({ message: "Only admin can access", success: false });
  }
  const update = {};
  if (title) update.title = title;
  if (description) update.description = description;
  if (duration) update.duration = duration;
  if (videolocalPath) {
    uploadVideo = await uploadOnCloudnary(videolocalPath);
    update.video = uploadVideo.url;
  }
  const updatedLecture = await Lecture.findByIdAndUpdate(id, update, {
    new: true,
  });
  return res.status(200).json({
    message: "Lecture updated successfully",
    updatedLecture,
    success: true,
  });
});
