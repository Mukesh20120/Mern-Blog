const { createComment, getComments, likeComment, editComment, deleteComment } = require('../controllers/commentController');
const { verifyAuthentication } = require('../middleware/fullTokenAuth');

const router = require('express').Router();


router.use(verifyAuthentication)
router.post('/',createComment);
router.get('/:postId',getComments)
router.put('/like-comment/:commentId', likeComment);
router.put('/edit-comment/:commentId', editComment);
router.put('/delete-comment/:commentId', deleteComment);

module.exports = router;