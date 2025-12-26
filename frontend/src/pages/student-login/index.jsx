import React from 'react';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import WelcomeSection from './components/WelcomeSection';
import Icon from '../../components/AppIcon';

const StudentLogin = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
            <div className="hidden lg:flex flex-col justify-center">
              <WelcomeSection />
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                <div className="bg-card border border-border rounded-xl shadow-card p-6 lg:p-8">
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                      <Icon name="BookMarked" size={32} color="var(--color-primary)" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                      Student Sign In
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Enter your credentials to access your library account
                    </p>
                  </div>

                  <LoginForm />

                  <TrustSignals />
                </div>

                <div className="lg:hidden mt-8">
                  <WelcomeSection />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {new Date()?.getFullYear()} SchoolLibrary Digital. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                Privacy Policy
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                Terms of Service
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                Help Center
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudentLogin;
