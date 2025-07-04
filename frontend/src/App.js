import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Resources from './Resources';

function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);

  if (page === 'login') return <Login setPage={setPage} setUser={setUser} />;
  if (page === 'register') return <Register setPage={setPage} />;
  if (page === 'resources') return <Resources user={user} setPage={setPage} setUser={setUser} />;
  return null;
}

export default App;
