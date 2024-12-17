// Post.js
import React, { useState, useEffect } from 'react';
import { FcLike } from "react-icons/fc";
import { RiDislikeLine } from "react-icons/ri";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { likePost, unlikePost, getLikeCount } from '../../Services/api';
import Attachment from './Attachment';  // Import the Attachment component

const Post = ({ post }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    if (post?.postId) {
      setLiked(likedPosts.includes(post.postId));
      getLikeCount(post.postId)
        .then(res => res?.likeCount !== undefined ? setLikeCount(res.likeCount) : toast.error('Failed to load like count'))
        .catch(() => toast.error('Failed to load like count'));
    }
  }, [post?.postId]);

  const handleLike = async () => {
    const token = localStorage.getItem('token');
    if (!token || !post?.postId) return toast.warn('Please log in to like posts');

    try {
      const action = liked ? unlikePost : likePost;
      const successMessage = liked ? 'You unliked the post' : 'You liked the post';
      await action(post.postId);
      toast.success(successMessage);

      const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
      const updatedLikedPosts = liked ? likedPosts.filter(id => id !== post.postId) : [...likedPosts, post.postId];
      localStorage.setItem('likedPosts', JSON.stringify(updatedLikedPosts));

      setLiked(!liked);

      const { likeCount } = await getLikeCount(post.postId);
      setLikeCount(likeCount ?? 0);
    } catch (error) {
      toast.error('Failed to update like');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4 mt-3 max-w-3xl mx-auto">
      <h3 className="font-semibold text-lg">{post.title}</h3>
      <p>{post.content}</p>

      {/* Render Attachments */}
      {post.attachments && post.attachments.values && Array.isArray(post.attachments.values) && post.attachments.values.map((attachment) => (
        <Attachment key={attachment.attachmentId} attachment={attachment} />
      ))}

      <div className="flex items-center mt-4">
        <button onClick={handleLike} className="py-2 px-4 rounded-lg flex items-center">
          {liked ? <FcLike className="mr-4" /> : <RiDislikeLine className="mr-2" />}
          {liked ? 'Liked' : 'Like'}
        </button>
        <span className="ml-2">{likeCount} Likes</span>
      </div>
    </div>
  );
};

export default Post;
