import React from "react";
import { BookOpen, AlertCircle, Calendar, TrendingUp } from "lucide-react";
import { cn } from "../../../../utils/cn";

const StatCard = ({ title, value, icon: Icon, trend, trendUp, colorClass }) => (
  <div className="bg-card rounded-xl shadow-sm border border-border p-6 transition-all hover:shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold mt-2 text-foreground">{value}</h3>
      </div>
      <div className={cn("p-3 rounded-lg", colorClass)}>
        <Icon size={24} className="text-current" />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center text-sm">
        <TrendingUp
          size={16}
          className={cn("mr-1", trendUp ? "text-green-500" : "text-red-500")}
        />
        <span
          className={cn(
            "font-medium",
            trendUp ? "text-green-600" : "text-red-600",
          )}
        >
          {trend}
        </span>
        <span className="text-muted-foreground ml-1">az elmúlt hónapban</span>
      </div>
    )}
  </div>
);

const DashboardCards = () => {
  const stats = [
    {
      title: "Aktív kölcsönzések",
      value: "124",
      icon: BookOpen,
      trend: "+12%",
      trendUp: true,
      colorClass: "bg-blue-50 text-blue-600",
    },
    {
      title: "Lejárt határidő",
      value: "8",
      icon: AlertCircle,
      trend: "-2%",
      trendUp: true,
      colorClass: "bg-red-50 text-red-600",
    },
    {
      title: "Mai visszahozások",
      value: "15",
      icon: Calendar,
      colorClass: "bg-green-50 text-green-600",
    },
    {
      title: "Összes könyv",
      value: "2,845",
      icon: BookOpen,
      trend: "+5",
      trendUp: true,
      colorClass: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardCards;
