import React, { useState } from 'react';

function Login({ setPage, setUser }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    // Mock login: accept any name, set a mock user object
    if (name.trim()) {
      setUser({ _id: 'mockid', name, role: 'student' });
      setPage('resources');
    } else {
      setError('Please enter a name');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => setPage('register')}>Add New User</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </div>
  );
}

export default Login;
