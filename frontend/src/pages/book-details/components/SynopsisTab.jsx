import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

const SynopsisTab = ({ synopsis }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 500;
  const shouldTruncate = synopsis?.length > maxLength;

  return (
    <div className="prose prose-sm max-w-none">
      <p className="text-foreground leading-relaxed whitespace-pre-line">
        {shouldTruncate && !isExpanded
          ? `${synopsis?.substring(0, maxLength)}...`
          : synopsis}
      </p>
      {shouldTruncate && (
        <Button
          variant="link"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 p-0"
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </Button>
      )}
    </div>
  );
};

export default SynopsisTab;