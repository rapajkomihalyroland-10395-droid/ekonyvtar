import React, { useState } from "react";
import api from "../../../axios_url/baseURL.js";
import { useAuth } from "../../../store/AuthContext";
import { Calendar, CheckCircle2, AlertCircle, Loader2, X } from "lucide-react";

const RentalModal = ({ book, onClose }) => {
  const [rentalDuration, setRentalDuration] = useState("14");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const { user } = useAuth();

  if (!book) return null;

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
      setStatus({
        type: "error",
        message: "A bérléshez be kell jelentkeznie!",
      });
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
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Bérlési hiba:", error);
      setStatus({
        type: "error",
        message:
          error.response?.data?.message || "Hiba történt a bérlés során.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isUnavailable = book?.status === "előrendelhető" || book?.keszlet === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative bg-card border border-border rounded-xl shadow-xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Kölcsönzés megerősítése
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex gap-4">
            <div className="w-20 h-28 flex-shrink-0 overflow-hidden rounded-lg bg-muted border border-border">
              <img
                src={book?.coverImage}
                alt={book?.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/assets/images/no_image.png";
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">
                {book?.title}
              </h3>
              <p className="text-sm text-muted-foreground truncate mb-2">
                {book?.author}
              </p>
              <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {book?.category}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Időtartam kiválasztása
              </label>
              <div className="grid grid-cols-2 gap-2">
                {rentalOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setRentalDuration(option.value)}
                    disabled={isSubmitting || status?.type === "success"}
                    className={`px-3 py-2 rounded-lg border text-xs text-center transition-all ${
                      rentalDuration === option.value
                        ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                        : "border-border bg-background text-foreground hover:border-primary/50"
                    } disabled:opacity-50`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg border border-border">
              <p className="text-xs text-muted-foreground">
                Visszahozatali határidő:{" "}
                <span className="font-semibold text-foreground">
                  {calculateDueDate(rentalDuration).toLocaleDateString(
                    "hu-HU",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </span>
              </p>
            </div>

            {status && (
              <div
                className={`p-3 rounded-lg flex items-start gap-3 text-sm ${
                  status.type === "success"
                    ? "bg-green-500/10 text-green-600 border border-green-500/20"
                    : "bg-red-500/10 text-red-600 border border-red-500/20"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 size={18} />
                ) : (
                  <AlertCircle size={18} />
                )}
                <p>{status.message}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 h-11 inline-flex items-center justify-center rounded-lg border border-border bg-background text-sm font-medium hover:bg-muted transition-colors"
              >
                Mégse
              </button>
              <button
                onClick={handleRent}
                disabled={
                  isSubmitting || isUnavailable || status?.type === "success"
                }
                className="flex-2 h-11 inline-flex items-center justify-center rounded-lg bg-primary px-8 text-primary-foreground text-sm font-semibold transition-all hover:bg-primary/90 disabled:opacity-50 shadow-sm active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isUnavailable ? (
                  "Nem elérhető"
                ) : status?.type === "success" ? (
                  "Sikeres!"
                ) : (
                  "Megerősítés"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalModal;
