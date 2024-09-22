import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Formcard.css'; // Optional CSS for styling

const FormCard = ({ form }) => {

  const navigate = useNavigate();

  const handleOpenForm = () => {
    navigate(`/form/${form.id}`); // Navigates to the form details page
  };

  return (
    <div className="form-card">
      <h3>{form.title}</h3>
      <p>{form.description}</p>
      <button onClick={handleOpenForm} >Open Form</button>
    </div>
  );
};

export default FormCard;
