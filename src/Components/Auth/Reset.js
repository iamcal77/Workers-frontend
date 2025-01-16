import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the styles for toastify

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ResetPassword = ({ token }) => {
  const [code, setCode] = useState(""); // State for the reset code
  const [newPassword, setNewPassword] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the POST request with code and newPassword
      const response = await axios.post(`${API_BASE_URL}/api/auth/reset-password`, {
        code, // Send the reset code
        newPassword, // Send the new password
      });

      // Show success toast
      toast.success(response.data.message || "Password reset successfully.");
    } catch (error) {
      // Handle error and show error toast
      toast.error("An error occurred. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Reset Password</h2>
        <p className="text-center text-gray-500 mb-6">Enter the reset code and your new password below.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              Reset Code
            </label>
            <input
              type="text"
              id="code"
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              value={code}
              onChange={(e) => setCode(e.target.value)} // Set the reset code
              required
              placeholder="Enter reset code"
            />
          </div>

          <div className="relative">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)} // Set the new password
              required
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Reset Password
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/#" className="text-sm text-blue-600 hover:underline">
            Back to Login &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
