const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/dashboard', authMiddleware, adminMiddleware, adminController.getDashboardStats);
router.post('/products', authMiddleware, adminMiddleware, adminController.createProduct);
router.get('/products', authMiddleware, adminMiddleware, adminController.getAllProducts);
router.get('/users', authMiddleware, adminMiddleware, adminController.getAllUsers);
router.get('/orders', authMiddleware, adminMiddleware, adminController.getAllOrders);
router.put('/orders/:orderId/status', authMiddleware, adminMiddleware, adminController.updateOrderStatus);

module.exports = router;