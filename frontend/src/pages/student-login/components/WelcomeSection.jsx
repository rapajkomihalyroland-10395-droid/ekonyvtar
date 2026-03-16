import React from 'react';
import { BookOpen, Clock, Star, Info } from 'lucide-react';

const WelcomeSection = () => {
  const features = [
    {
      id: 1,
      Icon: BookOpen,
      title: 'Browse Thousands of Books',
      description: 'Access our extensive digital library catalog'
    },
    {
      id: 2,
      Icon: Clock,
      title: 'Rent Anytime, Anywhere',
      description: 'Check out books 24/7 from any device'
    },
    {
      id: 3,
      Icon: Star,
      title: 'Track Your Reading',
      description: 'Manage rentals, reviews, and favorites'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-3">
          Üdvözöljük újra az eKönyvtár oldalán!
        </h1>
        <p className="text-base lg:text-lg text-muted-foreground">
          Jelentkezzen be, hogy hozzáférjen könyvtári fiókjához, és folytassa az olvasást
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-8">
        {features?.map((feature) => (
          <div
            key={feature?.id}
            className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-200"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg flex-shrink-0">
              <feature.Icon size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-foreground mb-1">
                {feature?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 p-4 bg-accent/10 border border-accent/20 rounded-lg">
        <div className="flex items-start gap-3">
          <Info size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              Először jársz itt?
            </p>
            <p className="text-sm text-muted-foreground">
              Az új diákok az iskolai e-mail-címükkel regisztrálhatnak. A regisztráció kevesebb mint 2 percet vesz igénybe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;