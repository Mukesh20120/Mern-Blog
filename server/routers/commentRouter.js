const {
  createComment,
  getComments,
  likeComment,
  editComment,
  deleteComment,
  getAllComment,
} = require("../controllers/commentController");
const {
  verifyAuthentication,
  verifyIsAdmin,
} = require("../middleware/fullTokenAuth");

const router = require("express").Router();

router.use(verifyAuthentication);
router.post("/", createComment);
router.get("/all-comment", verifyIsAdmin, getAllComment);
router.put("/like-comment/:commentId", likeComment);
router.put("/edit-comment/:commentId", editComment);
router.delete("/delete-comment/:commentId", deleteComment);
router.get("/:postId", getComments);

module.exports = router;
