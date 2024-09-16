import React, { useState, useEffect } from 'react';
import { updateProject } from '../api';

function UpdateProjectForm({ token, project, fetchProjects }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [startDate, setStartDate] = useState(project.startDate);
  const [endDate, setEndDate] = useState(project.endDate);
  const [owner,setOwner]=useState(project.owner.email)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProject(project._id, { name, description, startDate, endDate,owner }, token);
      fetchProjects();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Project</h3>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Project Name" required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Owner" />
      <input type="date" value={startDate.substring(0,10)} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" />
      <input type="date" value={endDate.substring(0,10)} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" />
      <button type="submit">Update Project</button>
    </form>
  );
}

export default UpdateProjectForm;
