const asyncWrapper = require("../middleware/asyncWrapper");
const PostModel = require("../model/post");

const createPost = asyncWrapper(async (req, res, next) => {
  if (!req.payload || !req.payload.isAdmin)
    throw new Error("Un Authorized access");
  const { title, content } = req.body;
  if (!title || !content) throw new Error("Please provide the require data.");
  const slug = title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newPost = new PostModel({
    ...req.body,
    slug,
    userId: req.payload.id,
  });
  const savePost = await newPost.save();
  return res.json({
    success: true,
    message: "new Post created successfully",
    post: newPost,
  });
});

module.exports = { createPost };
