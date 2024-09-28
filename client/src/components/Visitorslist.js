import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VisitorsList = () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    // Fetch the visitors data from the backend
    axios.get('http://localhost:5000/visitors')
      .then((response) => {
        setVisitors(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the visitors data!', error);
      });
  }, []);

  return (
    <div className="visitors-list">
      <h2>Visitor's List</h2>
      <ul>
        {visitors.length > 0 ? (
          visitors.map((visitor, index) => (
            <li key={index}>
              Name: {visitor.name}, Email: {visitor.email}, Visit Date: {new Date(visitor.visitDate).toLocaleDateString()}
            </li>
          ))
        ) : (
          <li>No visitors found.</li>
        )}
      </ul>
    </div>
  );
};

export default VisitorsList;
