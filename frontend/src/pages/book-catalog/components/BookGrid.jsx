import React from 'react';
import BookCard from './BookCard';
import Icon from '../../../components/AppIcon';

const BookGrid = ({ books, loading, onAddToCart, onRentNow }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)]?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
            <div className="aspect-[3/4] bg-muted" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
              <div className="h-3 bg-muted rounded w-full" />
              <div className="flex gap-2">
                <div className="h-8 bg-muted rounded flex-1" />
                <div className="h-8 bg-muted rounded flex-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (books?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="BookX" size={40} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
          No Books Found
        </h3>
        <p className="text-muted-foreground text-center max-w-md">
          We couldn't find any books matching your search criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books?.map((book) => (
        <BookCard
          key={book?.id}
          book={book}
          onAddToCart={onAddToCart}
          onRentNow={onRentNow}
        />
      ))}
    </div>
  );
};

export default BookGrid;