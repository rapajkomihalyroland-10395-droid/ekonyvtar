import React from "react";

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
            Kölcsönzés megerősítése
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-colors duration-200"
            aria-label="Bezárás"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 18 18" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex gap-4">
            <div className="w-24 h-32 flex-shrink-0 overflow-hidden rounded-md bg-muted">
              <img
                src={book?.coverImage}
                alt={book?.coverImageAlt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/assets/images/no_image.png";
                }}
              />
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-heading font-semibold text-foreground">
                {book?.title}
              </h3>
              <p className="text-sm text-muted-foreground">{book?.author}</p>
              <div className="flex items-center gap-1 pt-1">
                {[...Array(5)]?.map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={
                      index < Math.floor(book?.rating) ? "#F59E0B" : "#71717a"
                    }
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={
                      index < Math.floor(book?.rating)
                        ? "fill-current text-[#F59E0B]"
                        : "text-muted-foreground"
                    }
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
                <span className="text-xs text-muted-foreground ml-1">
                  {book?.rating?.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-foreground">
              Kölcsönzési feltételek
            </h4>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary mt-0.5"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Kölcsönzési idő
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {rentalDuration} nap
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary mt-0.5"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <path d="m9 16 2 2 4-4" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Határidő
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {dueDate?.toLocaleDateString("hu-HU", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary mt-0.5"
                >
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Késedelmi díj
                  </p>
                  <p className="text-sm text-muted-foreground">
                    500 Ft naponta a határidő után
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary mt-0.5"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Hosszabbítás
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Egyszer meghosszabbítható, ha nincs előjegyzés
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-warning flex-shrink-0 mt-0.5"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-1">
                  Fontos figyelmeztetés
                </p>
                <p className="text-sm text-muted-foreground">
                  Kérjük, hozd vissza vagy hosszabbítsd meg a könyvet a határidő
                  lejárta előtt, hogy elkerüld a késedelmi díjat. A határidő
                  előtt 3 nappal emailben emlékeztetőt küldünk.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
            >
              Mégse
            </button>
            <button
              onClick={() => {
                onConfirm(book);
                onClose();
              }}
              className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Kölcsönzés megerősítése
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalModal;
