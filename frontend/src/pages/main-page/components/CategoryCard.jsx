import React from "react";

const CategoryCard = ({ kategoria, elofordulas }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-center justify-center text-center gap-3 hover:shadow-md transition-all duration-300 cursor-pointer group hover:-translate-y-1">
      <div>
        <h3 className="font-bold text-foreground">{kategoria}</h3>
        <p className="text-xs text-muted-foreground mt-1">
          {elofordulas} könyv
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
