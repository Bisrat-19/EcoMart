const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/dashboard', authMiddleware, adminMiddleware, adminController.getDashboardStats);
router.post('/products', authMiddleware, adminMiddleware, adminController.createProduct);
router.get('/products', authMiddleware, adminMiddleware, adminController.getAllProducts);

module.exports = router;