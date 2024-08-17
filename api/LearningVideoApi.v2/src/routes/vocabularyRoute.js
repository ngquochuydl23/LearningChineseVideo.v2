const express = require('express');
const router = express.Router();
const vocabularyController = require('../controllers/vocabularyController');

router.get('/', vocabularyController.getVocabularies);
router.post('/', vocabularyController.addVocabulary);
router.get('/:originWord', vocabularyController.getVocaByOriginWord);
router.delete('/:originWord', vocabularyController.delVocabulary);
router.put('/:originWord', vocabularyController.editVocabulary);


module.exports = router;