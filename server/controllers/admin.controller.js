import TryCatch from "../middleware/errorHandler.js";
import { uploadOnCloudnary } from "../utils/cloudinary.js";
import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";

//Create course
export const createCourse = TryCatch(async (req, res) => {
  const {
    courseName,
    description,
    price,
    topics,
    category,
    language,
    courseTag,
    overview,
    createdBy,
    courseLevel,
  } = req.body;

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
    topics,
    image: courseImageUrl,
    category,
    language,
    courseTag,
    overview,
    createdBy,
    courseLevel,
  });
  return res
    .status(200)
    .json({ message: "Course created successfully", course, success: true });
});

// Update course
export const updateCourse = TryCatch(async (req, res) => {
  const { id } = req.params;
  const {
    courseName,
    description,
    price,
    topics,
    category,
    language,
    courseTag,
    overview,
    createdBy,
    courseLevel,
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
  if (overview) update.overview = overview;
  if (createdBy) update.createdBy = createdBy;
  if (courseImageLocalPath) {
    const image = await uploadOnCloudnary(courseImageLocalPath);
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

// Delete course

export const deleteCourse = TryCatch(async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  const lectures = await Lecture.find({ course: course._id });
  await Promise.all(
    lectures.map(async (lecture) => {
      await Lecture.findByIdAndDelete(lecture._id);
    })
  );
  await course.deleteOne();

  await User.updateMany(
    { subscription: course._id },
    { $pull: { subscription: course._id } }
  );

  if (!course) return res.status(404).json({ message: "Course not found" });
  return res
    .status(200)
    .json({ message: "Course deleted successfully", success: true });
});

// get all course
export const getAllCourse = TryCatch(async (req, res) => {
  const courses = await Course.find();
  if (courses.length === 0)
    return res.status(404).json({ message: "No courses found" });
  return res
    .status(200)
    .json({ message: "All courses", courses, success: true });
});

// get single course
export const getSingleCourse = TryCatch(async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course)
    return res
      .status(404)
      .json({ message: "Course not found yet ,please add some course" });
  return res.status(200).json({ course, success: true });
});

// update user role

export const upadateRole = TryCatch(async (req, res) => {
  if (req.user.mainrole !== "superadmin")
    return res.status(403).json({
      message: "You are not authorized to update role",
    });
  const user = await User.findByIdAndUpdate(req.params.id);

  if (user.role === "user") {
    user.role = "admin";
    await user.save();

    return res.status(200).json({
      message: "User role updated to Admin",
    });
  }

  if (user.role === "admin") {
    user.role = "user";
    await user.save();

    return res.status(200).json({
      message: "role updated successfully",
    });
  }
});
