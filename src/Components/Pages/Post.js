import React, { useState, useEffect } from 'react';
import { FcLike } from "react-icons/fc";
import { RiDislikeLine } from "react-icons/ri";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { likePost, unlikePost, getLikeCount } from '../../Services/api';

const Post = ({ post }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  // Fetch the like count and the user's like status when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];

    if (post?.postId) {
      // Check if the user has liked this post before from localStorage
      setLiked(likedPosts.includes(post.postId));

      getLikeCount(post.postId)
        .then((res) => {
          setLikeCount(res.data.LikeCount);
        })
        .catch((err) => {
          console.error('Error fetching like count:', err);
          toast.error('Failed to load like count');
        });
    } else {
      console.error('Post ID is not available');
    }
  }, [post?.postId]);

  const handleLike = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.warn('Please log in to like posts');
      console.log('No token found');
      return;
    }

    if (!post?.postId) {
      toast.error('Invalid post ID');
      console.error('Post ID is undefined');
      return;
    }

    try {
      if (liked) {
        await unlikePost(post.postId);
        toast.info('You unliked the post');

        // Update localStorage to reflect the unliked status
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
        const updatedLikedPosts = likedPosts.filter((id) => id !== post.postId);
        localStorage.setItem('likedPosts', JSON.stringify(updatedLikedPosts));
      } else {
        await likePost(post.postId);
        toast.success('You liked the post');

        // Update localStorage to reflect the liked status
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
        if (!likedPosts.includes(post.postId)) {
          likedPosts.push(post.postId);
          localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
        }
      }

      // Toggle the liked state and fetch the updated like count
      setLiked(!liked);
      getLikeCount(post.postId)
        .then((res) => setLikeCount(res.data.LikeCount))
        .catch((err) => {
          console.error('Error fetching updated like count:', err);
          toast.error('Failed to update like count');
        });
    } catch (error) {
      console.error('Error handling like:', error);
      toast.error('Failed to update like');
    }
  };

  // Handling attachments (assuming they are in the post.attachment array)
  const renderAttachments = () => {
    if (post?.attachments?.length > 0) {
      return (
        <div className="mt-4">
          <h4 className="font-semibold text-lg">Attachments</h4>
          <ul className="list-disc pl-6">
            {post.attachments.map((attachment, index) => (
              <li key={index} className="text-blue-500">
                {attachment?.url ? (
                  <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                    {attachment.name || 'Untitled'}
                  </a>
                ) : (
                  <span>No URL available</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return <p>No attachments available.</p>;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4 mt-3 max-w-3xl mx-auto">
      <h3 className="font-semibold text-lg">{post.title}</h3>
      <p>{post.content}</p>
      
      {renderAttachments()}

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
