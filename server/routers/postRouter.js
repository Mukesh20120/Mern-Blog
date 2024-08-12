const { createPost, getPosts } = require("../controllers/postController");
const {
  verifyIsAdmin,
  verifyAuthentication,
} = require("../middleware/fullTokenAuth");
const router = require("express").Router();

router.use(verifyAuthentication);
router.post("/", verifyIsAdmin, createPost);
router.get("/", getPosts);

module.exports = router;
