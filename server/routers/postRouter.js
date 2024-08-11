const { createPost } = require("../controllers/postController");
const {
  verifyIsAdmin,
  verifyAuthentication,
} = require("../middleware/fullTokenAuth");
const router = require("express").Router();

router.use(verifyAuthentication);
router.post("/", verifyIsAdmin, createPost);

module.exports = router;
