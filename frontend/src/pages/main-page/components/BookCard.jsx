import React from "react";
import Icon from "../../../components/AppIcon";

const BookCard = ({ cim, kep, kategoria, csillagok, szerzo }) => (
  <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
    <div className="aspect-[2/3] relative overflow-hidden bg-muted">
      <img
        src={kep}
        alt={cim}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm flex items-center gap-1">
        <Icon name="Star" size={14} className="text-warning fill-warning" />
        <span className="text-xs font-bold">{csillagok}</span>
      </div>
    </div>
    <div className="p-4">
      <div className="text-xs text-primary font-medium mb-1">{kategoria}</div>
      <h3
        className="font-bold text-foreground line-clamp-1 mb-1"
        title={kategoria}
      >
        {cim}
      </h3>
      <p className="text-sm text-muted-foreground">{szerzo}</p>
    </div>
  </div>
);

export default BookCard;
