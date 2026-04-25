import React from "react";
import { Star, LayoutGrid, Users, Trophy } from "lucide-react";

const SectionHeader = ({ title, icon }) => {
  const iconMap = {
    Star,
    LayoutGrid,
    Users,
    Trophy,
  };

  const IconComponent = iconMap[icon] || Star;

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <IconComponent size={24} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>
    </div>
  );
};

export default SectionHeader;
