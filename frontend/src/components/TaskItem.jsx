import React, { useState } from 'react';
import api from '../api/api';
import styles from './TaskItem.module.css';

function TaskItem({ task, onTaskUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate.split('T')[0]); 
  const [status, setStatus] = useState(task.status);

  const handleSave = async () => {
    const token = localStorage.getItem('token');


    const updates = {};
    if (title !== task.title) updates.title = title;
    if (description !== task.description) updates.description = description;
    if (dueDate !== task.dueDate.split('T')[0]) updates.dueDate = dueDate;
    if (status !== task.status) updates.status = status;

    if (Object.keys(updates).length === 0) {

      setIsEditing(false);
      return;
    }

    try {
      await api.put(`/tasks/${task._id}`, updates, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setIsEditing(false);
      onTaskUpdated(); 
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await api.delete(`/tasks/${task._id}`, { headers: { Authorization: `Bearer ${token}` } });
      onTaskUpdated(); 
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  return (
    <div className={styles['task-item']}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
          <p>Status: {task.status}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}

export default TaskItem;
