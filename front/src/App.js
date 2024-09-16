import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getProjects, getTasks } from './api';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import Project from './pages/Project';
import User from './pages/User';
import Logout from './pages/Logout';

function App() {
  // const [projects, setProjects] = useState([]);
  // const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // useEffect(() => {
  //   if (token) {
  //     fetchProjects();
  //     fetchTasks();
  //   }
  // }, [token]);

  // const fetchProjects = async () => {
  //   try {
  //     const response = await getProjects(token);
  //     setProjects(response.data);
  //   } catch (error) {
  //     console.error('Error fetching projects:', error);
  //   }
  // };

  // const fetchTasks = async () => {
  //   try {
  //     const response = await getTasks(token);
  //     setTasks(response.data);
  //   } catch (error) {
  //     console.error('Error fetching tasks:', error);
  //   }
  // };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login setToken={setToken} />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<PrivateRoute element={Dashboard} token={token} authtoken={token} />} />
          <Route path="project/:id" element={<Project token={token}/>} />
          <Route path="users" element={<User token={token}/>} />
          <Route path="logout" element={<Logout setToken={setToken}/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
