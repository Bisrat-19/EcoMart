const express = require('express');
const router = express.Router();
const { register, login, me } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/me', authMiddleware, me);

module.exports = router;