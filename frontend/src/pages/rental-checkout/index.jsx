import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import BookSummaryCard from './components/BookSummaryCard';
import RentalTermsPanel from './components/RentalTermsPanel';
import CheckoutForm from './components/CheckoutForm';
import RentalSummary from './components/RentalSummary';
import AvailabilityVerification from './components/AvailabilityVerification';

const RentalCheckout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [selectedBooks, setSelectedBooks] = useState([
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_14b25cd30-1764648854966.png",
    coverImageAlt: "Classic novel cover showing courthouse steps with warm sepia tones and vintage typography",
    rentalDays: 14
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1fd29f48f-1764646532421.png",
    coverImageAlt: "Dystopian novel cover featuring dark surveillance imagery with bold red and black design elements",
    rentalDays: 14
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1f9e2ac86-1765564429502.png",
    coverImageAlt: "Art deco style book cover with golden lights and elegant 1920s typography against dark blue background",
    rentalDays: 21
  }]
  );

  const [formData, setFormData] = useState({
    pickupPreference: '',
    specialInstructions: '',
    contactPhone: '',
    smsNotifications: false,
    termsAgreed: false
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    verifyAvailability();
  }, []);

  const verifyAvailability = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationStatus('success');
    }, 2000);
  };

  const handleRemoveBook = (bookId) => {
    setSelectedBooks((prev) => prev?.filter((book) => book?.id !== bookId));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.pickupPreference) {
      newErrors.pickupPreference = 'Please select a pickup preference';
    }

    if (!formData?.contactPhone) {
      newErrors.contactPhone = 'Contact phone number is required';
    } else if (!/^\(\d{3}\)\s\d{3}-\d{4}$/?.test(formData?.contactPhone)) {
      newErrors.contactPhone = 'Please enter a valid phone number';
    }

    if (!formData?.termsAgreed) {
      newErrors.termsAgreed = 'You must agree to the rental terms to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleConfirmRental = () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessModal(true);
      setTimeout(() => {
        navigate('/student-dashboard');
      }, 3000);
    }, 2000);
  };

  const handleContinueShopping = () => {
    navigate('/book-catalog');
  };

  const handleSaveForLater = () => {
    navigate('/student-dashboard');
  };

  if (selectedBooks?.length === 0) {
    return (
      <>
        <Helmet>
          <title>Rental Checkout - SchoolLibrary Digital</title>
          <meta name="description" content="Complete your book rental checkout process" />
        </Helmet>
        <Header />
        <div className="min-h-screen bg-background pt-16">
          <div className="max-w-4xl mx-auto px-4 py-12 text-center">
            <div className="bg-card border border-border rounded-lg p-12">
              <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 text-muted-foreground" />
              <h1 className="text-2xl font-bold text-foreground mb-2">Your Cart is Empty</h1>
              <p className="text-muted-foreground mb-6">
                Add some books to your cart to proceed with checkout
              </p>
              <Button variant="default" onClick={handleContinueShopping}>
                Browse Books
              </Button>
            </div>
          </div>
        </div>
      </>);

  }

  return (
    <>
      <Helmet>
        <title>Rental Checkout - SchoolLibrary Digital</title>
        <meta name="description" content="Complete your book rental checkout process with clear terms and confirmation" />
      </Helmet>
      <Header />
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Checkout</h1>
            <p className="text-muted-foreground">
              Review your selection and complete your rental
            </p>
          </div>

          <AvailabilityVerification
            isVerifying={isVerifying}
            verificationStatus={verificationStatus} />


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Selected Books</h2>
                <div className="space-y-3">
                  {selectedBooks?.map((book) =>
                  <BookSummaryCard
                    key={book?.id}
                    book={book}
                    onRemove={handleRemoveBook} />

                  )}
                </div>
              </div>

              <RentalTermsPanel />

              <CheckoutForm
                formData={formData}
                setFormData={setFormData}
                errors={errors} />

            </div>

            <div className="lg:col-span-1 space-y-6">
              <RentalSummary books={selectedBooks} />

              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Pickup Information</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Icon name="MapPin" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Library Location</p>
                      <p className="text-muted-foreground">Main Building, 2nd Floor</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Clock" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Operating Hours</p>
                      <p className="text-muted-foreground">Mon-Fri: 8:00 AM - 6:00 PM</p>
                      <p className="text-muted-foreground">Sat: 9:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Smartphone" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Digital Access</p>
                      <p className="text-muted-foreground">Available immediately after checkout</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="default"
                  fullWidth
                  loading={isLoading}
                  onClick={handleConfirmRental}
                  iconName="CheckCircle2"
                  iconPosition="left">

                  Confirm Rental
                </Button>
                
                <Button
                  variant="outline"
                  fullWidth
                  onClick={handleContinueShopping}
                  iconName="ShoppingCart"
                  iconPosition="left">

                  Continue Shopping
                </Button>
                
                <Button
                  variant="ghost"
                  fullWidth
                  onClick={handleSaveForLater}
                  iconName="Bookmark"
                  iconPosition="left">

                  Save for Later
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSuccessModal &&
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-lg p-8 max-w-md mx-4 text-center shadow-overlay">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle2" size={32} color="var(--color-success)" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Rental Confirmed!</h2>
            <p className="text-muted-foreground mb-4">
              Your books have been successfully checked out. You'll receive a confirmation email shortly.
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting to your dashboard...
            </p>
          </div>
        </div>
      }
    </>);

};

export default RentalCheckout;
