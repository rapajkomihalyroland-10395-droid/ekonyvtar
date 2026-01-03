import React from 'react';
import { BookMarked, Calendar, Clock, AlertCircle } from 'lucide-react';

const RentalSummary = ({ books }) => {
  const calculateTotalDuration = () => {
    if (books?.length === 0) return 0;
    return Math.max(...books?.map(book => book?.rentalDays));
  };

  const calculateEarliestDueDate = () => {
    if (books?.length === 0) return 'N/A';
    const minDays = Math.min(...books?.map(book => book?.rentalDays));
    const dueDate = new Date();
    dueDate?.setDate(dueDate?.getDate() + minDays);
    return dueDate?.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const summaryItems = [
    {
      Icon: BookMarked,
      label: 'Total Books',
      value: books?.length?.toString(),
      color: 'text-primary'
    },
    {
      Icon: Calendar,
      label: 'Maximum Rental Period',
      value: `${calculateTotalDuration()} days`,
      color: 'text-accent'
    },
    {
      Icon: Clock,
      label: 'Earliest Due Date',
      value: calculateEarliestDueDate(),
      color: 'text-warning'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Rental Summary</h2>
      <div className="space-y-4">
        {summaryItems?.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-card rounded-lg flex items-center justify-center">
              <item.Icon size={20} className={item.color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground mb-1">{item?.label}</p>
              <p className="text-base font-semibold text-foreground break-words">
                {item?.value}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-start gap-2 p-3 bg-warning/10 border border-warning/20 rounded-md">
          <AlertCircle size={16} className="text-warning flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground mb-1">Late Fee Policy</p>
            <p className="text-xs text-muted-foreground">
              $0.25 per day per book (max $10.00 per book). Please return books on time to avoid charges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalSummary;