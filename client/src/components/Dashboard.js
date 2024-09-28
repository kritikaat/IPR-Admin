import React, { useState, useEffect } from 'react';
import FormCard from './Formcard';
import SearchBar from './SearchBar';

const Dashboard = ({ forms }) => {
  const [filteredForms, setFilteredForms] = useState([]);
  const [activeTab, setActiveTab] = useState('Forms');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setFilteredForms(forms);
    setIsLoading(false);
  }, [forms]);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredForms(forms);
      return;
    }
    const filtered = forms.filter((form) =>
      form.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredForms(filtered);
  };

  const tabs = ['Forms', 'Analytics'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Forms':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredForms.map((form) => (
              <FormCard key={form.id} form={form} />
            ))}
          </div>
        );
      case 'Analytics':
        return <h2 className="text-2xl font-bold text-gray-800">Analytics Coming Soon</h2>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Form Manager</h1>
          <ul className="space-y-2">
            {tabs.map((tab) => (
              <li 
                key={tab} 
                className={`py-2 px-4 rounded-md cursor-pointer transition-colors duration-200 ${
                  activeTab === tab ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">{activeTab}</h2>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
              Admin Profile
            </button>
          </div>

          <div className="mb-6">
            <SearchBar onSearch={handleSearch} className="w-full max-w-md" />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;