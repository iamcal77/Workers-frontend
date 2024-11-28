import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './Components/Login';
import Register from './Components/Register';
import AdminDashboard from './Components/AdminDashboard';

const queryClient = new QueryClient();

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              token ? <Navigate to="/dashboard" replace /> : <Login setToken={setToken} />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={token ? <AdminDashboard token={token} /> : <Navigate to="/" replace />}
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
