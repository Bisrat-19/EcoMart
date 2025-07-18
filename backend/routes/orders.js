const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getUserOrders,
  getMyOrders
} = require('../controllers/orderController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createOrder);
router.get('/my', authMiddleware, getMyOrders);
router.get('/user/:userId', authMiddleware, getUserOrders);
router.get('/:id', authMiddleware, getOrderById);

module.exports = router;