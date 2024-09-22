import React, { useState } from 'react';
import Calendar from './Calendar';

const VisitorsForm = () => {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleSelectDates = (dates) => {
    setSelectedDates(dates);
    console.log('Selected dates:', dates); // You can handle dates further, e.g., save or display them
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted with dates:', selectedDates);
  };

  return (
    <div>
      <h1>Visitors Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Other form fields here */}
        <Calendar onSelectDates={handleSelectDates} />
        <button type="submit">Submit</button>
      </form>
      {selectedDates.length > 0 && (
        <div>
          <h2>Selected Dates:</h2>
          <ul>
            {selectedDates.map((date) => (
              <li key={date}>{new Date(date).toLocaleDateString()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VisitorsForm;
