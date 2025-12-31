import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ActionPanel = ({ book }) => {
  const navigate = useNavigate();
  const [rentalDuration, setRentalDuration] = useState('14');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const rentalOptions = [
    { value: '7', label: '7 days' },
    { value: '14', label: '14 days (Recommended)' },
    { value: '21', label: '21 days' },
    { value: '30', label: '30 days' }
  ];

  const calculateDueDate = (days) => {
    const date = new Date();
    date?.setDate(date?.getDate() + parseInt(days));
    return date?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const handleRentBook = () => {
    navigate('/rental-checkout', { state: { book, rentalDuration } });
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="bg-card rounded-lg shadow-card border border-border p-6 sticky top-20">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Rental Options</h3>
      <div className="mb-4">
        <Select
          label="Rental Duration"
          options={rentalOptions}
          value={rentalDuration}
          onChange={setRentalDuration}
          className="mb-2"
        />
        <p className="text-sm text-muted-foreground">
          Due date: {calculateDueDate(rentalDuration)}
        </p>
      </div>
      <Button
        variant="default"
        size="lg"
        fullWidth
        iconName="ShoppingCart"
        iconPosition="left"
        onClick={handleRentBook}
        disabled={book?.keszlet === 0}
        className="mb-3"
      >
        {book?.keszlet > 0 ? 'Rent This Book' : 'Currently Unavailable'}
      </Button>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <Button
          variant="outline"
          size="default"
          iconName={isWishlisted ? 'Heart' : 'Heart'}
          iconPosition="left"
          onClick={toggleWishlist}
          className={isWishlisted ? 'text-error border-error' : ''}
        >
          {isWishlisted ? 'Wishlisted' : 'Wishlist'}
        </Button>
        <Button
          variant="outline"
          size="default"
          iconName={isFavorited ? 'Star' : 'Star'}
          iconPosition="left"
          onClick={toggleFavorite}
          className={isFavorited ? 'text-warning border-warning' : ''}
        >
          {isFavorited ? 'Favorited' : 'Favorite'}
        </Button>
      </div>
      <div className="border-t border-border pt-4">
        <p className="text-xs text-muted-foreground mb-2">Share this book</p>
        <div className="flex gap-2">
          <button className="p-2 rounded-md hover:bg-muted transition-colors" aria-label="Share on Facebook">
            <Icon name="Facebook" size={20} color="var(--color-muted-foreground)" />
          </button>
          <button className="p-2 rounded-md hover:bg-muted transition-colors" aria-label="Share on Twitter">
            <Icon name="Twitter" size={20} color="var(--color-muted-foreground)" />
          </button>
          <button className="p-2 rounded-md hover:bg-muted transition-colors" aria-label="Share via Email">
            <Icon name="Mail" size={20} color="var(--color-muted-foreground)" />
          </button>
          <button className="p-2 rounded-md hover:bg-muted transition-colors" aria-label="Copy Link">
            <Icon name="Link" size={20} color="var(--color-muted-foreground)" />
          </button>
        </div>
      </div>
      <div className="mt-4 p-3 bg-muted/30 rounded-md">
        <div className="flex items-start gap-2">
          <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            Late returns incur a fine of $0.50 per day. Maximum rental period is 30 days with one renewal allowed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActionPanel;