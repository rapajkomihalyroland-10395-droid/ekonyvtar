import React from "react";
import Icon from "../../../components/AppIcon";

const BookHeader = ({ book }) => {
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
            {book?.cim}
          </h1>
          <p className="text-lg text-muted-foreground mb-3">
            by {book?.szerzo?.nev}
          </p>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)]?.map((_, index) => (
                <Icon
                  key={index}
                  name={
                    index < Math.floor(Number(book?.csillag_ertekeles || 0))
                      ? "Star"
                      : "Star"
                  }
                  size={18}
                  color={
                    index < Math.floor(Number(book?.csillag_ertekeles || 0))
                      ? "#F59E0B"
                      : "#E5E7EB"
                  }
                  className={
                    index < Math.floor(Number(book?.csillag_ertekeles || 0))
                      ? "fill-current"
                      : ""
                  }
                />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">
              {Number(book?.csillag_ertekeles || 0).toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground">
              ({book?.velemeny?.length || 0} reviews)
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg border border-border">
        <div>
          <p className="text-xs text-muted-foreground mb-1">ISBN</p>
          <p className="text-sm font-medium text-foreground">{book?.ISBN}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Publisher</p>
          <p className="text-sm font-medium text-foreground">
            {book?.kiado?.nev}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Published</p>
          <p className="text-sm font-medium text-foreground">
            {book?.kiadas_ev}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
          {book?.kategoria?.nev}
        </span>
      </div>
    </div>
  );
};

export default BookHeader;
