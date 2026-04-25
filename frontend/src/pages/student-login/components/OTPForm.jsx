import React, { useState } from "react";
import { AlertCircle, ArrowLeft, Loader2, KeyRound } from "lucide-react";
import api from "../../../axios_url/baseURL.js";

const OTPForm = ({ email, onBackToLogin }) => {
  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.otp.trim()) {
      errors.otp = "A kód megadása kötelező";
      isValid = false;
    } else if (formData.otp.length !== 5) {
      errors.otp = "A kód 5 számjegyből áll";
      isValid = false;
    }

    if (!formData.newPassword) {
      errors.newPassword = "Az új jelszó megadása kötelező";
      isValid = false;
    } else if (formData.newPassword.length < 6) {
      errors.newPassword =
        "A jelszónak legalább 6 karakter hosszúnak kell lennie";
      isValid = false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = "A két jelszó nem egyezik";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "otp" && (isNaN(value) || value.length > 5)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setFormErrors({});

    try {
      await api.post("/verify-otp", {
        email: email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      });

      setIsSuccess(true);
    } catch (error) {
      setFormErrors({
        submit:
          error.response?.data?.message ||
          "Hiba történt a jelszó visszaállítása során.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300" />
        <div className="relative w-full max-w-md bg-card border border-border rounded-xl shadow-overlay p-6 lg:p-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
            <KeyRound size={32} className="text-green-600" />
          </div>
          <h3 className="text-xl font-heading font-bold text-foreground">
            Sikeres visszaállítás!
          </h3>
          <p className="text-muted-foreground text-sm">
            A jelszavadat sikeresen frissítettük. Most már bejelentkezhetsz az
            új jelszavaddal.
          </p>
          <button
            onClick={onBackToLogin}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 w-full mt-4"
          >
            Vissza a bejelentkezéshez
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={!isSubmitting ? onBackToLogin : undefined}
      />
      <div className="relative w-full max-w-md bg-card border border-border rounded-xl shadow-overlay p-6 lg:p-8 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
            <KeyRound size={32} className="text-primary" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
            Elfelejtett jelszó
          </h2>
          <p className="text-sm text-muted-foreground">
            Ellenőrző kódot küldtünk a(z){" "}
            <span className="font-medium text-foreground">{email}</span> címre.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {formErrors.submit && (
            <div className="p-4 bg-error/10 border border-error/20 rounded-lg flex items-start gap-3">
              <AlertCircle
                size={20}
                className="text-error flex-shrink-0 mt-0.5"
              />
              <p className="text-sm font-medium text-error flex-1">
                {formErrors.submit}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              5 jegyű ellenőrző kód <span className="text-error">*</span>
            </label>
            <input
              type="text"
              name="otp"
              placeholder="12345"
              value={formData.otp}
              onChange={handleInputChange}
              className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-center tracking-[0.5em] font-mono text-lg ring-offset-background placeholder:tracking-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 ${
                formErrors.otp ? "border-error focus-visible:ring-error" : ""
              }`}
              required
              disabled={isSubmitting}
            />
            {formErrors.otp && (
              <p className="text-xs text-error">{formErrors.otp}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Új jelszó <span className="text-error">*</span>
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="Adja meg az új jelszót"
              value={formData.newPassword}
              onChange={handleInputChange}
              className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 ${
                formErrors.newPassword
                  ? "border-error focus-visible:ring-error"
                  : ""
              }`}
              required
              disabled={isSubmitting}
            />
            {formErrors.newPassword && (
              <p className="text-xs text-error">{formErrors.newPassword}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Új jelszó újra <span className="text-error">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Adja meg újra az új jelszót"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 ${
                formErrors.confirmPassword
                  ? "border-error focus-visible:ring-error"
                  : ""
              }`}
              required
              disabled={isSubmitting}
            />
            {formErrors.confirmPassword && (
              <p className="text-xs text-error">{formErrors.confirmPassword}</p>
            )}
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 w-full disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Feldolgozás...
                </>
              ) : (
                "Jelszó módosítása"
              )}
            </button>

            <button
              type="button"
              onClick={onBackToLogin}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-transparent text-muted-foreground hover:text-foreground h-11 px-8 w-full disabled:opacity-50"
            >
              Mégse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPForm;
