const { createComment, getComments, likeComment } = require('../controllers/commentController');
const { verifyAuthentication } = require('../middleware/fullTokenAuth');

const router = require('express').Router();


router.use(verifyAuthentication)
router.post('/',createComment);
router.get('/:postId',getComments)
router.put('/like-comment/:commentId', likeComment);

module.exports = router;