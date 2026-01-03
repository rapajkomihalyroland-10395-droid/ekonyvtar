import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Search, BookOpen, Bell, ArrowRight } from "lucide-react";
import Header from "../../components/ui/Header";
import CurrentRentalCard from "./components/CurrentRentalCard";
import RentalHistoryItem from "./components/RentalHistoryItem";
import QuickAccessWidget from "./components/QuickAccessWidget";
import RecommendedBookCard from "./components/RecommendedBookCard";
import NotificationItem from "./components/NotificationItem";
import { GetUser, getAuthHeader } from "store/authStore";
import api from "../../axios_url/baseURL.js";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const user = GetUser();

  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const GetRentals = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/get-a-rental/${user.id}`, {
          headers: getAuthHeader(),
        });

        setRentals(response.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    GetRentals();
  }, []);

  const recommendedBooks = [
    {
      id: 9,
      title: "The Alchemist",
      author: "Paulo Coelho",
      cover:
        "https://img.rocket.new/generatedImages/rocket_gen_img_1525ec42c-1764671436555.png",
      coverAlt:
        "Philosophical novel cover with desert landscape and golden sun symbolizing journey and self-discovery",
      rating: 4.7,
      category: "Fiction",
      reason: "Based on your interest in philosophical fiction",
    },
    {
      id: 10,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      cover:
        "https://img.rocket.new/generatedImages/rocket_gen_img_1595fa70e-1764671436550.png",
      coverAlt:
        "Non-fiction book cover with evolutionary imagery and human silhouettes in earth tones",
      rating: 4.6,
      category: "Non-Fiction",
      reason: "Popular among readers who enjoyed your recent reads",
    },
    {
      id: 11,
      title: "The Midnight Library",
      author: "Matt Haig",
      cover:
        "https://img.rocket.new/generatedImages/rocket_gen_img_169c7b89f-1765628171562.png",
      coverAlt:
        "Contemporary fiction cover showing mystical library with glowing books and starry night atmosphere",
      rating: 4.5,
      category: "Fiction",
      reason: "New arrival matching your reading preferences",
    },
    {
      id: 12,
      title: "Educated",
      author: "Tara Westover",
      cover:
        "https://img.rocket.new/generatedImages/rocket_gen_img_172743291-1764646535440.png",
      coverAlt:
        "Memoir cover with mountain landscape and open book symbolizing education and transformation",
      rating: 4.8,
      category: "Biography",
      reason: "Highly rated by students with similar interests",
    },
  ];

  const activeRentals = rentals?.filter(
    (rental) => rental.visszahozva === false || rental.visszahozva === 0
  );

  const rentalHistory = rentals.filter(
    (rental) => rental.visszahozva == true || rental.visszahozva == 1
  );

  const handleRenew = (rentalId) => {
    alert(`Renewal request submitted for rental ID: ${rentalId}`);
  };

  const handleRate = (rentalId, rating) => {
    alert(`Book rated ${rating} stars for rental ID: ${rentalId}`);
  };

  const handleDismissNotification = (notificationId) => {
    setNotifications(notifications?.filter((n) => n?.id !== notificationId));
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate(`/book-catalog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const displayedHistory = showAllHistory
    ? rentalHistory
    : rentalHistory?.slice(0, 3);
  const displayedNotifications = showAllNotifications
    ? notifications
    : notifications?.slice(0, 3);

  return (
    <>
      <Helmet>
        <title>My Dashboard - SchoolLibrary Digital</title>
        <meta
          name="description"
          content="Manage your library rentals, view reading history, and discover new books on your student dashboard"
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-20 pb-8 px-4 lg:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                Üdvözöljük, {user?.nev}! 👋
              </h1>
              <p className="text-muted-foreground">
                Itt található a kölcsönzési aktivitásod és ajánlásaid.
              </p>
            </div>

            <form onSubmit={handleSearch} className="mb-8">
              <div className="relative max-w-2xl">
                <input
                  type="search"
                  placeholder="Keresés cím, szerző vagy ISBN alapján..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-12"
                />

                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-muted rounded-md transition-colors duration-200"
                  aria-label="Keresés"
                >
                  <Search
                    size={20}
                    className="text-muted-foreground"
                  />
                </button>
              </div>
            </form>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 space-y-6">
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-heading font-bold text-foreground">
                      Aktív Kölcsönzések
                    </h2>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      {activeRentals?.length} Aktív
                    </span>
                  </div>

                  {activeRentals?.length > 0 ? (
                    <div className="space-y-4">
                      {rentals?.map((rental) => (
                        <CurrentRentalCard
                          key={rental?.id}
                          rental={rental}
                          onRenew={handleRenew}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-card border border-border rounded-lg p-8 text-center">
                      <BookOpen
                        size={48}
                        className="mx-auto mb-4 text-muted-foreground"
                      />
                      <p className="text-muted-foreground mb-4">
                        Nincsenek aktív kölcsönzéseid
                      </p>
                      <button
                        onClick={() => navigate("/book-catalog")}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2"
                      >
                        <Search size={16} />
                        Könyvek Böngészése
                      </button>
                    </div>
                  )}
                </section>

                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-heading font-bold text-foreground">
                      Kölcsönzési Előzmények
                    </h2>
                  </div>

                  {rentalHistory?.length > 0 ? (
                    <>
                      <div className="space-y-3">
                        {displayedHistory?.map((rental) => (
                          <RentalHistoryItem
                            key={rental?.id}
                            rental={rental}
                            onRate={handleRate}
                          />
                        ))}
                      </div>

                      {rentalHistory?.length > 3 && (
                        <div className="mt-4 text-center">
                          <button
                            onClick={() => setShowAllHistory(!showAllHistory)}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                          >
                            {showAllHistory
                              ? "Kevesebb mutatása"
                              : `Összes megtekintése (${rentalHistory?.length})`}
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="bg-card border border-border rounded-lg p-6 text-center">
                      <p className="text-muted-foreground">
                        Nincsenek még kölcsönzési előzmények
                      </p>
                    </div>
                  )}
                </section>
              </div>

              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-heading font-bold text-foreground mb-4">
                    Gyors Elérés
                  </h2>
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                    <QuickAccessWidget
                      title="Lejárt Könyvek"
                      value="1"
                      subtitle="Azonnali visszavétel"
                      icon="AlertCircle"
                      iconColor="bg-error/10"
                      badge="Teendő"
                      onClick={() => {}}
                    />

                    <QuickAccessWidget
                      title="Fennálló Tartozás"
                      value="500 Ft"
                      subtitle="Egyenleg rendezése"
                      icon="DollarSign"
                      iconColor="bg-warning/10"
                      badge=""
                      onClick={() => {}}
                    />

                    <QuickAccessWidget
                      title="Kívánságlista"
                      value="8"
                      subtitle="Elolvasandó könyvek"
                      icon="Heart"
                      iconColor="bg-success/10"
                      badge=""
                      onClick={() => navigate("/book-catalog")}
                    />

                    <QuickAccessWidget
                      title="Elolvasott Könyvek"
                      value="12"
                      subtitle="Ebben a tanévben"
                      icon="BookCheck"
                      iconColor="bg-primary/10"
                      badge=""
                      onClick={() => {}}
                    />
                  </div>
                </section>

                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-heading font-bold text-foreground">
                      Értesítések
                    </h2>
                    {notifications?.length > 0 && (
                      <span className="px-2 py-0.5 bg-error text-error-foreground text-xs font-medium rounded-full">
                        {notifications?.length}
                      </span>
                    )}
                  </div>

                  {notifications?.length > 0 ? (
                    <>
                      <div className="space-y-2">
                        {displayedNotifications?.map((notification) => (
                          <NotificationItem
                            key={notification?.id}
                            notification={notification}
                            onDismiss={handleDismissNotification}
                          />
                        ))}
                      </div>

                      {notifications?.length > 3 && (
                        <div className="mt-3 text-center">
                          <button
                            onClick={() =>
                              setShowAllNotifications(!showAllNotifications)
                            }
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3"
                          >
                            {showAllNotifications
                              ? "Kevesebb mutatása"
                              : `Összes megtekintése (${notifications?.length})`}
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="bg-card border border-border rounded-lg p-4 text-center">
                      <Bell
                        size={32}
                        className="mx-auto mb-2 text-muted-foreground"
                      />
                      <p className="text-sm text-muted-foreground">
                        Nincsenek új értesítések
                      </p>
                    </div>
                  )}
                </section>
              </div>
            </div>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  Neked Ajánlott
                </h2>
                <button
                  onClick={() => navigate("/book-catalog")}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-2"
                >
                  Összes megtekintése
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {recommendedBooks?.map((book) => (
                  <RecommendedBookCard key={book?.id} book={book} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default StudentDashboard;
