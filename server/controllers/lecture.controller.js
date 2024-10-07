import TryCatch from "../middleware/errorHandler.js";
import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudnary } from "../utils/cloudinary.js";

export const addLectures = TryCatch(async (req, res) => {
  const { id } = req.params;
  const lectures = req.body.lectures;
  console.log(lectures);

  if (!Array.isArray(lectures) || lectures.length === 0) {
    return res.status(400).json({
      message: "Invalid input: lectures should be a non-empty array",
      success: false,
    });
  }

  const course = await Course.findById(id);
  if (!course) {
    return res
      .status(404)
      .json({ message: "Course not found", success: false });
  }

  const addedLectures = [];

  for (let i = 0; i < lectures.length; i++) {
    const { title, description, duration } = JSON.parse(lectures[i]); // Parse JSON

    if (!title || !description || !duration) {
      return res.status(400).json({
        message: "Title, description, and duration are required.",
        success: false,
      });
    }

    const videolocalPath = req.files[i] ? req.files[i].path : null;
    let uploadVideo;

    try {
      if (videolocalPath) {
        uploadVideo = await uploadOnCloudnary(videolocalPath);
      }

      const lecture = await Lecture.create({
        title,
        description,
        duration,
        video: uploadVideo ? uploadVideo.url : null,
        course: course._id,
      });

      addedLectures.push(lecture);
    } catch (error) {
      return res.status(500).json({
        message: "Failed to add one or more lectures",
        error: error.message,
        success: false,
      });
    }
  }

  return res.status(200).json({
    message: "Lectures added successfully",
    lectures: addedLectures,
    success: true,
  });
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
  if (!user.subscription.includes(course._id)) {
    return res
      .status(401)
      .json({ message: "Only subscribed user can access", success: false });
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
