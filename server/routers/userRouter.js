const { updateUser, deleteUser } = require("../controllers/userController");
const { verifyAuthentication } = require("../middleware/fullTokenAuth");
const router = require("express").Router();

//user
router.use(verifyAuthentication);
router.put("/", updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;
