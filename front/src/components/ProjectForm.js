import React, { useState } from 'react';
import { createProject } from '../api';

function ProjectForm({ token, fetchProjects }) {
  const [name, setName] = useState('');
  const [owner,setOwner]=useState("");
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    console.log(token)
    e.preventDefault();
    try {
      await createProject({ name, description, startDate, endDate, owner }, token);
      fetchProjects();
      setName('');
      setDescription('');
      setStartDate('');
      setEndDate('');
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Project</h3>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Project Name" required />
      <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Owner" required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" />
      <button type="submit">Create Project</button>
    </form>
  );
}

export default ProjectForm;
