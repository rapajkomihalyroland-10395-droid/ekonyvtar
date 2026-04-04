import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book, onRentNow }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCardClick = () => {
    if (!book?.id && book?.id !== 0) return;
    navigate(`/book-details/${book.id}`, { state: { bookId: book.id } });
  };

  const stars = [0, 1, 2, 3, 4];

  return (
    <article className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-card transition-all duration-300 group">
      <div
        className="relative aspect-[3/4] overflow-hidden bg-muted cursor-pointer"
        onClick={handleCardClick}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground animate-pulse"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
        )}

        <img
          src={book?.coverImage || "/assets/images/no_image.png"}
          alt={book?.coverImageAlt || book?.title}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className="p-4 space-y-3">
        <div className="space-y-1 cursor-pointer" onClick={handleCardClick}>
          <h3 className="font-heading font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {book?.title}
          </h3>
          <p className="text-sm text-muted-foreground">{book?.author}</p>
        </div>

        <div className="flex items-center gap-1">
          {stars.map((index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={
                index < Math.floor(book?.rating || 0) ? "#F59E0B" : "#71717a"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={
                index < Math.floor(book?.rating || 0)
                  ? "fill-current text-[#F59E0B]"
                  : "text-muted-foreground"
              }
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
          <span className="text-sm font-medium text-foreground ml-1">
            {(book?.rating ?? 0).toFixed(1)}
          </span>
          <span className="text-xs text-muted-foreground ml-1">
            ({book?.reviewCount ?? 0})
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{book?.publicationYear}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <span>{book?.category}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          {book?.status === "elérhető" ? (
            <button
              onClick={(e) => {
                e?.stopPropagation();
                onRentNow(book);
              }}
              className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3"
            >
              Kölcsönzés
            </button>
          ) : (
            <button
              disabled
              className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
            >
              Nincs elérhető példány a készletben
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default BookCard;
