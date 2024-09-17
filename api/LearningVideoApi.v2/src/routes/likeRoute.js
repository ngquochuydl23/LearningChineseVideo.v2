const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/by-video/:videoId', authMiddleware, likeController.getLikesByVideoId);
router.get('/by-video/liked-video', authMiddleware, likeController.getLikedVideos);
router.post('/', authMiddleware, likeController.addLike);
router.delete('/:likeId', authMiddleware, likeController.delLike)
router.get('/by-video/:videoId/check', authMiddleware, likeController.getLike);

module.exports = router;