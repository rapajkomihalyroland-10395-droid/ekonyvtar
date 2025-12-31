import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendedBookCard = ({ book }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col h-full">
      <div 
        className="w-full h-48 overflow-hidden cursor-pointer"
        onClick={() => navigate('/book-details')}
      >
        <Image
          src={book?.cover}
          alt={book?.coverAlt}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <h4 
            className="text-base font-semibold text-foreground mb-1 cursor-pointer hover:text-primary transition-colors duration-200 line-clamp-2"
            onClick={() => navigate('/book-details')}
          >
            {book?.title}
          </h4>
          <p className="text-sm text-muted-foreground mb-2">{book?.author}</p>

          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1">
              <Icon name="Star" size={14} color="var(--color-warning)" className="fill-current" />
              <span className="text-sm font-medium text-foreground">{book?.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">{book?.category}</span>
          </div>

          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{book?.reason}</p>
        </div>

        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="BookOpen"
          iconPosition="left"
          onClick={() => navigate('/book-details')}
        >
          Részletek
        </Button>
      </div>
    </div>
  );
};

export default RecommendedBookCard;