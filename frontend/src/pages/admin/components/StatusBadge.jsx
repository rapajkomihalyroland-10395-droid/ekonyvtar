import React from "react";

const StatusBadge = ({ status, className }) => {
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "available":
      case "elérhető":
      case "active":
      case "aktív":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
      case "checked-out":
      case "kikölcsönözve":
      case "borrowed":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800";
      case "overdue":
      case "lejárt":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
      case "maintenance":
      case "selejtezett":
      case "lezárt":
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-muted dark:text-muted-foreground dark:border-border";
      case "teacher":
      case "tanár":
        return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800";
      case "student":
      case "diák":
        return "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800";
      case "admin":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-muted dark:text-muted-foreground dark:border-border";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles(
        status,
      )} ${className || ""}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
