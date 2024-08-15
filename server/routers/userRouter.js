const {
  updateUser,
  deleteUser,
  signOut,
  getUsers,
  getSingleUser,
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
router.get("/get-user/:userId",verifyIsAdmin,getSingleUser)

module.exports = router;
