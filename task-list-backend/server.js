const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Fetch Tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
    const tasks = data.slice(0, 20).map((task) => ({
      id: task.id,
      title: task.title,
      description: `Description for Task ${task.id}`,
      status: task.completed ? 'Done' : 'To Do',
    }));
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks.' });
  }
});

// Update Task
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = req.body;

    // Simulating API call (jsonplaceholder will respond but not save changes)
    const { data } = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      updatedTask
    );

    // Return the updated task with a simulated description
    res.json({
      id: Number(id),
      title: data.title || updatedTask.title,
      description: updatedTask.description || `Updated description for Task ${id}`,
      status: updatedTask.status || (data.completed ? 'Done' : 'To Do'),
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task.' });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
