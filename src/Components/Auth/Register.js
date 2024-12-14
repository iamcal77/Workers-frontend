import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'; // Import axios
import 'react-toastify/dist/ReactToastify.css';

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
      // Make the POST request to the registration endpoint
      const response = await axios.post('https://localhost:7050/api/auth/register', formData, {
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full md:w-1/2 lg:w-1/3">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Input Fields */}
          {['username', 'name', 'email', 'password', 'role', 'contact'].map((field) => (
            <div className="relative" key={field}>
              <input
                type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
                name={field}
                placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                onChange={handleChange}
                value={formData[field]}
                className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
                required
              />
            </div>
          ))}

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
          src="https://i.pinimg.com/474x/ac/f6/0b/acf60b8deff5c620a8035ded6847ee06.jpg" 
          alt="Sign up illustration"
          className="max-w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}

export default Register;
