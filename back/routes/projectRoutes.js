const express = require('express');
const {
  createProject,
  updateProject,
  deleteProject,
  getProjects,
  getProjectById
} = require('../controllers/projectController');
const { auth, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', auth, authorize(['admin', 'task_creator']), createProject);
router.put('/:id', auth, authorize(['admin', 'task_creator']), updateProject);
router.delete('/:id', auth, authorize(['admin']), deleteProject);
router.get('/', auth, getProjects);
router.get('/:id', auth, getProjectById);

module.exports = router;
