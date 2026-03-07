import React, { useState, useRef, useEffect } from 'react';

const SearchBar = ({ onSearch, searchQuery }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const suggestionsRef = useRef(null);

  const suggestions = [
    { type: 'title', text: 'The Great Gatsby', icon: 'BookOpen' },
    { type: 'author', text: 'J.K. Rowling', icon: 'User' },
    { type: 'isbn', text: '978-0-7475-3269-9', icon: 'Hash' },
    { type: 'title', text: 'To Kill a Mockingbird', icon: 'BookOpen' },
    { type: 'author', text: 'George Orwell', icon: 'User' }
  ];

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'BookOpen':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        );
      case 'User':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        );
      case 'Hash':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
            <line x1="4" y1="9" x2="20" y2="9" />
            <line x1="4" y1="15" x2="20" y2="15" />
            <line x1="10" y1="3" x2="8" y2="21" />
            <line x1="16" y1="3" x2="14" y2="21" />
          </svg>
        );
      default:
        return null;
    }
  };

  const filteredSuggestions = localQuery?.length >= 2
    ? suggestions?.filter(s => 
        s?.text?.toLowerCase()?.includes(localQuery?.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef?.current && !suggestionsRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setLocalQuery(value);
    setShowSuggestions(value?.length >= 2);
    onSearch(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setLocalQuery(suggestion?.text);
    onSearch(suggestion?.text);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setLocalQuery('');
    onSearch('');
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full" ref={suggestionsRef}>
      <div className="relative">
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          placeholder="Keresés cím, szerző vagy ISBN alapján..."
          value={localQuery}
          onChange={handleInputChange}
          onFocus={() => localQuery?.length >= 2 && setShowSuggestions(true)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 pr-10"
        />
        {localQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-muted transition-colors duration-200"
            aria-label="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
              <path d="M18 6 6 18" />
              <path d="m6 6 18 18" />
            </svg>
          </button>
        )}
      </div>
      {showSuggestions && filteredSuggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-overlay z-50 max-h-64 overflow-y-auto">
          {filteredSuggestions?.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors duration-200 text-left"
            >
              {getIcon(suggestion?.icon)}
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{suggestion?.text}</p>
                <p className="text-xs text-muted-foreground capitalize">{suggestion?.type}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;