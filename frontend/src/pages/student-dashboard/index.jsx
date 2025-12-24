import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import CurrentRentalCard from './components/CurrentRentalCard';
import RentalHistoryItem from './components/RentalHistoryItem';
import QuickAccessWidget from './components/QuickAccessWidget';
import RecommendedBookCard from './components/RecommendedBookCard';
import NotificationItem from './components/NotificationItem';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const currentRentals = [
  {
    id: 1,
    bookTitle: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    bookCover: "https://img.rocket.new/generatedImages/rocket_gen_img_15fe6e907-1764646533126.png",
    bookCoverAlt: "Classic novel cover of The Great Gatsby featuring art deco design with golden lights and dark blue background",
    borrowDate: "2025-12-01",
    dueDate: "2025-12-16",
    canRenew: true
  },
  {
    id: 2,
    bookTitle: "To Kill a Mockingbird",
    author: "Harper Lee",
    bookCover: "https://img.rocket.new/generatedImages/rocket_gen_img_1531f0ae8-1764692280320.png",
    bookCoverAlt: "Vintage book cover showing a tree silhouette against warm sunset colors representing Southern Gothic literature",
    borrowDate: "2025-11-28",
    dueDate: "2025-12-13",
    canRenew: true
  },
  {
    id: 3,
    bookTitle: "1984",
    author: "George Orwell",
    bookCover: "https://img.rocket.new/generatedImages/rocket_gen_img_1fd29f48f-1764646532421.png",
    bookCoverAlt: "Dystopian novel cover with dark tones and surveillance imagery representing totalitarian themes",
    borrowDate: "2025-11-25",
    dueDate: "2025-12-10",
    canRenew: false
  }];


  const rentalHistory = [
  {
    id: 4,
    bookTitle: "Pride and Prejudice",
    author: "Jane Austen",
    bookCover: "https://img.rocket.new/generatedImages/rocket_gen_img_15fe6e907-1764646533126.png",
    bookCoverAlt: "Classic romance novel cover with elegant Victorian-era design in soft pastel colors",
    borrowDate: "2025-11-01",
    returnDate: "2025-11-22",
    userRating: 5
  },
  {
    id: 5,
    bookTitle: "The Catcher in the Rye",
    author: "J.D. Salinger",
    bookCover: "https://img.rocket.new/generatedImages/rocket_gen_img_141fa9da6-1764775317246.png",
    bookCoverAlt: "Coming-of-age novel cover featuring urban landscape with red hunting hat symbolism",
    borrowDate: "2025-10-15",
    returnDate: "2025-11-05",
    userRating: 4
  },
  {
    id: 6,
    bookTitle: "The Hobbit",
    author: "J.R.R. Tolkien",
    bookCover: "https://img.rocket.new/generatedImages/rocket_gen_img_1d2eb51d5-1764671442079.png",
    bookCoverAlt: "Fantasy adventure book cover with mountain landscape and mystical elements in green and gold tones",
    borrowDate: "2025-10-01",
    returnDate: "2025-10-20",
    userRating: 0
  },
  {
    id: 7,
    bookTitle: "Harry Potter and the Sorcerer\'s Stone",
    author: "J.K. Rowling",
    bookCover: "https://img.rocket.new/generatedImages/rocket_gen_img_1b42025a8-1764692280873.png",
    bookCoverAlt: "Magical fantasy book cover with castle silhouette and lightning bolt against purple starry night sky",
    borrowDate: "2025-09-15",
    returnDate: "2025-10-05",
    userRating: 5
  },
  {
    id: 8,
    bookTitle: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    bookCover: "https://img.rocket.new/generatedImages/rocket_gen_img_1f420e7fd-1765217757444.png",
    bookCoverAlt: "Epic fantasy trilogy cover featuring ring symbol with volcanic landscape in dramatic red and black colors",
    borrowDate: "2025-09-01",
    returnDate: "2025-09-28",
    userRating: 0
  }];


  const recommendedBooks = [
  {
    id: 9,
    title: "The Alchemist",
    author: "Paulo Coelho",
    cover: "https://img.rocket.new/generatedImages/rocket_gen_img_1525ec42c-1764671436555.png",
    coverAlt: "Philosophical novel cover with desert landscape and golden sun symbolizing journey and self-discovery",
    rating: 4.7,
    category: "Fiction",
    reason: "Based on your interest in philosophical fiction"
  },
  {
    id: 10,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    cover: "https://img.rocket.new/generatedImages/rocket_gen_img_1595fa70e-1764671436550.png",
    coverAlt: "Non-fiction book cover with evolutionary imagery and human silhouettes in earth tones",
    rating: 4.6,
    category: "Non-Fiction",
    reason: "Popular among readers who enjoyed your recent reads"
  },
  {
    id: 11,
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "https://img.rocket.new/generatedImages/rocket_gen_img_169c7b89f-1765628171562.png",
    coverAlt: "Contemporary fiction cover showing mystical library with glowing books and starry night atmosphere",
    rating: 4.5,
    category: "Fiction",
    reason: "New arrival matching your reading preferences"
  },
  {
    id: 12,
    title: "Educated",
    author: "Tara Westover",
    cover: "https://img.rocket.new/generatedImages/rocket_gen_img_172743291-1764646535440.png",
    coverAlt: "Memoir cover with mountain landscape and open book symbolizing education and transformation",
    rating: 4.8,
    category: "Biography",
    reason: "Highly rated by students with similar interests"
  }];


  const initialNotifications = [
  {
    id: 1,
    type: 'due-soon',
    message: "The Great Gatsby is due in 1 day. Consider renewing if you need more time.",
    timestamp: new Date(Date.now() - 3600000)
  },
  {
    id: 2,
    type: 'overdue',
    message: "1984 is overdue. Please return it as soon as possible to avoid additional fines.",
    timestamp: new Date(Date.now() - 7200000)
  },
  {
    id: 3,
    type: 'new-arrival',
    message: "New book matching your interests: The Midnight Library by Matt Haig is now available.",
    timestamp: new Date(Date.now() - 86400000)
  },
  {
    id: 4,
    type: 'fine',
    message: "You have an outstanding fine of $5.00. Please clear your balance.",
    timestamp: new Date(Date.now() - 172800000)
  }];


  useEffect(() => {
    setNotifications(initialNotifications);
  }, []);

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

  const displayedHistory = showAllHistory ? rentalHistory : rentalHistory?.slice(0, 3);
  const displayedNotifications = showAllNotifications ? notifications : notifications?.slice(0, 3);

  return (
    <>
      <Helmet>
        <title>My Dashboard - SchoolLibrary Digital</title>
        <meta name="description" content="Manage your library rentals, view reading history, and discover new books on your student dashboard" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-20 pb-8 px-4 lg:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                Welcome back, Student!
              </h1>
              <p className="text-muted-foreground">
                Manage your rentals and discover your next great read
              </p>
            </div>

            <form onSubmit={handleSearch} className="mb-8">
              <div className="relative max-w-2xl">
                <Input
                  type="search"
                  placeholder="Search for books by title, author, or ISBN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="pr-12" />

                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-muted rounded-md transition-colors duration-200"
                  aria-label="Search books">

                  <Icon name="Search" size={20} color="var(--color-muted-foreground)" />
                </button>
              </div>
            </form>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 space-y-6">
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-heading font-bold text-foreground">
                      Current Rentals
                    </h2>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      {currentRentals?.length} Active
                    </span>
                  </div>

                  {currentRentals?.length > 0 ?
                  <div className="space-y-4">
                      {currentRentals?.map((rental) =>
                    <CurrentRentalCard
                      key={rental?.id}
                      rental={rental}
                      onRenew={handleRenew} />

                    )}
                    </div> :

                  <div className="bg-card border border-border rounded-lg p-8 text-center">
                      <Icon name="BookOpen" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">You don't have any active rentals</p>
                      <Button
                      variant="default"
                      iconName="Search"
                      iconPosition="left"
                      onClick={() => navigate('/book-catalog')}>

                        Browse Books
                      </Button>
                    </div>
                  }
                </section>

                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-heading font-bold text-foreground">
                      Rental History
                    </h2>
                  </div>

                  {rentalHistory?.length > 0 ?
                  <>
                      <div className="space-y-3">
                        {displayedHistory?.map((rental) =>
                      <RentalHistoryItem
                        key={rental?.id}
                        rental={rental}
                        onRate={handleRate} />

                      )}
                      </div>

                      {rentalHistory?.length > 3 &&
                    <div className="mt-4 text-center">
                          <Button
                        variant="ghost"
                        onClick={() => setShowAllHistory(!showAllHistory)}>

                            {showAllHistory ? 'Show Less' : `View All (${rentalHistory?.length})`}
                          </Button>
                        </div>
                    }
                    </> :

                  <div className="bg-card border border-border rounded-lg p-6 text-center">
                      <p className="text-muted-foreground">No rental history yet</p>
                    </div>
                  }
                </section>
              </div>

              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-heading font-bold text-foreground mb-4">
                    Quick Access
                  </h2>
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                    <QuickAccessWidget
                      title="Overdue Books"
                      value="1"
                      subtitle="Return immediately"
                      icon="AlertCircle"
                      iconColor="bg-error/10"
                      badge="Action Required"
                      onClick={() => {}} />

                    <QuickAccessWidget
                      title="Outstanding Fines"
                      value="$5.00"
                      subtitle="Clear your balance"
                      icon="DollarSign"
                      iconColor="bg-warning/10"
                      badge=""
                      onClick={() => {}} />

                    <QuickAccessWidget
                      title="Wishlist Items"
                      value="8"
                      subtitle="Books you want to read"
                      icon="Heart"
                      iconColor="bg-success/10"
                      badge=""
                      onClick={() => navigate('/book-catalog')} />

                    <QuickAccessWidget
                      title="Books Read"
                      value="12"
                      subtitle="This academic year"
                      icon="BookCheck"
                      iconColor="bg-primary/10"
                      badge=""
                      onClick={() => {}} />

                  </div>
                </section>

                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-heading font-bold text-foreground">
                      Notifications
                    </h2>
                    {notifications?.length > 0 &&
                    <span className="px-2 py-0.5 bg-error text-error-foreground text-xs font-medium rounded-full">
                        {notifications?.length}
                      </span>
                    }
                  </div>

                  {notifications?.length > 0 ?
                  <>
                      <div className="space-y-2">
                        {displayedNotifications?.map((notification) =>
                      <NotificationItem
                        key={notification?.id}
                        notification={notification}
                        onDismiss={handleDismissNotification} />

                      )}
                      </div>

                      {notifications?.length > 3 &&
                    <div className="mt-3 text-center">
                          <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAllNotifications(!showAllNotifications)}>

                            {showAllNotifications ? 'Show Less' : `View All (${notifications?.length})`}
                          </Button>
                        </div>
                    }
                    </> :

                  <div className="bg-card border border-border rounded-lg p-4 text-center">
                      <Icon name="Bell" size={32} color="var(--color-muted-foreground)" className="mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No new notifications</p>
                    </div>
                  }
                </section>
              </div>
            </div>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  Recommended for You
                </h2>
                <Button
                  variant="ghost"
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={() => navigate('/book-catalog')}>

                  View All
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {recommendedBooks?.map((book) =>
                <RecommendedBookCard key={book?.id} book={book} />
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>);

};

export default StudentDashboard;
