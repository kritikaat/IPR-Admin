import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Send, Filter, Download, Trash2, Search } from 'lucide-react';
import { exportToExcel, exportToCSV } from './exportUtils';

const ExhibitionDetailsPage = () => {
  const navigate = useNavigate();
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExhibitions, setSelectedExhibitions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/exhibition`);
        setExhibitions(response.data);
      } catch (error) {
        setError(`Error fetching data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExhibitionSelection = (id) => {
    setSelectedExhibitions(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelectedExhibitions = () => {
    setExhibitions(prev => prev.filter(item => !selectedExhibitions.includes(item.id)));
    setSelectedExhibitions([]);
  };

  const handleExportExhibitions = (format) => {
    const data = exhibitions.map(ex => ({
      HallDimension: ex.hallDimension,
      EnclosedHall: ex.isEnclosedHall,
      Darkened: ex.canBeDarkened,
      Cooling: ex.hasCooling,
      GroundFloor: ex.isGroundFloor,
      StorageSpace: ex.hasStorageSpace,
      PowerOutlets: ex.powerOutlets,
      NumTables: ex.numTables,
      VRSpace: ex.vrSpace,
      Wifi: ex.hasWifi,
      LectureHallArea: ex.lectureHallArea,
      SeatingCapacity: ex.seatingCapacity,
      AVFacilities: ex.hasAVFacilities,
      DistanceFromExhibition: ex.distanceFromExhibition,
      AccommodationProvided: ex.accommodationProvided,
      LocalTransportation: ex.localTransportation,
      SecureParkingSpace: ex.secureParkingSpace,
      ManpowerForLoading: ex.manpowerForLoading,
      ContactPersonName: ex.contactPersonName,
      ContactPersonMobile: ex.contactPersonMobile,
      ContactPersonEmail: ex.contactPersonEmail,
      VenueLocation: ex.venueLocation,
      TeacherInvitation: ex.teacherInvitation,
      TeacherRegistration: ex.teacherRegistration,
      WritingMaterialsProvided: ex.providesWritingMaterials,
      RefreshmentsProvided: ex.providesRefreshments,
      QuizForStudents: ex.quizForSchoolStudents,
      QuizTeamSelection: ex.quizTeamSelection,
      QuizArrangements: ex.quizArrangements,
      QuizRefreshments: ex.quizRefreshments
    }));

    if (format === 'excel') {
      exportToExcel(data, 'exhibitions');
    } else {
      exportToCSV(data, 'exhibitions');
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

      <h1 className="text-4xl font-bold text-gray-800 mb-6">Exhibition Details</h1>
      <p className="text-gray-600 mb-8 text-lg">Manage exhibition details and records.</p>

      {/* Search and export options */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search exhibitions..."
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
            onClick={() => handleExportExhibitions('excel')}
            className="bg-green-500 text-white p-2 rounded mr-2"
          >
            Export Exhibitions as Excel
          </button>
          <button
            onClick={() => handleExportExhibitions('csv')}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Export Exhibitions as CSV
          </button>

          {selectedExhibitions.length > 0 && (
            <button
              onClick={handleDeleteSelectedExhibitions}
              className="p-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition duration-300"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Exhibition Hall Details */}
      <div className="overflow-x-auto bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hall Dimension
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Enclosed Hall
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Can Be Darkened
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cooling
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ground Floor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Storage Space
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {exhibitions.map(ex => (
              <tr key={ex.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.hallDimension}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.isEnclosedHall}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.canBeDarkened}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.hasCooling}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.isGroundFloor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.hasStorageSpace}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lecture Hall & Seating Capacity */}
      <div className="overflow-x-auto bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lecture Hall Area
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Seating Capacity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                AV Facilities
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Distance From Exhibition
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {exhibitions.map(ex => (
              <tr key={ex.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.lectureHallArea}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.seatingCapacity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.hasAVFacilities ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.distanceFromExhibition} m</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Contact & Logistics */}
      <div className="overflow-x-auto bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact Person Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact Person Mobile
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact Person Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Venue Location
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {exhibitions.map(ex => (
              <tr key={ex.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.contactPersonName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.contactPersonMobile}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.contactPersonEmail}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.venueLocation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Other Exhibition Details */}
      <div className="overflow-x-auto bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teacher Invitation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teacher Registration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Writing Materials Provided
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Refreshments Provided
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {exhibitions.map(ex => (
              <tr key={ex.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.teacherInvitation ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.teacherRegistration ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.providesWritingMaterials ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.providesRefreshments ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quiz Details */}
      <div className="overflow-x-auto bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quiz for School Students
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quiz Team Selection
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quiz Arrangements
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quiz Refreshments
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {exhibitions.map(ex => (
              <tr key={ex.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.quizForSchoolStudents ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.quizTeamSelection ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.quizArrangements}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ex.quizRefreshments ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExhibitionDetailsPage;

