import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <h1 className="text-9xl font-bold text-primary opacity-20">404</h1>
          </div>
        </div>

        <h2 className="text-2xl font-medium text-onBackground mb-2">Az oldal nem található</h2>
        <p className="text-onBackground/70 mb-8">
          A keresett oldal nem létezik. Segítünk visszatalálni!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history?.back()}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2"
          >
            <ArrowLeft size={16} />
            Vissza
          </button>

          <button
            onClick={handleGoHome}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-2"
          >
            <Home size={16} />
            Vissza a kezdőlapra
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
