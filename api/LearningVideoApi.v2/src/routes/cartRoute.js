const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, cartController.addToCart);
router.get('/', authMiddleware, cartController.getCarts);
router.delete('/:cartId', authMiddleware, cartController.removeCart);

module.exports = router;