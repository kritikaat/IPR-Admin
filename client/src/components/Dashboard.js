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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredForms.map((form, index) => (
              <div key={form.id} className="animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <FormCard form={form} />
              </div>
            ))}
          </div>
        );
      case 'Analytics':
        return <h2 className="text-2xl font-bold animate-fade-in">Analytics Coming Soon</h2>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 transition-all duration-300">
    

      <div className="flex flex-1 overflow-hidden">
        <nav className="w-64 bg-blue-800 text-white p-6 transition-all duration-300">
          <ul className="space-y-2">
            {tabs.map((tab) => (
              <li 
                key={tab} 
                className={`py-2 px-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  activeTab === tab ? 'bg-blue-600 shadow-lg' : 'hover:bg-blue-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </nav>

        <main className="flex-1 p-8 overflow-auto transition-all duration-300">
          <div className="mb-8 max-w-2xl mx-auto animate-fade-in">
            <SearchBar onSearch={handleSearch} className="w-full transition-all duration-300 focus:ring-2 focus:ring-blue-500" />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            renderContent()
          )}
        </main>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;