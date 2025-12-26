import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles/tailwind.css";
import "./styles/index.css";

import NotFound from "pages/NotFound";
import BookCatalog from "./pages/book-catalog";
import BookDetails from "./pages/book-details/index.jsx";
import RentalCheckout from "./pages/rental-checkout/index.jsx";
import StudentDashboard from "./pages/student-dashboard/index.jsx";
import StudentLogin from "./pages/student-login/index.jsx";

import RouterGuard from "security/RouterGuard";

const RouteErrorElement = () => {
  return <NotFound />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouterGuard>
        <BookCatalog />
      </RouterGuard>
    ),
    errorElement: <RouteErrorElement />,
  },
  {
    path: "/book-details/:id",
    element: <BookDetails />,
  },
  {
    path: "/rental-checkout",
    element: <RentalCheckout />,
  },
  {
    path: "/student-dashboard",
    element: (
      <RouterGuard>
        <StudentDashboard />
      </RouterGuard>
    ),
  },
  {
    path: "/login",
    element: <StudentLogin />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} future={{ v7_startTransition: true }} />
);
