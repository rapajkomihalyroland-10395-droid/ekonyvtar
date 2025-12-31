import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import RentalTermsPanel from "pages/rental-checkout/components/RentalTermsPanel";

const CurrentRentalCard = ({ rental, onRenew }) => {
  const navigate = useNavigate();

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining(rental?.berles_vege);

  const getStatusColor = () => {
    if (daysRemaining < 0) return "bg-error text-error-foreground";
    if (daysRemaining <= 3) return "bg-warning text-warning-foreground";
    return "bg-success text-success-foreground";
  };

  const getStatusText = () => {
    if (daysRemaining < 0) return `${Math.abs(daysRemaining)} napja lejárt`;
    if (daysRemaining === 0) return "Ma jár le";
    if (daysRemaining === 1) return "Holnap jár le";
    return `${daysRemaining} nap van hátra`;
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString("hu-HU", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        <div
          className="flex-shrink-0 w-full sm:w-32 h-48 sm:h-44 overflow-hidden rounded-md cursor-pointer"
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
            <h3
              className="text-lg font-semibold text-foreground mb-1 cursor-pointer hover:text-primary transition-colors duration-200 line-clamp-2"
              onClick={() => navigate(`/book-details/${rental.konyv_id}`)}
            >
              {rental?.cim}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {rental?.szerzo}
            </p>

            <div className="flex flex-wrap gap-3 mb-3">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Icon name="Calendar" size={16} />
                <span>Kölcsönözve: {formatDate(rental?.berles_kezdete)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Icon name="CalendarClock" size={16} />
                <span>Határidő: {formatDate(rental?.berles_vege)}</span>
              </div>
            </div>

            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
            >
              <Icon
                name={daysRemaining < 0 ? "AlertCircle" : "Clock"}
                size={14}
              />
              <span>{getStatusText()}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
              onClick={() => onRenew(rental?.id)}
              disabled={!rental?.canRenew || daysRemaining < 0}
            >
              Hosszabbítás
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="BookOpen"
              iconPosition="left"
              onClick={() => navigate(`/book-details/${rental.konyv_id}`)}
            >
              Részletek
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentRentalCard;
