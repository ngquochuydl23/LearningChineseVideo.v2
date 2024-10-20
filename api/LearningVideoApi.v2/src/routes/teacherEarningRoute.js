const express = require('express');
const router = express.Router();
const teacherEarningController = require('../controllers/teacherEarningController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { teacherAuthorizationMiddleware } = require('../middlewares/authorizationMiddleware');

router.get('/', authMiddleware, teacherAuthorizationMiddleware, teacherEarningController.getTeacherEarnings);

router.get('/statistic', authMiddleware, teacherAuthorizationMiddleware, teacherEarningController.getStatistics);

module.exports = router;