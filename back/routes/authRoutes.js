const express = require('express');
const { register, login, getUserRole } = require('../controllers/authController');
const { auth } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/role', auth, getUserRole);

module.exports = router;