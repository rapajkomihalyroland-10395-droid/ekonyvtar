import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, BookOpen, History } from "lucide-react";
import { cn } from "../../../utils/cn";
import api from "../../../axios_url/baseURL.js";
import { getAuthHeader } from "store/authStore.js";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const [book, setBook] = useState([]);
  const [loans, setLoans] = useState([]);
  const [changedInput, setChangedInput] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const GetBook = async () => {
      try {
        const response = await api.get(`/get-a-book/${Number(id)}`, {
          headers: getAuthHeader(),
        });

        if (response.data) setBook(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    GetBook();
  }, [id]);

  useEffect(() => {
    const GetLoans = async () => {
      try {
        const response = await api.get(`/get-a-loan/${id}`, {
          headers: getAuthHeader(),
        });

        if (response.data) setLoans(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    GetLoans();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("hu-HU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;

    setChangedInput((prev) => ({ ...prev, [name]: value }));

    console.log(changedInput);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setChangedInput((prev) => ({ ...prev, kep: file }));
    }
  };

  const updateBookDetails = async () => {
    try {
      const formData = new FormData();

      Object.keys(changedInput).forEach((key) => {
        formData.append(key, changedInput[key]);
      });

      const result = await api.patch(`/update-a-book/${id}`, formData, {
        headers: {
          ...getAuthHeader(),
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(result.data.message, result.data.result);
      setBook((prev) => ({ ...prev, ...result.data.result }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateBookDetails();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/books")}
          className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{book.cim}</h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
            <span>{book.szerzo}</span>
            <span>•</span>
            <span className="font-mono">{book.isbn}</span>
          </div>
        </div>
        <div className="flex gap-2"></div>
      </div>

      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {[
            { id: "details", label: "Alapadatok", icon: BookOpen },
            { id: "loans", label: "Kölcsönzések", icon: History },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
              )}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        {activeTab === "details" && (
          <div key={book.id} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="relative group w-48 h-72 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
                  {imagePreview || book.kep ? (
                    <img
                      src={imagePreview || book.kep}
                      alt={book.cim}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/400x600?text=Nincs+kép";
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-400">
                      <BookOpen size={48} />
                    </div>
                  )}
                  <div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <span className="text-white font-medium text-sm">
                      Kép cseréje
                    </span>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                  Cím
                </label>
                <input
                  type="text"
                  name="cim"
                  defaultValue={book.cim}
                  onChange={handleChanges}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                  Szerző
                </label>
                <input
                  type="text"
                  name="szerzo"
                  defaultValue={book.szerzo}
                  onChange={handleChanges}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                    ISBN
                  </label>
                  <input
                    type="text"
                    name="isbn"
                    defaultValue={book.isbn}
                    onChange={handleChanges}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                    Kategória
                  </label>
                  <input
                    type="text"
                    name="kategoria"
                    defaultValue={book.kategoria}
                    onChange={handleChanges}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                    Kiadó
                  </label>
                  <input
                    type="text"
                    name="kiado"
                    defaultValue={book.kiado}
                    onChange={handleChanges}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                    Kiadás éve
                  </label>
                  <input
                    type="text"
                    name="kiadas_ev"
                    defaultValue={book.kiadas_ev}
                    onChange={handleChanges}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                  Könyvtári nyilvántartási szám
                </label>
                <input
                  type="text"
                  name="konyvtar_nyilvantartasi_szam"
                  defaultValue={book.konyvtar_nyilvantartasi_szam}
                  onChange={handleChanges}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Leírás</label>
                <textarea
                  name="leiras"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  defaultValue={book.leiras}
                  onChange={handleChanges}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                    Készlet
                  </label>
                  <input
                    type="number"
                    name="keszlet"
                    defaultValue={book.keszlet}
                    onChange={handleChanges}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                    Beszerzési ár (Ft)
                  </label>
                  <input
                    type="number"
                    name="beszerzesi_ar"
                    defaultValue={book.beszerzesi_ar}
                    onChange={handleChanges}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
                    Magasság (cm)
                  </label>
                  <input
                    type="number"
                    name="magassag_cm"
                    defaultValue={book.magassag_cm}
                    onChange={handleChanges}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2 flex items-center pt-6">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="kolcsonozheto"
                      name="kolcsonozheto"
                      defaultChecked={book.kolcsonozheto}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label
                      htmlFor="kolcsonozheto"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
                    >
                      Kölcsönözhető
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Save size={16} className="mr-2" />
                  Mentés
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "loans" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Kölcsönzési előzmények</h3>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Felhasználó
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Felhasználó típus
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Bérlés kezdete
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Bérlés vége
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Visszahozva
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                  {loans.map((loan) => (
                    <tr key={loan.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                        {loan.felhasznalo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {loan.felhasznalo_tipus}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {formatDate(loan.berles_kezdete)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {formatDate(loan.berles_vege)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {!loan.visszahozva ? (
                          <span className="inline-flex items-center rounded-full bg-red-500/10 px-2 py-1 text-xs font-medium text-red-500 ring-1 ring-inset ring-red-500/20">
                            Kikölcsönözve
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            Visszahozva
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
