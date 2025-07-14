const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getUserOrders
} = require('../controllers/orderController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createOrder);
router.get('/:id', authMiddleware, getOrderById);
router.get('/user/:userId', authMiddleware, getUserOrders);

module.exports = router;