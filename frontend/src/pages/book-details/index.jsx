import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import BookCover from "./components/BookCover";
import BookHeader from "./components/BookHeader";
import ActionPanel from "./components/ActionPanel";
import SynopsisTab from "./components/SynopsisTab";
import ReviewsTab from "./components/ReviewsTab";
import RelatedBooksTab from "./components/RelatedBooksTab";
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
        const response = await fetch(
          `http://localhost:3000/api/get-book/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch book details");
        const data = await response.json();

        setBookData({
          id: data.id,
          title: data.cim,
          author: data.szerzo?.nev || "Unknown Author",
          isbn: data.ISBN,
          publisher: data.kiado?.nev || "Unknown Publisher",
          publicationYear: data.kiadas_ev,
          pages: data.magassag_cm ? Math.round(data.magassag_cm * 10) : 0,
          coverImage: data.kep,
          coverImageAlt: data.cim,
          rating: Number(data.csillag_ertekeles),
          totalReviews: data.velemeny?.length || 0,
          availableCopies: data.keszlet,
          totalCopies: data.keszlet,
          estimatedReturnDate: null,
          categories: data.kategoria ? [data.kategoria.nev] : [],
          synopsis: data.leiras,
          language: "Hungarian",
          genre: data.kategoria?.nev,
        });

        setReviewsData(
          data.velemeny?.map((v) => ({
            id: v.id,
            studentName: v.felhasznalo?.nev || "Anonymous",
            studentAvatar:
              "https://ui-avatars.com/api/?name=" + (v.felhasznalo?.nev || "A"),
            studentAvatarAlt: v.felhasznalo?.nev,
            rating: v.velemeny_erteke,
            date: "2024-01-01",
            comment: v.velemeny_szovege,
            helpfulCount: 0,
          })) || []
        );
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

  const relatedBooksData = [
    {
      id: 2,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      coverImage:
        "https://img.rocket.new/generatedImages/rocket_gen_img_19d508c18-1765741266084.png",
      coverImageAlt:
        "Classic book cover of The Great Gatsby featuring art deco design with golden lights and dark blue background representing 1920s elegance",
      rating: 4.6,
      available: true,
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      coverImage:
        "https://img.rocket.new/generatedImages/rocket_gen_img_1fd29f48f-1764646532421.png",
      coverImageAlt:
        "Dystopian book cover of 1984 featuring stark minimalist design with bold typography and surveillance imagery in dark tones",
      rating: 4.7,
      available: true,
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      coverImage:
        "https://img.rocket.new/generatedImages/rocket_gen_img_11089da79-1764646535427.png",
      coverImageAlt:
        "Romantic classic book cover of Pride and Prejudice featuring elegant Victorian-era design with floral patterns and soft pastel colors",
      rating: 4.5,
      available: false,
    },
    {
      id: 5,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      coverImage:
        "https://img.rocket.new/generatedImages/rocket_gen_img_141fa9da6-1764775317246.png",
      coverImageAlt:
        "Coming-of-age book cover of The Catcher in the Rye with vintage design featuring urban landscape and youthful rebellion themes",
      rating: 4.3,
      available: true,
    },
    {
      id: 6,
      title: "Lord of the Flies",
      author: "William Golding",
      coverImage:
        "https://img.rocket.new/generatedImages/rocket_gen_img_1e36a6f81-1765800433535.png",
      coverImageAlt:
        "Dramatic book cover of Lord of the Flies featuring tropical island imagery with dark undertones and symbolic conch shell design",
      rating: 4.4,
      available: true,
    },
    {
      id: 7,
      title: "Animal Farm",
      author: "George Orwell",
      coverImage:
        "https://images.unsplash.com/photo-1593004647399-c7e9d4234e87",
      coverImageAlt:
        "Political allegory book cover of Animal Farm featuring farm animals in revolutionary poses with red and black color scheme",
      rating: 4.6,
      available: false,
    },
  ];

  const tabs = [
    { id: "synopsis", label: "Synopsis", icon: "BookOpen" },
    { id: "reviews", label: "Reviews", icon: "MessageSquare" },
    { id: "related", label: "Related Books", icon: "Library" },
  ];

  const handleBackToCatalog = () => {
    navigate("/book-catalog");
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
        <Button onClick={handleBackToCatalog}>Back to Catalog</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            iconName="ArrowLeft"
            iconPosition="left"
            onClick={handleBackToCatalog}
            className="mb-6"
          >
            Back to Catalog
          </Button>

          <div className="flex flex-col lg:flex-row gap-8">
            <BookCover book={bookData} />

            <div className="flex-1">
              <BookHeader book={bookData} />

              <div className="hidden lg:block mb-6">
                <div className="flex gap-2 border-b border-border">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${
                        activeTab === tab?.id
                          ? "border-primary text-primary"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon name={tab?.icon} size={18} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:hidden mb-6">
                {tabs?.map((tab) => (
                  <details
                    key={tab?.id}
                    className="mb-2 bg-card rounded-lg border border-border overflow-hidden"
                    open={activeTab === tab?.id}
                  >
                    <summary
                      className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-muted transition-colors"
                      onClick={(e) => {
                        e?.preventDefault();
                        setActiveTab(tab?.id);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon
                          name={tab?.icon}
                          size={18}
                          color="var(--color-primary)"
                        />
                        <span className="font-medium text-foreground">
                          {tab?.label}
                        </span>
                      </div>
                      <Icon
                        name="ChevronDown"
                        size={20}
                        className={`transition-transform duration-200 ${
                          activeTab === tab?.id ? "rotate-180" : ""
                        }`}
                      />
                    </summary>
                    <div className="px-4 py-4 border-t border-border">
                      {tab?.id === "synopsis" && (
                        <SynopsisTab synopsis={bookData?.synopsis} />
                      )}
                      {tab?.id === "reviews" && (
                        <ReviewsTab
                          reviews={reviewsData}
                          overallRating={bookData?.rating}
                          totalReviews={bookData?.totalReviews}
                        />
                      )}
                      {tab?.id === "related" && (
                        <RelatedBooksTab relatedBooks={relatedBooksData} />
                      )}
                    </div>
                  </details>
                ))}
              </div>

              <div className="hidden lg:block bg-card rounded-lg shadow-card border border-border p-6">
                {activeTab === "synopsis" && (
                  <SynopsisTab synopsis={bookData?.synopsis} />
                )}
                {activeTab === "reviews" && (
                  <ReviewsTab
                    reviews={reviewsData}
                    overallRating={bookData?.rating}
                    totalReviews={bookData?.totalReviews}
                  />
                )}
                {activeTab === "related" && (
                  <RelatedBooksTab relatedBooks={relatedBooksData} />
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
