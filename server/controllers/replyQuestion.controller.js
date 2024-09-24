import TryCatch from "../middleware/errorHandler.js";
import { User } from "../models/user.model.js";
import { Question } from "../models/askQuestion.model.js";
import { Reply } from "../models/replyQuestion.model.js";


// add reply
export const addReply = TryCatch(async (req, res) => {
  const { userId, commentId, replyText } = req.body;
  if (!userId || !commentId || !replyText)
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  const user = await User.findById(userId);
  if (!user)
    return res.status(404).json({ message: "User not found", success: false });
  const comment = await Question.findById(commentId);
  if (!comment)
    return res
      .status(404)
      .json({ message: "Comment not found", success: false });
  const newReply = await Reply.create({
    replyText: replyText,
    userId: user._id,
    commentId: comment._id,
  });
  comment.replies.push(newReply._id);
  await comment.save();
  return res
    .status(200)
    .json({ message: "Reply added successfully", success: true });
});

// get all reply
export const getAllReply = TryCatch(async (req, res) => {
  const replies = await Reply.find().populate(
    "userId",
    "name email profileImage"
  );
  if (replies.length === 0) {
    return res
      .status(404)
      .json({ message: "No replies found", success: false });
  }
  return res
    .status(200)
    .json({ message: "All replies", replies, success: true });
});

// delete reply
export const deleteReply = TryCatch(async (req, res) => {
  const { id } = req.params;
  const reply = await Reply.findByIdAndDelete(id);
  console.log(reply);

  if (!reply) {
    return res.status(404).json({ message: "Reply not found", success: false });
  }
  const comment = await Question.findById(reply.commentId);
  console.log(comment);

  comment.replies.pull(reply._id);
  await comment.save();

  return res
    .status(200)
    .json({ message: "Reply deleted successfully", success: true });
});

// update reply
export const updateReply = TryCatch(async (req, res) => {
  const { id } = req.params;
  const { replyText } = req.body;
  if (!replyText) {
    return res.status(404).json({ message: "All fields are required" });
  }
  const reply = await Reply.findByIdAndUpdate(id, { replyText }, { new: true });
  if (!reply) {
    return res.status(404).json({ message: "Reply not found", success: false });
  }
  return res
    .status(200)
    .json({ message: "Reply updated successfully", success: true });
});
