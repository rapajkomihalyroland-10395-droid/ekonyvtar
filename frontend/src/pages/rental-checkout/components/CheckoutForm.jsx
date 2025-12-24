import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
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

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Checkout Information</h2>
      <div className="space-y-4">
        <Select
          label="Pickup Preference"
          description="Choose how you'd like to receive your books"
          options={pickupOptions}
          value={formData?.pickupPreference}
          onChange={(value) => handleInputChange('pickupPreference', value)}
          error={errors?.pickupPreference}
          required
        />
        
        <Input
          label="Special Instructions"
          type="text"
          placeholder="Any special accommodations or notes (optional)"
          value={formData?.specialInstructions}
          onChange={(e) => handleInputChange('specialInstructions', e?.target?.value)}
          description="Maximum 200 characters"
        />
        
        <Input
          label="Contact Phone Number"
          type="tel"
          placeholder="(555) 123-4567"
          value={formData?.contactPhone}
          onChange={(e) => handleInputChange('contactPhone', e?.target?.value)}
          error={errors?.contactPhone}
          required
        />
        
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