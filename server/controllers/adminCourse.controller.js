import TryCatch from "../middleware/errorHandler.js";
import { uploadOnCloudnary } from "../utils/cloudinary.js";
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
