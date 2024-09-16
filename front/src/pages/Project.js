import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectsById, deleteTask, getProjects } from '../api';
import UpdateTaskForm from '../components/UpdateTaskForm';
import '../styles/Project.css';

const Project = ({ token }) => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [projects, setProjects] = useState([]);
  const editTaskRef = useRef(null);

  const fetchProjects = async () => {
    try {
      const response = await getProjects(token);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProjects();
    }
  }, [token]);

  const fetchProjectById = async (id, token) => {
    try {
      const response = await getProjectsById(id, token);
      setProject(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const editTaskHandler = (task) => {
    setSelectedTask(task);
    editTaskRef.current.showModal();
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id, token);
      fetchProjectById(id, token); // Refresh project details after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    if (id && token) {
      fetchProjectById(id, token);
    }
  }, [id, token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="project-container">
      <h1 className="project-title">Project Details</h1>
      <div className="project-details">
        <p><strong>Project ID:</strong> {project?._id}</p>
        <p><strong>Project Name:</strong> {project?.name}</p>
        <p><strong>Project Description:</strong> {project?.description}</p>
        <p><strong>Project Start Date:</strong> {new Date(project?.startDate).toLocaleDateString()}</p>
        <p><strong>Project End Date:</strong> {new Date(project?.endDate).toLocaleDateString()}</p>
        <p><strong>Project Owner:</strong> {project?.owner?.username} ({project?.owner?.email})</p>
      </div>
      <h2 className="tasks-title">Tasks</h2>
      {project?.tasks?.length > 0 ? (
        <table className="project-table">
          <thead>
            <tr>
              <th>Task Description</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Owner</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {project.tasks.map(task => (
              <tr key={task._id}>
                <td>{task.description}</td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td>{task.status}</td>
                <td>{task.owner.username} ({task.owner.email})</td>
                <td>
                  <button onClick={() => editTaskHandler(task)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks available</p>
      )}
      <dialog ref={editTaskRef}>
        {selectedTask && (
          <UpdateTaskForm
            projects={projects}
            token={token}
            task={selectedTask}
            fetchTasks={() => fetchProjectById(id, token)}
          />
        )}
        <button onClick={() => editTaskRef.current.close()}>Close</button>
      </dialog>
    </div>
  );
};

export default Project;
