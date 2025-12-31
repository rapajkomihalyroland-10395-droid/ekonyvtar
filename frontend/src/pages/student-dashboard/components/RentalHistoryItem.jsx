import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

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
          <Image
            src={rental?.kep}
            alt={rental?.cim}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
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
                <Icon name="Calendar" size={14} />
                <span>Kölcsönözve: {formatDate(rental?.berles_kezdete)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="CheckCircle2" size={14} />
                <span>Visszavéve: {formatDate(rental?.berles_vege)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3">
            {rental?.userRating ? (
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5]?.map((star) => (
                    <Icon
                      key={star}
                      name="Star"
                      size={16}
                      color={
                        star <= rental?.userRating
                          ? "var(--color-warning)"
                          : "var(--color-muted)"
                      }
                      className={
                        star <= rental?.userRating ? "fill-current" : ""
                      }
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
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Star"
                    iconPosition="left"
                    onClick={() => setShowRating(true)}
                  >
                    Értékelés
                  </Button>
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
                          <Icon
                            name="Star"
                            size={18}
                            color={
                              star <= (hoverRating || selectedRating)
                                ? "var(--color-warning)"
                                : "var(--color-muted)"
                            }
                            className={
                              star <= (hoverRating || selectedRating)
                                ? "fill-current"
                                : ""
                            }
                          />
                        </button>
                      ))}
                    </div>
                    <Button
                      variant="default"
                      size="xs"
                      onClick={handleRatingSubmit}
                      disabled={selectedRating === 0}
                    >
                      Küldés
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => {
                        setShowRating(false);
                        setSelectedRating(0);
                        setHoverRating(0);
                      }}
                    >
                      Mégse
                    </Button>
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
