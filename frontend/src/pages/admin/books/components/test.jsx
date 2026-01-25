import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 10;

function BooksTable({ books }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredBooks = useMemo(() => {
    if (!search.trim()) return books;

    return books.filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [books, search]);

  const currentPageBooks = useMemo(() => {
    return filteredBooks.slice(currentIndex, currentIndex + PAGE_SIZE);
  }, [filteredBooks, currentIndex]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [search]);

  const nextPage = () => {
    if (currentIndex + PAGE_SIZE < filteredBooks.length) {
      setCurrentIndex((prev) => prev + PAGE_SIZE);
    }
  };

  const previousPage = () => {
    setCurrentIndex((prev) => Math.max(prev - PAGE_SIZE, 0));
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex + PAGE_SIZE >= filteredBooks.length;

  return (
    <div>
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Keresés könyv címre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TÁBLÁZAT */}
      <table>
        <thead>
          <tr>
            <th>Cím</th>
            <th>Szerző</th>
          </tr>
        </thead>
        <tbody>
          {currentPageBooks.map((book) => (
            <tr key={book.id} onClick={() => navigate(`/books/${book.id}`)}>
              <td>{book.title}</td>
              <td>{book.author}</td>
            </tr>
          ))}

          {currentPageBooks.length === 0 && (
            <tr>
              <td colSpan="2">Nincs találat</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div style={{ marginTop: 12 }}>
        <button onClick={previousPage} disabled={isPrevDisabled}>
          Előző
        </button>

        <span style={{ margin: "0 10px" }}>
          {Math.floor(currentIndex / PAGE_SIZE) + 1} /{" "}
          {Math.max(1, Math.ceil(filteredBooks.length / PAGE_SIZE))}
        </span>

        <button onClick={nextPage} disabled={isNextDisabled}>
          Következő
        </button>
      </div>
    </div>
  );
}

export default BooksTable;
