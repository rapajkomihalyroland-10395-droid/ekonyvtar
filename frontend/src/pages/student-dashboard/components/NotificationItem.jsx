import React from "react";
import { AlertCircle, Clock, BookPlus, DollarSign, Bell, X } from "lucide-react";

const NotificationItem = ({ notification, onDismiss }) => {
  const getIcon = () => {
    switch (notification?.type) {
      case "overdue":
        return <AlertCircle size={18} className="text-error" />;
      case "due-soon":
        return <Clock size={18} className="text-warning" />;
      case "new-arrival":
        return <BookPlus size={18} className="text-success" />;
      case "fine":
        return <DollarSign size={18} className="text-error" />;
      default:
        return <Bell size={18} className="text-primary" />;
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const notifDate = new Date(date);
    const diffMs = now - notifDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}p perce`;
    if (diffHours < 24) return `${diffHours}ó perce`;
    return `${diffDays}n napja`;
  };

  return (
    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200">
      <div className="flex-shrink-0 mt-0.5">
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground mb-1">{notification?.message}</p>
        <p className="text-xs text-muted-foreground">
          {formatTime(notification?.timestamp)}
        </p>
      </div>
      {onDismiss && (
        <button
          onClick={() => onDismiss(notification?.id)}
          className="flex-shrink-0 p-1 hover:bg-background rounded transition-colors duration-200"
          aria-label="Értesítés elvetése"
        >
          <X size={14} className="text-muted-foreground" />
        </button>
      )}
    </div>
  );
};

export default NotificationItem;
