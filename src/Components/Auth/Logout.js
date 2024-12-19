import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import Layout from '../Layout';

function Logout() {
  const navigate = useNavigate();

  const handleConfirm = () => {
    localStorage.removeItem('token');

    // Show a success toast
    toast.success('Successfully logged out!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Redirect to login page after a short delay
    setTimeout(() => {
      navigate('/register'); // Redirect to login or home page
    }, 3000);
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Confirm Logout
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Are you sure you want to log out?
          </p>
          <div className="flex justify-around">
            <button
              onClick={handleConfirm}
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Yes
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Logout;
