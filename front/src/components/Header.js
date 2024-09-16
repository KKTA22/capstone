import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { styles } from '../styles/HeaderStyles';
import { getRole } from '../api';

const Header = () => {
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (token) {
      getRole(token).then((resp) => setRole(resp.data.role)).catch(()=>{});
    }
  }, [token]);

  let headerText = '';

  if (location.pathname === '/login') {
    headerText = 'Login';
  } else if (location.pathname === '/') {
    headerText = 'Dashboard';
  } else if (location.pathname.startsWith('/project/')) {
    headerText = 'Project Details';
  } else if (location.pathname === '/register') {
    headerText = 'Register';
  }

  return (
    <header style={styles.header}>
      <div style={styles.center}>{headerText}</div>
      {(location.pathname !== '/login' && location.pathname !== '/register') && (
        <div style={styles.right}>
          <Link to="/" style={{ ...styles.link, marginRight: '10px' }}>Dashboard</Link>
          {role === 'admin' && <Link to="/users" style={{ ...styles.link, marginRight: '10px' }}>Users</Link>}
          <Link to="/logout" style={styles.link}>Logout</Link>
        </div>
      )}
    </header>
  );
};

export default Header;