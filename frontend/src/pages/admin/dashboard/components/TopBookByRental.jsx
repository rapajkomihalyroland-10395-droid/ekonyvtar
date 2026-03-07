import React, { useEffect, useState } from "react";
import { TrendingUp, BookOpen, AlertCircle } from "lucide-react";
import api from "../../../../axios_url/baseURL";
import { getAuthHeader } from "../../../../store/authStore";

const TopBookByRental = () => {
  const [topBooks, setTopBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        const response = await api.get("/top-books-by-rental", {
          headers: getAuthHeader(),
        });
        setTopBooks(response.data);
      } catch (err) {
        console.error("Error fetching top books:", err);
        setError("Nem sikerült betölteni a népszerű könyveket.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopBooks();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full flex flex-col items-center justify-center text-red-500">
        <AlertCircle className="h-8 w-8 mb-2" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <TrendingUp className="mr-2 h-5 w-5 text-primary" />
        Legnépszerűbb könyvek
      </h3>

      {topBooks.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <BookOpen className="h-10 w-10 mx-auto mb-2 opacity-20" />
          <p>Még nincs kölcsönzési adat.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {topBooks.map((book, index) => (
            <div
              key={book.id || index}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
            >
              <div className="flex items-center gap-4">
                {book.kep ? (
                  <img
                    src={book.kep}
                    alt={book.cim}
                    className="w-10 h-14 object-cover rounded shadow-sm flex-shrink-0"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/no_image.png";
                    }}
                  />
                ) : (
                  <div className="w-10 h-14 bg-gray-200 rounded shadow-sm flex-shrink-0 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-gray-400" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                    {book.cim}
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {book.szerzo}
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0 pl-2">
                <span className="block font-bold text-gray-900">
                  {book.elofordulas}
                </span>
                <span className="text-xs text-gray-500">kölcsönzés</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopBookByRental;
