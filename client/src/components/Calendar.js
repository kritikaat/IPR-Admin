import React, { useState, useEffect } from 'react';

const Calendar = ({ onSelectDates, selectedDates }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    onSelectDates(selectedDates);
  }, [selectedDates, onSelectDates]);

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(<div key={`empty-${i}`} className="day w-full h-12"></div>);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0]; // This gives you 'YYYY-MM-DD'
      const isSelected = selectedDates.includes(dateString);

      days.push(
        <div
          key={day}
          className={`day w-full h-12 flex items-center justify-center bg-gray-300 cursor-pointer transition duration-300 ease-in-out hover:bg-red-400 ${isSelected ? 'bg-red-300' : ''}`}
          onClick={() => toggleDate(dateString)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const toggleDate = (dateString) => {
    const updatedDates = selectedDates.includes(dateString)
      ? selectedDates.filter(d => d !== dateString)
      : [...selectedDates, dateString];

    onSelectDates(updatedDates);
  };

  return (
    <div>
      <div className="calendar-nav flex justify-between items-center mb-2">
        <button 
          className="py-1 px-2 bg-gray-800 text-white rounded hover:bg-blue-800"
          onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
        >
          Previous
        </button>
        <h2 className="text-lg">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button 
          className="py-1 px-2 bg-gray-800 text-white rounded hover:bg-blue-800"
          onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
        >
          Next
        </button>
      </div>
      <div className="calendar grid grid-cols-7 gap-1 mt-5">
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
