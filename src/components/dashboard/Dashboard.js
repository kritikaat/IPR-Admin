import React, { useState, useEffect } from 'react';
import FormCard from './Formcard';
import SearchBar from './SearchBar';
import './Dashboard.css';

const Dashboard = ({ forms }) => {
  const [filteredForms, setFilteredForms] = useState([]);

  useEffect(() => {
    // When forms are received, set them to filteredForms
    setFilteredForms(forms);
  }, [forms]);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredForms(forms); // Reset to all forms if query is empty
      return;
    }

    const filtered = forms.filter((form) =>
      form.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredForms(filtered);
  };

  return (
    <div className="dashboard-container">
      <div className="side-panel">
        <h2>Form Manager</h2>
        <ul>
          <li>Dashboard</li>
          <li>Analytics</li>
          <li>Settings</li>
        </ul>
      </div>

      <div className="main-content">
        <SearchBar onSearch={handleSearch} />
        <div className="form-cards-container">
          {filteredForms.length > 0 ? (
            filteredForms.map((form) => (
              <FormCard key={form.id} form={form} />
            ))
          ) : (
            <p>Loading Forms....</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
