import React, { useState, useEffect } from "react";
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

import api from "../../../../axios_url/baseURL.js";

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
    userType: "",
    password: "",
  });
  const [iskolak, setIskola] = useState([]);
  const [osztalyok, setOsztaly] = useState([]);
  const [felhasznalo_tipusok, setFelhasznaloTipus] = useState([]);

  const isStudent =
    felhasznalo_tipusok.find((t) => t.id == formData.userType)?.megnevezes ===
    "Diák";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    const Get_Class_School_UserTypes = async () => {
      try {
        const [classesRes, schoolsRes, typesRes] = await Promise.all([
          api.get("/get-classes"),
          api.get("/get-schools"),
          api.get("/get-user-types"),
        ]);

        setOsztaly(classesRes.data);
        setIskola(schoolsRes.data);
        setFelhasznaloTipus(typesRes.data);
      } catch (error) {
        return error;
      }
    };

    Get_Class_School_UserTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        nev: formData.name,
        email: formData.email,
        nyers_jelszo: formData.password,
        telefonszam: formData.phone,
        szuletesi_datum: formData.birthDate ? new Date(formData.birthDate).toISOString() : new Date().toISOString(),
        lakcim: formData.address,
        admin: formData.isAdmin,
        iskola_id: Number(formData.school),
        osztaly_id: Number(formData.classId) || null,
        felhasznalo_tipus_id: Number(formData.userType),
      };

      await api.post("/users", data);
      alert("Sikeres felhasználó felvétel!");
      onClose();
    } catch (error) {
      alert("Hiba: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-card rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Új felhasználó hozzáadása
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Teljes név
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none placeholder:text-muted-foreground"
                  placeholder="pl. Kiss Péter"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email cím
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none placeholder:text-muted-foreground"
                  placeholder="pl. email@pelda.hu"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Telefonszám
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="tel"
                  name="phone"
                  className="w-full pl-10 pr-4 py-2 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none placeholder:text-muted-foreground"
                  placeholder="pl. +36 30 123 4567"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Születési dátum
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="date"
                  name="birthDate"
                  className="w-full pl-10 pr-4 py-2 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
                  value={formData.birthDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Lakcím
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                name="address"
                className="w-full pl-10 pr-4 py-2 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none placeholder:text-muted-foreground"
                placeholder="pl. 1234 Budapest, Példa utca 1."
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="border-t border-border my-4"></div>

          {}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Iskola
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select
                  name="school"
                  className="w-full pl-10 pr-4 py-2 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none appearance-none"
                  value={formData.school}
                  onChange={handleChange}
                >
                  <option value="">Válassz iskolát...</option>
                  {iskolak.map((iskola) => (
                    <option key={iskola.id} value={iskola.id}>
                      {iskola.neve}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Felhasználó típusa
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select
                  name="userType"
                  className="w-full pl-10 pr-4 py-2 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none appearance-none"
                  value={formData.userType}
                  onChange={handleChange}
                >
                  <option value="">Válassz típust...</option>
                  {felhasznalo_tipusok.map((tipus) => (
                    <option key={tipus.id} value={tipus.id}>
                      {tipus.megnevezes}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {isStudent && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Osztály
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select
                    name="classId"
                    className="w-full pl-10 pr-4 py-2 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none appearance-none"
                    value={formData.classId}
                    onChange={handleChange}
                  >
                    <option value="">Válassz osztályt...</option>
                    {osztalyok.map((osztaly) => (
                      <option key={osztaly.id} value={osztaly.id}>
                        {osztaly.nev} | {osztaly.tagozat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-center h-5">
              <input
                id="isAdmin"
                name="isAdmin"
                type="checkbox"
                className="h-4 w-4 text-primary border-border bg-background rounded focus:ring-primary"
                checked={formData.isAdmin}
                onChange={handleChange}
              />
            </div>
            <div className="text-sm">
              <label
                htmlFor="isAdmin"
                className="font-medium text-foreground flex items-center gap-2"
              >
                <Shield className="h-4 w-4 text-primary" />
                Adminisztrátor jogosultság
              </label>
              <p className="text-muted-foreground">
                A felhasználó hozzáférhet az adminisztrációs felülethez.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Jelszó</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                name="password"
                className="w-full pl-10 pr-4 py-2 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none placeholder:text-muted-foreground"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
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
              Felhasználó mentése
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
