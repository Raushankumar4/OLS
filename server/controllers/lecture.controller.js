import TryCatch from "../middleware/errorHandler.js";
import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudnary } from "../utils/cloudinary.js";

export const addLecture = TryCatch(async (req, res) => {
  const { id } = req.params;
  const { title, description, duration } = req.body;

  let videolocalPath = req.file ? req.file.path : null;

  let uploadVideo;
  try {
    uploadVideo = await uploadOnCloudnary(videolocalPath);
  } catch (error) {
    return res.status(500).json({
      message: "Video upload failed",
      error: error.message,
      success: false,
    });
  }

  const course = await Course.findById(id);
  if (!course) {
    return res
      .status(404)
      .json({ message: "Course not found", success: false });
  }

  const lecture = await Lecture.create({
    title,
    description,
    duration,
    video: uploadVideo.url,
    course: course._id,
  });

  return res
    .status(200)
    .json({ message: "Lecture added successfully", lecture, success: true });
});

// delete lecture
export const deleteLecture = TryCatch(async (req, res) => {
  const { id } = req.params;
  const lecture = await Lecture.findByIdAndDelete(id);
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
  return res.status(200).json({ message: "lecture", lecture, success: true });
});
