import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from './Calendar';
import PublishModal from './publishmodal';
import './Formsdetailpage.css';

const FormDetailsPage = () => {
  const { formId } = useParams();
  const navigate = useNavigate(); // Hook to programmatically navigate

  const [selectedDates, setSelectedDates] = useState([]);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [publishedLink, setPublishedLink] = useState('');

  const formDetails = {
    id: formId,
    title: `Form ${formId}`,
    description: `Details for Form ${formId}`,
  };

  const handleSelectDates = (dates) => {
    setSelectedDates(dates);
  };

  const handlePublish = () => {
    const link = `https://kritikaat.github.io/IPRProject/`;
    setPublishedLink(link);
    setIsPublishModalOpen(true);
  };

  const formatDisplayDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, parseInt(day) + 1); // Add 1 to the day
    return date.toLocaleDateString();
  };

  return (
    <div className="form-details-container">
      {/* Flexbox container to align buttons */}
        <button className="back-button" onClick={() => navigate(-1)}>
          Back
        </button>

        <button className="publish-button" onClick={handlePublish}>
          Publish
        </button>
     

      <Calendar 
        onSelectDates={handleSelectDates} 
        selectedDates={selectedDates}
      />

      {selectedDates.length > 0 && (
        <div>
          <h3>Selected Dates:</h3>
          <ul>
            {selectedDates.map((date) => (
              <li key={date}>{formatDisplayDate(date)}</li>
            ))}
          </ul>
        </div>
      )}

      <PublishModal 
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        publishedLink={publishedLink}
      />
    </div>
  );
};

export default FormDetailsPage;
