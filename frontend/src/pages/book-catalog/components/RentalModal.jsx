import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RentalModal = ({ book, onClose, onConfirm }) => {
  if (!book) return null;

  const rentalDuration = 14;
  const dueDate = new Date();
  dueDate?.setDate(dueDate?.getDate() + rentalDuration);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-card border border-border rounded-lg shadow-overlay max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Confirm Rental
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-colors duration-200"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex gap-4">
            <div className="w-24 h-32 flex-shrink-0 overflow-hidden rounded-md bg-muted">
              <Image
                src={book?.coverImage}
                alt={book?.coverImageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-heading font-semibold text-foreground">
                {book?.title}
              </h3>
              <p className="text-sm text-muted-foreground">{book?.author}</p>
              <div className="flex items-center gap-1 pt-1">
                {[...Array(5)]?.map((_, index) => (
                  <Icon
                    key={index}
                    name="Star"
                    size={14}
                    className={index < Math.floor(book?.rating) ? 'text-warning fill-warning' : 'text-muted-foreground'}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">
                  {book?.rating?.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-foreground">Rental Terms</h4>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Icon name="Calendar" size={18} className="text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Rental Duration</p>
                  <p className="text-sm text-muted-foreground">{rentalDuration} days</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="CalendarCheck" size={18} className="text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Due Date</p>
                  <p className="text-sm text-muted-foreground">
                    {dueDate?.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="DollarSign" size={18} className="text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Late Fee</p>
                  <p className="text-sm text-muted-foreground">$0.50 per day after due date</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="RotateCcw" size={18} className="text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Renewal</p>
                  <p className="text-sm text-muted-foreground">Can be renewed once if no holds</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex gap-3">
              <Icon name="AlertCircle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-1">Important Notice</p>
                <p className="text-sm text-muted-foreground">
                  Please return or renew the book before the due date to avoid late fees. You will receive email reminders 3 days before the due date.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={() => {
                onConfirm(book);
                onClose();
              }}
              iconName="CheckCircle2"
              iconPosition="left"
              iconSize={18}
              className="flex-1"
            >
              Confirm Rental
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalModal;