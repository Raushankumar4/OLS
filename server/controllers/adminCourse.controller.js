import TryCatch from "../middleware/errorHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudnary,
} from "../utils/cloudinary.js";
import { Course } from "../models/course.model.js";

export const createCourse = TryCatch(async (req, res) => {
  const {
    courseName,
    description,
    price,
    topics,
    category,
    language,
    courseLevel,
    courseTag,
    numberOfReviews,
    courseOverview,
    duration,
    title,
    createdBy,
  } = req.body;
  if (
    !courseName ||
    !description ||
    !title ||
    !price ||
    !topics ||
    !category ||
    !language ||
    !courseLevel ||
    !courseTag ||
    !numberOfReviews ||
    !courseOverview ||
    !duration ||
    !createdBy
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  let courseImageUrl = null;
  if (req.file) {
    const localFilePath = req.file.path;
    try {
      const uploadCourse = await uploadOnCloudnary(localFilePath);
      if (uploadCourse && uploadCourse.url) {
        courseImageUrl = uploadCourse.url;
      } else {
        return res
          .status(400)
          .json({ message: "Error uploading image to Cloudinary" });
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return res
        .status(400)
        .json({ message: "Error uploading image to Cloudinary" });
    }
  }

  const course = await Course.create({
    courseName,
    description,
    price,
    image: courseImageUrl,
    topics,
    category,
    language,
    courseLevel,
    courseTag,
    title,
    numberOfReviews,
    courseOverview,
    duration,
    createdBy,
  });
  return res
    .status(200)
    .json({ message: "Course created successfully", course, success: true });
});

// update course
export const updateCourse = TryCatch(async (req, res) => {
  const { id } = req.params;
  const {
    courseName,
    description,
    price,
    topics,
    category,
    language,
    courseLevel,
    courseTag,
    numberOfReviews,
    courseOverview,
    duration,
    title,
  } = req.body;

  const courseImageLocalPath = req.file
    ? await uploadOnCloudnary(req.file.path)
    : null;

  const course = await Course.findById(id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  const update = {};

  if (courseName) update.courseName = courseName;
  if (description) update.description = description;
  if (price) update.price = price;
  if (topics) update.topics = topics;
  if (category) update.category = category;
  if (language) update.language = language;
  if (courseLevel) update.courseLevel = courseLevel;
  if (courseTag) update.courseTag = courseTag;
  if (numberOfReviews) update.numberOfReviews = numberOfReviews;
  if (courseOverview) update.courseOverview = courseOverview;
  if (duration) update.duration = duration;
  if (title) update.title = title;
  if (courseImageLocalPath) {
    const image = await deleteFromCloudinary(courseImageLocalPath);
    update.image = image.url;
  }

  const updateCourse = await Course.findByIdAndUpdate(id, update, {
    new: true,
  });
  if (!updateCourse)
    return res.status(404).json({ message: "Course not found" });
  return res.status(200).json({
    message: "Course updated successfully",
    updateCourse,
    success: true,
  });
});
