    import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReviewsTab = ({ reviews, overallRating, totalReviews }) => {
  const [sortBy, setSortBy] = useState('recent');

  const ratingDistribution = [
    { stars: 5, count: 145, percentage: 72 },
    { stars: 4, count: 38, percentage: 19 },
    { stars: 3, count: 12, percentage: 6 },
    { stars: 2, count: 4, percentage: 2 },
    { stars: 1, count: 2, percentage: 1 }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-border">
        <div className="md:col-span-1 text-center md:text-left">
          <div className="text-5xl font-bold text-foreground mb-2">{overallRating?.toFixed(1)}</div>
          <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
            {[...Array(5)]?.map((_, index) => (
              <Icon
                key={index}
                name="Star"
                size={20}
                color={index < Math.floor(overallRating) ? '#F59E0B' : '#E5E7EB'}
                className={index < Math.floor(overallRating) ? 'fill-current' : ''}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">{totalReviews} total reviews</p>
        </div>

        <div className="md:col-span-2">
          {ratingDistribution?.map((item) => (
            <div key={item?.stars} className="flex items-center gap-3 mb-2">
              <span className="text-sm font-medium text-foreground w-12">{item?.stars} star</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-warning transition-all duration-300"
                  style={{ width: `${item?.percentage}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-12 text-right">{item?.count}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">Student Reviews</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e?.target?.value)}
          className="px-3 py-2 text-sm border border-border rounded-md bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="recent">Most Recent</option>
          <option value="helpful">Most Helpful</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
        </select>
      </div>
      <div className="space-y-6">
        {reviews?.map((review) => (
          <div key={review?.id} className="pb-6 border-b border-border last:border-0">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={
                      review?.studentAvatar ||
                      `https://ui-avatars.com/api/?name=${
                        review?.felhasznalo?.nev || "A"
                      }`
                    }
                    alt={review?.felhasznalo?.nev || "User"}
                    className="w-full h-full object-cover"
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
                    {[...Array(5)]?.map((_, index) => (
                      <Icon
                        key={index}
                        name="Star"
                        size={14}
                        color={
                          index < (review?.velemeny_erteke || review?.rating)
                            ? "#F59E0B"
                            : "#E5E7EB"
                        }
                        className={
                          index < (review?.velemeny_erteke || review?.rating)
                            ? "fill-current"
                            : ""
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-3">
                  {review?.velemeny_szovege || review?.comment}
                </p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="ThumbsUp" size={14} />
                    <span>Helpful ({review?.helpfulCount || 0})</span>
                  </button>
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="MessageSquare" size={14} />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Button variant="outline" size="default">
          Load More Reviews
        </Button>
      </div>
    </div>
  );
};

export default ReviewsTab;