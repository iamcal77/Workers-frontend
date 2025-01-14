import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Access the API base URL from .env

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Please enter both username and password.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        username,
        password,
      });

      const token = response.data.token;
      if (token) {
        setToken(token);
        localStorage.setItem('token', token);
        toast.success('Login successful');

        // Fetch the user role
        const userResponse = await axios.get(`${API_BASE_URL}/api/users/role`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const role = userResponse.data.role;

        if (role === 'Admin') {
          navigate('/admin');
        } else {
          navigate('/workers'); // Navigate to the "Workers" page if not Admin
        }
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg relative">
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
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-400 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
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
