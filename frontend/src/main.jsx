import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles/tailwind.css";
import "./styles/index.css";

import NotFound from "pages/NotFound";
import MainPage from "./pages/main-page/index.jsx";
import BookCatalog from "./pages/book-catalog/index.jsx";
import BookDetails from "./pages/book-details/index.jsx";
import StudentDashboard from "./pages/student-dashboard/index.jsx";
import StudentLogin from "./pages/student-login/index.jsx";

import AdminLayout from "./pages/admin/layout/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/dashboard/index.jsx";
import AdminBooks from "./pages/admin/books/index.jsx";
import AdminBookDetails from "./pages/admin/books/BookDetails.jsx";
import AdminUsers from "./pages/admin/users/index.jsx";
import AdminUserDetails from "./pages/admin/users/tabs/UserDetails.jsx";
import AdminUserTypes from "./pages/admin/user-types/index.jsx";
import AdminSchools from "./pages/admin/schools/index.jsx";
import AdminCategories from "./pages/admin/categories/index.jsx";
import AdminPublishers from "./pages/admin/publishers/index.jsx";
import AdminClasses from "./pages/admin/classes/index.jsx";
import AdminAuthors from "./pages/admin/authors/index.jsx";
import AdminLoans from "./pages/admin/loans/index.jsx";
import CreateLoan from "./pages/admin/loans/CreateLoan.jsx";

import AuthContext from "store/AuthContext";
import RouterGuard from "security/RouterGuard";

const RouteErrorElement = () => {
  return <NotFound />;
};

const router = createBrowserRouter([
  {
    element: <AuthContext />,
    children: [
      {
        element: <RouterGuard />,
        children: [
          {
            path: "/",
            element: <MainPage />,
            errorElement: <RouteErrorElement />,
          },
          {
            path: "/book-catalog",
            element: <BookCatalog />,
          },
          {
            path: "/book-details/:id",
            element: <BookDetails />,
          },
          {
            path: "/student-dashboard",
            element: <StudentDashboard />,
          },
          {
            path: "/admin",
            element: <AdminLayout />,
            children: [
              { index: true, element: <AdminDashboard /> },
              { path: "books", element: <AdminBooks /> },
              { path: "books/:id", element: <AdminBookDetails /> },
              { path: "users", element: <AdminUsers /> },
              { path: "users/:id", element: <AdminUserDetails /> },
              { path: "loans", element: <AdminLoans /> },
              { path: "loans/new", element: <CreateLoan /> },
              { path: "user-types", element: <AdminUserTypes /> },
              { path: "schools", element: <AdminSchools /> },
              { path: "categories", element: <AdminCategories /> },
              { path: "publishers", element: <AdminPublishers /> },
              { path: "authors", element: <AdminAuthors /> },
              { path: "classes", element: <AdminClasses /> },
            ],
          },
        ],
      },
      {
        path: "/login",
        element: <StudentLogin />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
