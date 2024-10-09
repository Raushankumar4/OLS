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
    try {
      const localFilePath = req.file.path;
      const uploadCourse = await uploadOnCloudnary(localFilePath);

      if (uploadCourse?.url) {
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

  // Create course
  const course = await Course.create({
    courseName,
    description,
    price,
    topics,
    image: courseImageUrl || null,
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

  const course = await Course.findById(id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  let courseImageLocalPath;
  if (req.file) {
    try {
      courseImageLocalPath = await uploadOnCloudnary(req.file.path);
    } catch (error) {
      return res.status(500).json({ message: "Error uploading image", error });
    }
  }

  const update = {};
  const fieldsToUpdate = [
    "courseName",
    "description",
    "price",
    "topics",
    "category",
    "language",
    "courseLevel",
    "courseTag",
    "overview",
    "createdBy",
  ];

  fieldsToUpdate.forEach((field) => {
    if (req.body[field]) {
      update[field] = req.body[field];
    }
  });

  if (courseImageLocalPath) {
    if (course.image && course.image.public_id) {
      const deleteImageResult = await deleteFromCloudinary(
        course.image.public_id
      );
      if (!deleteImageResult.success) {
        return res.status(500).json({
          message: "Error deleting old image from Cloudinary",
          error: deleteImageResult.error,
        });
      }
    }
    update.image = courseImageLocalPath.url;
  }

  const updatedCourse = await Course.findByIdAndUpdate(id, update, {
    new: true,
  });
  if (!updatedCourse) {
    return res.status(404).json({ message: "Course not found after update" });
  }

  return res.status(200).json({
    message: "Course updated successfully",
    updatedCourse,
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
  if (req.user.mainRole !== "superadmin")
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

// GET ALL STATS
export const getAllStats = async (req, res) => {
  const courses = await Course.countDocuments();
  const lectures = await Lecture.countDocuments();
  res.status(200).json({ message: "Stats", courses, lectures });
};
