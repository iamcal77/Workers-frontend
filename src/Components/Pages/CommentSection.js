import React, { useState, useEffect } from 'react';
import { getComments, addComment } from '../../Services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getAuthToken = () => localStorage.getItem('token');

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);

  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      return;
    }

    getComments(postId, token)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.error('Error fetching comments:', err);
      });
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      return;
    }

    const token = getAuthToken();

    if (!token) {
      return;
    }

    try {
      await addComment(postId, commentText, token);
      setCommentText('');
      getComments(postId, token)
        .then((res) => {
          setComments(res.data);
          toast.success('Comment added successfully!');
        })
        .catch((err) => {
          console.error('Error refetching comments:', err);
        });
    } catch (error) {
      console.error('Error posting comment:', error);
      toast.error('Failed to post comment!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-2xl text-gray-800">Comments</h4>
        <button
          onClick={() => setIsCommenting(!isCommenting)}
          className="text-green-500 hover:text-green-600 transition-colors duration-300"
        >
          {isCommenting ? 'Cancel' : 'Add Comment'}
        </button>
      </div>
  
      {isCommenting && (
        <div className="mt-4">
          <form onSubmit={handleCommentSubmit} className="flex flex-col space-y-4">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows="4"
            />
            <button
              type="submit"
              className="self-start px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors duration-300"
            >
              Add Comment
            </button>
          </form>
        </div>
      )}
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
  
      {/* Scrollable container for comments */}
      <div
        className="mt-6 space-y-4 overflow-y-auto"
        style={{ maxHeight: '300px' }} // Set the desired height for scrollability
      >
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="flex space-x-4 items-start bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <img
                src={comment.userAvatar || 'https://i.pinimg.com/474x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg'}
                alt={`${comment.userName}'s avatar`}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h5 className="font-medium text-gray-800">{comment.userId}</h5>
                  <span className="text-sm text-gray-500">{comment.timestamp}</span>
                </div>
                <p className="text-gray-700 mt-2">{comment.content}</p>
                <div className="mt-2 flex space-x-4 text-sm text-gray-500">
                  <button className="hover:text-green-500">Reply</button>
                  <button className="hover:text-green-500">Like</button>
                  <button className="hover:text-red-500">Report</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
  
};

export default CommentSection;
