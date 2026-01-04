import React from "react";
import DashboardCards from "./components/DashboardCards.jsx";
import QuickActions from "./components/QuickActions.jsx";
import { TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vezérlőpult</h1>
          <p className="text-gray-500">
            Áttekintés a könyvtár jelenlegi állapotáról
          </p>
        </div>
        <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border shadow-sm">
          Mai dátum: {new Date().toLocaleDateString("hu-HU")}
        </div>
      </div>

      <DashboardCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" />
              Legnépszerűbb könyvek
            </h3>
            {/* Placeholder for a chart or list */}
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-14 bg-gray-200 rounded shadow-sm flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                        Harry Potter és a Bölcsek Köve
                      </p>
                      <p className="text-sm text-gray-500">J.K. Rowling</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-gray-900">42</span>
                    <span className="text-xs text-gray-500">kölcsönzés</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <QuickActions />

          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Mai visszahozások
            </h3>
            <div className="space-y-3">
              {/* Mock list */}
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-2 border-b border-gray-50 last:border-0"
                >
                  <div className="w-2 h-2 mt-2 rounded-full bg-yellow-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Nagy Anna
                    </p>
                    <p className="text-xs text-gray-500">
                      A Gyűrűk Ura - 2023.10.24
                    </p>
                  </div>
                </div>
              ))}
              {/* Empty state if needed */}
              {/* <p className="text-sm text-gray-500 text-center py-4">Nincs mára várható visszahozás.</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
