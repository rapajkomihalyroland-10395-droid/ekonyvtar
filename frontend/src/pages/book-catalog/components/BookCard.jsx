import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const BookCard = ({ book, onRentNow }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const getStatusConfig = (status) => {
    const configs = {
      available: {
        label: "Available",
        bgColor: "bg-success/10",
        textColor: "text-success",
        icon: "CheckCircle2",
      },
      "checked-out": {
        label: "Checked Out",
        bgColor: "bg-error/10",
        textColor: "text-error",
        icon: "XCircle",
      },
      reserved: {
        label: "Reserved",
        bgColor: "bg-warning/10",
        textColor: "text-warning",
        icon: "Clock",
      },
    };
    return configs?.[status] || configs?.available;
  };

  const statusConfig = getStatusConfig(book?.status);

  const handleCardClick = () => {
    if (!book?.id && book?.id !== 0) return;
    navigate(`/book-details/${book.id}`, { state: { bookId: book.id } });
  };

  return (
    <article className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-card transition-all duration-300 group">
      <div
        className="relative aspect-[3/4] overflow-hidden bg-muted cursor-pointer"
        onClick={handleCardClick}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon
              name="BookOpen"
              size={48}
              className="text-muted-foreground animate-pulse"
            />
          </div>
        )}

        <Image
          src={book?.coverImage}
          alt={book?.coverImageAlt || book?.title}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        <div className="absolute top-2 right-2">
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${statusConfig?.bgColor} ${statusConfig?.textColor}`}
          >
            <Icon name={statusConfig?.icon} size={14} />
            {statusConfig?.label}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="space-y-1 cursor-pointer" onClick={handleCardClick}>
          <h3 className="font-heading font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {book?.title}
          </h3>
          <p className="text-sm text-muted-foreground">{book?.author}</p>
        </div>

        <div className="flex items-center gap-1">
          {[...Array(5)]?.map((_, index) => (
            <Icon
              key={index}
              name="Star"
              size={16}
              className={
                index < Math.floor(book?.rating || 0)
                  ? "text-warning fill-warning"
                  : "text-muted-foreground"
              }
            />
          ))}
          <span className="text-sm font-medium text-foreground ml-1">
            {(book?.rating ?? 0).toFixed(1)}
          </span>
          <span className="text-xs text-muted-foreground ml-1">
            ({book?.reviewCount ?? 0})
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Calendar" size={14} />
            <span>{book?.publicationYear}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Icon name="BookMarked" size={14} />
            <span>{book?.category}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          {book?.status === "available" ? (
            <Button
              variant="default"
              size="sm"
              onClick={(e) => {
                e?.stopPropagation();
                onRentNow(book);
              }}
              className="flex-1"
            >
              Rent Now
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled className="flex-1">
              Kérelem benyújtása
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};

export default BookCard;
