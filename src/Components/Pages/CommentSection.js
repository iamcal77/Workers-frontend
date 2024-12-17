import React, { useState, useEffect } from 'react';
import { getComments, addComment } from '../../Services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getAuthToken = () => localStorage.getItem('token');

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  const [showComments, setShowComments] = useState(false); // New state to toggle comments visibility

  useEffect(() => {
    if (!postId) {
      toast.error('Invalid post ID');
      return;
    }

    const token = getAuthToken();
    if (!token) {
      toast.warn('Please log in to see comments.');
      return;
    }

    // Fetch comments
    getComments(postId, token)
      .then((res) => setComments(res.data))
      .catch(() => toast.error('Failed to load comments'));
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      toast.warn('Comment cannot be empty!');
      return;
    }

    const token = getAuthToken();
    if (!token) {
      toast.warn('Please log in to post a comment');
      return;
    }

    if (!postId) {
      toast.error('Invalid post ID');
      return;
    }

    try {
      // Add the comment
      await addComment(postId, commentText, token);
      setCommentText('');

      // Refetch comments after posting a new one
      getComments(postId, token)
        .then((res) => {
          setComments(res.data);
          toast.success('Comment added successfully!');
        })
        .catch(() => toast.error('Error refetching comments'));
    } catch {
      toast.error('Failed to post comment!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-2xl text-gray-800">Comments</h4>
        <button
          onClick={() => setShowComments(!showComments)} // Toggle comments visibility
          className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
        >
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </button>
      </div>

      {showComments && ( // Render comments only if showComments is true
        <div>
          <div className="mt-4">
            <button
              onClick={() => setIsCommenting(!isCommenting)} // Toggle comment form visibility
              className="text-green-500 hover:text-green-600 transition-colors duration-300"
            >
              {isCommenting ? 'Cancel' : 'Add Comment'}
            </button>

            {isCommenting && (
              <form onSubmit={handleCommentSubmit} className="flex flex-col space-y-4 mt-4">
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
            )}
          </div>

          <div className="mt-6 space-y-4 overflow-y-auto" style={{ maxHeight: '300px' }}>
            {comments.length === 0 ? (
              <p className="text-gray-500">No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((comment) => {
                const isCurrentUser = comment.userId === localStorage.getItem('userId'); // Check if comment is by the logged-in user
                return (
                  <div
                    key={comment.id}
                    className={`flex items-start space-x-4 ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
                  >
                    {!isCurrentUser && (
                      <img
                        src={comment.userAvatar || 'https://i.pinimg.com/474x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg'}
                        alt={`${comment.userName}'s avatar`}
                        className="w-10 h-10 rounded-full"
                      />
                    )}

                    <div
                      className={`max-w-xs p-3 rounded-lg shadow-sm ${
                        isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h5 className="font-medium text-sm text-gray-900">{comment.userName}</h5>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm mt-2">{comment.content}</p>
                    </div>

                    {isCurrentUser && (
                      <img
                        src={comment.userAvatar || 'https://i.pinimg.com/474x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg'}
                        alt={`${comment.userName}'s avatar`}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
