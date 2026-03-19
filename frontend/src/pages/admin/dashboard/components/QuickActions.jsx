import React from "react";
import { Plus, UserPlus, BookUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const buttonBaseClass =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2";
  const defaultVariant =
    "bg-primary text-primary-foreground hover:bg-primary/90";
  const outlineVariant =
    "border border-input hover:bg-accent hover:text-accent-foreground";
  const secondaryVariant =
    "bg-secondary text-secondary-foreground hover:bg-secondary/80";

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Gyors műveletek
      </h3>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => navigate("/admin/books?action=new")}
          className={`${buttonBaseClass} ${defaultVariant} bg-primary hover:bg-primary/90`}
        >
          <Plus className="mr-2 h-4 w-4" />
          Új könyv felvétele
        </button>
        <button
          onClick={() => navigate("/admin/users?action=new")}
          className={`${buttonBaseClass} ${outlineVariant}`}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Új felhasználó
        </button>
        <button
          onClick={() => navigate("/admin/loans/new")}
          className={`${buttonBaseClass} ${secondaryVariant}`}
        >
          <BookUp className="mr-2 h-4 w-4" />
          Új kölcsönzés
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
