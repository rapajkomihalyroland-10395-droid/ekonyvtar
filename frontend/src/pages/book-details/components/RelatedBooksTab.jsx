import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';


const RelatedBooksTab = ({ relatedBooks }) => {
  const navigate = useNavigate();

  const handleBookClick = (bookId) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/book-details', { state: { bookId } });
  };

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-6">
        Students who rented this book also enjoyed these titles
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedBooks?.map((book) => (
          <div
            key={book?.id}
            className="bg-card rounded-lg shadow-card border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleBookClick(book?.id)}
          >
            <div className="aspect-[3/4] overflow-hidden bg-muted">
              <Image
                src={book?.coverImage}
                alt={book?.coverImageAlt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h4 className="font-heading font-semibold text-foreground mb-1 line-clamp-2">
                {book?.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-2">{book?.author}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={14} color="#F59E0B" className="fill-current" />
                  <span className="text-sm font-medium text-foreground">{book?.rating?.toFixed(1)}</span>
                </div>
                <span className={`text-xs font-medium ${book?.available ? 'text-success' : 'text-error'}`}>
                  {book?.available ? 'Available' : 'Checked Out'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedBooksTab;