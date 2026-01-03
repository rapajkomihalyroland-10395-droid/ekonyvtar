import React from 'react';
import { Shield, Lock, Award } from 'lucide-react';

const TrustSignals = () => {
  const trustBadges = [
    {
      id: 1,
      Icon: Shield,
      title: 'SSL Secured',
      description: '256-bit encryption'
    },
    {
      id: 2,
      Icon: Lock,
      title: 'Data Protected',
      description: 'FERPA compliant'
    },
    {
      id: 3,
      Icon: Award,
      title: 'Certified',
      description: 'Educational institution verified'
    }
  ];

  return (
    <div className="mt-8 pt-8 border-t border-border">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {trustBadges?.map((badge) => (
          <div
            key={badge?.id}
            className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
              <badge.Icon size={24} className="text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">
              {badge?.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {badge?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustSignals;