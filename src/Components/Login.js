import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to navigate to another page

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call your login API
      const response = await axios.post('https://localhost:7050/api/auth/login', {
        username,
        password,
      });

      // Get the token from the response and set it in the App state
      const token = response.data.Token;

      if (token){
        console.log9("navigation to dashboard");
        setToken(token);

      }
      localStorage.setItem('token', token);

      alert('Login successful');
      
      // Navigate to the Admin Dashboard
      navigate('/dashboard'); // This redirects to the dashboard route after login
    } 
    
    catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
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
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-400 focus:outline-none"
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
            href="#"
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
