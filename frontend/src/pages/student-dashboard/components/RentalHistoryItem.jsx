import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, CheckCircle2, Star } from "lucide-react";

const RentalHistoryItem = ({ rental, onRate }) => {
  const navigate = useNavigate();
  const [showRating, setShowRating] = useState(false);
  const [selectedRating, setSelectedRating] = useState(rental?.userRating || 0);
  const [hoverRating, setHoverRating] = useState(0);

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString("hu-HU", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleRatingSubmit = () => {
    if (selectedRating > 0) {
      onRate(rental?.id, selectedRating);
      setShowRating(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        <div
          className="flex-shrink-0 w-20 h-28 overflow-hidden rounded-md cursor-pointer"
          onClick={() => navigate(`/book-details/${rental.konyv_id}`)}
        >
          <img
            src={rental?.kep}
            alt={rental?.cim}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            onError={(e) => {
              e.target.src = "/assets/images/no_image.png";
            }}
          />
        </div>

        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <h4
              className="text-base font-semibold text-foreground mb-1 cursor-pointer hover:text-primary transition-colors duration-200 line-clamp-1"
              onClick={() => navigate(`/book-details/${rental.konyv_id}`)}
            >
              {rental?.cim}
            </h4>
            <p className="text-sm text-muted-foreground mb-2">
              {rental?.szerzo}
            </p>

            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>Kölcsönözve: {formatDate(rental?.berles_kezdete)}</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 size={14} />
                <span>Visszavéve: {formatDate(rental?.berles_vege)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3">
            {rental?.userRating ? (
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5]?.map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={`${
                        star <= rental?.userRating
                          ? "text-warning fill-current"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground ml-1">
                  Értékelésed
                </span>
              </div>
            ) : (
              <>
                {!showRating ? (
                  <button
                    onClick={() => setShowRating(true)}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3 gap-2"
                  >
                    <Star size={16} />
                    Értékelés
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5]?.map((star) => (
                        <button
                          key={star}
                          onClick={() => setSelectedRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-0.5 transition-transform hover:scale-110"
                          aria-label={`Rate ${star} stars`}
                        >
                          <Star
                            size={18}
                            className={`${
                              star <= (hoverRating || selectedRating)
                                ? "text-warning fill-current"
                                : "text-muted-foreground"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleRatingSubmit}
                      disabled={selectedRating === 0}
                      className="inline-flex items-center justify-center rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-3"
                    >
                      Küldés
                    </button>
                    <button
                      onClick={() => {
                        setShowRating(false);
                        setSelectedRating(0);
                        setHoverRating(0);
                      }}
                      className="inline-flex items-center justify-center rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 px-3"
                    >
                      Mégse
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalHistoryItem;
