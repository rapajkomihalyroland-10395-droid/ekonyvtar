import React from "react";
import BookCard from "./BookCard";

const BookGrid = ({ books, loading, onAddToCart, onRentNow }) => {
  const loadingCards = [0, 1, 2, 3, 4, 5, 6, 7];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loadingCards.map((index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg overflow-hidden animate-pulse"
          >
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            <path d="m14.5 7-5 5" />
            <path d="m9.5 7 5 5" />
          </svg>
        </div>
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
          Nem találtam könyveket
        </h3>
        <p className="text-muted-foreground text-center max-w-md">
          Nem találtunk olyan könyvet, amely megfelelne a keresési
          feltételeinek. Próbálja meg módosítani a szűrőket vagy a keresési
          kifejezéseket.
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
