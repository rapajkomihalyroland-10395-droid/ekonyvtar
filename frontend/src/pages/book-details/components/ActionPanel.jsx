import React, { useState } from "react";
import api from "../../../axios_url/baseURL.js";
import { useAuth } from "../../../store/AuthContext";
import { Calendar, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const ActionPanel = ({ book }) => {
  const [rentalDuration, setRentalDuration] = useState("14");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const { user } = useAuth();

  const rentalOptions = [
    { value: "7", label: "7 nap" },
    { value: "14", label: "14 nap (Ajánlott)" },
    { value: "21", label: "21 nap" },
    { value: "30", label: "30 nap" },
  ];

  const calculateDueDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + parseInt(days));
    return date;
  };

  const handleRent = async () => {
    if (!user) {
      setStatus({ type: "error", message: "A bérléshez be kell jelentkeznie!" });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const dueDate = calculateDueDate(rentalDuration);
      
      await api.post("/book-loan", {
        user_id: user.id,
        book_id: book.id,
        end_loan: dueDate.toISOString(),
      });

      setStatus({ type: "success", message: "Sikeres kölcsönzés!" });
    } catch (error) {
      console.error("Bérlési hiba:", error);
      setStatus({ 
        type: "error", 
        message: error.response?.data?.message || "Hiba történt a bérlés során." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isUnavailable = book?.keszlet === 0;

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        Kölcsönzés
      </h3>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Időtartam kiválasztása
          </label>
          <div className="grid grid-cols-1 gap-2">
            {rentalOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setRentalDuration(option.value)}
                disabled={isSubmitting || status?.type === "success"}
                className={`text-left px-4 py-3 rounded-lg border text-sm transition-all ${
                  rentalDuration === option.value
                    ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                    : "border-border bg-background text-foreground hover:border-primary/50"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <p className="text-xs text-muted-foreground mb-4">
            Visszahozatali határidő: <span className="font-semibold text-foreground">
              {calculateDueDate(rentalDuration).toLocaleDateString("hu-HU", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </span>
          </p>

          {status && (
            <div className={`p-3 rounded-lg flex items-start gap-3 mb-4 text-sm ${
              status.type === "success" 
                ? "bg-green-500/10 text-green-600 border border-green-500/20" 
                : "bg-red-500/10 text-red-600 border border-red-500/20"
            }`}>
              {status.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <p>{status.message}</p>
            </div>
          )}

          <button
            onClick={handleRent}
            disabled={isSubmitting || isUnavailable || status?.type === "success"}
            className="w-full h-12 inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold transition-all hover:bg-primary/90 disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground shadow-sm active:scale-[0.98]"
          >
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : isUnavailable ? (
              "Jelenleg nem elérhető"
            ) : status?.type === "success" ? (
              "Sikeres bérlés"
            ) : (
              "Kölcsönzés indítása"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionPanel;
