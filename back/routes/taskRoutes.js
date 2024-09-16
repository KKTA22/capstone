const express = require('express');
const {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
  getTaskById
} = require('../controllers/taskController');
const { auth, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', auth, authorize(['admin', 'task_creator']), createTask);
router.put('/:id', auth, authorize(['admin', 'task_creator']), updateTask);
router.delete('/:id', auth, authorize(['admin']), deleteTask);
router.get('/', auth, getTasks);
router.get('/:id', auth, getTaskById);

module.exports = router;
