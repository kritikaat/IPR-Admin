import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search forms..."
        value={query}
        onChange={handleInputChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
