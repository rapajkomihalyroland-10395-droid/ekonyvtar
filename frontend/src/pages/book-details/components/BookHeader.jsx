import React from "react";

const BookHeader = ({ book }) => {
  const stars = [0, 1, 2, 3, 4];

  return (
    <div className="mb-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
            {book?.cim}
          </h1>
          <p className="text-lg text-muted-foreground mb-3">
            Szerző: {book?.szerzo?.nev}
          </p>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {stars.map((index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={
                    index < Math.floor(Number(book?.csillag_ertekeles || 0))
                      ? "#F59E0B"
                      : "#E5E7EB"
                  }
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={
                    index < Math.floor(Number(book?.csillag_ertekeles || 0))
                      ? "fill-current text-[#F59E0B]"
                      : "text-[#E5E7EB]"
                  }
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">
              {Number(book?.csillag_ertekeles || 0).toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground">
              ({book?.velemeny?.length || 0} vélemény)
            </span>
          </div>
        </div>
      </div>

      {/* Adatok szekció - Javított elrendezés */}
      <div className="grid grid-cols-2 lg:flex lg:flex-wrap lg:gap-x-12 gap-y-4 p-5 bg-muted/30 rounded-lg border border-border">
        <div className="min-w-fit">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
            ISBN
          </p>
          <p className="text-sm md:text-base font-semibold text-foreground whitespace-nowrap">
            {book?.ISBN}
          </p>
        </div>
        <div className="min-w-fit">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
            Kiadó
          </p>
          <p className="text-sm md:text-base font-semibold text-foreground">
            {book?.kiado?.nev}
          </p>
        </div>
        <div className="min-w-fit">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
            Kiadás éve
          </p>
          <p className="text-sm md:text-base font-semibold text-foreground">
            {book?.kiadas_ev}
          </p>
        </div>
        <div className="min-w-fit">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
            Kategória
          </p>
          <span className="inline-block px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded">
            {book?.kategoria?.nev}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookHeader;
