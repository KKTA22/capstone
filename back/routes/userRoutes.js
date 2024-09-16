const express = require('express');
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { auth, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', auth, authorize(['admin']), getUsers);
router.get('/:id', auth, authorize(['admin']), getUserById);
router.put('/:id', auth, authorize(['admin']), updateUser);
router.delete('/:id', auth, authorize(['admin']), deleteUser);

module.exports = router;
