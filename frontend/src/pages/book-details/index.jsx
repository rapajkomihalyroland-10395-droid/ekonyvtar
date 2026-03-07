import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/ui/Header";
import BookCover from "./components/BookCover";
import BookHeader from "./components/BookHeader";
import ActionPanel from "./components/ActionPanel";
import SynopsisTab from "./components/SynopsisTab";
import ReviewsTab from "./components/ReviewsTab";
import api from "../../axios_url/baseURL.js";
import { getAuthHeader } from "../../store/authStore.js";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("synopsis");
  const [bookData, setBookData] = useState(null);
  const [reviewsData, setReviewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await api.get(`/get-book/${id}`, {
          headers: getAuthHeader(),
        });
        const data = response.data;

        setBookData(data);

        setReviewsData(data.velemeny || []);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  const handleBackToCatalog = () => {
    navigate("/book-catalog");
  };

  const handleReviewAdded = (newReview) => {
    setReviewsData((prev) => [newReview, ...prev]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!bookData) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Book not found</h2>
        <button
          onClick={handleBackToCatalog}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Back to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={handleBackToCatalog}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3 mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to Catalog
          </button>

          <div className="flex flex-col lg:flex-row gap-8">
            <BookCover book={bookData} />

            <div className="flex-1">
              <BookHeader book={bookData} />

              <div className="hidden lg:block mb-6">
                <div className="flex gap-2 border-b border-border">
                  <button
                    onClick={() => setActiveTab("synopsis")}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${
                      activeTab === "synopsis"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
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
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    <span>Synopsis</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${
                      activeTab === "reviews"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
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
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>Reviews</span>
                  </button>
                </div>
              </div>

              <div className="lg:hidden mb-6">
                <details
                  className="mb-2 bg-card rounded-lg border border-border overflow-hidden"
                  open={activeTab === "synopsis"}
                >
                  <summary
                    className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-muted transition-colors"
                    onClick={(e) => {
                      e?.preventDefault();
                      setActiveTab("synopsis");
                    }}
                  >
                    <div className="flex items-center gap-2">
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
                        className="text-primary"
                      >
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                      <span className="font-medium text-foreground">
                        Synopsis
                      </span>
                    </div>
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
                      className={`transition-transform duration-200 ${
                        activeTab === "synopsis" ? "rotate-180" : ""
                      }`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="px-4 py-4 border-t border-border">
                    <SynopsisTab synopsis={bookData?.leiras} />
                  </div>
                </details>

                <details
                  className="mb-2 bg-card rounded-lg border border-border overflow-hidden"
                  open={activeTab === "reviews"}
                >
                  <summary
                    className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-muted transition-colors"
                    onClick={(e) => {
                      e?.preventDefault();
                      setActiveTab("reviews");
                    }}
                  >
                    <div className="flex items-center gap-2">
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
                        className="text-primary"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span className="font-medium text-foreground">
                        Reviews
                      </span>
                    </div>
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
                      className={`transition-transform duration-200 ${
                        activeTab === "reviews" ? "rotate-180" : ""
                      }`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="px-4 py-4 border-t border-border">
                    <ReviewsTab
                      bookId={bookData?.id}
                      reviews={reviewsData}
                      overallRating={Number(bookData?.csillag_ertekeles)}
                      totalReviews={bookData?.velemeny?.length}
                      onReviewAdded={handleReviewAdded}
                    />
                  </div>
                </details>
              </div>

              <div className="hidden lg:block bg-card rounded-lg shadow-card border border-border p-6">
                {activeTab === "synopsis" && (
                  <SynopsisTab synopsis={bookData?.leiras} />
                )}
                {activeTab === "reviews" && (
                  <ReviewsTab
                    bookId={bookData?.id}
                    reviews={reviewsData}
                    overallRating={Number(bookData?.csillag_ertekeles)}
                    totalReviews={bookData?.velemeny?.length}
                    onReviewAdded={handleReviewAdded}
                  />
                )}
              </div>
            </div>

            <div className="lg:w-80">
              <ActionPanel book={bookData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetails;
