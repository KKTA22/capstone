import React, { useEffect, useState, useRef } from 'react';
import { getUsers, updateUser, deleteUser } from '../api';
import { styles } from '../styles/UserStyles';

const User = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ username: '', email: '', role: '' });
  const dialogRef = useRef(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers(token);
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData({ username: user.username, email: user.email, role: user.role });
    dialogRef.current.showModal();
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id, token);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(editingUser, formData, token);
      setEditingUser(null);
      setFormData({ username: '', email: '', role: '' });
      dialogRef.current.close();
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>User Management</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Username</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td style={styles.td}>{user.username}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>{user.role}</td>
              <td style={styles.td}>
                <button onClick={() => handleEdit(user)} style={styles.button}>Edit</button>
                <button onClick={() => handleDelete(user._id)} style={styles.button}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <dialog ref={dialogRef} style={styles.dialog}>
        <h3>Edit User</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label>
            Username:
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <label>
            Role:
            <input type="text" name="role" value={formData.role} onChange={handleChange} />
          </label>
          <button type="submit" style={styles.button}>Save</button>
          <button type="button" onClick={() => dialogRef.current.close()} style={styles.button}>Cancel</button>
        </form>
      </dialog>
    </div>
  );
};

export default User;
