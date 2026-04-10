import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import LoginForm from "./components/LoginForm";
import OTPForm from "./components/OTPForm";
import { BookMarked, KeyRound } from "lucide-react";
import { useAuth } from "../../store/AuthContext";

const StudentLogin = () => {
  const { user, authLoading } = useAuth();
  const navigate = useNavigate();

  const [showOTP, setShowOTP] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/");
    }
  }, [user, authLoading, navigate]);

  const handleForgotPassword = (email) => {
    setOtpEmail(email);
    setShowOTP(true);
  };

  const handleBackToLogin = () => {
    setShowOTP(false);
    setOtpEmail("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center">
      <Header />
      <main>
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="bg-card border border-border rounded-xl shadow-card p-6 lg:p-8">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                    <BookMarked size={32} className="text-primary" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                    Diákok bejelentkezése
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Írja be hitelesítő adatait a könyvtári fiókjához való
                    hozzáféréshez
                  </p>
                </div>

                <LoginForm onForgotPassword={handleForgotPassword} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {showOTP && (
        <OTPForm email={otpEmail} onBackToLogin={handleBackToLogin} />
      )}
    </div>
  );
};

export default StudentLogin;
