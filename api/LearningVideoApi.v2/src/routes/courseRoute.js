const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { teacherAuthorizationMiddleware } = require('../middlewares/authorizationMiddleware');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/', courseController.getCourses);
router.post('/', authMiddleware, teacherAuthorizationMiddleware, courseController.addCourse);
router.get('/:courseId', courseController.getCourse);
router.delete('/:courseId', authMiddleware, teacherAuthorizationMiddleware, courseController.delCourse);
router.put('/:courseId', authMiddleware, teacherAuthorizationMiddleware, courseController.editCourse);

router.post('/:courseId/lessons/', authMiddleware, teacherAuthorizationMiddleware, courseController.addLesson);
router.delete('/:courseId/lessons/:lessonId', authMiddleware, teacherAuthorizationMiddleware, courseController.removeLesson);

module.exports = router;





