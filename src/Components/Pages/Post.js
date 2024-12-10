import React, { useState, useEffect } from 'react';
import { FcLike } from "react-icons/fc";
import { RiDislikeLine } from "react-icons/ri";
import { toast, ToastContainer } from 'react-toastify'; // Importing toast
import 'react-toastify/dist/ReactToastify.css'; // Importing the CSS for toast
import { likePost, unlikePost, getLikeCount } from '../../Services/api';

const Post = ({ post }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  // Fetch the like count when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token); // Check if the token is available

    if (post?.id) {
      getLikeCount(post.id)
        .then((res) => setLikeCount(res.data.LikeCount))
        .catch((err) => {
          console.error('Error fetching like count:', err);
          toast.error('Failed to load like count'); // Show error toast
        });
    }
  }, [post?.id]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.warn('Please log in to like posts'); // Show warning toast
        console.log('No token found');
        return;
      }

      if (liked) {
        await unlikePost(post.id);
        toast.info('You unliked the post'); // Show info toast
      } else {
        await likePost(post.id);
        toast.success('You liked the post'); // Show success toast
      }

      setLiked(!liked);
      setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
    } catch (error) {
      console.error('Error handling like:', error);
      toast.error('Failed to update like'); // Show error toast
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4 mt-3 max-w-3xl mx-auto ">
      <h3 className="font-semibold text-lg">{post.title}</h3>
      <p>{post.content}</p>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />

      <div className="flex items-center mt-4">
        <button
          onClick={handleLike}
          className={`py-2 px-4 rounded-lg flex items-center ${liked ? 'bg-transparent' : 'bg-transparent'}`}
        >
          {liked ? <FcLike className="mr-4" /> : <RiDislikeLine className="mr-2" />}
          {liked ? 'Liked' : 'Like'}
        </button>
        <span className="ml-2">{likeCount} Likes</span>
      </div>
    </div>
  );
};

export default Post;
