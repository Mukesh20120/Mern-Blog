const {
  createPost,
  getPosts,
  deletePost,
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
  .delete(verifyIsAdmin, deletePost);

module.exports = router;
