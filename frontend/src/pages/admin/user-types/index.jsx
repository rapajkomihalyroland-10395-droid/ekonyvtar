import React, { useState, useEffect } from "react";
import { Plus, Eye, Trash2 } from "lucide-react";
import AddUserTypeModal from "./components/AddUserTypeModal";
import api from "../../../axios_url/baseURL.js";
import { getAuthHeader } from "store/authStore";

const AdminUserTypes = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [userTypes, setUserTypes] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchUserTypes();
  }, []);

  const fetchUserTypes = async () => {
    try {
      const response = await api.get("/user-types", {
        headers: getAuthHeader(),
      });
      setUserTypes(response.data);
    } catch (error) {
      console.error("Hiba a felhasználó típusok betöltésekor:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Biztosan archiválni/törölni szeretné?")) {
      try {
        await api.delete(`/user-types/${id}`, {
          headers: getAuthHeader(),
        });
        fetchUserTypes();
      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert("Nem törölhető, mert használatban van.");
        } else {
          console.error("Hiba a törlés során:", error);
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
    fetchUserTypes();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Felhasználó Típusok kezelése
          </h1>
          <p className="text-gray-500">
            Felhasználó típusok listázása és kezelése
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Új Felhasználó Típus
        </button>
      </div>

      <div className="rounded-md border bg-card text-card-foreground shadow-sm bg-white">
        <div className="p-0">
          <table className="w-full caption-bottom text-sm text-left">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                  ID
                </th>
                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                  Megnevezés
                </th>
                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                  Leírás
                </th>
                <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">
                  Műveletek
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {userTypes.map((item) => (
                <tr
                  key={item.id}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <td className="p-4 align-middle">{item.id}</td>
                  <td className="p-4 align-middle font-medium">
                    {item.megnevezes}
                  </td>
                  <td className="p-4 align-middle">{item.leiras}</td>
                  <td className="p-4 align-middle text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-primary transition-colors"
                        title="Módosítás"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-red-600 transition-colors"
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
          {userTypes.length === 0 && (
            <div className="p-4 text-center text-muted-foreground">
              Nincs megjeleníthető adat.
            </div>
          )}
        </div>
      </div>

      {isAddModalOpen && (
        <AddUserTypeModal
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          initialData={editingItem}
        />
      )}
    </div>
  );
};
export default AdminUserTypes;
