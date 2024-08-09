const { updateUser, deleteUser, signOut } = require("../controllers/userController");
const { verifyAuthentication } = require("../middleware/fullTokenAuth");
const router = require("express").Router();

//user
router.use(verifyAuthentication);
router.put("/", updateUser);
router.delete("/:userId", deleteUser);
router.post("/sign-out",signOut);

module.exports = router;
