import React from 'react';
import Icon from '../../../components/AppIcon';

const NotificationItem = ({ notification, onDismiss }) => {
  const getIconName = () => {
    switch (notification?.type) {
      case 'overdue':
        return 'AlertCircle';
      case 'due-soon':
        return 'Clock';
      case 'new-arrival':
        return 'BookPlus';
      case 'fine':
        return 'DollarSign';
      default:
        return 'Bell';
    }
  };

  const getIconColor = () => {
    switch (notification?.type) {
      case 'overdue':
        return 'var(--color-error)';
      case 'due-soon':
        return 'var(--color-warning)';
      case 'new-arrival':
        return 'var(--color-success)';
      case 'fine':
        return 'var(--color-error)';
      default:
        return 'var(--color-primary)';
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const notifDate = new Date(date);
    const diffMs = now - notifDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200">
      <div className="flex-shrink-0 mt-0.5">
        <Icon name={getIconName()} size={18} color={getIconColor()} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground mb-1">{notification?.message}</p>
        <p className="text-xs text-muted-foreground">{formatTime(notification?.timestamp)}</p>
      </div>
      {onDismiss && (
        <button
          onClick={() => onDismiss(notification?.id)}
          className="flex-shrink-0 p-1 hover:bg-background rounded transition-colors duration-200"
          aria-label="Dismiss notification"
        >
          <Icon name="X" size={14} color="var(--color-muted-foreground)" />
        </button>
      )}
    </div>
  );
};

export default NotificationItem;