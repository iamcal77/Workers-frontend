import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    role: '',
    contact: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://localhost:7050/api/auth/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Registration successful');
    } catch (error) {
      console.error('Error during registration:', error.response ? error.response.data : error.message);
      alert('Registration failed');
    }
  };
  
  
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      {/* Left Section: Form */}
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full md:w-1/2 lg:w-1/3">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Username */}
          <div className="relative">
            <input
              type="text"
              name="username"
              placeholder="Your UserName"
              onChange={handleChange}
              className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
            />
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <i className="fas fa-user"></i>
            </span>
          </div>
          
          {/* Name */}
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              onChange={handleChange}
              className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              onChange={handleChange}
              className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
            />
          </div>

          {/* Role */}
          <div className="relative">
            <input
              type="text"
              name="role"
              placeholder="Role"
              onChange={handleChange}
              className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
            />
          </div>

          {/* Contact */}
          <div className="relative">
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              onChange={handleChange}
              className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
            />
          </div>

          {/* Terms of Service */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="agreeToTerms"
              onChange={handleChange}
              className="w-5 h-5 text-blue-500 border-gray-300 rounded"
            />
            <label className="text-gray-600 text-sm">
              I agree all statements in{' '}
              <a href="#" className="text-blue-500 underline">
                Terms of service
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition focus:outline-none"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-500">
          <a href="/#" className="underline text-green-500">
            I am already a member
          </a>
        </p>
      </div>

      {/* Right Section: Image */}
      <div className="hidden md:block md:w-1/2 lg:w-1/3 p-4">
        <img
          src="https://i.pinimg.com/474x/ac/f6/0b/acf60b8deff5c620a8035ded6847ee06.jpg" // Replace with the real image URL
          alt="Sign up illustration"
          className="max-w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}

export default Register;
