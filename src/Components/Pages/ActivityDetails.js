import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import DotLoader from '../Loader/Loader';
import { useParams } from 'react-router-dom'; // Hook to access the URL parameters

function ActivityDetails(onLogout) {
  const [activity, setActivity] = useState(null);
  const { id } = useParams(); // Get the farmer ID from the URL
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        setTimeout(async () => {
        const response = await axios.get(`https://localhost:7050/api/FarmActivities/${id}`);
        setActivity(response.data);
        setLoading(false);
        }, 2000);
      }
       catch (error) {
        console.error('Error fetching farmer details:', error);
        setLoading(false);
      }
    };
    fetchActivityDetails();
  }, [id]);


  return (
    <Layout onLogout={onLogout}>
                {loading ? (
          <div className="flex justify-center items-center h-full">
            <DotLoader />
          </div>):(
             <div className="p-4 bg-white shadow-md rounded-lg h-screen overflow-y-auto">
             <h1 className="text-xl font-bold text-gray-800 mb-3 mt-7">Activity Details</h1>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium text-gray-600">
               <p>
                 <span className="font-semibold text-gray-900">Farmer Id:</span> {activity.farmId}
               </p>
               <p>
                 <span className="font-semibold text-gray-900">Activity Name:</span> {activity.activityName}
               </p>
               <p>
                 <span className="font-semibold text-gray-900">Description:</span> {activity.description}
               </p>
               <p>
                 <span className="font-semibold text-gray-900">Start Date:</span> {new Date(activity.startDate).toLocaleDateString()}
               </p>
               <p>
               <span className="font-semibold text-gray-900">End Date:</span> {new Date(activity.endDate).toLocaleDateString()}
               </p>
               <p>
                 <span className="font-semibold text-gray-900">Is Completed:</span> {activity.isCompleted}
               </p>
             </div>
             
           </div>
          )}
     
    </Layout>
  );
}

export default ActivityDetails;
