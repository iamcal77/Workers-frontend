import React from 'react';

const Attachment = ({ attachment }) => {
  if (!attachment) return null;

  // Construct the full URL for the attachment
  const baseUrl = process.env.REACT_APP_API_BASE_URL || 'https://localhost:7050';
  const fullImageUrl = `${baseUrl}${attachment.fileUrl}`;

  return (
    <div className="mt-4 p-4 border border-gray-200 rounded-lg shadow-sm">
      <p className="font-semibold">{attachment.fileName}</p>
      {attachment.fileType.startsWith('image') ? (
        <img
          src={fullImageUrl}
          alt={attachment.fileName}
          className="w-full h-auto max-w-sm mx-auto mt-2 rounded-md shadow-md"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300?text=Image+Not+Found';
          }}
        />
      ) : (
        <a
          href={fullImageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline mt-2 block text-center"
        >
          Download {attachment.fileName}
        </a>
      )}
    </div>
  );
};

export default Attachment;
