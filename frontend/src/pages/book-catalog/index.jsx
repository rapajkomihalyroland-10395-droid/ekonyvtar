import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';

import Button from '../../components/ui/Button';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import BookGrid from './components/BookGrid';
import RentalModal from './components/RentalModal';

const BookCatalog = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showRentalModal, setShowRentalModal] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    genre: '',
    year: 'all',
    availability: ['available'],
    minRating: ''
  });

  const allBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_15fe6e907-1764646533126.png",
    coverImageAlt: "Classic novel cover featuring art deco design with golden lights and dark blue background representing 1920s Jazz Age America",
    rating: 4.5,
    reviewCount: 2847,
    status: "available",
    category: "fiction",
    genre: "romance",
    publicationYear: 1925
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1531f0ae8-1764692280320.png",
    coverImageAlt: "Vintage book cover with tree silhouette against warm sunset sky depicting Southern Gothic literary classic",
    rating: 4.8,
    reviewCount: 3921,
    status: "available",
    category: "fiction",
    genre: "mystery",
    publicationYear: 1960
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1fd29f48f-1764646532421.png",
    coverImageAlt: "Dystopian novel cover featuring stark black and white design with surveillance eye symbolizing totalitarian control",
    rating: 4.7,
    reviewCount: 4156,
    status: "checked-out",
    category: "fiction",
    genre: "sci-fi",
    publicationYear: 1949
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_11089da79-1764646535427.png",
    coverImageAlt: "Elegant period romance novel cover with floral patterns and soft pastel colors representing Regency era England",
    rating: 4.6,
    reviewCount: 3245,
    status: "available",
    category: "fiction",
    genre: "romance",
    publicationYear: 1813
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_141fa9da6-1764775317246.png",
    coverImageAlt: "Coming-of-age novel cover with minimalist design featuring red hunting hat against urban New York City backdrop",
    rating: 4.3,
    reviewCount: 2634,
    status: "reserved",
    category: "fiction",
    genre: "adventure",
    publicationYear: 1951
  },
  {
    id: 6,
    title: "Harry Potter and the Philosopher\'s Stone",
    author: "J.K. Rowling",
    coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1b42025a8-1764692280873.png",
    coverImageAlt: "Magical fantasy novel cover showing young wizard with lightning scar, round glasses, and mystical castle in moonlit background",
    rating: 4.9,
    reviewCount: 5782,
    status: "available",
    category: "fiction",
    genre: "fantasy",
    publicationYear: 1997
  },
  {
    id: 7,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_13143a85e-1764677118655.png",
    coverImageAlt: "Epic fantasy adventure cover featuring mountain landscape with dragon silhouette and medieval-style typography",
    rating: 4.7,
    reviewCount: 4523,
    status: "available",
    category: "fiction",
    genre: "fantasy",
    publicationYear: 1937
  },
  {
    id: 8,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1eaa7dfa0-1764646532196.png",
    coverImageAlt: "Non-fiction history book cover with evolutionary timeline imagery showing human progression from ancient to modern civilization",
    rating: 4.6,
    reviewCount: 3891,
    status: "available",
    category: "non-fiction",
    genre: "history",
    publicationYear: 2011
  },
  {
    id: 9,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_183a032ac-1764646537259.png",
    coverImageAlt: "Scientific cosmology book cover displaying spiral galaxy with stars and cosmic phenomena against deep space background",
    rating: 4.4,
    reviewCount: 2967,
    status: "checked-out",
    category: "science",
    genre: "sci-fi",
    publicationYear: 1988
  },
  {
    id: 10,
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1964d669b-1765479615754.png",
    coverImageAlt: "Historical biography cover showing vintage diary with handwritten pages and black-and-white photograph from World War II era",
    rating: 4.8,
    reviewCount: 4234,
    status: "available",
    category: "biography",
    genre: "history",
    publicationYear: 1947
  },
  {
    id: 11,
    title: "The Da Vinci Code",
    author: "Dan Brown",
    coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_153c1b2bb-1764677117574.png",
    coverImageAlt: "Mystery thriller cover featuring Renaissance art symbols, cryptic codes, and dramatic lighting suggesting historical conspiracy",
    rating: 4.2,
    reviewCount: 3456,
    status: "available",
    category: "fiction",
    genre: "thriller",
    publicationYear: 2003
  },
  {
    id: 12,
    title: "Steve Jobs",
    author: "Walter Isaacson",
    coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_11fe723a1-1764809196009.png",
    coverImageAlt: "Technology biography cover with minimalist design showing iconic silhouette and Apple innovation imagery in monochrome style",
    rating: 4.5,
    reviewCount: 2789,
    status: "reserved",
    category: "biography",
    genre: "technology",
    publicationYear: 2011
  }];


  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setDisplayedBooks(allBooks);
      setFilteredBooks(allBooks);
      setLoading(false);
    }, 800);
  }, []);

  const applyFilters = useCallback(() => {
    let result = [...allBooks];

    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      result = result?.filter((book) =>
      book?.title?.toLowerCase()?.includes(query) ||
      book?.author?.toLowerCase()?.includes(query)
      );
    }

    if (filters?.category !== 'all') {
      result = result?.filter((book) => book?.category === filters?.category);
    }

    if (filters?.genre) {
      result = result?.filter((book) => book?.genre === filters?.genre);
    }

    if (filters?.year !== 'all') {
      if (filters?.year === 'older') {
        result = result?.filter((book) => book?.publicationYear < 2020);
      } else {
        result = result?.filter((book) => book?.publicationYear?.toString() === filters?.year);
      }
    }

    if (filters?.availability?.length > 0) {
      result = result?.filter((book) => filters?.availability?.includes(book?.status));
    }

    if (filters?.minRating) {
      result = result?.filter((book) => book?.rating >= parseFloat(filters?.minRating));
    }

    switch (sortBy) {
      case 'popularity':
        result?.sort((a, b) => b?.reviewCount - a?.reviewCount);
        break;
      case 'newest':
        result?.sort((a, b) => b?.publicationYear - a?.publicationYear);
        break;
      case 'oldest':
        result?.sort((a, b) => a?.publicationYear - b?.publicationYear);
        break;
      case 'title-asc':
        result?.sort((a, b) => a?.title?.localeCompare(b?.title));
        break;
      case 'title-desc':
        result?.sort((a, b) => b?.title?.localeCompare(a?.title));
        break;
      case 'rating':
        result?.sort((a, b) => b?.rating - a?.rating);
        break;
      default:
        break;
    }

    setFilteredBooks(result);
  }, [searchQuery, filters, sortBy]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      genre: '',
      year: 'all',
      availability: ['available'],
      minRating: ''
    });
    setSearchQuery('');
    setSortBy('relevance');
  };

  const handleAddToCart = (book) => {
    console.log('Added to cart:', book?.title);
  };

  const handleRentNow = (book) => {
    setSelectedBook(book);
    setShowRentalModal(true);
  };

  const handleConfirmRental = (book) => {
    navigate('/rental-checkout', { state: { book } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="flex">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            resultCount={filteredBooks?.length} />


          <div className="flex-1 min-w-0">
            <div className="sticky top-16 z-30 bg-background border-b border-border">
              <div className="px-4 lg:px-6 py-4 space-y-4">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="default"
                    onClick={() => setIsFilterOpen(true)}
                    iconName="SlidersHorizontal"
                    iconSize={20}
                    className="lg:hidden">

                    Filters
                  </Button>
                  <div className="flex-1">
                    <SearchBar
                      onSearch={setSearchQuery}
                      searchQuery={searchQuery} />

                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{filteredBooks?.length}</span> of{' '}
                    <span className="font-medium text-foreground">{allBooks?.length}</span> books
                  </p>
                  <SortControls
                    sortBy={sortBy}
                    onSortChange={setSortBy} />

                </div>
              </div>
            </div>

            <div className="px-4 lg:px-6 py-6">
              <BookGrid
                books={filteredBooks}
                loading={loading}
                onAddToCart={handleAddToCart}
                onRentNow={handleRentNow} />


              {!loading && filteredBooks?.length > 0 &&
              <div className="mt-8 flex justify-center">
                  <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                  iconSize={18}>

                    Load More Books
                  </Button>
                </div>
              }
            </div>
          </div>
        </div>
      </main>
      {showRentalModal &&
      <RentalModal
        book={selectedBook}
        onClose={() => setShowRentalModal(false)}
        onConfirm={handleConfirmRental} />

      }
    </div>);

};

export default BookCatalog;