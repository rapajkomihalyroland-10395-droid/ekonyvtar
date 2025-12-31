import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";
import api from "../../../axios_url/baseURL.js";
import { setAccessToken, SetUser } from "../../../store/authStore.js";

const LoginForm = () => {
  const navigate = useNavigate();

  const deviceId = useRef(
    `device_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`
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

    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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
      "Password recovery feature coming soon. Please contact your school librarian for assistance."
    );
  };

  const getErrorMessage = (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 429) {
        return (
          data?.message || "Too many failed attempts. Please try again later."
        );
      }

      if (status === 401) {
        return data?.message || "Invalid email or password.";
      }

      return data?.message || "An error occurred. Please try again.";
    }

    if (error.request) {
      return "Network error. Please check your connection and try again.";
    }

    return "Login failed. Please try again.";
  };

  const getAttemptsInfo = (error) => {
    if (!error.response?.data) return "";

    const { attempts, maxAttempts } = error.response.data;
    if (attempts && maxAttempts) {
      return ` (${attempts}/${maxAttempts} attempts)`;
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
      const response = await api.post("/login", {
        email: formData.email,
        password: formData.password,
        device_id: deviceId.current,
      });

      const rawToken = (response.data?.accessToken || "")
        .toString()
        .replace(/^Bearer\s+/i, "")
        .trim();

      setAccessToken(rawToken);
      SetUser(response.data?.user);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

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
          <Icon
            name="AlertCircle"
            size={20}
            color="var(--color-error)"
            className="flex-shrink-0 mt-0.5"
          />
          <p className="text-sm font-medium text-error flex-1">
            {formErrors.submit}
          </p>
        </div>
      )}

      <div>
        <Input
          type="email"
          name="email"
          label="Email Address"
          placeholder="student@schoollibrary.edu"
          value={formData.email}
          onChange={handleInputChange}
          error={formErrors.email}
          required
          disabled={isSubmitting}
          autoComplete="email"
        />
      </div>

      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          error={formErrors.password}
          required
          disabled={isSubmitting}
          autoComplete="current-password"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
          disabled={isSubmitting}
        >
          <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
        </button>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          disabled={isSubmitting}
        >
          Forgot Password?
        </button>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
};

export default LoginForm;
