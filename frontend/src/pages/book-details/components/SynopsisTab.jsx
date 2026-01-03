import React, { useState } from "react";

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
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 p-0 text-sm font-medium text-primary hover:underline underline-offset-4 bg-transparent border-none cursor-pointer"
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
};

export default SynopsisTab;
