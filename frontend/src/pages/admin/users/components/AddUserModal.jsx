import React, { useState } from "react";
import {
  X,
  User,
  Mail,
  Shield,
  Lock,
  GraduationCap,
  Phone,
  Calendar,
  MapPin,
  Building,
} from "lucide-react";

const AddUserModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    address: "",
    isAdmin: false,
    school: "",
    classId: "",
    userType: "student", 
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Új felhasználó hozzáadása
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Teljes név
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                  placeholder="pl. Kiss Péter"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Email cím
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                  placeholder="pl. email@pelda.hu"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Telefonszám
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                  placeholder="pl. +36 30 123 4567"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Születési dátum
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  name="birthDate"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                  value={formData.birthDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Lakcím</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                name="address"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                placeholder="pl. 1234 Budapest, Példa utca 1."
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="border-t border-gray-100 my-4"></div>

          {}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Iskola
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  name="school"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none appearance-none bg-white"
                  value={formData.school}
                  onChange={handleChange}
                >
                  <option value="">Válassz iskolát...</option>
                  <option value="school1">Budapesti Műszaki Technikum</option>
                  <option value="school2">Eötvös József Gimnázium</option>
                  <option value="school3">Kossuth Lajos Szakközépiskola</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Felhasználó típusa
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  name="userType"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none appearance-none bg-white"
                  value={formData.userType}
                  onChange={handleChange}
                >
                  <option value="student">Diák</option>
                  <option value="teacher">Tanár</option>
                  <option value="other">Egyéb dolgozó</option>
                </select>
              </div>
            </div>

            {formData.userType === "student" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Osztály
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    name="classId"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none appearance-none bg-white"
                    value={formData.classId}
                    onChange={handleChange}
                  >
                    <option value="">Válassz osztályt...</option>
                    <option value="9a">9.A</option>
                    <option value="9b">9.B</option>
                    <option value="10a">10.A</option>
                    <option value="10b">10.B</option>
                    <option value="11a">11.A</option>
                    <option value="11b">11.B</option>
                    <option value="12a">12.A</option>
                    <option value="12b">12.B</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center h-5">
              <input
                id="isAdmin"
                name="isAdmin"
                type="checkbox"
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                checked={formData.isAdmin}
                onChange={handleChange}
              />
            </div>
            <div className="text-sm">
              <label
                htmlFor="isAdmin"
                className="font-medium text-gray-700 flex items-center gap-2"
              >
                <Shield className="h-4 w-4 text-primary" />
                Adminisztrátor jogosultság
              </label>
              <p className="text-gray-500">
                A felhasználó hozzáférhet az adminisztrációs felülethez.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Jelszó</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="password"
                name="password"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
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
              Felhasználó mentése
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
