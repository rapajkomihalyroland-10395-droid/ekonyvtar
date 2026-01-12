import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  LogOut, 
  Menu, 
  X,
  Library
} from 'lucide-react';
import { cn } from '../../../utils/cn';

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const navItems = [
    { label: 'Vezérlőpult', path: '/admin', icon: LayoutDashboard },
    { label: 'Könyvek', path: '/admin/books', icon: BookOpen },
    { label: 'Felhasználók', path: '/admin/users', icon: Users },
  ];

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-sm transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full lg:w-20"
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <div className={cn("flex items-center gap-2", !isSidebarOpen && "justify-center w-full")}>
            <Library className="h-8 w-8 text-primary" />
            <span className={cn("font-bold text-xl text-gray-900 truncate", !isSidebarOpen && "hidden")}>
              Admin
            </span>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden p-1 rounded hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                  !isSidebarOpen && "justify-center px-2"
                )
              }
              title={!isSidebarOpen ? item.label : undefined}
            >
              <item.icon size={20} />
              <span className={cn(!isSidebarOpen && "hidden")}>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button
            onClick={() => navigate('/')}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors",
              !isSidebarOpen && "justify-center px-2"
            )}
            title={!isSidebarOpen ? "Kilépés" : undefined}
          >
            <LogOut size={20} />
            <span className={cn(!isSidebarOpen && "hidden")}>Kilépés a főoldalra</span>
          </button>
        </div>
      </aside>

      {}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {}
        <header className="lg:hidden h-16 bg-white border-b border-gray-200 flex items-center px-4">
          <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-100">
            <Menu size={24} />
          </button>
          <span className="ml-4 font-bold text-lg">Könyvtár Admin</span>
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
