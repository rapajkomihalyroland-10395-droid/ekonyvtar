import React, { useEffect, useState } from "react";
import {
  Search,
  User,
  Book,
  Calendar,
  Check,
  ArrowRight,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../../axios_url/baseURL.js";
import { getAuthHeader } from "store/authStore";

const CreateLoan = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [searchBook, setSearchBook] = useState("");
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!searchUser.trim()) {
        setUsers([]);
        return;
      }

      try {
        const response = await api.post(
          "/search-name-by-character",
          {
            name: searchUser,
          },
          {
            headers: getAuthHeader(),
          },
        );

        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchData();
  }, [searchUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (!searchBook.trim()) {
        setBooks([]);
        return;
      }

      try {
        const response = await api.post(
          "/search-book-by-character",
          {
            book: searchBook,
          },
          {
            headers: getAuthHeader(),
          },
        );

        setBooks(response.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchData();
  }, [searchBook]);

  const filteredBooks = books;

  const handleCreateLoan = async () => {
    try {
      await api.post(
        "/book-loan",
        {
          user_id: selectedUser.id,
          book_id: selectedBook.id,
          end_loan: dueDate,
        },
        {
          headers: getAuthHeader(),
        },
      );
      navigate("/admin");
    } catch (error) {
      console.error("Loan creation failed:", error);
      alert(error.response?.data?.message || "Hiba történt a kölcsönzés során");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Új kölcsönzés rögzítése
          </h1>
          <p className="text-gray-500">
            Válassz felhasználót és könyvet a kölcsönzéshez
          </p>
        </div>
        <button
          onClick={() => navigate("/admin")}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
        >
          <X size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {}
        <div className="lg:col-span-2 space-y-6">
          {}
          <div
            className={`bg-white rounded-xl shadow-sm border transition-all duration-200 ${
              selectedUser
                ? "border-primary/50 ring-1 ring-primary/20"
                : "border-gray-200"
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      selectedUser
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    1
                  </div>
                  Felhasználó kiválasztása
                </h3>
                {selectedUser && (
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="text-sm text-primary hover:underline"
                  >
                    Módosítás
                  </button>
                )}
              </div>

              {!selectedUser ? (
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                      placeholder="Keresés név vagy email alapján..."
                      value={searchUser}
                      onChange={(e) => setSearchUser(e.target.value)}
                    />
                  </div>
                  <div className="border rounded-lg divide-y divide-gray-100 max-h-60 overflow-y-auto">
                    {users.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => setSelectedUser(user)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {user.nev.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.nev}
                          </p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <span className="ml-auto text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-600">
                          {user.role}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    {selectedUser.nev.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {selectedUser.nev}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedUser.email}
                    </p>
                  </div>
                  <Check className="ml-auto text-primary h-6 w-6" />
                </div>
              )}
            </div>
          </div>

          {}
          <div
            className={`bg-white rounded-xl shadow-sm border transition-all duration-200 ${
              selectedBook
                ? "border-primary/50 ring-1 ring-primary/20"
                : "border-gray-200"
            } ${!selectedUser ? "opacity-50 pointer-events-none" : ""}`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      selectedBook
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    2
                  </div>
                  Könyv kiválasztása
                </h3>
                {selectedBook && (
                  <button
                    onClick={() => setSelectedBook(null)}
                    className="text-sm text-primary hover:underline"
                  >
                    Módosítás
                  </button>
                )}
              </div>

              {!selectedBook ? (
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                      placeholder="Keresés cím, szerző vagy ISBN alapján..."
                      value={searchBook}
                      onChange={(e) => setSearchBook(e.target.value)}
                    />
                  </div>
                  <div className="border rounded-lg divide-y divide-gray-100 max-h-60 overflow-y-auto">
                    {filteredBooks.map((book) => (
                      <button
                        key={book.id}
                        disabled={book.keszlet === 0}
                        onClick={() => setSelectedBook(book)}
                        className={`w-full flex items-center gap-3 p-3 transition-colors text-left ${
                          book.keszlet === 0
                            ? "opacity-50 cursor-not-allowed bg-gray-50"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="w-10 h-14 bg-gray-200 rounded shadow-sm flex-shrink-0">
                          {book.kep ? (
                            <img
                              src={book.kep}
                              alt={book.cim}
                              className="w-full h-full object-cover rounded"
                            />
                          ) : null}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {book.cim}
                          </p>
                          <p className="text-sm text-gray-500">
                            {book.szerzo?.nev || "Ismeretlen szerző"}
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded ${
                              book.keszlet > 0
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {book.keszlet > 0
                              ? `${book.keszlet} elérhető`
                              : "Nincs készleten"}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <div className="w-12 h-16 bg-gray-200 rounded shadow-sm flex-shrink-0">
                    {selectedBook.kep ? (
                      <img
                        src={selectedBook.kep}
                        alt={selectedBook.cim}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : null}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {selectedBook.cim}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedBook.szerzo?.nev || "Ismeretlen szerző"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      ISBN: {selectedBook.ISBN}
                    </p>
                  </div>
                  <Check className="ml-auto text-primary h-6 w-6" />
                </div>
              )}
            </div>
          </div>
        </div>

        {}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Összesítés
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Kölcsönző</p>
                  <p className="text-gray-900 font-medium">
                    {selectedUser ? selectedUser.nev : "-"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Book className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Könyv</p>
                  <p className="text-gray-900 font-medium">
                    {selectedBook ? selectedBook.cim : "-"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                <div className="w-full">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Határidő
                  </p>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              disabled={!selectedUser || !selectedBook}
              onClick={handleCreateLoan}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Kölcsönzés rögzítése
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLoan;
