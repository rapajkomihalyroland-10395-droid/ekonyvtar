import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

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
        <Icon 
          name="Search" 
          size={20} 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
        <Input
          type="search"
          placeholder="Search by title, author, or ISBN..."
          value={localQuery}
          onChange={handleInputChange}
          onFocus={() => localQuery?.length >= 2 && setShowSuggestions(true)}
          className="pl-10 pr-10"
        />
        {localQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-muted transition-colors duration-200"
            aria-label="Clear search"
          >
            <Icon name="X" size={16} className="text-muted-foreground" />
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
              <Icon name={suggestion?.icon} size={18} className="text-muted-foreground" />
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