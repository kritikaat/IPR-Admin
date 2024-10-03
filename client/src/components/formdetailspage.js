import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VisitorDetailsPage from './visitorsDetailpage';
import ExhibitionDetails from './exhibitondetailpage';
import FeedbackDetails from './feedbackdetailspage';
import ScienceDayDetails from './sciencedaydetails';
import { fetchForms } from '../services/api';

const FormDetailsPage = () => {
  const navigate = useNavigate();
  const { formId } = useParams();
  const [formTitle, setFormTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFormDetails = async () => {
      setIsLoading(true);
      try {
        const forms = await fetchForms();
        const form = forms.find(f => f.id === parseInt(formId));
        if (!form) {
          throw new Error('Form not found');
        }
        setFormTitle(form.title);
      } catch (error) {
        console.error('Error fetching form data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getFormDetails();
  }, [formId]);

  const renderFormContent = () => {
    switch (formTitle) {
      case "Visitor's Form":
        return <VisitorDetailsPage />;
      case "Application Form For Science Fair":
        return <ScienceDayDetails />;
      case "Exhibition Form":
        return <ExhibitionDetails />;
      case "Feedback Form":
        return <FeedbackDetails />;
      default:
        return <div className="text-red-500">Unknown form type: {formTitle}</div>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-700 mb-4">{error}</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        >
          Go back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div 
      className=" bg-blue-100 mx-auto px-4 py-8"
      style={{
        animation: 'fadeIn 0.5s ease-in-out',
      }}
    >
      <div 
        className="container mx-auto bg-white shadow-lg rounded-lg p-6 mb-6"
        style={{
          animation: 'slideIn 0.5s ease-in-out',
        }}
      >
        {renderFormContent()}
      </div>
    </div>
  );
};

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const slideInKeyframes = `
  @keyframes slideIn {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

const style = document.createElement('style');
style.textContent = fadeInKeyframes + slideInKeyframes;
document.head.appendChild(style);

export default FormDetailsPage;
