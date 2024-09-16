import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ setToken }) {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login'); // Redirect to login page after logout
  }, [navigate, setToken]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
}

export default Logout;
