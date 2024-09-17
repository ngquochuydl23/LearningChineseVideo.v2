const express = require('express');
const router = express.Router();
const savedVocabulayController = require('../controllers/savedVocabulayController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/GetSavedByVideo', authMiddleware, savedVocabulayController.getSavedByVideo);
router.post('/', authMiddleware, savedVocabulayController.saveVocabulary);
router.delete('/:originWord', authMiddleware, savedVocabulayController.delSaved);
router.get('/:originWord/check', authMiddleware, savedVocabulayController.checkSaved);
router.get('/Video/:videoId', authMiddleware, savedVocabulayController.getSavedByVideoId);

module.exports = router;