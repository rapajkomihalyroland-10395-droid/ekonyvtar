import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import BookDetails from "./pages/book-details";
import RentalCheckout from "./pages/rental-checkout";
import StudentDashboard from "./pages/student-dashboard";
import BookCatalog from "./pages/book-catalog";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<BookCatalog />} />
          {/*<Route />*/}
          <Route path="/book-details" element={<BookDetails />} />
          <Route path="/rental-checkout" element={<RentalCheckout />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/book-catalog" element={<BookCatalog />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
