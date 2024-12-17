import axios from 'axios';

const API_URL = 'https://localhost:7050/api'; // Change to your backend URL

const getAuthToken = () => localStorage.getItem('token'); // Function to get the token

// Create axios instance with base URL and headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add the token to the headers of each request
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      console.log('Token added to request headers:', token); // Log token in request
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API requests
export const loginUser = (credentials) => axios.post(`${API_URL}/auth/login`, credentials);
export const registerUser = (user) => axios.post(`${API_URL}/auth/register`, user);
export const addPost = (postData) => {
  return api.post('/posts', postData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Important for FormData
    },
  });
};

export const getPosts = () => api.get(`/posts`);
export const likePost = (postId) => api.post(`/post/${postId}/like`);
export const unlikePost = (postId) => api.post(`/post/${postId}/unlike`);
export const getLikeCount = async (postId) => {
  try {
    const response = await api.get(`/post/${postId}/likes/count`);
    return response.data; // Make sure this returns the correct structure
  } catch (error) {
    throw new Error('Error fetching like count: ' + error.message);
  }
};

export const getComments = (postId, token) => {
  return api.get(`/comments/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Directly include token for this API
    }
  });
};

// Use axios for addComment to keep consistency
export const addComment = async (postId, content, token) => {
  try {
    const response = await api.post(`/comments`, { postId, content }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data; // Return the response data (new comment or success message)
  } catch (error) {
    throw new Error('Error posting comment: ' + error.message);
  }
};
export const getAttachments = async () => {
  try {
    const response = await api.get('/posts/attachments');
    return response.data; // Return the list of attachments
  } catch (error) {
    throw new Error('Error fetching attachments: ' + error.message);
  }
};

