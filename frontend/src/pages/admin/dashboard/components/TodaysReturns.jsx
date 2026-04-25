import React, { useState, useEffect } from "react";
import { Clock, CheckCircle } from "lucide-react";
import api from "../../../../axios_url/baseURL";

const TodaysReturns = () => {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodaysReturns = async () => {
      try {
        const response = await api.get("/todays-returns");
        setReturns(response.data);
      } catch (err) {
        setError("Nem sikerült betölteni a visszahozásokat.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodaysReturns();
  }, []);

  if (loading) {
    return (
      <div className="bg-card rounded-xl shadow-sm border border-border p-6 h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-card rounded-xl shadow-sm border border-border p-6 h-full flex flex-col items-center justify-center text-red-500">
        <AlertCircle className="h-8 w-8 mb-2" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Clock className="mr-2 h-5 w-5 text-primary" />
        Mai visszahozások
      </h3>

      {returns.length === 0 ? (
        <div className="text-center text-muted-foreground py-4">
          <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-20 text-green-500" />
          <p>Nincs mára várható visszahozás.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {returns.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 p-2 border-b border-border last:border-0 hover:bg-muted rounded-lg transition-colors"
            >
              <div className="w-2 h-2 mt-2 rounded-full bg-yellow-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {item.user}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.book} -{" "}
                  {new Date(item.deadline).toLocaleDateString("hu-HU")}
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
