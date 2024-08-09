const { signUp, singIn, googleAuth } = require("../controllers/authController");
const { updateUser } = require("../controllers/userController");
const { verifyAuthentication } = require("../middleware/fullTokenAuth");
const router = require("express").Router();

//authentication
router.post("/sign-up", signUp);
router.post("/sign-in", singIn);
router.post("/google", googleAuth);

//user
router.use(verifyAuthentication);
router.put("/user", updateUser);

module.exports = router;
