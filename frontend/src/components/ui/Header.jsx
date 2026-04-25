import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  BookOpen,
  User,
  Settings,
  BookMarked,
  X,
  Menu,
} from "lucide-react";
import { useAuth } from "../../store/AuthContext.jsx";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isAdmin = Boolean(user?.admin);

  if (!user) return null;

  const navigationItems = [
    { label: "Főoldal", path: "/", icon: Home },
    {
      label: "Könyvtáram",
      path: "/student-dashboard",
      icon: LayoutDashboard,
    },
    { label: "Könyvek Böngészése", path: "/book-catalog", icon: BookOpen },
    { label: "Kijelentkezés", path: "/login", icon: User },
  ];

  if (isAdmin) {
    navigationItems.push({
      label: "Admin Panel",
      path: "/admin",
      icon: Settings,
    });
  }

  const isActivePath = (path) => {
    if (path === "/") {
      return location?.pathname === "/";
    }
    if (path === "/student-dashboard") {
      return location?.pathname === path;
    }
    if (path === "/book-catalog") {
      return (
        location?.pathname === path || location?.pathname === "/book-details"
      );
    }
    if (path === "/student-login") {
      return location?.pathname === path;
    }
    return location?.pathname === path;
  };

  const handleNavigation = (item) => {
    if (item.label === "Kijelentkezés" && user) {
      const confirmLogout = window.confirm(
        "Biztosan ki szeretnél jelentkezni?",
      );
      if (confirmLogout) {
        logout();
      }
      return;
    }
    navigate(item.path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-card">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <Link
              to="/student-dashboard"
              className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-80"
              aria-label="SchoolLibrary Digital Home"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <BookMarked size={24} color="var(--color-primary)" />
              </div>
              <span className="hidden sm:block text-lg font-heading font-semibold text-foreground">
                eKönyvtár
              </span>
            </Link>
          </div>

          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Primary navigation"
          >
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
                aria-current={isActivePath(item?.path) ? "page" : undefined}
              >
                <item.icon size={18} />
                <span>{item?.label}</span>
              </button>
            ))}
          </nav>

          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors duration-200"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}
      <nav
        className={`fixed top-16 right-0 bottom-0 z-40 w-64 bg-card border-l border-border shadow-overlay transform transition-transform duration-300 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col gap-1 p-4">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item)}
              className={`flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-all duration-200 ${
                isActivePath(item?.path)
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
              aria-current={isActivePath(item?.path) ? "page" : undefined}
            >
              <item.icon size={20} />
              <span>{item?.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Header;
