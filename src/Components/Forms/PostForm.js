import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { addPost } from '../../Services/api';
import { TextBox, TextArea, FileUploader } from 'devextreme-react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const PostForm = ({ onPostAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    setAttachments(e.value); // Capture the files uploaded via FileUploader
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    attachments.forEach((file) => {
      formData.append('attachments', file); // Append files to FormData
    });

    setIsSubmitting(true);

    try {
      await addPost(formData);
      toast.success('Post added successfully!');
      setTitle('');
      setContent('');
      setAttachments([]); // Clear the attachments on successful submit
      onPostAdded();
    } catch (error) {
      toast.error('Failed to add post!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setAttachments([]); // Reset the state to clear fields

    // Clear the FileUploader by setting its value to an empty array
    // This effectively clears the files from the uploader
    setAttachments([]);
  };

  return (
    <div className="fixed top-16 right-4 bg-white p-6 rounded-lg shadow-lg w-[600px] max-w-full z-50 h-[80vh] overflow-y-auto">
      <h3 className="font-semibold text-xl text-center mb-6 text-gray-800">Create a New Post</h3>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        <TextBox
          value={title}
          onValueChanged={(e) => setTitle(e.value)}
          placeholder="Post Title"
          className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
        />

        <TextArea
          value={content}
          onValueChanged={(e) => setContent(e.value)}
          placeholder="Post Content"
          rows={6}
          className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
        />

        <div className="flex flex-col space-y-4">
          <FileUploader
            multiple
            value={attachments}  // Bind the value to the state
            onValueChanged={handleFileChange}
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

        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="text-red-400 px-4 py-2 flex items-center space-x-2"
          >
            <FaTimes className="text-lg" />
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-blue-500 px-4 py-2 flex items-center space-x-2"
          >
            <FaCheck className="text-lg" />
            {isSubmitting ? 'Posting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
