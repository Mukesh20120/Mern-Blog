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

const getPosts = asyncWrapper(async (req, res) => {
  const startIndex = req.query.startIndex ? parseInt(req.query.startIndex) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 9;
  const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
  const findData = {
    ...(req.query.userId && { userId: req.query.userId }),
    ...(req.query.category && { category: req.query.category }),
    ...(req.query.slug && { slug: req.query.slug }),
    ...(req.query.postId && { _id: req.query.postId }),
    ...(req.query.searchTerm && {
      $or: [
        { title: { $regex: req.query.searchTerm, $options: "i" } },
        { category: { $regex: req.query.searchTerm, $options: "i" } },
      ],
    }),
  };
  const posts = await PostModel.find(findData)
    .sort({ updatedAt: sortOrder })
    .skip(startIndex)
    .limit(limit);
  const totalPosts = await PostModel.countDocuments();
  const now = new Date();
  const oneMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate()
  );
  const lastMonthPosts = await PostModel.countDocuments({
    createdAt: { $gte: oneMonthAgo },
  });
  res.json({
    success: true,
    message: "fetch post successfully",
    posts,
    totalPosts,
    lastMonthPosts,
  });
});

const deletePost = asyncWrapper(async (req, res) => {
  if (!req.payload.isAdmin || !req.query.userId === req.payload.id) {
    throw new Error("You are not authorized to delete this post");
  }

  await PostModel.findByIdAndDelete(req.query.postId);
  res.json({ success: true, message: "Post delete successfully" });
});

module.exports = { createPost, getPosts, deletePost };
