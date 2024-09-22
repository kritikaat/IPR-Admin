import React from 'react';
import './publishmodal.css';

const PublishModal = ({ isOpen, onClose, publishedLink }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Form Published</h2>
        <p>Your form has been published. Share this link with users:</p>
        <input type="text" value={publishedLink} readOnly />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};


export default PublishModal;