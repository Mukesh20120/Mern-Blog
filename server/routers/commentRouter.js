const { createComment, getComments, likeComment, editComment } = require('../controllers/commentController');
const { verifyAuthentication } = require('../middleware/fullTokenAuth');

const router = require('express').Router();


router.use(verifyAuthentication)
router.post('/',createComment);
router.get('/:postId',getComments)
router.put('/like-comment/:commentId', likeComment);
router.put('/edit-comment/:commentId', editComment);

module.exports = router;