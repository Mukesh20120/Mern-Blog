const {
  updateUser,
  deleteUser,
  signOut,
  getUsers,
} = require("../controllers/userController");
const {
  verifyAuthentication,
  verifyIsAdmin,
} = require("../middleware/fullTokenAuth");
const router = require("express").Router();

//user
router.post("/sign-out", signOut);
router.use(verifyAuthentication);
router.put("/", updateUser);
router.delete("/:userId", deleteUser);
router.get("/", verifyIsAdmin, getUsers);

module.exports = router;
