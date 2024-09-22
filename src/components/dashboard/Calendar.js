import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = ({ onSelectDates, selectedDates }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    onSelectDates(selectedDates);
  }, [selectedDates, onSelectDates]);

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month , 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0]; // This gives you 'YYYY-MM-DD'
      const isSelected = selectedDates.includes(dateString);
    
      days.push(
        <div
          key={day}
          className={`day ${isSelected ? 'selected' : ''}`}
          onClick={() => toggleDate(dateString)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const toggleDate = (dateString) => {
    const updatedDates = selectedDates.includes(dateString )
      ? selectedDates.filter(d => d !== dateString)
      : [...selectedDates, dateString];
    
    onSelectDates(updatedDates);
  };
  
  return (
    <div>
      <div className="calendar-nav">
        <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>
          Previous
        </button>
        <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>
          Next
        </button>
      </div>
      <div className="calendar">{renderCalendar()}</div>
    </div>
  );
};

export default Calendar;