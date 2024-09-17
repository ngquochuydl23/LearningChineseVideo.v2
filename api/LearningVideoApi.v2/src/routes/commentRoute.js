const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, commentController.getComments);
router.post('/', authMiddleware, commentController.addComment);
router.delete('/:commentId', authMiddleware, commentController.delComment)



module.exports = router;