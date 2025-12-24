import React from 'react';
import Select from '../../../components/ui/Select';

const SortControls = ({ sortBy, onSortChange }) => {
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'title-asc', label: 'Title (A-Z)' },
    { value: 'title-desc', label: 'Title (Z-A)' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-foreground hidden sm:block">Sort by:</span>
      <Select
        options={sortOptions}
        value={sortBy}
        onChange={onSortChange}
        placeholder="Sort by"
      />
    </div>
  );
};

export default SortControls;