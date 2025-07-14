const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/dashboard', authMiddleware, adminMiddleware, getDashboardStats);

module.exports = router;