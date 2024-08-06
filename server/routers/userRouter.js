const {signUp,singIn, googleAuth} = require('../controllers/auth')
const router = require('express').Router();


router.post('/sign-up',signUp);
router.post('/sign-in',singIn);
router.post('/google',googleAuth);

module.exports = router