const {signUp,singIn} = require('../controllers/auth')
const router = require('express').Router();


router.post('/sign-up',signUp);
router.post('/sign-in',singIn);

module.exports = router