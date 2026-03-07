import React, { useState } from "react";
import api from "../../../axios_url/baseURL";
import { getAuthHeader, GetUser } from "../../../store/authStore";

const AddReview = ({ bookId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (rating === 0) {
      setError("Kérlek válassz egy értékelést!");
      return;
    }

    if (!comment.trim()) {
      setError("Kérlek írj egy rövid véleményt!");
      return;
    }

    const user = GetUser();
    if (!user) {
      setError("A vélemény írásához be kell jelentkezned!");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post(
        "/write-opinion",
        {
          book_id: bookId,
          user_id: user.id,
          stars: rating,
          opinion: comment,
        },
        {
          headers: getAuthHeader(),
        }
      );

      setSuccess(true);
      setComment("");
      setRating(0);
      if (onReviewAdded) {
        onReviewAdded(response.data.review);
      }
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Hiba a vélemény küldésekor:", err);
      setError(
        err.response?.data?.message || "Hiba történt a vélemény küldésekor."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-8">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Írj véleményt
      </h3>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-600 p-3 rounded-md mb-4 text-sm">
          Vélemény sikeresen elküldve!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-2">
            Értékelés
          </label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none transition-transform hover:scale-110"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={star <= (hoverRating || rating) ? "#F59E0B" : "#D1D5DB"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={
                    star <= (hoverRating || rating)
                      ? "fill-current text-[#F59E0B]"
                      : "text-gray-300"
                  }
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </button>
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {rating > 0 ? `${rating} csillag` : "Válassz értékelést"}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Vélemény szövege
          </label>
          <textarea
            id="comment"
            rows="4"
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Oszd meg gondolataidat a könyvről..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Küldés...
              </>
            ) : (
              "Vélemény küldése"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
