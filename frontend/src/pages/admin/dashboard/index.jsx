import React from "react";
import QuickActions from "./components/QuickActions.jsx";
import TopBookByRental from "./components/TopBookByRental.jsx";
import TodaysReturns from "./components/TodaysReturns.jsx";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Vezérlőpult</h1>
          <p className="text-muted-foreground">
            Áttekintés a könyvtár jelenlegi állapotáról
          </p>
        </div>
        <div className="text-sm text-muted-foreground bg-card px-3 py-1 rounded-full border border-border shadow-sm">
          Mai dátum: {new Date().toLocaleDateString("hu-HU")}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TopBookByRental />
        </div>

        <div className="lg:col-span-1">
          <QuickActions />

          <div className="mt-6">
            <TodaysReturns />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
