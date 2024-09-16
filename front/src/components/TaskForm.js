import React, { useState } from 'react';
import { createTask } from '../api';

function TaskForm({ token, fetchTasks, projects, selectedProject }) {
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [project, setProject] = useState(selectedProject?'':selectedProject);
  const [owner,setOwner]=useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask({ description, dueDate, project,owner }, token);
      fetchTasks();
      setDescription('');
      setDueDate('');
      setProject('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{selectedProject?"Create Project":"Create Task"}</h3>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task Description" required />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} placeholder="Due Date" required />
      <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Owner" required />
      <select value={project} onChange={(e) => setProject(e.target.value)} required>
        <option value="">Select Project</option>
        {projects.map((proj) => (
          <option key={proj._id} value={proj._id}>{proj.name}</option>
        ))}
      </select>
      <button type="submit">Create Task</button>
    </form>
  );
}

export default TaskForm;
