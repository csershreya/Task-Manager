import React, { useState, useEffect } from 'react';
import TaskTable from './components/TaskTable';
import TaskForm from './components/TaskForm';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/tasks')
      .then((response) => setTasks(response.data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="container">
      <h1>Task List Manager</h1>
      <TaskForm addTask={addTask} />
      <TaskTable tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
