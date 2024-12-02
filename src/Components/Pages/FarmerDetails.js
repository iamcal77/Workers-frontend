import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import DotLoader from '../Loader/Loader';
import { useParams } from 'react-router-dom'; // Hook to access the URL parameters

function FarmerDetails(onLogout) {
  const [farmer, setFarmer] = useState(null);
  const { id } = useParams(); // Get the farmer ID from the URL
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchFarmerDetails = async () => {
      try {
        setTimeout(async () => {
        const response = await axios.get(`https://localhost:7050/api/farmers/${id}`);
        setFarmer(response.data);
        setLoading(false);
        }, 2000);
      }
       catch (error) {
        console.error('Error fetching farmer details:', error);
        setLoading(false);
      }
    };
    fetchFarmerDetails();
  }, [id]);


  return (
    <Layout onLogout={onLogout}>
                {loading ? (
          <div className="flex justify-center items-center h-full">
            <DotLoader />
          </div>):(
             <div className="p-4 bg-white shadow-md rounded-lg h-screen overflow-y-auto">
             <h1 className="text-xl font-bold text-gray-800 mb-3 mt-7">Farmer Details</h1>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium text-gray-600">
               <p>
                 <span className="font-semibold text-gray-900">Name:</span> {farmer.name}
               </p>
               <p>
                 <span className="font-semibold text-gray-900">Location:</span> {farmer.location}
               </p>
               <p>
                 <span className="font-semibold text-gray-900">Contact:</span> {farmer.contact}
               </p>
               <p>
                 <span className="font-semibold text-gray-900">Farm Size:</span> {farmer.farmSize}
               </p>
               <p>
                 <span className="font-semibold text-gray-900">Crop Type:</span> {farmer.cropType}
               </p>
               <p>
                 <span className="font-semibold text-gray-900">Livestock Type:</span> {farmer.livestockType}
               </p>
               <p>
                 <span className="font-semibold text-gray-900">National ID:</span> {farmer.nationalId}
               </p>
               <p>
                 <span className="font-semibold text-gray-900">Gender:</span> {farmer.gender}
               </p>
               <p>
                 <span className="font-semibold text-gray-900">Cooperative Membership:</span> {farmer.cooperativeMembership}
               </p>
               <p>
                 <span className="font-semibold text-gray-900">Has Irrigation:</span> {farmer.hasIrrigation ? 'Yes' : 'No'}
               </p>
               <p>
                 <span className="font-semibold text-gray-900">Organic Farming:</span> {farmer.usesOrganicFarming ? 'Yes' : 'No'}
               </p>
               <p>
                 <span className="font-semibold text-gray-900">Notes:</span> {farmer.notes}
               </p>
             </div>
           </div>
          )}
     
    </Layout>
  );
}

export default FarmerDetails;
