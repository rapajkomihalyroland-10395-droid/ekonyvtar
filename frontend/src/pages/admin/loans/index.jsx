import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../axios_url/baseURL.js";
import { Plus, Search, CheckCircle, Clock } from "lucide-react";
import StatusBadge from "../components/StatusBadge.jsx";

const AdminLoans = () => {
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); 
  
  const fetchLoans = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/get-all-rentals");
      setLoans(response.data.ReturnTemplate || []);
    } catch (error) {
      console.error("Hiba a kölcsönzések lekérésekor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleReturn = async (id) => {
    if (window.confirm("Biztosan visszahozottnak jelölöd ezt a könyvet?")) {
      try {
        await api.put(`/return-loan/${id}`);
        alert("Könyv sikeresen visszavéve!");
        fetchLoans();
      } catch (error) {
        alert(
          "Hiba történt a visszavétel során: " +
          (error.response?.data?.error || error.message),
        );
      }
    }
  };

  const filteredLoans = loans.filter((loan) => {
    const matchesSearch =
      loan.felhasznalo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.konyv_cim.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === "active") return loan.kikolcsonzes_stat !== "Visszahozva";
    if (filter === "returned") return loan.kikolcsonzes_stat === "Visszahozva";
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Kölcsönzések</h1>
          <p className="text-muted-foreground mt-1">
            Kölcsönzések nyomon követése és kezelése
          </p>
        </div>
        <Link
          to="/admin/loans/new"
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} />
          Új kölcsönzés
        </Link>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Keresés (név vagy könyv)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none"
            >
              <option value="all">Minden kölcsönzés</option>
              <option value="active">Folyamatban lévők</option>
              <option value="returned">Visszahozottak</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-6 py-4 text-sm font-semibold text-muted-foreground">ID</th>
                <th className="px-6 py-4 text-sm font-semibold text-muted-foreground">Felhasználó</th>
                <th className="px-6 py-4 text-sm font-semibold text-muted-foreground">Könyv</th>
                <th className="px-6 py-4 text-sm font-semibold text-muted-foreground">Kezdete</th>
                <th className="px-6 py-4 text-sm font-semibold text-muted-foreground">Állapot</th>
                <th className="px-6 py-4 text-sm font-semibold text-muted-foreground text-right">Műveletek</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-muted-foreground">
                    Betöltés folyamatban...
                  </td>
                </tr>
              ) : filteredLoans.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-muted-foreground">
                    Nincs a keresésnek megfelelő kölcsönzés.
                  </td>
                </tr>
              ) : (
                filteredLoans.map((loan) => (
                  <tr
                    key={loan.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-foreground">#{loan.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">{loan.felhasznalo}</div>
                      <div className="text-sm text-muted-foreground">{loan.osztaly}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground truncate max-w-[200px]" title={loan.konyv_cim}>
                        {loan.konyv_cim}
                      </div>
                      <div className="text-sm text-muted-foreground">{loan.szerzo}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {new Date(loan.berles_kezd).toLocaleDateString("hu-HU")}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge
                        status={loan.kikolcsonzes_stat === "Visszahozva" ? "active" : "pending"}
                        text={loan.kikolcsonzes_stat}
                      />
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      {loan.kikolcsonzes_stat !== "Visszahozva" && (
                        <button
                          onClick={() => handleReturn(loan.id)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 rounded-md transition-colors text-sm font-medium"
                          title="Könyv visszavétele"
                        >
                          <CheckCircle size={16} />
                          Visszavétel
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminLoans;