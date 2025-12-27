import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import Button from "../../components/ui/Button";
import FilterPanel from "./components/FilterPanel";
import SearchBar from "./components/SearchBar";
import SortControls from "./components/SortControls";
import BookGrid from "./components/BookGrid";
import RentalModal from "./components/RentalModal";
import api from "../../axios_url/baseURL.js";
import { getAuthHeader } from "../../store/authStore.js";

const BookCatalog = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [apiBooks, setApiBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  const [filters, setFilters] = useState({
    category: "all",
    yearFrom: "",
    yearTo: "",
    availability: ["available"],
    minRating: "",
    maxRating: "",
  });

  const [selectedBook, setSelectedBook] = useState(null);
  const [showRentalModal, setShowRentalModal] = useState(false);

  /* -------------------- API FETCH -------------------- */

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);

      try {
        const response = await api.get("/top-books", {
          headers: getAuthHeader(),
        });

        const books = (response.data || []).map((b) => {
          const popularity = Number(b.elofordulas ?? 0);
          const inventory = Number(b.keszlet ?? 0);
          const borrowable = b.kolcsonozheto !== false;
          const status = !borrowable
            ? "reserved"
            : inventory > 0
            ? "available"
            : "checked-out";

          return {
            id: b.id,
            title: b.cim,
            author: b.szerzo,
            coverImage: b.kep,
            coverImageAlt: b.cim,
            rating:
              Number.parseFloat(String(b.csillagok ?? 0).replace(/,/g, ".")) ||
              0,
            reviewCount: popularity,
            status,
            category: b.kategoria,
            categoryId: b.kategoria_id,
            publicationYear: b.kiadas_ev,
          };
        });

        setApiBooks(books);
        setFilteredBooks(books);
      } catch (error) {
        setApiBooks([]);
        setFilteredBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  /* -------------------- FILTER + SEARCH + SORT -------------------- */

  useEffect(() => {
    let result = [...apiBooks];

    const parseRating = (value) => {
      if (!value && value !== 0) return null;
      const s = String(value).replace(/,/g, ".").trim();
      if (!s) return null;
      const n = Number.parseFloat(s);
      return Number.isFinite(n) ? n : null;
    };

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );
    }

    // Category
    if (filters.category !== "all") {
      result = result.filter((b) => b.categoryId === filters.category);
    }

    // Year range (from-to)
    const yearFrom = filters.yearFrom ? Number(filters.yearFrom) : null;
    const yearTo = filters.yearTo ? Number(filters.yearTo) : null;
    if (Number.isFinite(yearFrom)) {
      result = result.filter((b) => Number(b.publicationYear) >= yearFrom);
    }
    if (Number.isFinite(yearTo)) {
      result = result.filter((b) => Number(b.publicationYear) <= yearTo);
    }

    // Availability
    if (filters.availability.length) {
      result = result.filter((b) => filters.availability.includes(b.status));
    }

    // Min rating
    const minRating = parseRating(filters.minRating);
    const maxRating = parseRating(filters.maxRating);
    const min = minRating !== null ? minRating : null;
    const max = maxRating !== null ? maxRating : null;
    const lower = min !== null && max !== null ? Math.min(min, max) : min;
    const upper = min !== null && max !== null ? Math.max(min, max) : max;

    if (lower !== null) {
      result = result.filter((b) => Number(b.rating) >= lower);
    }

    // Max rating
    if (upper !== null) {
      result = result.filter((b) => Number(b.rating) <= upper);
    }

    // Sorting
    switch (sortBy) {
      case "popularity":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "newest":
        result.sort((a, b) => b.publicationYear - a.publicationYear);
        break;
      case "oldest":
        result.sort((a, b) => a.publicationYear - b.publicationYear);
        break;
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredBooks(result);
  }, [apiBooks, searchQuery, filters, sortBy]);

  /* -------------------- HANDLERS -------------------- */

  const handleClearFilters = () => {
    setFilters({
      category: "all",
      yearFrom: "",
      yearTo: "",
      availability: ["available"],
      minRating: "",
      maxRating: "",
    });
    setSearchQuery("");
    setSortBy("relevance");
  };

  const handleRentNow = (book) => {
    setSelectedBook(book);
    setShowRentalModal(true);
  };

  const handleConfirmRental = (book) => {
    navigate("/rental-checkout", { state: { book } });
  };

  /* -------------------- RENDER -------------------- */

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16 flex">
        <FilterPanel
          filters={filters}
          onFilterChange={(k, v) => setFilters((prev) => ({ ...prev, [k]: v }))}
          onClearFilters={handleClearFilters}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          resultCount={filteredBooks.length}
        />

        <div className="flex-1 min-w-0">
          <div className="sticky top-16 z-30 bg-background border-b border-border px-4 lg:px-6 py-4 space-y-4">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden"
                iconName="SlidersHorizontal"
              >
                Filters
              </Button>

              <SearchBar searchQuery={searchQuery} onSearch={setSearchQuery} />
            </div>

            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {filteredBooks.length}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                  {apiBooks.length}
                </span>{" "}
                books
              </p>

              <SortControls sortBy={sortBy} onSortChange={setSortBy} />
            </div>
          </div>

          <div className="px-4 lg:px-6 py-6">
            <BookGrid
              books={filteredBooks}
              loading={loading}
              onRentNow={handleRentNow}
            />

            {!loading && filteredBooks.length > 0 && (
              <div className="mt-8 flex justify-center">
                <Button variant="outline" iconName="RefreshCw">
                  Load More Books
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {showRentalModal && (
        <RentalModal
          book={selectedBook}
          onClose={() => setShowRentalModal(false)}
          onConfirm={handleConfirmRental}
        />
      )}
    </div>
  );
};

export default BookCatalog;
