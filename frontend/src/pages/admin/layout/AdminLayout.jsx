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
} from "lucide-react";
import { cn } from "../../../utils/cn";

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const navItems = [
    { label: "Vezérlőpult", path: "/admin", icon: LayoutDashboard },
    { label: "Könyvek", path: "/admin/books", icon: BookOpen },
    { label: "Felhasználók", path: "/admin/users", icon: Users },
    { label: "Felhasználó Típusok", path: "/admin/user-types", icon: Shield },
    { label: "Iskolák", path: "/admin/schools", icon: School },
    { label: "Kategóriák", path: "/admin/categories", icon: Tags },
    { label: "Kiadók", path: "/admin/publishers", icon: Building2 },
    { label: "Osztályok", path: "/admin/classes", icon: GraduationCap },
  ];

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-background flex">
      {}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border shadow-sm transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full lg:w-20",
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <div
            className={cn(
              "flex items-center gap-2",
              !isSidebarOpen && "justify-center w-full",
            )}
          >
            <Library className="h-8 w-8 text-primary" />
            <span
              className={cn(
                "font-bold text-xl text-foreground truncate",
                !isSidebarOpen && "hidden",
              )}
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

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  !isSidebarOpen && "justify-center px-2",
                )
              }
              title={!isSidebarOpen ? item.label : undefined}
            >
              <item.icon size={20} />
              <span className={cn(!isSidebarOpen && "hidden")}>
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button
            onClick={() => navigate("/")}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
              !isSidebarOpen && "justify-center px-2",
            )}
            title={!isSidebarOpen ? "Kilépés" : undefined}
          >
            <LogOut size={20} />
            <span className={cn(!isSidebarOpen && "hidden")}>
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
          <span className="ml-4 font-bold text-lg text-foreground">Könyvtár Admin</span>
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
