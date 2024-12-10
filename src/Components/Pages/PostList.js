import React, { useState, useEffect } from 'react';
import { getPosts } from '../../Services/api';
import Post from './Post';
import CommentSection from './CommentSection';
import Layout from '../Layout';

const PostList = (onLogout) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
      .then((res) => setPosts(res.data))
      .catch((err) => console.error('Error fetching posts:', err));
  }, []);

  return (
    <Layout onLogout={onLogout}>

    <div className="container height-screen mt-8 bg-gray-600">
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <Post post={post} />
            <CommentSection postId={post.id} />  {/* Render the comment section for each post */}
          </div>
        ))
      )}
    </div>
    </Layout >

  );
};

export default PostList;
