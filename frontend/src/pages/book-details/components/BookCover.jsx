import React from "react";

const BookCover = ({ book }) => {
  return (
    <div className="w-full lg:w-2/5">
      <div className="sticky top-20">
        <div className="bg-card rounded-lg shadow-card overflow-hidden border border-border">
          <div className="aspect-[3/4] overflow-hidden bg-muted">
            <img
              src={book?.kep}
              alt={book?.cim}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = "/assets/images/no_image.png";
              }}
            />
          </div>
          <div className="p-4 bg-muted/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Availability
              </span>
              <span
                className={`text-sm font-semibold ${
                  book?.keszlet > 0 ? "text-success" : "text-error"
                }`}
              >
                {book?.keszlet > 0
                  ? `${book?.keszlet} copies available`
                  : "Currently unavailable"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCover;
