import React, { useState } from "react";
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
    publicationYear: "",
    height: "",
  });

  /*      cim,
      kep,
      leiras,
      szerzo,
      kiado,
      kategoria,
      ISBN,
      konyvtar_nyilvantartasi_szam,
      keszlet,
      kolcsonozheto,
      beszerzesi_ar,
      kiadas_ev,
      magassag_cm, */

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Book className="h-5 w-5 text-primary" />
            Új könyv felvétele
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bal oszlop - Alapadatok */}
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900 border-b pb-2">
                Alapadatok
              </h3>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Könyv címe
                </label>
                <div className="relative">
                  <Book className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="title"
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                    placeholder="pl. Harry Potter és a Bölcsek Köve"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Szerző
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="author"
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                    placeholder="pl. J.K. Rowling"
                    value={formData.author}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Kiadó
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="publisher"
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                    placeholder="pl. Animus Kiadó"
                    value={formData.publisher}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Kategória
                </label>
                <div className="relative">
                  <List className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    name="category"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none appearance-none bg-white"
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
                <label className="text-sm font-medium text-gray-700">
                  Kiadási év
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    name="publicationYear"
                    max={new Date().getFullYear()}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                    placeholder="pl. 2024"
                    value={formData.publicationYear}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Jobb oszlop - Technikai adatok */}
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900 border-b pb-2">
                Technikai adatok
              </h3>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  ISBN szám
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="isbn"
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                    placeholder="pl. 978-963-..."
                    value={formData.isbn}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Könyvtári nyilvántartási szám
                </label>
                <div className="relative">
                  <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="inventoryNumber"
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                    placeholder="Egyedi azonosító"
                    value={formData.inventoryNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Készlet (db)
                  </label>
                  <div className="relative">
                    <Layers className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      name="stock"
                      min="0"
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                      value={formData.stock}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Magasság (cm)
                  </label>
                  <div className="relative">
                    <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      name="height"
                      min="0"
                      step="0.1"
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                      placeholder="pl. 21.5"
                      value={formData.height}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Borítókép feltöltése
                </label>
                <div className="relative border-2 border-dashed border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors text-center cursor-pointer">
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
                    <span className="text-sm text-gray-500">
                      {formData.coverImage
                        ? formData.coverImage.name
                        : "Kattints vagy húzd ide a képet"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="loanable"
                      name="loanable"
                      type="checkbox"
                      className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                      checked={formData.loanable}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="loanable"
                      className="font-medium text-gray-700"
                    >
                      Kölcsönözhető
                    </label>
                    <p className="text-gray-500 text-xs">
                      A könyv kivihető a könyvtárból
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Leírás</label>
            <textarea
              name="description"
              rows="4"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none resize-none"
              placeholder="Rövid leírás a könyvről..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors"
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
