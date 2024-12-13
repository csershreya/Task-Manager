import React, { useState } from "react";
import { Table } from "react-bootstrap";

function TaskTable({ tasks, updateTask, deleteTask }) {
  const [editingTaskId, setEditingTaskId] = useState(null); // Track the task being edited
  const [editedTask, setEditedTask] = useState(null); // Store edited values

  const handleEditClick = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingTaskId(taskId);
    setEditedTask({ ...taskToEdit }); // Initialize with the current task values
  };

  const handleInputChange = (field, value) => {
    setEditedTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${editingTaskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedTask),
      });
      updateTask(editedTask);
      setEditingTaskId(null); // Exit editing mode
      setEditedTask(null); // Clear the editing state
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Failed to save changes.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave(); // Save changes on pressing Enter
    }
  };

  return (
    <Table striped bordered hover>
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
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={editedTask?.title || ""}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              ) : (
                <span onClick={() => handleEditClick(task.id)}>{task.title}</span>
              )}
            </td>
            <td>
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={editedTask?.description || ""}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={handleKeyDown}
                />
              ) : (
                <span onClick={() => handleEditClick(task.id)}>{task.description}</span>
              )}
            </td>
            <td>
              {editingTaskId === task.id ? (
                <select
                  value={editedTask?.status || "To Do"}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  onBlur={handleSave}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              ) : (
                <span onClick={() => handleEditClick(task.id)}>{task.status}</span>
              )}
            </td>
            <td>
              <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TaskTable;
