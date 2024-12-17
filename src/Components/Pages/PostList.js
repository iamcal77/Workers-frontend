import React, { useState, useEffect } from 'react';
import { getPosts } from '../../Services/api';
import Post from './Post';
import CommentSection from './CommentSection';
import Layout from '../Layout';
import PostForm from '../Forms/PostForm';
import ActionBar from '../ActionBar';
import { toast } from 'react-toastify';

const PostList = ({ onLogout }) => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // State to toggle the form
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    const token = localStorage.getItem('token');
    if (!token) return;
  
    getPosts(token)
      .then((res) => {
        if (res.data && Array.isArray(res.data.values)) {
          setPosts(res.data.values); // Set the posts from the 'values' array
        } else {
          console.error('Unexpected data format:', res.data);
          toast.error('Failed to load posts');
        }
      })
      .catch((err) => {
        console.error('Error fetching posts:', err);
        toast.error('Failed to load posts');
      });
  };
  

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <Layout onLogout={onLogout}>
      <div className="container mx-auto p-4">
        <ActionBar
          onAdd={toggleForm}
          onEdit={toggleForm}
          onDelete={() => console.log('Delete farmer')}
        />
        {showForm && <PostForm onPostAdded={fetchPosts} />}
        <div className="mt-8 bg-gray-600 p-4 rounded-lg">
          {posts.length === 0 ? (
            <p className="text-white">No posts available.</p>
          ) : (
            posts.map((post) => (
              <div key={post.id || post.postId || Math.random()} className="mb-4">
                {post.id || post.postId ? (
                  <>
                    <Post post={post} />
                    <CommentSection postId={post.id || post.postId} />
                  </>
                ) : (
                  <p className="text-white">Post ID is missing</p>
                )}
              </div>
          
            
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PostList;
