import React, { useState, useEffect } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import BookListTable from "./components/BookListTable";
import AddBookModal from "./components/AddBookModal";

const AdminBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("action") === "new") {
      setIsAddModalOpen(true);
    }
  }, [searchParams]);

  
  const books = [
    {
      id: 1,
      title: "Harry Potter és a Bölcsek Köve",
      author: "J.K. Rowling",
      isbn: "9789638386894",
      category: "Fantasy",
      status: "active",
      availableCopies: 3,
      totalCopies: 5,
    },
    {
      id: 2,
      title: "A Gyűrűk Ura",
      author: "J.R.R. Tolkien",
      isbn: "9789630793660",
      category: "Fantasy",
      status: "active",
      availableCopies: 0,
      totalCopies: 2,
    },
    {
      id: 3,
      title: "Egri csillagok",
      author: "Gárdonyi Géza",
      isbn: "9789631193321",
      category: "Történelmi regény",
      status: "maintenance",
      availableCopies: 10,
      totalCopies: 12,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Könyvek kezelése</h1>
          <p className="text-gray-500">
            Könyvek listázása, szerkesztése és új könyvek felvétele
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Új könyv
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Keresés cím, szerző vagy ISBN alapján..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Minden státusz</option>
            <option value="active">Elérhető</option>
            <option value="checked-out">Kikölcsönözve</option>
            <option value="maintenance">Selejtezett/Lezárt</option>
          </select>
        </div>
      </div>

      <BookListTable books={books} isLoading={false} />

      <AddBookModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default AdminBooks;
