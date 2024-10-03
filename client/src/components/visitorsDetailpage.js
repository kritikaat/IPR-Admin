import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import Calendar from './Calendar';
import PublishModal from './PublishModal';
import {  Send, Calendar as CalendarIcon, Users, Search, Filter, Download, Trash2 } from 'lucide-react';

const VisitorDetailsPage = () => {
  const navigate = useNavigate();

  const [selectedDates, setSelectedDates] = useState([]);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [publishedLink, setPublishedLink] = useState('');
  const [combinedData, setCombinedData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [activeTab, setActiveTab] = useState('calendar');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [groupIncharge, setGroupIncharge] = useState([]);
  const [ setVisitorArrivalData] = useState([]);
  const [filteredVisitorArrivalData, setFilteredVisitorArrivalData] = useState([]);
  const [selectedVisitorArrival, setSelectedVisitorArrival] = useState([]);

  // Add the animations back
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  const slideIn = useSpring({
    transform: 'translateY(0)',
    from: { transform: 'translateY(50px)' },
  });

  const processVisitorArrivalData = (data) => {
    if (data && Array.isArray(data.visitorArrival)) {
      return data.visitorArrival
        .filter(item => 
          item.campus && item.ipr_time && item.fcipt_time && 
          item.visit_date && item.visit_time && 
          item.materials 
        )
        .map(item => ({ 
          
          ipr_time: item.ipr_time,
          fcipt_time: item.fcipt_time,
          visit_date: item.visit_date ? new Date(item.visit_date).toLocaleDateString() : 'N/A',
          visit_time: item.visit_time,
          materials: Array.isArray(item.materials) ? item.materials.join(', ') : item.materials,
          campus: Array.isArray(item.labs) ? item.campus.join(', ') : item.campus
        }));
    } else {
      console.warn('Visitor arrival data is missing or not an array');
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/visitors');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        
        // Log the received data for debugging
        console.log('Received data:', data);

        // Check if data exists and has the expected structure
        if (data) {
          // Handle visitors and faculties data
          if (Array.isArray(data.visitors) && Array.isArray(data.faculties)) {
            const combined = data.visitors.map((visitor, index) => ({
              ...visitor,
              num_students: data.faculties[index]?.num_students || 'N/A',
              num_faculty: data.faculties[index]?.num_faculty || 'N/A'
            }));
            setCombinedData(combined);
          } else {
            console.warn('Visitors or faculties data is missing or not an array');
          }

          // Handle group incharge data
          if (Array.isArray(data.groupincharge)) {
            setGroupIncharge(data.groupincharge);
          } else {
            console.warn('Group incharge data is missing or not an array');
          }

          // Handle visitor arrival data
          if (Array.isArray(data.visitorArrival)) {
            const processedData = processVisitorArrivalData(data);
            setVisitorArrivalData(processedData);
            setFilteredVisitorArrivalData(processedData); 
          } else {
            console.warn('Visitor arrival data is missing or not an array');
          }
        } else {
          throw new Error('No data received from the server');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setFetchError(err.message);
      }
    };

    fetchData();
  }, []);

  const handleVisitorArrivalSelection = (id) => {
    setSelectedVisitorArrival(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelectedVisitorArrival = () => {
    setVisitorArrivalData(prev => prev.filter(item => !selectedVisitorArrival.includes(item.id)));
    setSelectedVisitorArrival([]);
  };


  const handleSelectDates = (dates) => {
    setSelectedDates(dates);
  };

  const handlePublish = () => {
    const link = `https://kritikaat.github.io/IPRProject/`;
    setPublishedLink(link);
    setIsPublishModalOpen(true);
  };

  const formatDisplayDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, parseInt(day) + 1);
    return date.toLocaleDateString();
  };

  const filteredData = combinedData.filter(item =>
    item.institution_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.student_branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.num_students.toString().includes(searchTerm) ||
    item.num_faculty.toString().includes(searchTerm)
  );

  const handleItemSelection = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    setCombinedData(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  return (
    <animated.div style={fadeIn} className="container mx-auto px-4 py-8">
      <animated.div style={slideIn}>
        <div className="mb-8 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1  hover:shadow-lg flex items-center"
          >
            Back to Dashboard
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center"
            onClick={handlePublish}
          >
            <Send className="mr-2" size={20} />
            Publish
          </button>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-6">Visitor's Form</h1>
        <p className="text-gray-600 mb-8 text-lg">Manage visitor information and schedule.</p>

        <div className="mb-8 flex space-x-4">
          {['calendar', 'visitors'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 px-4 rounded-md transition duration-200 ease-in-out ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'calendar' ? <CalendarIcon className="inline-block mr-2" size={20} /> : <Users className="inline-block mr-2" size={20} />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          {activeTab === 'calendar' && (
            <div>
              <Calendar onSelectDates={handleSelectDates} selectedDates={selectedDates} />
              {selectedDates.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Selected Dates:</h3>
                  <ul className="space-y-1">
                    {selectedDates.map((date) => (
                      <li key={date} className="flex items-center text-blue-700">
                        <CalendarIcon className="mr-2" size={16} />
                        {formatDisplayDate(date)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'visitors' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Visitor's Data</h2>
              <div className="mb-4 flex space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search visitors..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
                <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition duration-300 ease-in-out">
                  <Filter size={20} />
                </button>
                <button className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition duration-300 ease-in-out">
                  <Download size={20} />
                </button>
                {selectedItems.length > 0 && (
                  <button
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition duration-300 ease-in-out"
                    onClick={handleDeleteSelected}
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>

                
                {fetchError ? (
                  <div className="text-red-600 bg-red-100 p-4 rounded-md shadow">{fetchError}</div>
                ) : (
                  filteredData.length > 0 ? (
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              <input
                                type="checkbox"
                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                checked={selectedItems.length === combinedData.length}
                                onChange={() => {
                                  if (selectedItems.length === combinedData.length) {
                                    setSelectedItems([]);
                                  } else {
                                    setSelectedItems(combinedData.map(item => item.id));
                                  }
                                }}
                              />
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institution Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sem</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Students</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Faculty</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredData.map(item => (
                            <tr key={item.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                  checked={selectedItems.includes(item.id)}
                                  onChange={() => handleItemSelection(item.id)}
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.institution_name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.student_branch}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.student_sem}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.num_students}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.num_faculty}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-gray-600 p-4 rounded-md shadow">No data found.</div>
                  )
                )}  
                
                <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Group Incharge Information</h2>
                
                {fetchError ? (
                  <div className="text-red-600 bg-red-100 p-4 rounded-md shadow">{fetchError}</div>
                ) : (
                  groupIncharge.length > 0 ? (
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {groupIncharge.map(member => (
                            <tr key={member.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.position}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.email}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.mobile}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-gray-600 p-4 rounded-md shadow">No group incharge data found.</div>
                  )
                )}

                <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Visitor Arrival Data</h2>

                <div className="mb-4 flex space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search visitor arrival data..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition duration-300 ease-in-out">
              <Filter size={20} />
            </button>
            <button className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition duration-300 ease-in-out">
              <Download size={20} />
            </button>
            {selectedVisitorArrival.length > 0 && (
              <button
                className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition duration-300 ease-in-out"
                onClick={handleDeleteSelectedVisitorArrival}
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
          
          {fetchError ? (
            <div className="text-red-600 bg-red-100 p-4 rounded-md shadow">{fetchError}</div>
          ) : (
            filteredVisitorArrivalData.length > 0 ? (
              <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input
                          type="checkbox"
                          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={selectedVisitorArrival.length === filteredVisitorArrivalData.length}
                          onChange={() => {
                            if (selectedVisitorArrival.length === filteredVisitorArrivalData.length) {
                              setSelectedVisitorArrival([]);
                            } else {
                              setSelectedVisitorArrival(filteredVisitorArrivalData.map(item => item.id));
                            }
                          }}
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campus</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IPR Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FCIPT Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visit Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visit Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Materials</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredVisitorArrivalData.map(item => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={selectedVisitorArrival.includes(item.id)}
                            onChange={() => handleVisitorArrivalSelection(item.id)}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.campus}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.ipr_time}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.fcipt_time}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.visit_date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.visit_time}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.materials}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-gray-600 p-4 rounded-md shadow">No visitor arrival data found.</div>
            )
          )}  

                </div>
              </div>
              </div>
            )}
        
         
            
          </div>
        </animated.div>

      <PublishModal isOpen={isPublishModalOpen} setIsOpen={setIsPublishModalOpen} link={publishedLink} />
    </animated.div>
  );
};

export default VisitorDetailsPage;