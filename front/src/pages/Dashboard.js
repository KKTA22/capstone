import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";
import TaskForm from "../components/TaskForm";
import UpdateProjectForm from "../components/UpdateProjectForm";
import UpdateTaskForm from "../components/UpdateTaskForm";
import { getProjects, getTasks, deleteProject, deleteTask } from "../api";
import { columnStack, rowStack } from "../styles/CommonStyles";
import { BoxShadowBorder, headerStyle, buttonStyle, containerStyle, modalStyle, closeButtonStyle, tableStyle, thStyle, tdStyle } from "../styles/DashboardStyles";

function Dashboard({ authtoken }) {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const navigate = useNavigate();

  const dialogRef = useRef(null);
  const editProjectRef = useRef(null);
  const editProjectHandler = (project) => {
    setSelectedProject(project);
    editProjectRef.current.showModal();
  };

  const editTaskRef = useRef(null);
  const editTaskHandler = (task) => {
    setSelectedTask(task);
    editTaskRef.current.showModal();
  };

  const openProjectModal = () => {
    dialogRef.current.showModal();
  };

  const closeProjectModal = () => {
    dialogRef.current.close();
  };

  const taskDialogRef = useRef(null);
  const openTaskModal = () => {
    taskDialogRef.current.showModal();
  };

  const closeTaskModal = () => {
    taskDialogRef.current.close();
  };

  useEffect(() => {
    if (authtoken) {
      fetchProjects();
      fetchTasks();
    }
  }, [authtoken]);

  const fetchProjects = async () => {
    try {
      const response = await getProjects(authtoken);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await getTasks(authtoken);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id, authtoken);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id, authtoken);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div style={containerStyle}>
      <div style={{ ...rowStack, alignItems: "center", ...headerStyle }}>
        <h3>Projects</h3>
        <button style={buttonStyle} onClick={openProjectModal}>
          Create Project
        </button>
      </div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Owner</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Start Date - End Date</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id} onClick={() => handleProjectClick(project._id)} style={{ cursor: "pointer" }}>
              <td style={tdStyle}>{project.name}</td>
              <td style={tdStyle}>{project.owner.username}</td>
              <td style={tdStyle}>{project.description}</td>
              <td style={tdStyle}>{project.startDate.substring(0, 10)} - {project.endDate.substring(0, 10)}</td>
              <td style={tdStyle}>
                <button onClick={(e) => { e.stopPropagation(); editProjectHandler(project); }}>Edit</button>
                <button onClick={(e) => { e.stopPropagation(); handleDeleteProject(project._id); }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ ...rowStack, alignItems: "center", ...headerStyle }}>
        <h3>Tasks</h3>
        <button style={buttonStyle} onClick={openTaskModal}>
          Create Task
        </button>
      </div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Owner</th>
            <th style={thStyle}>Project</th>
            <th style={thStyle}>Due Date</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td style={tdStyle}>{task.description}</td>
              <td style={tdStyle}>{task.owner.email}</td>
              <td style={tdStyle}>{task.project.name}</td>
              <td style={tdStyle}>{task.dueDate.substring(0, 10)}</td>
              <td style={tdStyle}>{task.status}</td>
              <td style={tdStyle}>
                <button onClick={() => editTaskHandler(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <dialog ref={dialogRef} style={modalStyle}>
        <ProjectForm token={authtoken} fetchProjects={fetchProjects} />
        <button style={closeButtonStyle} onClick={closeProjectModal}>Close</button>
      </dialog>
      <dialog ref={editProjectRef} style={modalStyle}>
        {selectedProject && (
          <UpdateProjectForm token={authtoken} project={selectedProject} fetchProjects={fetchProjects} />
        )}
        <button style={closeButtonStyle} onClick={() => editProjectRef.current.close()}>Close</button>
      </dialog>
      <dialog ref={editTaskRef} style={modalStyle}>
        {selectedTask && (
          <UpdateTaskForm token={authtoken} task={selectedTask} fetchTasks={fetchTasks} projects={projects} />
        )}
        <button style={closeButtonStyle} onClick={() => editTaskRef.current.close()}>Close</button>
      </dialog>
      <dialog ref={taskDialogRef} style={modalStyle}>
        <TaskForm token={authtoken} fetchTasks={fetchTasks} projects={projects} />
        <button style={closeButtonStyle} onClick={closeTaskModal}>Close</button>
      </dialog>
    </div>
  );
}

export default Dashboard;
