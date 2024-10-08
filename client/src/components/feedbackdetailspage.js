import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Send, Filter, Download, Trash2, Search } from 'lucide-react';
import { exportToExcel, exportToCSV } from './exportUtils'; 

const FeedbackDetailsPage = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFeedbacks, setSelectedFeedbacks] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [activeTab, setActiveTab] = useState('feedback');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [feedbackResponse, ratingsResponse] = await Promise.all([
          axios.get(`http://localhost:3000/feedback`),
          axios.get(`http://localhost:3000/ratings`)
        ]);
        setFeedbacks(feedbackResponse.data);
        setRatings(ratingsResponse.data);
      } catch (error) {
        setError(`Error fetching data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const handleFeedbackSelection = (id) => {
    setSelectedFeedbacks(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleRatingSelection = (id) => {
    setSelectedRatings(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelectedFeedbacks = () => {
    setFeedbacks(prev => prev.filter(item => !selectedFeedbacks.includes(item.id)));
    setSelectedFeedbacks([]);
  };

  const handleDeleteSelectedRatings = () => {
    setRatings(prev => prev.filter(item => !selectedRatings.includes(item.id)));
    setSelectedRatings([]);
  };

  const handleExportFeedbacks = (format) => {
    const data = feedbacks.map(f => ({
      Institution: f.institutionName,
      Website: f.website,
      VisitDate: f.visitDate,
      StaffName: f.staffName,
      Email: f.staffEmail,
      Mobile: f.staffMobile,
      Students: f.totalStudents,
      AccompanyingStaff: f.accompanyingStaff,
      Source: f.sources,
      Campuses: f.campuses,
      Best: f.best,
      Worst: f.worst,
      Suggestions: f.suggestions,
      Comments: f.comments
    }));

    if (format === 'excel') {
      exportToExcel(data, 'feedbacks');
    } else {
      exportToCSV(data, 'feedbacks');
    }
  };

  const handleExportRatings = (format) => {
    const data = ratings.map(r => ({
      IPRRating: r.iprRating,
      FCIPTRating: r.fciptRating,
      Knowledge: r.knowledge,
      IPRExplanations: r.explanationsIPR,
      FCIPTExplanations: r.explanationsFCIPT,
      KnowledgeBefore: r.knowledgeBefore,
      KnowledgeAfter: r.knowledgeAfter,
      TechnicalContents: r.technicalContents,
      EaseOfUnderstanding: r.easeOfUnderstanding
    }));

    if (format === 'excel') {
      exportToExcel(data, 'ratings');
    } else {
      exportToCSV(data, 'ratings');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        {error}
      </div>
    </div>
  );

  const TableHeader = ({ headers, selectedItems, items, onSelectAll }) => (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={selectedItems.length === items.length}
            onChange={onSelectAll}
          />
        </th>
        {headers.map(header => (
          <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center"
        >
          Back to Dashboard
        </button>
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mb-6">Feedback and Ratings</h1>
      <p className="text-gray-600 mb-8 text-lg">Manage feedback and rating information.</p>

      {/* Custom Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('feedback')}
              className={`py-4 px-1 relative ${
                activeTab === 'feedback'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              } transition-colors duration-200`}
            >
              Feedback
              <span className={`absolute bottom-0 left-0 w-full h-0.5 transform transition-transform duration-200 ${
                activeTab === 'feedback' ? 'scale-x-100' : 'scale-x-0'
              } bg-blue-600`}></span>
            </button>
            <button
              onClick={() => setActiveTab('ratings')}
              className={`py-4 px-1 relative ${
                activeTab === 'ratings'
                  ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              } transition-colors duration-200`}
            >
              Ratings
              <span className={`absolute bottom-0 left-0 w-full h-0.5 transform transition-transform duration-200 ${
                activeTab === 'ratings' ? 'scale-x-100' : 'scale-x-0'
              } bg-blue-600`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative">
        <div className={`transition-opacity duration-300 ${activeTab === 'feedback' ? 'opacity-100' : 'opacity-0 absolute top-0 left-0 w-full'}`}>
          {activeTab === 'feedback' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search feedback..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                  </div>
                  <button className="p-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition duration-300">
                    <Filter size={20} />
                  </button>
                  <button
                    onClick={() => handleExportFeedbacks('excel')}
                    className="bg-green-500 text-white p-2 rounded mr-2"
                  >
                    Export Feedbacks as Excel
                  </button>
                  <button
                    onClick={() => handleExportFeedbacks('csv')}
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Export Feedbacks as CSV
                  </button>
                 
                  {selectedFeedbacks.length > 0 && (
                    <button
                      onClick={handleDeleteSelectedFeedbacks}
                      className="p-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition duration-300"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              </div>

              <div className="overflow-x-auto bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                <table className="min-w-full divide-y divide-gray-200">
                  <TableHeader
                    headers={['Institution', 'Website', 'Visit Date', 'Staff Name', 'Email', 'Mobile', 'Students',' accompanyingStaff', 'source' , 'campuses', 'best about the campus', 'worst about the campus', 'suggestions', 'comments']}
                    selectedItems={selectedFeedbacks}
                    items={feedbacks}
                    onSelectAll={() => {
                      if (selectedFeedbacks.length === feedbacks.length) {
                        setSelectedFeedbacks([]);
                      } else {
                        setSelectedFeedbacks(feedbacks.map(item => item.id));
                      }
                    }}
                  />
                  <tbody className="bg-white divide-y divide-gray-200">
                    {feedbacks.map((feedback, index) => (
                      <tr 
                        key={index} 
                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors duration-150`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={selectedFeedbacks.includes(feedback.id)}
                            onChange={() => handleFeedbackSelection(feedback.id)}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.institutionName || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.website || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(feedback.visitDate)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.staffName || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.staffEmail || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.staffMobile || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.totalStudents || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.accompanyingStaff || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.sources  || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback. campuses || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.  best  || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.  worst || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.suggestions || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{feedback.comments || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className={`transition-opacity duration-300 ${activeTab === 'ratings' ? 'opacity-100' : 'opacity-0 absolute top-0 left-0 w-full'}`}>
          {activeTab === 'ratings' && (
            <div className="space-y-6">
             <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Ratings..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                  </div>
                  <button className="p-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition duration-300">
                    <Filter size={20} />
                  </button>
                  <button
                    onClick={() => handleExportRatings('excel')}
                    className="bg-green-500 text-white p-2 rounded mr-2"
                  >
                    Export Ratings as Excel
                  </button>
                  <button
                    onClick={() => handleExportRatings('csv')}
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Export Ratings as CSV
                  </button>
                 
                  {selectedFeedbacks.length > 0 && (
                    <button
                      onClick={handleDeleteSelectedFeedbacks}
                      className="p-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition duration-300"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              </div>

              <div className="overflow-x-auto bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                <table className="min-w-full divide-y divide-gray-200">
                  <TableHeader
                    headers={['IPR Rating', 'FCIPT Rating', 'Knowledge', 'IPR Explanations', 'FCIPT Explanations',' knowledgeBefore', ' knowledgeAfter ','technicalContents','  easeOfUnderstanding']}
                    selectedItems={selectedRatings}
                    items={ratings}
                    onSelectAll={() => {
                      if (selectedRatings.length === ratings.length) {
                        setSelectedRatings([]);
                      } else {
                        setSelectedRatings(ratings.map(item => item.id));
                      }
                    }}
                  />
                  <tbody className="bg-white divide-y divide-gray-200">
                    {ratings.map((rating, index) => (
                      <tr 
                        key={index} 
                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors duration-150`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={selectedRatings.includes(rating.id)}
                            onChange={() => handleRatingSelection(rating.id)}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rating.iprRating || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rating.fciptRating || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rating.knowledge || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rating.explanationsIPR || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rating.explanationsFCIPT || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rating.knowledgeBefore || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rating.knowledgeAfter || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rating.technicalContents || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rating.easeOfUnderstanding || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetailsPage;