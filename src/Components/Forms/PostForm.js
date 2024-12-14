import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addPost } from '../../Services/api';

const PostForm = ({ onPostAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting] = useState(false);

  const handleFileChange = (e) => {
    setAttachments([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);        // Appending title
    formData.append('content', content);    // Appending content
    
    attachments.forEach((file) => {
      formData.append('attachments', file); // Appending files
    });
    
    try {
      await addPost(formData); // Use formData here
      toast.success('Post added successfully!');
      setTitle('');
      setContent('');
      setAttachments([]);
      onPostAdded(); // Refresh posts
    } catch (error) {
      console.error('Error adding post:', error);
      toast.error('Failed to add post!');
    }
  };
  
  

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xl bg-white p-8 rounded-lg shadow-lg border border-gray-200">
      <h3 className="font-semibold text-xl text-center mb-6 text-gray-800">Create a New Post</h3>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
        />
        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
          className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
        />
        <div className="flex flex-col space-y-4">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="border border-gray-300 rounded-lg p-2"
          />
          {attachments.length > 0 && (
            <ul className="list-disc pl-5">
              {Array.from(attachments).map((file, index) => (
                <li key={index} className="text-gray-600">{file.name}</li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors duration-300 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
