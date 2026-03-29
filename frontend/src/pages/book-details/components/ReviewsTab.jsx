import React, { useState } from "react";
import AddReview from "./AddReview";

const ReviewsTab = ({
  bookId,
  reviews,
  overallRating,
  totalReviews,
  onReviewAdded,
}) => {
  const [sortBy, setSortBy] = useState("recent");

  const ratingDistribution = [
    { stars: 5, count: 145, percentage: 72 },
    { stars: 4, count: 38, percentage: 19 },
    { stars: 3, count: 12, percentage: 6 },
    { stars: 2, count: 4, percentage: 2 },
    { stars: 1, count: 2, percentage: 1 },
  ];

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
      <div className="grid md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-border">
        <div className="md:col-span-1 text-center md:text-left">
          <div className="text-5xl font-bold text-foreground mb-2">
            {overallRating?.toFixed(1)}
          </div>
          <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
            {stars.map((index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={
                  index < Math.floor(overallRating) ? "#F59E0B" : "#E5E7EB"
                }
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
          <p className="text-sm text-muted-foreground">
            {totalReviews} összes értékelés
          </p>
        </div>

        <div className="md:col-span-2">
          {ratingDistribution?.map((item) => (
            <div key={item?.stars} className="flex items-center gap-3 mb-2">
              <span className="text-sm font-medium text-foreground w-12">
                {item?.stars} csillag
              </span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-warning transition-all duration-300"
                  style={{ width: `${item?.percentage}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-12 text-right">
                {item?.count}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Diákok véleménye
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e?.target?.value)}
          className="px-3 py-2 text-sm border border-border rounded-md bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="recent">Legfrissebb</option>
          <option value="helpful">Leghasznosabb</option>
          <option value="highest">Legmagasabb értékelés</option>
          <option value="lowest">Legalacsonyabb értékelés</option>
        </select>
      </div>

      <AddReview bookId={bookId} onReviewAdded={onReviewAdded} />

      <div className="space-y-6">
        {reviews?.map((review) => (
          <div
            key={review?.id}
            className="pb-6 border-b border-border last:border-0"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                  <img
                    src={
                      review?.studentAvatar ||
                      `https://ui-avatars.com/api/?name=${
                        review?.felhasznalo?.nev || "A"
                      }`
                    }
                    alt={review?.felhasznalo?.nev || "User"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${
                        review?.felhasznalo?.nev || "A"
                      }`;
                    }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-foreground">
                      {review?.felhasznalo?.nev || "Anonymous"}
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
                          index < (review?.velemeny_erteke || review?.rating)
                            ? "#F59E0B"
                            : "#E5E7EB"
                        }
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={
                          index < (review?.velemeny_erteke || review?.rating)
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
                  {review?.velemeny_szovege || review?.comment}
                </p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 10v12" />
                      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                    </svg>
                    <span>Hasznos ({review?.helpfulCount || 0})</span>
                  </button>
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>Válasz</span>
                  </button>
                </div>
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
