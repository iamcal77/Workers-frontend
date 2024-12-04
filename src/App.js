import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import AdminDashboard from './Components/Pages/AdminDashboard';
import Farmer from './Components/Pages/Farmer';
import Activities from './Components/Pages/Activities';
import Tasks from './Components/Pages/Tasks';
import FarmerDetails from './Components/Pages/FarmerDetails';
import ActivityDetails from './Components/Pages/ActivityDetails';
import TaskDetails from './Components/Pages/TaskDetails';
import AdminPage from './Components/Pages/Admin';
import AdminDetails from './Components/Pages/AdminDetails';
import ApprovalPage from './Components/Pages/ApprovalPage';
import ErrorBoundary from './Components/ErrorBoundary';
import FeedbackPage from './Components/Pages/FeedbackPage';


const queryClient = new QueryClient();

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    console.log('Token set to:', token); // Debugging token

    if (token) {
      console.log('Token stored in localStorage:', localStorage.getItem('token'));
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <QueryClientProvider client={queryClient}>
   <ErrorBoundary>
      <Router>
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/admin" replace /> : <Login setToken={setToken} />}
          />
         <Route path="/admin-details/:id" element={token ? <Navigate to="admin" replace /> : <AdminDetails setToken={setToken} />} />


          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={token ? <AdminPage token={token} /> : <Navigate to="/" replace />}
          />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/farmer" element={<Farmer />} />
          <Route path="/farmer-details/:id" element={<FarmerDetails />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activity/:id" element={<ActivityDetails />} />
          <Route path="/approvals" element={<ApprovalPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />

        </Routes>

      </Router>
      </ErrorBoundary>

    </QueryClientProvider>
  );
}

export default App;
