import { useState, useEffect, useMemo } from "react";
import { Eye, Search, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge.jsx";

const UserListTable = ({ users, isLoading }) => {
  const navigate = useNavigate();
  const page_size = 10;

  const [search, setSearch] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;

    return users.filter((user) =>
      user.nev.toLowerCase().includes(search.toLowerCase()),
    );
  }, [users, search]);

  const currentUserPage = useMemo(() => {
    return filteredUsers.slice(currentIndex, currentIndex + page_size);
  }, [filteredUsers, currentIndex]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [search]);

  const nextPage = () => {
    if (currentIndex + page_size < filteredUsers.length) {
      setCurrentIndex((prev) => prev + page_size);
    }
  };

  const previousPage = () => {
    setCurrentIndex((prev) => Math.max(prev - page_size, 0));
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">Betöltés...</div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 bg-card p-4 rounded-lg border border-border shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Keresés név vagy email alapján..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm mt-4">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-muted-foreground font-medium border-b border-border">
            <tr>
              <th className="px-6 py-4">Név / Email</th>
              <th className="px-6 py-4">Szerepkör</th>
              <th className="px-6 py-4 text-center">Aktív kölcsönzések</th>
              <th className="px-6 py-4 text-right">Műveletek</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {currentUserPage.map((user) => (
              <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-foreground">
                      {user.nev}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {user.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={user.szerepkor} />
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={
                      user.aktiv_kolcsonzes
                        ? "font-medium text-foreground"
                        : "text-muted-foreground"
                    }
                  >
                    {user.aktiv_kolcsonzes
                      ? "van aktív kölcsönzése"
                      : "nincsen"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => navigate(`/admin/users/${user.id}`)}
                      className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors"
                      title="Megtekintés"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={async () => {
                        if (
                          window.confirm(
                            "Biztosan törölni szeretnéd ezt a felhasználót?",
                          )
                        ) {
                          try {
                            const { default: api } =
                              await import("../../../../axios_url/baseURL.js");
                            await api.delete(`/users/${user.id}`);
                            alert("Sikeres törlés!");
                            window.location.reload();
                          } catch (error) {
                            alert(
                              "Hiba: " +
                                (error.response?.data?.message ||
                                  error.message),
                            );
                          }
                        }
                      }}
                      className="p-1.5 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded transition-colors"
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
        {users.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">
              Nincs megjeleníthető felhasználó.
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 p-4 border-t border-border bg-card rounded-b-lg">
        <button
          type="button"
          onClick={previousPage}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
        >
          Előző
        </button>
        <button
          type="button"
          onClick={nextPage}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
        >
          Következő
        </button>
      </div>
    </>
  );
};

export default UserListTable;
