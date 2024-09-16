import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

export const register = (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const login = (userData) => axios.post(`${API_URL}/auth/login`, userData);
export const getRole = (token) => axios.get(`${API_URL}/auth/role`,{ headers: { 'x-auth-token': token } });
export const getProjects = (token) => axios.get(`${API_URL}/projects`, { headers: { 'x-auth-token': token } });
export const getProjectsById = (id,token) => axios.get(`${API_URL}/projects/${id}`, { headers: { 'x-auth-token': token } });
export const createProject = (projectData, token) => axios.post(`${API_URL}/projects`, projectData, { headers: { 'x-auth-token': token } });
export const updateProject = (id, projectData, token) => axios.put(`${API_URL}/projects/${id}`, projectData, { headers: { 'x-auth-token': token } });
export const deleteProject = (id, token) => axios.delete(`${API_URL}/projects/${id}`, { headers: { 'x-auth-token': token } });
export const getTasks = (token) => axios.get(`${API_URL}/tasks`, { headers: { 'x-auth-token': token } });
export const createTask = (taskData, token) => axios.post(`${API_URL}/tasks`, taskData, { headers: { 'x-auth-token': token } });
export const updateTask = (id, taskData, token) => axios.put(`${API_URL}/tasks/${id}`, taskData, { headers: { 'x-auth-token': token } });
export const deleteTask = (id, token) => axios.delete(`${API_URL}/tasks/${id}`, { headers: { 'x-auth-token': token } });
export const getUsers = (token) => axios.get(`${API_URL}/users`, { headers: { 'x-auth-token': token } });
export const updateUser = (id, userData, token) => axios.put(`${API_URL}/users/${id}`, userData, { headers: { 'x-auth-token': token } });
export const deleteUser = (id, token) => axios.delete(`${API_URL}/users/${id}`, { headers: { 'x-auth-token': token } });

