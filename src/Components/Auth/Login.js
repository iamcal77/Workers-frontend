import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to navigate to another page

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Please enter both username and password.');
      return;
    }
  
    try {
      const response = await axios.post('https://localhost:7050/api/auth/login', {
        username,
        password,
      });
  
      console.log('Login API response:', response); // Log the entire response
  
      const token = response.data.token; // Ensure Token is correct or adjust if it's named differently
      console.log('Login successful, received token:', token);  // Log the token
  
      if (token) {
        setToken(token);
        localStorage.setItem('token', token);
        toast.success('Login successful');
        navigate('/admin');
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      toast.error('Login failed. Please check your credentials.');
    }
  };
  
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      {/* Toast Notifications */}
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Member Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-400 focus:outline-none"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-400 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white bg-green-500 rounded-full hover:bg-green-600 focus:ring-4 focus:ring-green-300"
          >
            LOGIN
          </button>
        </form>
        <div className="mt-4 text-center">
          <a
            href="/register"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Forgot Username / Password?
          </a>
        </div>
        <div className="mt-6 text-center">
          <a href="/register" className="text-sm text-gray-700 hover:underline">
            Create your Account &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
