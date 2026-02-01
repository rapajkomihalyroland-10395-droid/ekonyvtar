import React, { useState, useEffect } from "react";
import { X, Save, Building2 } from "lucide-react";
import api from "../../../../axios_url/baseURL.js";
import { getAuthHeader } from "store/authStore";

const AddPublisherModal = ({ isOpen, onClose, initialData = null }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    nev: "",
    szekhely: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nev: initialData.nev || "",
        szekhely: initialData.szekhely || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData) {
        await api.put(`/publishers/${initialData.id}`, formData, {
          headers: getAuthHeader(),
        });
      } else {
        await api.post("/publishers", formData, {
          headers: getAuthHeader(),
        });
      }
      onClose();
    } catch (error) {
      console.error("Hiba a mentés során:", error);
      alert(
        "Hiba történt a mentés során: " +
        (error.response?.data?.message || error.message),
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            {initialData ? "Kiadó Módosítása" : "Új Kiadó"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Kiadó neve
            </label>
            <input
              type="text"
              name="nev"
              value={formData.nev}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="pl. Móra Kiadó"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Székhely
            </label>
            <input
              type="text"
              name="szekhely"
              value={formData.szekhely}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="pl. 1134 Budapest, Váci út 19."
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Mégse
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md transition-colors flex items-center gap-2"
            >
              <Save size={16} />
              Mentés
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPublisherModal;
