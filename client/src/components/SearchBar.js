import React, { useState } from 'react';

const SearchBar = ({ onSearch, className }) => {
  const [query, setQuery] = useState(''); // State to store the input value

  const handleInputChange = (e) => {
    setQuery(e.target.value); // Update the input value
    onSearch(e.target.value); // Trigger the search function
  };

  return (
    <input
      type="text"
      value={query} // Bind the value to the state
      onChange={handleInputChange} // Handle input changes
      placeholder="Search..."
      className={`block w-full p-3 border border-gray-300 rounded-lg shadow-sm ${className}`}
    />
  );
};

export default SearchBar;
