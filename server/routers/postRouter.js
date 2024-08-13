const {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} = require("../controllers/postController");
const {
  verifyIsAdmin,
  verifyAuthentication,
} = require("../middleware/fullTokenAuth");
const router = require("express").Router();

router.use(verifyAuthentication);
router
  .route("/")
  .post(verifyIsAdmin, createPost)
  .get(getPosts)
  .delete(verifyIsAdmin, deletePost).put(verifyIsAdmin, updatePost)

module.exports = router;
