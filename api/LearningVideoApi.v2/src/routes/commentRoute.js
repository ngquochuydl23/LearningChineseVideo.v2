const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/by-video/:videoId', authMiddleware, commentController.getCommentsByVideoId);
router.post('/', authMiddleware, commentController.addComment);
router.get('/:commentId', authMiddleware, commentController.getCommentById)
router.delete('/:commentId', authMiddleware, commentController.delComment)



module.exports = router;