import React, { useState, useEffect } from "react";
import { Plus, Eye, Trash2 } from "lucide-react";
import AddAuthorModal from "./components/AddAuthorModal";
import api from "../../../axios_url/baseURL.js";

const AdminAuthors = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await api.get("/authors");
      setAuthors(response.data);
    } catch (error) {
      console.error("Hiba a szerzők lekérésekor:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Biztosan archiválni/törölni szeretné?")) {
      try {
        await api.delete(`/authors/${id}`);
        fetchAuthors();
      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert("Nem törölhető, mert használatban van.");
        } else {
          alert("Hiba történt a törlés során.");
        }
      }
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingItem(null);
    fetchAuthors();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Szerzők kezelése
          </h1>
          <p className="text-muted-foreground">
            Szerzők listázása és kezelése
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Új Szerző
        </button>
      </div>

      <div className="rounded-md border border-border bg-card text-card-foreground shadow-sm">
        <div className="p-0">
          <table className="w-full caption-bottom text-sm text-left">
            <thead className="[&_tr]:border-b border-border">
              <tr className="border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                  ID
                </th>
                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                  Név
                </th>
                <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">
                  Műveletek
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0 divide-y divide-border">
              {authors.map((item) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <td className="p-4 align-middle text-foreground">
                    {item.id}
                  </td>
                  <td className="p-4 align-middle font-medium text-foreground">
                    {item.nev}
                  </td>
                  <td className="p-4 align-middle text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-primary transition-colors"
                        title="Módosítás"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-red-600 transition-colors"
                        title="Archiválás/Törlés"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {authors.length === 0 && (
            <div className="p-4 text-center text-muted-foreground">
              Nincs megjeleníthető adat.
            </div>
          )}
        </div>
      </div>

      {isAddModalOpen && (
        <AddAuthorModal
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          author={editingItem}
        />
      )}
    </div>
  );
};
export default AdminAuthors;