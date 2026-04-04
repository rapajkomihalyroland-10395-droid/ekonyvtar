import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, History, Mail } from "lucide-react";
import StatusBadge from "../../components/StatusBadge.jsx";
import api from "../../../../axios_url/baseURL.js";

import UserDetailsBasicTab from "./UserDetailsBasicTab.jsx";
import UserDetailsLoansTab from "./UserDetailsLoansTab.jsx";
import UserDetailsMessagesTab from "./UserDetailsMessagesTab.jsx";

const UserDetails = () => {
  const page_size = 10;
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const [user, setUser] = useState({});
  const [loans, setLoan] = useState([]);
  const [schools, setSchools] = useState([]);
  const [classes, setClasses] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    nev: "",
    email: "",
    telefonszam: "",
    szuletesi_datum: "",
    lakcim: "",
    admin: false,
    osztaly_id: "",
    iskola_id: "",
    felhasznalo_tipus_id: "",
  });

  useEffect(() => {
    const GetUserAndData = async () => {
      try {
        const [userRes, loanRes, schoolsRes, classesRes, typesRes] =
          await Promise.all([
            api.get(`/users/${id}`),
            api.get(`/get-a-loan/${id}`),
            api.get("/schools"),
            api.get("/classes"),
            api.get("/user-types"),
          ]);

        const userData = userRes.data;
        setUser(userData);
        setLoan(loanRes.data);
        setSchools(schoolsRes.data);
        setClasses(classesRes.data);
        setUserTypes(typesRes.data);

        setFormData({
          nev: userData.nev || "",
          email: userData.email || "",
          telefonszam: userData.telefonszam || "",
          szuletesi_datum: userData.szuletesi_datum
            ? new Date(userData.szuletesi_datum).toISOString().split("T")[0]
            : "",
          lakcim: userData.lakcim || "",
          admin: userData.admin || false,
          osztaly_id: userData.osztaly_id || "",
          iskola_id: userData.iskola_id || "",
          felhasznalo_tipus_id: userData.felhasznalo_tipus_id || "",
        });
      } catch (error) {
        console.error("Hiba az adatok betöltésekor:", error);
      }
    };

    GetUserAndData();
  }, [id]);

  const currentLoanPage = loans.slice(currentIndex, currentIndex + page_size);

  const nextPage = () => {
    if (currentIndex + page_size < loans.length) {
      setCurrentIndex((prev) => prev + page_size);
    }
  };

  const previousPage = () => {
    setCurrentIndex((prev) => Math.max(prev - page_size, 0));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatePayload = {
        nev: formData.nev,
        email: formData.email,
        telefonszam: formData.telefonszam,
        szuletesi_datum: formData.szuletesi_datum || null,
        lakcim: formData.lakcim,
        admin: formData.admin,
        osztaly_id: formData.osztaly_id ? Number(formData.osztaly_id) : null,
        iskola_id: formData.iskola_id ? Number(formData.iskola_id) : null,
        felhasznalo_tipus_id: formData.felhasznalo_tipus_id
          ? Number(formData.felhasznalo_tipus_id)
          : null,
      };

      await api.patch(`/users/${id}`, updatePayload);
      alert("Sikeres mentés!");

      const userRes = await api.get(`/users/${id}`);
      const userData = userRes.data;

      setUser(userData);

      setFormData({
        nev: userData.nev || "",
        email: userData.email || "",
        telefonszam: userData.telefonszam || "",
        szuletesi_datum: userData.szuletesi_datum
          ? new Date(userData.szuletesi_datum).toISOString().split("T")[0]
          : "",
        lakcim: userData.lakcim || "",
        admin: userData.admin || false,
        osztaly_id: userData.osztaly_id || "",
        iskola_id: userData.iskola_id || "",
        felhasznalo_tipus_id: userData.felhasznalo_tipus_id || "",
      });
    } catch (error) {
      alert(
        "Hiba történt a mentés során: " +
          (error.response?.data?.message || error.message),
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
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
              <StatusBadge status={user.felhasznalo_tipus} />
            </div>
          </div>
        </div>

        <div className="border-b border-border">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("details")}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "details"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              <User size={16} />
              Alapadatok
            </button>
            <button
              onClick={() => setActiveTab("loans")}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "loans"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              <History size={16} />
              Kölcsönzések
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "messages"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              <Mail size={16} />
              Üzenetek
            </button>
          </nav>
        </div>

        {}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          {activeTab === "details" && (
            <UserDetailsBasicTab
              formData={formData}
              handleChange={handleChange}
              handleSave={handleSave}
              isSaving={isSaving}
              schools={schools}
              classes={classes}
              userTypes={userTypes}
            />
          )}

          {activeTab === "loans" && (
            <UserDetailsLoansTab
              currentLoanPage={currentLoanPage}
              previousPage={previousPage}
              nextPage={nextPage}
            />
          )}

          {activeTab === "messages" && (
            <UserDetailsMessagesTab email={user.email} />
          )}
        </div>
      </div>
    </>
  );
};

export default UserDetails;
