import React from 'react';
import { useNavigate } from 'react-router-dom';

const FormCard = ({ form }) => {
  const navigate = useNavigate();

  const handleOpenForm = () => {
    navigate(`/form/${form.id}`); // Navigates to the form details page
  };

  return (
    <div
      className="flex flex-col justify-between border border-gray-300 bg-white p-5 rounded-lg shadow-md mb-5 transition-transform duration-200 transform hover:-translate-y-1"
    >
      <h3 className="text-lg font-semibold">{form.title}</h3>
      <p className="flex-grow mt-2 mb-4 text-gray-600">{form.description}</p>
      <button
        onClick={handleOpenForm}
        className="self-end bg-blue-800 text-white border-none px-4 py-2 rounded-md text-base transition-colors duration-300 hover:bg-blue-700"
      >
        Open Form
      </button>
    </div>
  );
};

export default FormCard;
