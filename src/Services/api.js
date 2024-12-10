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
export const getPosts = () => api.get(`/posts`);
export const likePost = (postId) => api.post(`/post/${postId}/like`);
export const unlikePost = (postId) => api.post(`/post/${postId}/unlike`);
export const getLikeCount = (postId) => api.get(`/post/${postId}/likes/count`);
export const getComments = (postId, token) => {
  return api.get(`/comments/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Directly include token for this API
    }
  });
};
export const addComment = (postId, content, token) => {
  console.log('Posting comment with token:', token); // Log the token when posting comment
  return api.post(`/comments`, {
    postId,  // Ensure the postId is included in the body
    content  // Send Content directly
  });
};
