import React, { useState } from "react";
import api from "../../../../axios_url/baseURL.js";
import {
  X,
  Upload,
  Book,
  User,
  Hash,
  List,
  Building2,
  Barcode,
  Layers,
  Calendar,
  Ruler,
  CheckSquare,
  Image as ImageIcon,
  DollarSign,
} from "lucide-react";

const AddBookModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    title: "",
    coverImage: null,
    description: "",
    author: "",
    publisher: "",
    category: "",
    isbn: "",
    inventoryNumber: "",
    stock: 1,
    loanable: true,
    kiadas_ev: "",
    height: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("cim", formData.title);
      data.append("szerzo", formData.author);
      data.append("kiado", formData.publisher);
      data.append("kategoria", formData.category);
      data.append("ISBN", formData.isbn);
      data.append("konyvtar_nyilvantartasi_szam", formData.inventoryNumber);
      data.append("keszlet", formData.stock);
      data.append("kolcsonozheto", formData.loanable);
      data.append("beszerzesi_ar", formData.price || 0);
      data.append("kiadas_ev", formData.kiadas_ev);
      data.append("magassag_cm", formData.height);
      data.append("leiras", formData.description);

      if (formData.coverImage) {
        data.append("coverImage", formData.coverImage);
      }

      await api.post("/new-book", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onClose();
      alert("Sikeres könyvfelvétel!");
    } catch (error) {
      alert(
        "Hiba történt a mentés során: " +
          (error.response?.data?.message || error.message),
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-card rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Book className="h-5 w-5 text-primary" />
            Új könyv felvétele
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <h3 className="font-semibold text-foreground border-b border-border pb-2">
                Alapadatok
              </h3>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Könyv címe
                </label>
                <div className="relative">
                  <Book className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    name="title"
                    required
                    className="w-full pl-10 pr-4 py-2 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none placeholder:text-muted-foreground"
                    placeholder="pl. Harry Potter és a Bölcsek Köve"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Szerző
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    name="author"
                    required
                    className="w-full pl-10 pr-4 py-2 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none placeholder:text-muted-foreground"
                    placeholder="pl. J.K. Rowling"
                    value={formData.author}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Kiadó
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    name="publisher"
                    required
                    className="w-full pl-10 pr-4 py-2 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none placeholder:text-muted-foreground"
                    placeholder="pl. Animus Kiadó"
                    value={formData.publisher}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Kategória
                </label>
                <div className="relative">
                  <List className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select
                    name="category"
                    className="w-full pl-10 pr-4 py-2 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none appearance-none"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Válassz kategóriát...</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="scifi">Sci-Fi</option>
                    <option value="history">Történelmi</option>
                    <option value="novel">Regény</option>
                    <option value="academic">Szakkönyv</option>
                    <option value="youth">Ifjúsági</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Kiadási év
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="number"
                    name="kiadas_ev"
                    max={new Date().getFullYear()}
                    className="w-full pl-10 pr-4 py-2 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none placeholder:text-muted-foreground"
                    placeholder="pl. 2024"
                    value={formData.kiadas_ev}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-semibold text-foreground border-b border-border pb-2">
                Technikai adatok
              </h3>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  ISBN szám
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    name="isbn"
                    required
                    className="w-full pl-10 pr-4 py-2 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none placeholder:text-muted-foreground"
                    placeholder="pl. 978-963-..."
                    value={formData.isbn}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Könyvtári nyilvántartási szám
                </label>
                <div className="relative">
                  <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    name="inventoryNumber"
                    required
                    className="w-full pl-10 pr-4 py-2 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none placeholder:text-muted-foreground"
                    placeholder="Egyedi azonosító"
                    value={formData.inventoryNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Készlet (db)
                  </label>
                  <div className="relative">
                    <Layers className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="number"
                      name="stock"
                      min="0"
                      required
                      className="w-full pl-10 pr-4 py-2 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                      value={formData.stock}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Magasság (cm)
                  </label>
                  <div className="relative">
                    <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="number"
                      name="height"
                      min="0"
                      step="0.1"
                      className="w-full pl-10 pr-4 py-2 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none placeholder:text-muted-foreground"
                      placeholder="pl. 21.5"
                      value={formData.height}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Beszerzési ár (Ft)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="number"
                    name="price"
                    min="0"
                    className="w-full pl-10 pr-4 py-2 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none placeholder:text-muted-foreground"
                    placeholder="pl. 3500"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Borítókép feltöltése
                </label>
                <div className="relative border-2 border-dashed border-border rounded-lg p-4 hover:bg-muted/50 transition-colors text-center cursor-pointer">
                  <input
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleChange}
                  />
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formData.coverImage
                        ? formData.coverImage.name
                        : "Kattints vagy húzd ide a képet"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-muted/30">
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="loanable"
                      name="loanable"
                      type="checkbox"
                      className="h-4 w-4 text-primary border-border bg-background rounded focus:ring-primary"
                      checked={formData.loanable}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="loanable"
                      className="font-medium text-foreground"
                    >
                      Kölcsönözhető
                    </label>
                    <p className="text-muted-foreground text-xs">
                      A könyv kivihető a könyvtárból
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Leírás
            </label>
            <textarea
              name="description"
              rows="4"
              className="w-full p-3 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none resize-none placeholder:text-muted-foreground"
              placeholder="Rövid leírás a könyvről..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-muted transition-colors"
            >
              Mégse
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors shadow-sm"
            >
              Könyv mentése
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
