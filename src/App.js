// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/dashboardpage';
import FormDetailsPage from './components/dashboard/Formsdetailpage';


const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/form/:formId" element={<FormDetailsPage />} />
        <Route path="/" element={<DashboardPage />} />
     
      </Routes>
    </Router>
  );
};

export default App;
