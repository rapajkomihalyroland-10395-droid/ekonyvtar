import React, { useState, useRef, useEffect } from 'react';

const SearchBar = ({ onSearch, searchQuery }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setLocalQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setLocalQuery('');
    onSearch('');
  };

  return (
    <div className="relative w-full group">
      <div className="relative">
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 pointer-events-none group-focus-within:text-primary transition-colors duration-200"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          placeholder="Keresés..."
          value={localQuery}
          onChange={handleInputChange}
          className="flex h-11 w-full rounded-full border border-border bg-muted/30 px-3 py-2 text-sm transition-all duration-200 placeholder:text-muted-foreground/50 focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none pl-10 pr-10"
        />
        {localQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-muted text-muted-foreground/60 hover:text-foreground transition-all duration-200"
            aria-label="Keresés törlése"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;