import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import DotLoader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import ActionBar from '../ActionBar';

function AdminDetails({ onLogout }) {
  const [admin, setAdmin] = useState(null);
  const { id } = useParams(); // Get the admin ID from the URL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the token from local storage
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('Authorization token is missing. Please log in again.');
      setLoading(false);
      return;
    }

    const fetchAdminDetails = async () => {
      try {
        setTimeout(async () => {
          const response = await axios.get(`https://localhost:7050/api/admin/users/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request header
            },
          });
          setAdmin(response.data);
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Error fetching admin details:', error);
        setError('Failed to fetch admin details. Please try again later.');
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, [id, token]);

  return (
    <Layout onLogout={onLogout}>
      <ActionBar
          showBackButton={true}
          showDeleteButton={false}
          showEditButton={false}
          showAddButton={false}
          showExportToExcelButton={ true}
        />
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <DotLoader />
        </div>
      ) : error ? (
        <div className="text-center text-red-600 mt-8 font-semibold">
          {error}
        </div>
      ) : (
        <div className="p-4 bg-white shadow-md rounded-lg h-screen overflow-y-auto">
          <h1 className="text-xl font-bold text-gray-800 mb-3 mt-7">Admin Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium text-gray-600">
            <p>
              <span className="font-semibold text-gray-900">User Name:</span> {admin.username}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Role:</span> {admin.role}
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
