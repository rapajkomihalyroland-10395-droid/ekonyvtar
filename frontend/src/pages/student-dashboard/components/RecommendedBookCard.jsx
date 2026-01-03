import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, BookOpen } from 'lucide-react';

const RecommendedBookCard = ({ book }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col h-full">
      <div 
        className="w-full h-48 overflow-hidden cursor-pointer"
        onClick={() => navigate(`/book-details/${book?.id}`)}
      >
        <img
          src={book?.cover}
          alt={book?.coverAlt}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            e.target.src = '/assets/images/no_image.png';
          }}
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <h4 
            className="text-base font-semibold text-foreground mb-1 cursor-pointer hover:text-primary transition-colors duration-200 line-clamp-2"
            onClick={() => navigate(`/book-details/${book?.id}`)}
          >
            {book?.title}
          </h4>
          <p className="text-sm text-muted-foreground mb-2">{book?.author}</p>

          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1">
              <Star size={14} className="text-warning fill-current" />
              <span className="text-sm font-medium text-foreground">{book?.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">{book?.category}</span>
          </div>

          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{book?.reason}</p>
        </div>

        <button
          onClick={() => navigate(`/book-details/${book?.id}`)}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 w-full gap-2"
        >
          <BookOpen size={16} />
          Részletek
        </button>
      </div>
    </div>
  );
};

export default RecommendedBookCard;