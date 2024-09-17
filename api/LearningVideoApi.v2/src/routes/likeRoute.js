const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/by-video/:videoId', authMiddleware, likeController.getLikesByVideoId);
router.post('/', authMiddleware, likeController.addLike);
router.get('/my-like-video', authMiddleware, likeController.getMyLikeVideo)
router.delete('/:commentId', authMiddleware, likeController.delLike)


module.exports = router;