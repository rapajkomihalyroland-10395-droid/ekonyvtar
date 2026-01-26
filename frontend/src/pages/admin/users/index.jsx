import React, { useState, useEffect } from "react";
import { Search, UserPlus } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import UserListTable from "./components/UserListTable";
import AddUserModal from "./components/AddUserModal";
import { getAuthHeader } from "store/authStore";
import api from "../../../axios_url/baseURL.js";

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (searchParams.get("action") === "new") {
      setIsAddModalOpen(true);
    }
  }, [searchParams]);

  useEffect(() => {
    const GetUsers = async () => {
      const response = await api.get("/users", { headers: getAuthHeader() });

      if (response.data) setUsers(response.data);
    };

    try {
      GetUsers();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Felhasználók kezelése
          </h1>
          <p className="text-gray-500">
            Felhasználók listázása, jogosultságok és kölcsönzések
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Új felhasználó
        </button>
      </div>

      

      <UserListTable users={users} isLoading={false} />

      {isAddModalOpen && (
        <AddUserModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminUsers;
