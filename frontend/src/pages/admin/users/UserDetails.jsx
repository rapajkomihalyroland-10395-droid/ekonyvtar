import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, User, History, Mail, Send } from "lucide-react";
import StatusBadge from "../components/StatusBadge.jsx";
import { cn } from "../../../utils/cn";
import { getAuthHeader } from "store/authStore.js";
import api from "../../../axios_url/baseURL.js";

const UserDetails = () => {
  const page_size = 10;
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const [user, setUser] = useState([]);
  const [loans, setLoan] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [changed, setChanged] = useState([])

  useEffect(() => {
    const GetUserAndLoans = async () => {
      const [user, loan] = await Promise.all([
        api.get(`/users/${id}`, { headers: getAuthHeader() }),
        api.get(`/get-a-loan/${id}`, { headers: getAuthHeader() }),
      ]);

      if (!user || !loan) console.log("Hiba!");

      setUser(user.data);
      setLoan(loan.data);
    };

    try {
      GetUserAndLoans();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const currentLoanPage = useMemo(() => {
    return loans.slice(currentIndex, currentIndex + page_size);
  }, [loans, currentIndex]);

  const nextPage = () => {
    if (currentIndex + page_size < loans.length) {
      setCurrentIndex((prev) => prev + page_size);
    }
  };

  const previousPage = () => {
    setCurrentIndex((prev) => Math.max(prev - page_size, 0));
  };

  const handleChange = (e) => {
    
  } 

  return (
    <>
      <div className="space-y-6">
        {}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/users")}
            className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{user.nev}</h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
              <span className="font-mono">{user.email}</span>
              <span>•</span>
              <StatusBadge status={user.role} />
            </div>
          </div>
        </div>

        {}
        <div className="border-b border-border">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("details")}
              className={cn(
                "py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2",
                activeTab === "details"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
              )}
            >
              <User size={16} />
              Alapadatok
            </button>
            <button
              onClick={() => setActiveTab("loans")}
              className={cn(
                "py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2",
                activeTab === "loans"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
              )}
            >
              <History size={16} />
              Kölcsönzések
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={cn(
                "py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2",
                activeTab === "messages"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
              )}
            >
              <Mail size={16} />
              Üzenetek
            </button>
          </nav>
        </div>

        {}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          {activeTab === "details" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                    Név
                  </label>
                  <input
                    type="text"
                    defaultValue={user.nev}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                    Email
                  </label>
                  <input
                    type="text"
                    defaultValue={user.email}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                      Osztály
                    </label>
                    <input
                      type="text"
                      defaultValue={user.osztaly}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                      Telefonszám
                    </label>
                    <input
                      type="text"
                      defaultValue={user.telefonszam}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                    Lakcím
                  </label>
                  <input
                    type="text"
                    defaultValue={user.lakcim}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Szerepkör (Felhasználó Típus)
                  </label>
                  <input
                    type="text"
                    defaultValue={user.felhasznalo_tipus}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                    Születési dátum
                  </label>
                  <input
                    type="text"
                    defaultValue={
                      user.szuletesi_datum
                        ? new Date(user.szuletesi_datum).toLocaleDateString()
                        : ""
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                    Iskola
                  </label>
                  <input
                    type="text"
                    defaultValue={user.iskola}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="flex items-center space-x-2 mt-8">
                  <input
                    type="checkbox"
                    id="admin"
                    checked={user.admin || false}
                    readOnly
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor="admin"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Adminisztrátor
                  </label>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Save size={16} className="mr-2" />
                  Mentés
                </button>
              </div>
            </div>
          )}

          {activeTab === "loans" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Aktív kölcsönzések</h3>
              </div>

              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Könyv címe
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kölcsönzés dátuma
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Határidő
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Státusz
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentLoanPage.map((loan) => (
                      <tr key={loan.id}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {loan.konyv}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(loan.berles_kezdete).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(loan.berles_vege).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              !loan.visszahozva
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {!loan.visszahozva
                              ? "Aktív kölcsönzés"
                              : "Visszahozva"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex items-center justify-between gap-3 p-4 border-t border-gray-200">
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
              </div>
            </div>
          )}

          {activeTab === "messages" && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-sm font-medium mb-2">Új üzenet küldése</h3>
                <textarea
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mb-4"
                  placeholder="Írja be az üzenetét..."
                />
                <div className="flex justify-end">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    <Send size={16} className="mr-2" />
                    Küldés
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Előzmények</h3>
                <div className="text-center py-8 text-gray-500">
                  Nincsenek korábbi üzenetek.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDetails;
