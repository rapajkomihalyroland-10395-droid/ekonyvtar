import React, { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import BookListTable from "./components/BookListTable";
import AddBookModal from "./components/AddBookModal";
import api from "../../../axios_url/baseURL.js";

const AdminBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [books, setBooks] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const isAddModalOpen = searchParams.get("action") === "new";

  useEffect(() => {
    const GetBooks = async () => {
      try {
        const response = await api.get("/get-all-books");

        if (response.data != [] || response.data != null)
          setBooks(response.data);
      } catch (error) {
      }
    };

    if (filterStatus === "all") {
      GetBooks();
    }
  }, [filterStatus]);

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
          onClick={() => setSearchParams({ action: "new" })}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Új könyv
        </button>
      </div>

      <BookListTable books={books} isLoading={false} />

      {isAddModalOpen && (
        <AddBookModal
          isOpen={isAddModalOpen}
          onClose={() => setSearchParams({})}
        />
      )}
    </div>
  );
};

export default AdminBooks;
