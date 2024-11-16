import React, { useState } from 'react';
import api from '../api/api';
import styles from './TaskForm.module.css';

function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await api.post('/tasks', { title, description, dueDate }, { headers: { Authorization: `Bearer ${token}` } });
    setTitle('');
    setDescription('');
    setDueDate('');
    onTaskCreated();
  };

  return (
    <form className={styles['form-container']} onSubmit={handleSubmit}>
      <h3>Create Task</h3>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
