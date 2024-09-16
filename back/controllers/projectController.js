const Project = require('../models/project');
const { getUserIdByEmail } = require('./userController');

exports.createProject = async (req, res) => {
  const { name, description, owner:ownerMail,startDate, endDate, } = req.body;
 
  try {
    const owner=await getUserIdByEmail(ownerMail)
    const project = new Project({ name, description,startDate, endDate, owner });
    await project.save();
    res.status(201).json({ message: 'Project created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, owner:ownerMail,startDate, endDate, } = req.body;
  try {
    const owner=await getUserIdByEmail(ownerMail)
    const project = await Project.findByIdAndUpdate(
      id,
      { name, description, startDate, endDate, owner },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('owner', 'username email');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id).populate('owner', 'username email').populate({
      path: 'tasks',
      populate: {
        path: 'owner',
        select: 'username email'
      }
    });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
