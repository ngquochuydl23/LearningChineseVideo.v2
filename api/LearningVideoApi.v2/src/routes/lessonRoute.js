const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { teacherAuthorizationMiddleware } = require('../middlewares/authorizationMiddleware');

router.get('/:lessonId', lessonController.getLessonById);

router.get('/:lessonId/excercise', lessonController.getExcercisesByLessonId);

router.post('/:lessonId/add-excercise', authMiddleware, teacherAuthorizationMiddleware, lessonController.addExcercise);
router.delete('/:lessonId/excercise/:excerciseId/', authMiddleware, teacherAuthorizationMiddleware, lessonController.delExcercise);
router.post('/:lessonId/excercise/:excerciseId/check', authMiddleware, lessonController.checkExcercise);

module.exports = router;





