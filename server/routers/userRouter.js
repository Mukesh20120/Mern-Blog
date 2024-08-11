const {
  updateUser,
  deleteUser,
  signOut,
} = require("../controllers/userController");
const { verifyAuthentication } = require("../middleware/fullTokenAuth");
const router = require("express").Router();

//user
router.post("/sign-out", signOut);
router.use(verifyAuthentication);
router.put("/", updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;
