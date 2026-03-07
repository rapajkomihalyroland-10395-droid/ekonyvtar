import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import Button from "../../components/ui/Button";
import FilterPanel from "./components/FilterPanel";
import SearchBar from "./components/SearchBar";
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

  const [filters, setFilters] = useState({
    category: "all",
    yearFrom: "",
    inStockOnly: false,
    preOrderOnly: false,
    minRating: "",
    maxRating: "",
  });

  const [selectedBook, setSelectedBook] = useState(null);
  const [showRentalModal, setShowRentalModal] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);

      try {
        const response = await api.get("/user-get-books", {
          headers: getAuthHeader(),
        });

        const books = (response.data || []).map((b) => {
          const popularity = Number(b.elofordulas ?? 0);
          const inventory = Number(b.keszlet ?? 0);
          const status = inventory > 0 ? "elérhető" : "előrendelhető";

          return {
            id: b.id,
            title: b.cim,
            author: b.szerzo?.nev || "Ismeretlen szerző",
            coverImage: b.kep,
            coverImageAlt: b.cim,
            rating:
              Number.parseFloat(
                String(b.csillag_ertekeles ?? 0).replace(/,/g, "."),
              ) || 0,
            reviewCount: popularity,
            status,
            category: b.kategoria?.nev || "Ismeretlen kategória",
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

  useEffect(() => {
    let result = [...apiBooks];

    const parseRating = (value) => {
      if (!value && value !== 0) return null;
      const s = String(value).replace(/,/g, ".").trim(); //stringé alakítás replace-al globálisan nézzük és a vesszőket pontokra cseréljük + a szóközt elől hátul levágjuk
      if (!s) return null;
      const n = Number.parseFloat(s);
      return Number.isFinite(n) ? n : null;
    };

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q),
      );
    }

    if (filters.category !== "all") {
      result = result.filter((b) => b.categoryId === Number(filters.category));
    }

    const yearFrom = filters.yearFrom ? Number(filters.yearFrom) : null;
    if (Number.isFinite(yearFrom)) {
      result = result.filter((b) => Number(b.publicationYear) === yearFrom);
    }

    if (filters.inStockOnly && !filters.preOrderOnly) {
      result = result.filter((b) => b.status === "elérhető");
    }

    if (filters.preOrderOnly && !filters.inStockOnly) {
      result = result.filter((b) => b.status === "előrendelhető");
    }

    const minRating = parseRating(filters.minRating);
    const maxRating = parseRating(filters.maxRating);
    const min = minRating !== null ? minRating : null;
    const max = maxRating !== null ? maxRating : null;
    //Beírt értékek helyes vizsgálata a tól ne legyen nagyobb az ig és fordítva az ig ne legyen kisebb mint mint a tól
    const lower = min !== null && max !== null ? Math.min(min, max) : min;
    const upper = min !== null && max !== null ? Math.max(min, max) : max;

    if (lower !== null) {
      result = result.filter((b) => Number(b.rating) >= lower);
    }

    if (upper !== null) {
      result = result.filter((b) => Number(b.rating) <= upper);
    }

    setFilteredBooks(result);
  }, [apiBooks, searchQuery, filters]);

  const handleClearFilters = () => {
    setFilters({
      category: "all",
      yearFrom: "",
      inStockOnly: false,
      preOrderOnly: false,
      minRating: "",
      maxRating: "",
    });
    setSearchQuery("");
  };

  const handleRentNow = (book) => {
    setSelectedBook(book);
    setShowRentalModal(true);
  };

  const handleConfirmRental = (book) => {
    navigate("/rental-checkout", { state: { book } });
  };

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
                Szűrők
              </Button>

              <SearchBar searchQuery={searchQuery} onSearch={setSearchQuery} />
            </div>

            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {filteredBooks.length}
                </span>{" "}
                könyv megjelenítve az összes{" "}
                <span className="font-medium text-foreground">
                  {apiBooks.length}
                </span>{" "}
                könyvből
              </p>
            </div>
          </div>

          <div className="px-4 lg:px-6 py-6">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <BookGrid
                books={filteredBooks}
                loading={loading}
                onRentNow={handleRentNow}
              />
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
