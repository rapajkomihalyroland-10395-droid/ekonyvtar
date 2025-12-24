import React from 'react';
import Image from '../../../components/AppImage';

const BookCover = ({ book }) => {
  return (
    <div className="w-full lg:w-2/5">
      <div className="sticky top-20">
        <div className="bg-card rounded-lg shadow-card overflow-hidden border border-border">
          <div className="aspect-[3/4] overflow-hidden bg-muted">
            <Image
              src={book?.coverImage}
              alt={book?.coverImageAlt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4 bg-muted/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Availability</span>
              <span className={`text-sm font-semibold ${book?.availableCopies > 0 ? 'text-success' : 'text-error'}`}>
                {book?.availableCopies > 0 ? `${book?.availableCopies} copies available` : 'Currently unavailable'}
              </span>
            </div>
            {book?.availableCopies === 0 && book?.estimatedReturnDate && (
              <p className="text-xs text-muted-foreground">
                Expected return: {new Date(book.estimatedReturnDate)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCover;