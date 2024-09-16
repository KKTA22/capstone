import React, { useState, useEffect } from 'react';
import { updateTask } from '../api';

function UpdateTaskForm({ token, task, fetchTasks, projects }) {
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate.substring(0,10));
  const [status, setStatus] = useState(task.status);
  const [project, setProject] = useState(task.project._id??task.project);
  console.log(task)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(task._id, { description, dueDate, status, project }, token);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Task</h3>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task Description" required />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} placeholder="Due Date" required />
      <select value={status} onChange={(e) => setStatus(e.target.value)} required>
        <option value="not_started">Not Started</option>
        <option value="in_progress">In Progress</option>
        <option value="blocked">Blocked</option>
        <option value="completed">Completed</option>
      </select>
      <select value={project} onChange={(e) => setProject(e.target.value)} required>
        <option value="">Select Project</option>
        {projects.map((proj) => (
          <option key={proj._id} value={proj._id}>{proj.name}</option>
        ))}
      </select>
      <button type="submit">Update Task</button>
    </form>
  );
}

export default UpdateTaskForm;
