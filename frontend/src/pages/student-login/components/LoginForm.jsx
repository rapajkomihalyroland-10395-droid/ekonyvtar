import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const mockCredentials = {
    email: 'student@schoollibrary.edu',
    password: 'Library2025!'
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({
      ...prev,
      rememberMe: e?.target?.checked
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (
        formData?.email === mockCredentials?.email &&
        formData?.password === mockCredentials?.password
      ) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData?.email);
        if (formData?.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        navigate('/student-dashboard');
      } else {
        setErrors({
          submit: `Invalid credentials. Please use:\nEmail: ${mockCredentials?.email}\nPassword: ${mockCredentials?.password}`
        });
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleForgotPassword = () => {
    alert('Password recovery feature coming soon. Please contact your school librarian for assistance.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {errors?.submit && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg flex items-start gap-3">
          <Icon name="AlertCircle" size={20} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-error whitespace-pre-line">{errors?.submit}</p>
          </div>
        </div>
      )}
      <div>
        <Input
          type="email"
          name="email"
          label="Email Address"
          placeholder="student@schoollibrary.edu"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          disabled={isLoading}
          className="w-full"
        />
      </div>
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          label="Password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          disabled={isLoading}
          className="w-full"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          disabled={isLoading}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          checked={formData?.rememberMe}
          onChange={handleCheckboxChange}
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
          disabled={isLoading}
        >
          Forgot Password?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;