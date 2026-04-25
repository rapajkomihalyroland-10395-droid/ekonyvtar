import React, { useState } from "react";
import AddReview from "./AddReview";

const ReviewsTab = ({
  bookId,
  reviews,
  overallRating,
  totalReviews,
  onReviewAdded,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString("hu-HU", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const stars = [0, 1, 2, 3, 4];

  return (
    <div>
      <div className="flex flex-col items-center justify-center mb-8 pb-8 border-b border-border">
        <div className="text-5xl font-bold text-foreground mb-2">
          {overallRating > 0 ? overallRating?.toFixed(1) : "0.0"}
        </div>
        <div className="flex items-center justify-center gap-1 mb-2">
          {stars.map((index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={index < Math.floor(overallRating) ? "#F59E0B" : "#E5E7EB"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={
                index < Math.floor(overallRating)
                  ? "fill-current text-[#F59E0B]"
                  : "text-[#E5E7EB]"
              }
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
        <p className="text-sm text-muted-foreground font-medium mt-1">
          {totalReviews} összes értékelés
        </p>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Diákok véleménye
        </h3>
      </div>

      <AddReview
        bookId={bookId}
        onReviewAdded={onReviewAdded}
        reviews={reviews}
      />

      <div className="space-y-6">
        {reviews?.map((review) => (
          <div
            key={review?.id}
            className="pb-6 border-b border-border last:border-0"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-foreground">
                      {review?.felhasznalok?.nev || "Anonymous"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(review?.date || "2024-01-01")}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {stars.map((index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={
                          index < (review?.ertekeles || review?.rating)
                            ? "#F59E0B"
                            : "#E5E7EB"
                        }
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={
                          index < (review?.ertekeles || review?.rating)
                            ? "fill-current text-[#F59E0B]"
                            : "text-[#E5E7EB]"
                        }
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-3">
                  {review?.szoveg}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
          További vélemények megjelenítése
        </button>
      </div>
    </div>
  );
};

export default ReviewsTab;
