import React, { useState, useEffect } from "react";
import { X, Save, School } from "lucide-react";
import api from "../../../../axios_url/baseURL.js";

const AddSchoolModal = ({ isOpen, onClose, initialData = null }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    neve: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        neve: initialData.neve || "",
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
        await api.put(`/schools/${initialData.id}`, formData);
      } else {
        await api.post("/schools", formData);
      }
      onClose();
    } catch (error) {
      alert(
        "Hiba történt a mentés során: " +
          (error.response?.data?.message || error.message),
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-card rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <School className="h-5 w-5 text-primary" />
            {initialData ? "Iskola Módosítása" : "Új Iskola"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Iskola neve
            </label>
            <input
              type="text"
              name="neve"
              value={formData.neve}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-border bg-background text-foreground px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
              placeholder="pl. Kossuth Lajos Gimnázium"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-md transition-colors"
            >
              Mégse
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors flex items-center gap-2"
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

export default AddSchoolModal;
