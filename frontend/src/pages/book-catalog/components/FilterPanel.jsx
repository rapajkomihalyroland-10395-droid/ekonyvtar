import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isOpen, 
  onClose,
  resultCount 
}) => {
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'fiction', label: 'Fiction' },
    { value: 'non-fiction', label: 'Non-Fiction' },
    { value: 'science', label: 'Science' },
    { value: 'history', label: 'History' },
    { value: 'biography', label: 'Biography' },
    { value: 'technology', label: 'Technology' }
  ];

  const genres = [
    { value: 'adventure', label: 'Adventure' },
    { value: 'mystery', label: 'Mystery' },
    { value: 'romance', label: 'Romance' },
    { value: 'thriller', label: 'Thriller' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'sci-fi', label: 'Science Fiction' }
  ];

  const publicationYears = [
    { value: 'all', label: 'All Years' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: 'older', label: 'Before 2020' }
  ];

  const handleAvailabilityChange = (status, checked) => {
    const newAvailability = checked
      ? [...filters?.availability, status]
      : filters?.availability?.filter(s => s !== status);
    onFilterChange('availability', newAvailability);
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed lg:static top-16 right-0 bottom-0 w-80 bg-card border-l lg:border-l-0 lg:border-r border-border shadow-overlay lg:shadow-none z-40 transform transition-transform duration-300 lg:transform-none overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
        aria-label="Book filters"
      >
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between lg:hidden z-10">
          <h2 className="text-lg font-heading font-semibold text-foreground">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-colors duration-200"
            aria-label="Close filters"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">
              {resultCount} {resultCount === 1 ? 'Book' : 'Books'} Found
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="RotateCcw"
              iconSize={16}
            >
              Clear
            </Button>
          </div>

          <div className="space-y-4">
            <Select
              label="Category"
              options={categories}
              value={filters?.category}
              onChange={(value) => onFilterChange('category', value)}
              placeholder="Select category"
            />

            <Select
              label="Genre"
              options={genres}
              value={filters?.genre}
              onChange={(value) => onFilterChange('genre', value)}
              placeholder="Select genre"
              searchable
            />

            <Select
              label="Publication Year"
              options={publicationYears}
              value={filters?.year}
              onChange={(value) => onFilterChange('year', value)}
              placeholder="Select year"
            />

            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Availability Status
              </label>
              <div className="space-y-2">
                <Checkbox
                  label="Available"
                  checked={filters?.availability?.includes('available')}
                  onChange={(e) => handleAvailabilityChange('available', e?.target?.checked)}
                />
                <Checkbox
                  label="Checked Out"
                  checked={filters?.availability?.includes('checked-out')}
                  onChange={(e) => handleAvailabilityChange('checked-out', e?.target?.checked)}
                />
                <Checkbox
                  label="Reserved"
                  checked={filters?.availability?.includes('reserved')}
                  onChange={(e) => handleAvailabilityChange('reserved', e?.target?.checked)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Minimum Rating
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="0"
                  max="5"
                  step="0.5"
                  value={filters?.minRating}
                  onChange={(e) => onFilterChange('minRating', e?.target?.value)}
                  placeholder="0.0"
                />
                <span className="text-sm text-muted-foreground">/ 5.0</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterPanel;