import React, { useEffect, useState, useMemo } from "react";
import { Eye, Search, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BookListTable = ({ books, isLoading }) => {
  const navigate = useNavigate();
  const page_size = 10;

  const [search, setSearch] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredBooks = useMemo(() => {
    if (!search.trim()) return books;

    return books.filter((book) =>
      book.cim.toLowerCase().includes(search.toLowerCase()),
    );
  }, [books, search]);

  const currentPageBooks = useMemo(() => {
    return filteredBooks.slice(currentIndex, currentIndex + page_size);
  }, [filteredBooks, currentIndex]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [search]);

  const nextPage = () => {
    if (currentIndex + page_size < filteredBooks.length) {
      setCurrentIndex((prev) => prev + page_size);
    }
  };

  const previousPage = () => {
    setCurrentIndex((prev) => Math.max(prev - page_size, 0));
  };
  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">Betöltés...</div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 bg-card p-4 rounded-lg border border-border shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Keresés cím, szerző vagy ISBN alapján..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm mt-4">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-muted-foreground font-medium border-b border-border">
            <tr>
              <th className="px-6 py-4">Cím / ISBN</th>
              <th className="px-6 py-4">Szerző</th>
              <th className="px-6 py-4">Kategória</th>
              <th className="px-6 py-4">Aktuális kölcsönző</th>
              <th className="px-6 py-4">Státusz</th>
              <th className="px-6 py-4 text-center">Példányok</th>
              <th className="px-6 py-4 text-right">Műveletek</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {currentPageBooks.map((book) => (
              <tr key={book.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-foreground">
                      {book.cim}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono mt-0.5">
                      {book.ISBN}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {book.author}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-muted text-foreground">
                    {book.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {book.current_borrower ? (
                    <div>
                      <div className="font-medium text-foreground">
                        {book.current_borrower}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {book.current_borrower_type}
                      </div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground italic text-xs">
                      -
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-center">
                  {Number(book.keszlet ?? 0) === 0 ? (
                    <span className="inline-flex items-center rounded-full bg-red-500/10 px-2 py-1 text-xs font-medium text-red-500 ring-1 ring-inset ring-red-500/20">
                      Nincs készleten
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500 ring-1 ring-inset ring-green-500/20">
                      Készleten
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="font-medium text-foreground">
                    {book.keszlet}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => navigate(`/admin/books/${book.id}`)}
                      className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors"
                      title="Megtekintés"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={async () => {
                        if (
                          window.confirm(
                            "Biztosan törölni szeretnéd ezt a könyvet?",
                          )
                        ) {
                          try {
                            const { default: api } =
                              await import("../../../../axios_url/baseURL.js");
                            await api.delete(`/delete-a-book/${book.id}`);
                            alert("Sikeres törlés!");
                            window.location.reload();
                          } catch (error) {
                            alert(
                              "Hiba: " +
                                (error.response?.data?.message ||
                                  error.message),
                            );
                          }
                        }
                      }}
                      className="p-1.5 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Törlés"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {books.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">Nincs megjeleníthető könyv.</p>
          </div>
        )}
        <div className="flex items-center justify-between gap-3 p-4 border-t border-border">
          <button
            type="button"
            onClick={previousPage}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
          >
            Előző
          </button>
          <button
            type="button"
            onClick={nextPage}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
          >
            Következő
          </button>
        </div>
      </div>
    </>
  );
};

export default BookListTable;
