import React, { useState, useEffect } from 'react';
import api from '../api/api';
import TaskItem from './TaskItem';
import TaskForm from './Taskform';
import styles from './Dashboard.module.css'


function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const { data } = await api.get('/tasks', { headers: { Authorization: `Bearer ${token}` } });
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(task => filter === 'All' || task.status === filter);

  return (
    <div className={styles['dashboard-container']}>
      <h2>Task Dashboard</h2>
      <TaskForm onTaskCreated={fetchTasks} />
      <div className={styles['filter-container']}>
        <label>Filter by status: </label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div>
        {filteredTasks.map(task => (
          <TaskItem key={task._id} task={task} onTaskUpdated={fetchTasks} />
        ))}
      </div>
    </div>
  );
}

export default TaskDashboard;