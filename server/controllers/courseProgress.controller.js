import TryCatch from "../middleware/errorHandler.js";
import { Lecture } from "../models/lecture.model.js";
import { Progress } from "../models/progress.model.js";

// add progress
export const addProgress = TryCatch(async (req, res) => {
  const progress = await Progress.findOne({
    user: req.user._id,
    course: req.query.course,
  });

  const { lectureId } = req.query;

  if (progress.completedLectures.includes(lectureId)) {
    res.json({
      message: "Progress Recorded",
    });
  }
  progress.completedLectures.push(lectureId);

  await progress.save();

  res.status(200).json({
    message: "New Progress Added",
  });
});

// get your progress
export const getYourProgress = TryCatch(async (req, res) => {
  const progress = await Progress.findOne({
    user: req.user._id,
    course: req.query.course,
  });
  if (!progress)
    return res.status(404).json({
      message: "No Progress Found",
    });

  const allLectures = (
    await Lecture.find({
      course: req.query.course,
    })
  ).length;

  const completedLectures = progress[0].completedLectures.length;

  const courseProgressPercentage = (completedLectures * 100) / allLectures;

  res.json({
    courseProgressPercentage,
    completedLectures,
    allLectures,
    progress,
  });
});
