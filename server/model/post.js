const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, default: "uncategorized" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
