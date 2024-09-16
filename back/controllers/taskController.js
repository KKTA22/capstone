const Task = require('../models/task');
const Project = require('../models/project');
const { getUserIdByEmail } = require('./userController');

exports.createTask = async (req, res) => {
  const { description, dueDate, owner:ownerMail, project } = req.body;
  
  try {
    const owner=await getUserIdByEmail(ownerMail)
    const task = new Task({ description, dueDate, owner, project });
    await task.save();
    await Project.findByIdAndUpdate(project, { $push: { tasks: task._id } });
    res.status(201).json({ message: 'Task created and added to project successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { description, dueDate, status, owner:ownerMail, project } = req.body;
  try {
    const owner=await getUserIdByEmail(ownerMail)
    const task = await Task.findByIdAndUpdate(
      id,
      { description, dueDate, status, owner, project },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await Project.findByIdAndUpdate(task.project, { $pull: { tasks: task._id } });

    res.json({ message: 'Task deleted and removed from project successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('owner', 'username email').populate('project', 'name');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id).populate('owner', 'username email').populate('project', 'name');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
