import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";

import "./styles/tailwind.css";
import "./styles/index.css";

import NotFound from "pages/NotFound";
import BookCatalog from "./pages/book-catalog";
import BookDetails from "./pages/book-details/index.jsx";
import RentalCheckout from "./pages/rental-checkout/index.jsx";
import StudentDashboard from "./pages/student-dashboard/index.jsx";
import StudentLogin from "./pages/student-login/index.jsx";

import { AuthProvider } from "hooks/AuthContext.jsx";

const RouteErrorElement = () => {
  return <NotFound />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <BookCatalog />,
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
    path: "/rental-checkout",
    element: <RentalCheckout />,
  },
  {
    path: "/student-dashboard",
    element: <StudentDashboard />,
  },
  {
    path: "/student-login",
    element: <StudentLogin />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </AuthProvider>
);
