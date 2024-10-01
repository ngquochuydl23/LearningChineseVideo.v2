const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/', videoController.getVideos);
router.post('/', videoController.addVideo)
router.get('/:videoId', videoController.getVideo);
router.delete('/:videoId', videoController.delVideo);
router.put('/:videoId', videoController.editVideo);
router.post('/:videoId/view', videoController.viewVideo);

module.exports = router;





