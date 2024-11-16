const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const task = new Task({ ...req.body, userId: req.user.userId });
  await task.save();
  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.userId }).sort({ dueDate: 1 });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).end();
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body; 

  try {
    const task = await Task.findByIdAndUpdate(id, { $set: updates }, { new: true }); 
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task); 
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task', error: err });
  }
};
