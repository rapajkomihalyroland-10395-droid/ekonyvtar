import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Search, BookOpen, Bell, ArrowRight } from "lucide-react";
import Header from "../../components/ui/Header";
import CurrentRentalCard from "./components/CurrentRentalCard";
import RentalHistoryItem from "./components/RentalHistoryItem";
import QuickAccessWidget from "./components/QuickAccessWidget";
import { GetUser, getAuthHeader } from "store/authStore";
import api from "../../axios_url/baseURL.js";
import RentalTermsPanel from "pages/rental-checkout/components/RentalTermsPanel";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [showAllActiveHistory, setShowAllActiveHistory] = useState(false);
  /*const [showAllNotifications, setShowAllNotifications] = useState(false);*/
  /*const [notifications, setNotifications] = useState([]);*/
  const user = GetUser();

  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const GetRentals = async () => {
      try {
        const response = await api.get(`/get-a-rental/${user.id}`, {
          headers: getAuthHeader(),
        });

        setRentals(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    GetRentals();
  }, []);

  const activeRentals = rentals?.filter(
    (rental) => rental.visszahozva === false || rental.visszahozva === 0,
  );
  const activeHistory = activeRentals;

  const rentalHistory = rentals.filter(
    (rental) => rental.visszahozva == true || rental.visszahozva == 1,
  );

  const handleRenew = (rentalId) => {
    alert(`Renewal request submitted for rental ID: ${rentalId}`);
  };

  const handleRate = (rentalId, rating) => {
    alert(`Book rated ${rating} stars for rental ID: ${rentalId}`);
  };

  /*const handleDismissNotification = (notificationId) => {
    setNotifications(notifications?.filter((n) => n?.id !== notificationId));
  };*/

  const expired_books_count = rentals.filter((x) => new Date(x.berles_vege).getTime() < Date.now() && x.visszahozva == false).length;

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate(`/book-catalog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const displayedHistory = showAllHistory
    ? rentalHistory
    : rentalHistory?.slice(0, 3);
  const displayedActiveHistory = showAllActiveHistory
    ? activeHistory
    : activeHistory?.slice(0, 3);
  /*const displayedNotifications = showAllNotifications
    ? notifications
    : notifications?.slice(0, 3);*/

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
                Itt található a kölcsönzési aktivitásod és volt bérléseid.
              </p>
            </div>



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

                  {activeHistory?.length > 0 ? (
                    <>
                      <div className="space-y-4">
                        {displayedActiveHistory?.map((rental) => (
                          <CurrentRentalCard
                            key={rental?.id}
                            rental={rental}
                            onRenew={handleRenew}
                          />
                        ))}
                      </div>

                      {activeHistory?.length > 3 && (
                        <div className="mt-4 text-center">
                          <button
                            onClick={() =>
                              setShowAllActiveHistory(!showAllActiveHistory)
                            }
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                          >
                            {showAllActiveHistory
                              ? "Kevesebb mutatása"
                              : `Összes megtekintése (${activeHistory?.length - 3})`}
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="bg-card border border-border rounded-lg p-8 text-center">
                      <BookOpen
                        size={48}
                        className="mx-auto mb-4 text-muted-foreground"
                      />
                      <p className="text-muted-foreground mb-4">
                        Nincsenek jelenlegi kölcsönzésed
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
                              : `Összes megtekintése (${rentalHistory?.length - 3})`}
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
                      value={`${expired_books_count}`}
                      subtitle="Azonnali visszavétel"
                      icon="AlertCircle"
                      iconColor="bg-error/10"
                      badge="Teendő"
                      onClick={() => { }}
                    />
                    <QuickAccessWidget
                      title="Elolvasott Könyvek"
                      value={`${rentalHistory.length}`}
                      subtitle="Ebben a tanévben"
                      icon="BookCheck"
                      iconColor="bg-primary/10"
                      badge=""
                      onClick={() => { }}
                    />
                  </div>
                </section>

                {/*<section>
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
                </section> */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default StudentDashboard;
