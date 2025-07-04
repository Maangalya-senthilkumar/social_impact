import React, { useState } from 'react';

function Register({ setPage }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = () => {
    setError(''); setSuccess('');
    if (name.trim()) {
      setSuccess('User registered! (mock)');
    } else {
      setError('Please enter a name');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="parent">Parent</option>
        <option value="volunteer">Volunteer</option>
      </select>
      <button onClick={handleRegister}>Register</button>
      <button onClick={() => setPage('login')}>Back to Login</button>
      {error && <div style={{color:'red'}}>{error}</div>}
      {success && <div style={{color:'green'}}>{success}</div>}
    </div>
  );
}

export default Register;
