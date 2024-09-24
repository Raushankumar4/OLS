import mongoose, { Schema } from "mongoose";

const replyQuestionSchema = new Schema(
  {
    replyText: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
  },
  { timestamps: true }
);

export const Reply = mongoose.model("Reply", replyQuestionSchema);
