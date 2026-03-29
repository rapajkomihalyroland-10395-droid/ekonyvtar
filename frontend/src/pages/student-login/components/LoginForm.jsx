import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import api from "../../../axios_url/baseURL.js";

const LoginForm = () => {
  const navigate = useNavigate();

  const deviceId = useRef(
    `device_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`,
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const errors = {};

    let isValid = true;

    if (!formData.email.trim()) {
      errors.email = "Az e-mail cím megadása kötelező";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Kérjük, adjon meg egy érvényes e-mail címet";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "A jelszó megadása kötelező";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "A jelszónak legalább 6 karakter hosszúnak kell lennie";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

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

  const handleForgotPassword = () => {
    alert(
      "A jelszó-visszaállítási funkció hamarosan elérhető lesz. Kérjük, forduljon az iskola könyvtárosához segítségért.",
    );
  };

  const getErrorMessage = (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 429) {
        return (
          data?.message ||
          "Túl sok sikertelen kísérlet történt. Kérjük, próbálja meg később újra."
        );
      }

      if (status === 401) {
        return (
          data?.message || "A megadott e-mail-cím vagy jelszó érvénytelen."
        );
      }

      return data?.message || "Hiba történt. Kérjük, próbálja meg újra!";
    }

    if (error.request) {
      return "Hálózati hiba. Kérjük, ellenőrizze az internetkapcsolatát, majd próbálja meg újra.";
    }

    return "A bejelentkezés nem sikerült. Kérjük, próbálja meg újra.";
  };

  const getAttemptsInfo = (error) => {
    if (!error.response?.data) return "";

    const { attempts, maxAttempts } = error.response.data;
    if (attempts && maxAttempts) {
      return ` (${attempts}/${maxAttempts} kísérlet)`;
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      await api.post("/login", {
        email: formData.email,
        password: formData.password,
        device_id: deviceId.current,
      });

      navigate("/");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      const attemptsInfo = getAttemptsInfo(error);

      setFormErrors({
        submit: errorMessage + attemptsInfo,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {formErrors.submit && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg flex items-start gap-3">
          <AlertCircle size={20} className="text-error flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-error flex-1">
            {formErrors.submit}
          </p>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          E-mail-cím <span className="text-error">*</span>
        </label>
        <input
          type="email"
          name="email"
          placeholder="student@schoollibrary.edu"
          value={formData.email}
          onChange={handleInputChange}
          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            formErrors.email ? "border-error focus-visible:ring-error" : ""
          }`}
          required
          disabled={isSubmitting}
          autoComplete="email"
        />
        {formErrors.email && (
          <p className="text-xs text-error">{formErrors.email}</p>
        )}
      </div>

      <div className="space-y-2 relative">
        <label className="text-sm font-medium text-foreground">
          Jelszó <span className="text-error">*</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Adja meg a jelszavát"
            value={formData.password}
            onChange={handleInputChange}
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10 ${
              formErrors.password ? "border-error focus-visible:ring-error" : ""
            }`}
            required
            disabled={isSubmitting}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
            disabled={isSubmitting}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {formErrors.password && (
          <p className="text-xs text-error">{formErrors.password}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          disabled={isSubmitting}
        >
          Elfelejtette a jelszavát?
        </button>
      </div>

      {}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={20} className="mr-2 animate-spin" />
            Bejelentkezés...
          </>
        ) : (
          "Bejelentkezés"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
