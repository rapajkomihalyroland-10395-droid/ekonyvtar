import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';

const CheckoutForm = ({ formData, setFormData, errors }) => {
  const pickupOptions = [
    { value: 'library-desk', label: 'Library Circulation Desk' },
    { value: 'digital-only', label: 'Digital Access Only' },
    { value: 'locker-pickup', label: 'Self-Service Locker' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const inputClassName = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Pénztár információk</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Átvételi mód <span className="text-destructive">*</span>
          </label>
          <select
            className={inputClassName}
            value={formData?.pickupPreference}
            onChange={(e) => handleInputChange('pickupPreference', e.target.value)}
          >
            <option value="" disabled>Válassza ki, hogyan szeretné megkapni a könyveit</option>
            {pickupOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="text-sm text-muted-foreground">Válassza ki, hogyan szeretné megkapni a könyveit</p>
          {errors?.pickupPreference && <p className="text-sm font-medium text-destructive">{errors.pickupPreference}</p>}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Különleges utasítások
          </label>
          <input
            type="text"
            className={inputClassName}
            placeholder="Any special accommodations or notes (optional)"
            value={formData?.specialInstructions}
            onChange={(e) => handleInputChange('specialInstructions', e?.target?.value)}
          />
          <p className="text-sm text-muted-foreground">Legfeljebb 200 karakter</p>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Kapcsolattartó telefonszám <span className="text-destructive">*</span>
          </label>
          <input
            type="tel"
            className={inputClassName}
            placeholder="(555) 123-4567"
            value={formData?.contactPhone}
            onChange={(e) => handleInputChange('contactPhone', e?.target?.value)}
          />
          {errors?.contactPhone && <p className="text-sm font-medium text-destructive">{errors.contactPhone}</p>}
        </div>
        
        <div className="pt-2">
          <Checkbox
            label="Send me SMS notifications for due date reminders"
            description="Receive text alerts 2 days before books are due"
            checked={formData?.smsNotifications}
            onChange={(e) => handleInputChange('smsNotifications', e?.target?.checked)}
          />
        </div>
        
        <div className="pt-1">
          <Checkbox
            label="I agree to the rental terms and late fee policies"
            error={errors?.termsAgreed}
            checked={formData?.termsAgreed}
            onChange={(e) => handleInputChange('termsAgreed', e?.target?.checked)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;