import React, { useEffect, useState } from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BookListTable = ({ books, isLoading }) => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentPage(books.slice(0, 10));
  }, [books]);

  const nextPage = () => {
    const nextIndex = currentIndex + 10;
    setCurrentPage(books.slice(nextIndex, nextIndex + 10));
    setCurrentIndex(nextIndex);
  };

  const previousPage = () => {
    const nextIndex = Math.max(currentIndex - 10, 0);
    setCurrentPage(books.slice(nextIndex, nextIndex + 10));
    setCurrentIndex(nextIndex);
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Betöltés...</div>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
          <tr>
            <th className="px-6 py-4">Cím / ISBN</th>
            <th className="px-6 py-4">Szerző</th>
            <th className="px-6 py-4">Kategória</th>
            <th className="px-6 py-4">Státusz</th>
            <th className="px-6 py-4 text-center">Példányok</th>
            <th className="px-6 py-4 text-right">Műveletek</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {currentPage.map((book) => (
            <tr key={book.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div>
                  <div className="font-medium text-gray-900">{book.cim}</div>
                  <div className="text-xs text-gray-500 font-mono mt-0.5">
                    {book.ISBN}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-600">{book.author}</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                  {book.category}
                </span>
              </td>

              <td className="px-6 py-4 text-center">
                {Number(book.keszlet ?? 0) === 0 ?
                  <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                    Nincs készleten
                  </span>
                : <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    Készleten
                  </span>
                }
              </td>
              <td className="px-6 py-4 text-center">
                <span className="font-medium text-gray-900">
                  {book.keszlet}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => navigate(`/admin/books/${book.id}`)}
                    className="p-1.5 text-gray-500 hover:text-primary hover:bg-primary/10 rounded transition-colors"
                    title="Megtekintés"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Szerkesztés"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Törlés"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {books.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-gray-500">Nincs megjeleníthető könyv.</p>
        </div>
      )}
      <div className="flex items-center justify-between gap-3 p-4 border-t border-gray-200">
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
  );
};

export default BookListTable;
