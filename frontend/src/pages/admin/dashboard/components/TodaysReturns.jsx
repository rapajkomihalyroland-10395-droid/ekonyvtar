import React, { useEffect, useState } from "react";
import { Clock, AlertCircle, CheckCircle } from "lucide-react";
import api from "../../../../axios_url/baseURL";
import { getAuthHeader } from "../../../../store/authStore";

const TodaysReturns = () => {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const response = await api.get("/todays-returns", {
          headers: getAuthHeader(),
        });
        setReturns(response.data);
      } catch (err) {
        console.error("Error fetching returns:", err);
        setError("Nem sikerült betölteni a visszahozásokat.");
      } finally {
        setLoading(false);
      }
    };

    fetchReturns();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full flex flex-col items-center justify-center text-red-500">
        <AlertCircle className="h-8 w-8 mb-2" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Clock className="mr-2 h-5 w-5 text-primary" />
        Mai visszahozások
      </h3>

      {returns.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-20 text-green-500" />
          <p>Nincs mára várható visszahozás.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {returns.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 p-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-2 h-2 mt-2 rounded-full bg-yellow-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">{item.user}</p>
                <p className="text-xs text-gray-500">
                  {item.book} - {new Date(item.deadline).toLocaleDateString("hu-HU")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodaysReturns;
