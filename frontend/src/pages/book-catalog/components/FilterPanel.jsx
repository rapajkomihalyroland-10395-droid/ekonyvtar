import React, { useEffect, useMemo, useState } from "react";
import Icon from "../../../components/AppIcon";
import Select from "../../../components/ui/Select";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { Checkbox } from "../../../components/ui/Checkbox";
import api from "../../../axios_url/baseURL.js";
import { getAuthHeader } from "../../../store/authStore.js";

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
    let active = true;

    const fetchCategories = async () => {
      try {
        const response = await api.get("/get-all-categories", {
          headers: getAuthHeader(),
        });

        if (!active) return;
        setApiCategories(Array.isArray(response.data) ? response.data : []);
      } catch {
        if (!active) return;
        setApiCategories([]);
      }
    };

    fetchCategories();
    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(() => {
    const base = [{ value: "all", label: "Összes kategória" }];
    const uniqueCategoryIds = new Set();
    const mapped = [];

    apiCategories.forEach((c) => {
      if (c?.id && c?.nev && !uniqueCategoryIds.has(c.id)) {
        uniqueCategoryIds.add(c.id);
        mapped.push({ value: c.id, label: c.nev });
      }
    });

    return base.concat(mapped);
  }, [apiCategories]);

  const sanitizeYear = (value) =>
    String(value || "")
      .replace(/[^\d]/g, "")
      .slice(0, 4);

  const sanitizeRating = (value) => {
    const digits = String(value || "").replace(/[^\d]/g, "");
    if (!digits) return "";

    const first = digits[0];
    const second = digits[1];

    const composed = second !== undefined ? `${first}.${second}` : first;
    const n = Number.parseFloat(composed);
    if (!Number.isFinite(n)) return "";

    const clamped = Math.max(0, Math.min(5, n));
    if (second !== undefined && clamped % 1 === 0) return clamped.toFixed(1);
    return String(clamped);
  };

  const normalizeRating = (value) => {
    const v = String(value || "")
      .replace(/,/g, ".")
      .trim();
    if (!v) return "";

    let normalized = v;
    if (/^\d+$/.test(normalized)) normalized = `${normalized}.0`;
    if (/^\d+\.$/.test(normalized)) normalized = `${normalized}0`;

    const n = Number.parseFloat(normalized);
    if (!Number.isFinite(n)) return "";
    const clamped = Math.max(0, Math.min(5, n));
    return clamped % 1 === 0 ? `${clamped.toFixed(1)}` : `${clamped}`;
  };

  const handleAvailabilityChange = (status, checked) => {
    onFilterChange("availability", checked ? [status] : []);
  };

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
        className={`fixed lg:static top-16 right-0 bottom-0 w-80 bg-card border-l lg:border-l-0 lg:border-r border-border shadow-overlay lg:shadow-none z-40 transform transition-transform duration-300 lg:transform-none overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
        aria-label="Book filters"
      >
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between lg:hidden z-10">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Filters
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-colors duration-200"
            aria-label="Close filters"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">
              {resultCount} {resultCount === 1 ? "Book" : "Books"} Found
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="RotateCcw"
              iconSize={16}
            >
              Clear
            </Button>
          </div>

          <div className="space-y-4">
            <Select
              label="Category"
              options={categories}
              value={filters?.category}
              onChange={(value) => onFilterChange("category", value)}
              placeholder="Select category"
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Publication Year
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="\\d*"
                  value={filters?.yearFrom}
                  onChange={(e) =>
                    onFilterChange("yearFrom", sanitizeYear(e?.target?.value))
                  }
                  placeholder="tól"
                />
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="\\d*"
                  value={filters?.yearTo}
                  onChange={(e) =>
                    onFilterChange("yearTo", sanitizeYear(e?.target?.value))
                  }
                  placeholder="ig"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Elérhetőség
              </label>
              <div className="space-y-2">
                <Checkbox
                  label="Elérhető"
                  checked={filters?.availability?.[0] === "available"}
                  onChange={(e) =>
                    handleAvailabilityChange("available", e?.target?.checked)
                  }
                />
                <Checkbox
                  label="Kikölcsönözve"
                  checked={filters?.availability?.[0] === "checked-out"}
                  onChange={(e) =>
                    handleAvailabilityChange("checked-out", e?.target?.checked)
                  }
                />
                <Checkbox
                  label="Foglalt"
                  checked={filters?.availability?.[0] === "reserved"}
                  onChange={(e) =>
                    handleAvailabilityChange("reserved", e?.target?.checked)
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Értékelés
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*[\\.]?[0-9]*"
                  value={filters?.minRating}
                  onChange={(e) =>
                    onFilterChange(
                      "minRating",
                      sanitizeRating(e?.target?.value)
                    )
                  }
                  onBlur={(e) =>
                    onFilterChange(
                      "minRating",
                      normalizeRating(e?.target?.value)
                    )
                  }
                  placeholder="min"
                />
                <Input
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*[\\.]?[0-9]*"
                  value={filters?.maxRating}
                  onChange={(e) =>
                    onFilterChange(
                      "maxRating",
                      sanitizeRating(e?.target?.value)
                    )
                  }
                  onBlur={(e) =>
                    onFilterChange(
                      "maxRating",
                      normalizeRating(e?.target?.value)
                    )
                  }
                  placeholder="max"
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
