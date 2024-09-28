import React from 'react';

const PublishModal = ({ isOpen, onClose, publishedLink }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded w-80">
        <h2 className="text-lg font-semibold">Form Published</h2>
        <p>Your form has been published. Share this link with users:</p>
        <input 
          type="text" 
          value={publishedLink} 
          readOnly 
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
        <button 
          onClick={onClose} 
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PublishModal;
