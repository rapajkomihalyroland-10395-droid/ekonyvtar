import React, { useState } from 'react';
import { X, Calendar, Clock } from 'lucide-react';

const BookSummaryCard = ({ book, onRemove }) => {
  const [imageError, setImageError] = useState(false);

  const calculateDueDate = (rentalDays) => {
    const dueDate = new Date();
    dueDate?.setDate(dueDate?.getDate() + rentalDays);
    return dueDate?.toLocaleDateString('hu-HU', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="flex gap-4 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow duration-200">
      <div className="flex-shrink-0 w-20 h-28 overflow-hidden rounded-md bg-muted">
        <img
          src={imageError ? "/assets/images/no_image.png" : book?.coverImage}
          alt={book?.coverImageAlt}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-foreground truncate mb-1">
              {book?.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              szerző: {book?.author}
            </p>
          </div>
          <button
            onClick={() => onRemove(book?.id)}
            className="flex-shrink-0 p-1 text-muted-foreground hover:text-destructive transition-colors duration-200"
            aria-label={`Remove ${book?.title} from checkout`}
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar size={14} />
            <span>{book?.rentalDays}Napok</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock size={14} />
            <span>Határidő: {calculateDueDate(book?.rentalDays)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSummaryCard;