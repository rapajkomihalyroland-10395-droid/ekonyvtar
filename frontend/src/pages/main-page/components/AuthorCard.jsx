import React from "react";

const AuthorCard = ({ szerzo, elofordulas }) => (
  <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-all duration-300">
    <div>
      <h3 className="font-bold text-foreground text-lg">{szerzo}</h3>
      <p className="text-sm text-muted-foreground">
        {elofordulas} könyv elérhető
      </p>
    </div>
  </div>
);

export default AuthorCard;
