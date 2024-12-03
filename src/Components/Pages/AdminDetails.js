import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import DotLoader from '../Loader/Loader';
import { useParams, useNavigate } from 'react-router-dom'; // Hook to access the URL parameters

function AdminDetails({ onLogout }) {
  const [admin, setAdmin] = useState(null);
  const { id } = useParams(); // Get the admin ID from the URL
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get the token from local storage or a global state manager (e.g., Redux)
  const token = localStorage.getItem('authToken'); // assuming token is stored in localStorage

  useEffect(() => {
    if (!token) {
      // If no token is found, redirect to login page or show an error
      navigate('/login');
      return;
    }

    const fetchAdminDetails = async () => {
      try {
        setTimeout(async () => {
          const response = await axios.get(`https://localhost:7050/api/admin/users/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`  // Include the token in the request header
            }
          });
          setAdmin(response.data);
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Error fetching admin details:', error);
        setLoading(false);
        // Handle error appropriately (e.g., display error message or redirect)
        navigate('/error'); // Redirect to an error page or display a message
      }
    };
    fetchAdminDetails();
  }, [id, token, navigate]); // Ensure token and navigate are included as dependencies

  return (
    <Layout onLogout={onLogout}>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <DotLoader />
        </div>
      ) : (
        <div className="p-4 bg-white shadow-md rounded-lg h-screen overflow-y-auto">
          <h1 className="text-xl font-bold text-gray-800 mb-3 mt-7">Admin Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium text-gray-600">
            <p>
              <span className="font-semibold text-gray-900">User Name:</span> {admin.userName}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Name:</span> {admin.name}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Email:</span> {admin.email}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Contact:</span> {admin.contact}
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default AdminDetails;
