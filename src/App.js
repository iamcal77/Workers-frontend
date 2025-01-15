import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import AdminDashboard from './Components/Pages/AdminDashboard';
import Activities from './Components/Pages/Activities';
import Tasks from './Components/Pages/Tasks';
import ActivityDetails from './Components/Pages/ActivityDetails';
import TaskDetails from './Components/Pages/TaskDetails';
import AdminPage from './Components/Pages/Admin';
import AdminDetails from './Components/Pages/AdminDetails';
import ErrorBoundary from './Components/ErrorBoundary';
import FeedbackPage from './Components/Pages/FeedbackPage';
import Logout from './Components/Auth/Logout';
import Post from './Components/Pages/Post';
import PostList from './Components/Pages/PostList';
import CommentSection from './Components/Pages/CommentSection';
import { ToastContainer } from 'react-toastify';
import Worker from './Components/Pages/Worker';
import WorkerDetails from './Components/Pages/WorkerDetails';
import NotificationsPage from './Components/Pages/NotificationsPage';
import CompletedTasks from './Components/Dashboards/CompletedTasks';
import CompletedActivities from './Components/Dashboards/CompletedActivities';
import PaidWorkers from './Components/Dashboards/PaidWorkers';
import PendingWorkers from './Components/Dashboards/PendingWorkers';
import PaymentApproval from './Components/Approvals/PaymentApproval';
import ApprovalPage from './Components/Approvals/ApprovalPage';
import TaskApproval from './Components/Approvals/TaskApproval';
import ForgotPassword from './Components/Auth/Forgot';
import ResetPassword from './Components/Auth/Reset';
import UserApproval from './Components/Approvals/UserApproval';
import TermsAndConditions from './Components/TermsAndConditions';
import PrivacyPolicy from './Components/PrivacyPolicy';


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
   <ErrorBoundary>
      <Router>
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/admin" replace /> : <Login setToken={setToken} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPage token={localStorage.getItem('token')}/>} />
          <Route path="/forgot" element={<ForgotPassword token={localStorage.getItem('token')}/>} />
          <Route path="/reset" element={<ResetPassword token={localStorage.getItem('token')}/>} />
          <Route path="/admin-details/:id" element={<AdminDetails />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<AdminDashboard token={localStorage.getItem('token')} />} />
          <Route path="/workers" element={<Worker token={localStorage.getItem('token')}/>} />
          <Route path="/worker-details/:id" element={<WorkerDetails token={localStorage.getItem('token')}/>} />
          <Route path="/workers/:id/tasks" element={<Tasks  token={localStorage.getItem('token')}/>} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="/workers/:id/activities" element={<Activities />} />
          <Route path="/activity/:id" element={<ActivityDetails />} />
          <Route path="/worker-approvals" element={<ApprovalPage token={localStorage.getItem('token')}/>} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/notification" element={<NotificationsPage />} />
          <Route path="/posts" element={<Post token={localStorage.getItem('token')} />} />
          <Route path="/postlist" element={<PostList token={localStorage.getItem('token')} />}/>
          <Route path="/comments" element={<CommentSection token={localStorage.getItem('token')} />} />
          <Route path="/completed-tasks" element={<CompletedTasks token={localStorage.getItem('token')} />} />
          <Route path="/completed-activities" element={<CompletedActivities token={localStorage.getItem('token')} />} />
          <Route path="/paid-workers" element={<PaidWorkers token={localStorage.getItem('token')} />} />
          <Route path="/pending-workers" element={<PendingWorkers token={localStorage.getItem('token')} />} />
          <Route path="/payments-approval" element={<PaymentApproval token={localStorage.getItem('token')} />} />
          <Route path="/tasks-approval" element={<TaskApproval token={localStorage.getItem('token')} />} />
          <Route path="/users-approval" element={<UserApproval token={localStorage.getItem('token')} />} />
          <Route path="/terms" element={<TermsAndConditions token={localStorage.getItem('token')} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy token={localStorage.getItem('token')} />} />


          













        </Routes>

      </Router>
      </ErrorBoundary>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />

    </QueryClientProvider>
  );
}

export default App;
