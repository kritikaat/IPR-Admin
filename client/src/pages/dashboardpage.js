// DashboardPage.js
import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import { fetchForms } from '../services/api';

const DashboardPage = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const getForms = async () => {
      const data = await fetchForms(); // Fetch dummy forms data
      setForms(data);
    };
    getForms();
  }, []);

  return (
    <div>
      <Dashboard forms={forms} />
    </div>
  );
};

export default DashboardPage;
