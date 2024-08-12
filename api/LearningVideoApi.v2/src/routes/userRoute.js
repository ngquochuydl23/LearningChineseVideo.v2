const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/persistLogin', authMiddleware, userController.persistLogin);
router.post('/login', userController.login)
router.post('/signUp', userController.signUp);
router.delete('/deleteAccount', authMiddleware, userController.deleteAccount);
router.put('/updateInfo', authMiddleware, userController.updateInfo);

module.exports = router;