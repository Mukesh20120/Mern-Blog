const asyncWrapper = require("../middleware/asyncWrapper");
const commentModel = require("../model/comment");
const createComment = asyncWrapper(async (req, res) => {
  const { postId, userId, content } = req.body;
  if (userId !== req.payload.id) {
    throw new Error("User not allow to make comment.");
  }
  const newComment = await commentModel.create({ postId, userId, content });
  res.json({
    success: true,
    message: "comment saved successfully",
    comment: newComment,
  });
});

const getComments = asyncWrapper(async (req, res) => {
  const { postId } = req.params;
  const comments = await commentModel.find({ postId }).sort({ createdAt: -1 });
  res.json({
    success: true,
    message: "All comment fetch successfully",
    data: comments,
  });
});

const likeComment = asyncWrapper(async (req, res) => {
  const { commentId } = req.params;
  const comment = await commentModel.findById(commentId);
  if (!comment) {
    throw new Error("Comment id is not valid.");
  }
  const userId = req.payload.id;
  const userIndex = comment.likes.indexOf(userId);
  if (userIndex == -1) {
    comment.numberOfLike += 1;
    comment.likes.push(userId);
  } else {
    comment.numberOfLike -= 1;
    comment.likes.splice(userIndex, 1);
  }
  await comment.save();
  res.json({
    success: true,
    message: "like update successfully",
    data: comment,
  });
});

const editComment = asyncWrapper(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const comment = await commentModel.findById(commentId);
  if (!comment) {
    throw new Error("Comment not found.");
  }
  //allow to delete the comment writer and the admin
  if (comment.userId !== req.payload.id && !req.payload.isAdmin) {
    throw new Error("You are not allowed to edit this comment");
  }
  const editedComment = await commentModel.findByIdAndUpdate(
    commentId,
    {
      content,
    },
    { new: true }
  );

  res.json({
    success: true,
    message: "comment edited successfully",
    data: editedComment,
  });
});
const deleteComment = asyncWrapper(async (req, res) => {
  const { commentId } = req.params;
  const comment = await commentModel.findById(commentId);
  if (!comment) {
    throw new Error("Comment not found.");
  }
  //allow to delete the comment writer and the admin
  if (comment.userId !== req.payload.id && !req.payload.isAdmin) {
    throw new Error("You are not allowed to delete comment");
  }
  const editedComment = await commentModel.findByIdAndDelete(
    commentId
  );

  res.json({
    success: true,
    message: "comment delete successfully",
  });
});

module.exports = { createComment, getComments, likeComment, editComment, deleteComment};
