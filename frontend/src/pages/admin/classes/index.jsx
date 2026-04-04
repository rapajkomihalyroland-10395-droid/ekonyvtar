import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AddClassModal from "./components/AddClassModal";
import api from "../../../axios_url/baseURL.js";

const AdminClasses = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await api.get("/classes");
      setClasses(response.data);
    } catch (error) {
      console.error("Hiba az osztályok lekérésekor:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Biztosan törölni szeretné ezt az osztályt?")) {
      try {
        await api.delete(`/classes/${id}`);
        fetchClasses();
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
    fetchClasses();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Osztályok kezelése
          </h1>
          <p className="text-muted-foreground">
            Rendszerben lévő osztályok áttekintése és szerkesztése
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          Új Osztály
        </button>
      </div>

      <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-border bg-muted/50 transition-colors">
                <th className="h-12 px-4 align-middle font-semibold text-muted-foreground w-[80px]">
                  ID
                </th>
                <th className="h-12 px-4 align-middle font-semibold text-muted-foreground">
                  Osztály jelölés
                </th>
                <th className="h-12 px-4 align-middle font-semibold text-muted-foreground">
                  Évfolyam
                </th>
                <th className="h-12 px-4 align-middle font-semibold text-muted-foreground">
                  Tagozat
                </th>
                <th className="h-12 px-4 align-middle font-semibold text-muted-foreground text-right w-[120px]">
                  Műveletek
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {classes.map((item) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-muted/30"
                >
                  <td className="p-4 align-middle text-foreground">
                    {item.id}
                  </td>
                  <td className="p-4 align-middle font-medium text-foreground">
                    {item.osztaly_jeloles}
                  </td>
                  <td className="p-4 align-middle text-foreground">
                    {item.evfolyam}. évfolyam
                  </td>
                  <td className="p-4 align-middle text-foreground">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary border border-primary/20">
                      {item.tagozat || "Nincs megadva"}
                    </span>
                  </td>
                  <td className="p-4 align-middle text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-primary transition-all active:scale-95"
                        title="Szerkesztés"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-red-600 transition-all active:scale-95"
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
        </div>
        {classes.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-muted-foreground italic">Nincs megjeleníthető osztály.</p>
          </div>
        )}
      </div>

      {isAddModalOpen && (
        <AddClassModal
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          initialData={editingItem}
        />
      )}
    </div>
  );
};

export default AdminClasses;
