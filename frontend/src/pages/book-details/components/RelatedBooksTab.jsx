import React from "react";
import { useNavigate } from "react-router-dom";

const RelatedBooksTab = ({ relatedBooks }) => {
  const navigate = useNavigate();

  const handleBookClick = (bookId) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/book-details", { state: { bookId } });
  };

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-6">
        Azok a diákok, akik ezt a könyvet kölcsönözték, ezeket a címeket is szívesen olvasták
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedBooks?.map((book) => (
          <div
            key={book?.id}
            className="bg-card rounded-lg shadow-card border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleBookClick(book?.id)}
          >
            <div className="aspect-[3/4] overflow-hidden bg-muted">
              <img
                src={book?.coverImage}
                alt={book?.coverImageAlt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = "/assets/images/no_image.png";
                }}
              />
            </div>
            <div className="p-4">
              <h4 className="font-heading font-semibold text-foreground mb-1 line-clamp-2">
                {book?.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                {book?.author}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="fill-current text-[#F59E0B]"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span className="text-sm font-medium text-foreground">
                    {book?.rating?.toFixed(1)}
                  </span>
                </div>
                <span
                  className={`text-xs font-medium ${
                    book?.available ? "text-success" : "text-error"
                  }`}
                >
                  {book?.available ? "Elérhető" : "Kikölcsönözve"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedBooksTab;
