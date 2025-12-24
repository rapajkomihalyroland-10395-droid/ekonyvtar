import React from 'react';
import Icon from '../../../components/AppIcon';

const AvailabilityVerification = ({ isVerifying, verificationStatus }) => {
  if (!isVerifying && !verificationStatus) return null;

  const statusConfig = {
    verifying: {
      icon: 'Loader2',
      iconClass: 'animate-spin',
      bgColor: 'bg-muted',
      borderColor: 'border-border',
      textColor: 'text-muted-foreground',
      message: 'Verifying book availability...'
    },
    success: {
      icon: 'CheckCircle2',
      iconClass: '',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      textColor: 'text-success',
      message: 'All books are available for checkout'
    },
    conflict: {
      icon: 'AlertTriangle',
      iconClass: '',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      textColor: 'text-warning',
      message: 'Some books may have limited availability. Please review your selection.'
    },
    error: {
      icon: 'XCircle',
      iconClass: '',
      bgColor: 'bg-destructive/10',
      borderColor: 'border-destructive/20',
      textColor: 'text-destructive',
      message: 'Unable to verify availability. Please try again.'
    }
  };

  const status = isVerifying ? 'verifying' : verificationStatus;
  const config = statusConfig?.[status] || statusConfig?.verifying;

  return (
    <div className={`flex items-center gap-3 p-4 ${config?.bgColor} border ${config?.borderColor} rounded-lg`}>
      <Icon 
        name={config?.icon} 
        size={20} 
        className={`${config?.textColor} ${config?.iconClass}`}
      />
      <p className={`text-sm font-medium ${config?.textColor}`}>
        {config?.message}
      </p>
    </div>
  );
};

export default AvailabilityVerification;