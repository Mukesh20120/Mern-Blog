const { createComment } = require('../controllers/commentController');
const { verifyAuthentication } = require('../middleware/fullTokenAuth');

const router = require('express').Router();


router.use(verifyAuthentication)
router.post('/',createComment);

module.exports = router;