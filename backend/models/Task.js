const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  dueDate: Date,
  status: { type: String, default: 'To Do' }
});

module.exports = mongoose.model('Task', taskSchema);