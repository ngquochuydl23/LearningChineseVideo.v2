const express = require('express');
const router = express.Router();
const savedVocabulayController = require('../controllers/savedVocabulayController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/GetSavedByVideo', authMiddleware, savedVocabulayController.getSavedByVideo);


module.exports = router;