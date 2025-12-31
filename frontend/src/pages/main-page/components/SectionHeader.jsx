import React from "react";
import Icon from "../../../components/AppIcon";

const SectionHeader = ({ title, icon }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-primary/10 rounded-lg">
        <Icon name={icon} size={24} color="var(--color-primary)" />
      </div>
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
    </div>
  </div>
);

export default SectionHeader;
