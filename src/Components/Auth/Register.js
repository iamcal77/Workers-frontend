import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'; // Import axios
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Add the API base URL from environment variables

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    role: '', // role is now a select input
    contact: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check for empty fields before proceeding
    if (!formData.username || !formData.name || !formData.email || !formData.password || !formData.role || !formData.contact) {
      toast.error('All fields are required!');
      return;
    }

    try {
      // Make the POST request to the registration endpoint using the API base URL
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast.success('Registration successful');
        setFormData({
          username: '',
          name: '',
          email: '',
          password: '',
          role: '',
          contact: '',
        });
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error.response ? error.response.data : error.message);
      toast.error('Registration failed');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full md:w-1/2 lg:w-1/3">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Input Fields */}
          {['username', 'name', 'email', 'contact'].map((field) => (
            <div className="relative" key={field}>
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                onChange={handleChange}
                value={formData[field]}
                className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
                required
              />
            </div>
          ))}

          {/* Role Select Input */}
          <div className="relative">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="supervisor">Supervisor</option>
            </select>
          </div>

          {/* Password Field with Show/Hide Toggle */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Your Password"
              onChange={handleChange}
              value={formData.password}
              className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
              required
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
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
          <a href="/#" className="underline text-green-500">I am already a member</a>
        </p>
      </div>

      {/* Right Section: Image */}
      <div className="hidden md:block md:w-1/2 lg:w-1/3 p-4">
        <img
          src="https://i.pinimg.com/736x/95/d3/f4/95d3f495e91ab4e36bb8afe2271873cc.jpg"
          alt="Sign up illustration"
          className="max-w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}

export default Register;
