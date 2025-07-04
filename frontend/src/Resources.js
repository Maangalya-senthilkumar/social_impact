import React, { useState } from 'react';

function Resources({ user, setPage, setUser }) {
  const [message, setMessage] = useState('');
  const [attendance, setAttendance] = useState([]);

  const handleLogout = () => {
    setUser(null);
    setPage('login');
  };

  const handleAttendance = () => {
    const now = new Date().toISOString();
    setAttendance([...attendance, { date: now }]);
    setMessage('Attendance marked! (mock)');
  };

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleAttendance}>Mark Attendance</button>
      {/* Add update/delete user buttons as needed */}
      {message && <div>{message}</div>}
      <div>
        <h4>Attendance:</h4>
        <ul>
          {attendance.map((a, i) => <li key={i}>{a.date}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default Resources;
