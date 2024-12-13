import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function TaskTable({ tasks, updateTask, deleteTask }) {
  const [editedTask, setEditedTask] = useState(null);

  const handleEdit = (taskId, field, value) => {
    setEditedTask({ ...editedTask, [field]: value });
  };

  const handleSave = async (taskId) => {
    const updatedTask = { ...editedTask, id: taskId };

    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task.');
      }

      const data = await response.json();
      updateTask(data); // Update the local state
      setEditedTask(null); // Reset the edited task
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update the task. Please try again.');
    }
  };

  const handleDelete = (taskId) => {
    deleteTask(taskId);
  };

  return (
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>
              {editedTask?.id === task.id ? (
                <input
                  type="text"
                  value={editedTask.title}
                  onChange={(e) => handleEdit(task.id, 'title', e.target.value)}
                />
              ) : (
                task.title
              )}
            </td>
            <td>
              {editedTask?.id === task.id ? (
                <input
                  type="text"
                  value={editedTask.description}
                  onChange={(e) => handleEdit(task.id, 'description', e.target.value)}
                />
              ) : (
                task.description
              )}
            </td>
            <td>
              {editedTask?.id === task.id ? (
                <select
                  value={editedTask.status}
                  onChange={(e) => handleEdit(task.id, 'status', e.target.value)}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              ) : (
                task.status
              )}
            </td>
            <td>
              {editedTask?.id === task.id ? (
                <button className="btn btn-success btn-sm" onClick={() => handleSave(task.id)}>
                  Save
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => setEditedTask(task)}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task.id)}>
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskTable;
