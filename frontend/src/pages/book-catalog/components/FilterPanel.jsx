import React, { useEffect, useState } from "react";
import api from "../../../axios_url/baseURL.js";

const FilterPanel = ({
  filters,
  onFilterChange,
  onClearFilters,
  isOpen,
  onClose,
  resultCount,
}) => {
  const [apiCategories, setApiCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/get-all-categories");
        if (response.data) {
          setApiCategories(response.data);
        } else {
          setApiCategories([]);
        }
      } catch (error) {
        setApiCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const buildCategories = () => {
    const categories = [{ value: "all", label: "Összes kategória" }];

    apiCategories.forEach((category) => {
      if (category && category.id && category.nev) {
        categories.push({ value: category.id, label: category.nev });
      }
    });

    return categories;
  };

  const categories = buildCategories();

  const cleanRating = (value) => {
    let cleaned = String(value || "").replace(/[^\d]/g, "");

    if (cleaned.length === 0) return "";
    if (cleaned.length === 1) return cleaned;

    const first = cleaned[0];
    const second = cleaned[1];
    let rating = second ? `${first}.${second}` : first;

    let number = parseFloat(rating);
    if (isNaN(number)) return "";

    number = Math.max(0, Math.min(5, number));

    return String(number);
  };

  const normalizeRating = (value) => {
    let cleaned = String(value || "").replace(",", ".");

    if (cleaned.length === 0) return "";

    if (/^\d+$/.test(cleaned)) cleaned = `${cleaned}.0`;
    if (/^\d+\.$/.test(cleaned)) cleaned = `${cleaned}0`;

    let number = parseFloat(cleaned);
    if (isNaN(number)) return "";

    number = Math.max(0, Math.min(5, number));

    return number.toFixed(1);
  };

  const inputClass =
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-16 lg:top-20 right-0 bottom-0 
          lg:h-[calc(100vh-5rem)] w-80 bg-card border-l lg:border-l-0 lg:border-r 
          border-border shadow-overlay lg:shadow-none z-40 transform 
          transition-transform duration-300 lg:transform-none overflow-y-auto
          ${isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
        `}
        aria-label="Book filters"
      >
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between lg:hidden z-10">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Szűrők
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-colors duration-200"
            aria-label="Szűrők bezárása"
          >
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
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 18 18" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">
              {resultCount} {resultCount === 1 ? "könyv" : "könyv"} található
            </h3>
            <button
              onClick={onClearFilters}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3"
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
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              Törlés
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Kategória
              </label>
              <select
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={filters?.category || ""}
                onChange={(e) => onFilterChange("category", e.target.value)}
              >
                <option value="" disabled>
                  Válassz kategóriát
                </option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Készlet
              </label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="pre-order-only"
                    className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    checked={filters?.preOrderOnly || false}
                    onChange={(e) =>
                      onFilterChange("preOrderOnly", e.target.checked)
                    }
                  />
                  <label
                    htmlFor="pre-order-only"
                    className="text-sm font-medium leading-none"
                  >
                    Előrendelhető
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="in-stock-only"
                    className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    checked={filters?.inStockOnly || false}
                    onChange={(e) =>
                      onFilterChange("inStockOnly", e.target.checked)
                    }
                  />
                  <label
                    htmlFor="in-stock-only"
                    className="text-sm font-medium leading-none"
                  >
                    Elérhető
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Értékelés
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*[\.]?[0-9]*"
                  value={filters?.minRating || ""}
                  onChange={(e) =>
                    onFilterChange("minRating", cleanRating(e.target.value))
                  }
                  onBlur={(e) =>
                    onFilterChange("minRating", normalizeRating(e.target.value))
                  }
                  placeholder="min"
                  className={inputClass}
                />
                <input
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*[\.]?[0-9]*"
                  value={filters?.maxRating || ""}
                  onChange={(e) =>
                    onFilterChange("maxRating", cleanRating(e.target.value))
                  }
                  onBlur={(e) =>
                    onFilterChange("maxRating", normalizeRating(e.target.value))
                  }
                  placeholder="max"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterPanel;
