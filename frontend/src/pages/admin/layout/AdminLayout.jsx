import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  LogOut,
  Menu,
  X,
  Library,
  Shield,
  School,
  Tags,
  Building2,
  GraduationCap,
  PenTool,
  Clock,
} from "lucide-react";

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const navItems = [
    { label: "Vezérlőpult", path: "/admin", icon: LayoutDashboard },
    { label: "Könyvek", path: "/admin/books", icon: BookOpen },
    { label: "Kölcsönzések", path: "/admin/loans", icon: Clock },
    { label: "Felhasználók", path: "/admin/users", icon: Users },
    { label: "Felhasználó Típusok", path: "/admin/user-types", icon: Shield },
    { label: "Iskolák", path: "/admin/schools", icon: School },
    { label: "Kategóriák", path: "/admin/categories", icon: Tags },
    { label: "Kiadók", path: "/admin/publishers", icon: Building2 },
    { label: "Szerzők", path: "/admin/authors", icon: PenTool },
    { label: "Osztályok", path: "/admin/classes", icon: GraduationCap },
  ];

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {}
      <aside
        className={`fixed inset-y-0 left-0 z-50 h-screen flex flex-col bg-card border-r border-border shadow-sm transition-all duration-300 ease-in-out lg:static lg:translate-x-0 ${
          !isSidebarOpen ? "-translate-x-full lg:w-20 w-64" : "w-64"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <div
            className={`flex items-center gap-2 ${
              !isSidebarOpen ? "justify-center w-full" : ""
            }`}
          >
            <Library className="h-8 w-8 text-primary" />
            <span
              className={`font-bold text-xl text-foreground truncate ${
                !isSidebarOpen ? "hidden" : ""
              }`}
            >
              Admin
            </span>
          </div>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1 rounded hover:bg-muted text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1 flex-1 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                } ${!isSidebarOpen ? "justify-center px-2" : ""}`
              }
              title={!isSidebarOpen ? item.label : undefined}
            >
              <item.icon size={20} />
              <span className={`${!isSidebarOpen ? "hidden" : ""}`}>
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border shrink-0">
          <button
            onClick={() => navigate("/")}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors ${
              !isSidebarOpen ? "justify-center px-2" : ""
            }`}
            title={!isSidebarOpen ? "Kilépés" : undefined}
          >
            <LogOut size={20} />
            <span className={`${!isSidebarOpen ? "hidden" : ""}`}>
              Kilépés a főoldalra
            </span>
          </button>
        </div>
      </aside>

      {}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {}
        <header className="lg:hidden h-16 bg-card border-b border-border flex items-center px-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-muted text-foreground"
          >
            <Menu size={24} />
          </button>
          <span className="ml-4 font-bold text-lg text-foreground">
            Könyvtár Admin
          </span>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>

      {}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default AdminLayout;
