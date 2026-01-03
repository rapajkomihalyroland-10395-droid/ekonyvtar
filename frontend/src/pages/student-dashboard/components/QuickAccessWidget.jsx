import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, DollarSign, Heart, BookCheck, FileText, Search, User, Settings } from 'lucide-react';

const iconMap = {
  AlertCircle,
  DollarSign,
  Heart,
  BookCheck,
  FileText,
  Search,
  User,
  Settings
};

const QuickAccessWidget = ({ title, value, subtitle, icon, iconColor, onClick, badge }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const IconComponent = iconMap[icon] || FileText;

  return (
    <div 
      className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={handleClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${iconColor || 'bg-primary/10'}`}>
          <IconComponent 
            size={20} 
            className={`${iconColor && iconColor.includes('bg-') ? 'text-primary' : ''}`}
            style={{ color: iconColor && !iconColor.includes('bg-') ? iconColor : undefined }}
          />
        </div>
        {badge && (
          <span className="px-2 py-0.5 bg-error text-error-foreground text-xs font-medium rounded-full">
            {badge}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
          {value}
        </h3>
        <p className="text-sm font-medium text-foreground mb-1">{title}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default QuickAccessWidget;