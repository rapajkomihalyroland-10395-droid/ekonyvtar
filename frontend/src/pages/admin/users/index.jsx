import React, { useState, useEffect } from "react";
import { Search, UserPlus } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import UserListTable from "./components/UserListTable";
import AddUserModal from "./components/AddUserModal";

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("action") === "new") {
      setIsAddModalOpen(true);
    }
  }, [searchParams]);

  
  const users = [
    {
      id: 1,
      name: "Kiss Péter",
      email: "kiss.peter@student.school.hu",
      role: "diák",
      activeLoans: 2,
      overdueLoans: 0,
    },
    {
      id: 2,
      name: "Nagy Anna",
      email: "nagy.anna@student.school.hu",
      role: "diák",
      activeLoans: 1,
      overdueLoans: 1,
    },
    {
      id: 3,
      name: "Dr. Kovács János",
      email: "kovacs.janos@teacher.school.hu",
      role: "tanár",
      activeLoans: 0,
      overdueLoans: 0,
    },
    {
      id: 4,
      name: "Admin Admin",
      email: "admin@school.hu",
      role: "admin",
      activeLoans: 0,
      overdueLoans: 0,
    },
  ];

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

      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Keresés név vagy email alapján..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">Minden szerepkör</option>
            <option value="student">Diák</option>
            <option value="teacher">Tanár</option>
            <option value="admin">Adminisztrátor</option>
          </select>
        </div>
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
