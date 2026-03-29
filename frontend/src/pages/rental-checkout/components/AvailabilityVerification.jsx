import React from "react";
import { Loader2, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

const AvailabilityVerification = ({ isVerifying, verificationStatus }) => {
  if (!isVerifying && !verificationStatus) return null;

  const statusConfig = {
    verifying: {
      Icon: Loader2,
      iconClass: "animate-spin",
      bgColor: "bg-muted",
      borderColor: "border-border",
      textColor: "text-muted-foreground",
      message: "Könyvek elérhetőségének ellenőrzése...",
    },
    success: {
      Icon: CheckCircle2,
      iconClass: "",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
      textColor: "text-success",
      message: "Minden könyv kölcsönözhető",
    },
    conflict: {
      Icon: AlertTriangle,
      iconClass: "",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
      textColor: "text-warning",
      message:
        "Néhány könyv korlátozottan elérhető. Kérjük, ellenőrizze a kiválasztást.",
    },
    error: {
      Icon: XCircle,
      iconClass: "",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/20",
      textColor: "text-destructive",
      message:
        "Nem sikerült ellenőrizni az elérhetőséget. Kérjük, próbálja újra.",
    },
  };

  const status = isVerifying ? "verifying" : verificationStatus;
  const config = statusConfig?.[status] || statusConfig?.verifying;
  const IconComponent = config.Icon;

  return (
    <div
      className={`flex items-center gap-3 p-4 ${config?.bgColor} border ${config?.borderColor} rounded-lg`}
    >
      <IconComponent
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
