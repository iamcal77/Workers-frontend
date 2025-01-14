import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the styles for toastify

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ResetPassword = ({ token }) => {
  const [code, setCode] = useState("");  // State for the reset code
  const [newPassword, setNewPassword] = useState("");  // State for the new password

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the POST request with code and newPassword
      const response = await axios.post(`${API_BASE_URL}/api/auth/reset-password`, {
        code,  // Send the reset code
        newPassword,  // Send the new password
      });

      // Show success toast
      toast.success(response.data.message || "Password reset successfully.");
    } catch (error) {
      // Handle error and show error toast
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>
        <p className="text-center text-gray-600 mb-6">Enter your new password below.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="code" className="block text-gray-700">Reset Code</label>
            <input
              type="text"
              id="code"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={code}
              onChange={(e) => setCode(e.target.value)}  // Set the reset code
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700">New Password</label>
            <input
              type="password"
              id="newPassword"
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}  // Set the new password
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Reset Password
          </button>
        </form>
        <div className="mt-6 text-center">
          <a href="/#" className="text-sm text-gray-700 hover:underline">
            Login &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
