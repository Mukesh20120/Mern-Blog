const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    comment: { type: String, required: true },
    userId: { type: String, required: true },
    postId: { type: String, required: true },
    likes: { type: Array, default: [] },
    numberOfLike: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
