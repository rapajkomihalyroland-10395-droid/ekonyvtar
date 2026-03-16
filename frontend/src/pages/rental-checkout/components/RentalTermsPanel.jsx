import React, { useState } from 'react';
import { BookOpen, RefreshCw, DollarSign, CornerUpLeft, FileText, ChevronUp, ChevronDown, Info } from 'lucide-react';

const RentalTermsPanel = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const termsData = [
    {
      id: 'borrowing',
      title: 'Borrowing Policies',
      Icon: BookOpen,
      content: `Students may borrow up to 5 books simultaneously for a standard period of 14 days. Books must be returned by the due date to avoid late fees. Digital access is provided immediately upon checkout confirmation for eligible titles.`
    },
    {
      id: 'renewal',
      title: 'Renewal Options',
      Icon: RefreshCw,
      content: `Books may be renewed up to 2 times if no other student has placed a hold. Renewal requests must be submitted at least 2 days before the due date. Each renewal extends the borrowing period by 14 days.`
    },
    {
      id: 'fees',
      title: 'Late Fee Structure',
      Icon: DollarSign,
      content: `Late fees are charged at $0.25 per day per book. Maximum late fee per book is capped at $10.00. Fees must be paid before checking out additional books. Payment can be made online or at the library desk.`
    },
    {
      id: 'return',
      title: 'Return Procedures',
      Icon: CornerUpLeft,
      content: `Books can be returned to the library circulation desk during operating hours or placed in the 24-hour book drop. Digital confirmations are sent upon successful return. Damaged books may incur replacement fees.`
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Rental Terms & Policies</h2>
      </div>
      <div className="space-y-3">
        {termsData?.map((term) => (
          <div key={term?.id} className="border border-border rounded-md overflow-hidden">
            <button
              onClick={() => toggleSection(term?.id)}
              className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors duration-200"
              aria-expanded={expandedSection === term?.id}
            >
              <div className="flex items-center gap-3">
                <term.Icon size={18} className="text-primary" />
                <span className="font-medium text-foreground text-left">{term?.title}</span>
              </div>
              {expandedSection === term?.id ? (
                <ChevronUp size={18} className="text-muted-foreground" />
              ) : (
                <ChevronDown size={18} className="text-muted-foreground" />
              )}
            </button>
            
            {expandedSection === term?.id && (
              <div className="p-4 bg-card border-t border-border">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {term?.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-md">
        <p className="text-xs text-foreground">
          <Info size={14} className="inline mr-1" />
          A fizetési folyamat folytatásával Ön elfogadja a fentiekben ismertetett összes bérleti feltételt és szabályzatot.
        </p>
      </div>
    </div>
  );
};

export default RentalTermsPanel;