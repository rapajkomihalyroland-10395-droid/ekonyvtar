import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import {
  ShoppingCart,
  MapPin,
  Clock,
  Smartphone,
  CheckCircle2,
  Bookmark,
  Loader2,
} from "lucide-react";
import BookSummaryCard from "./components/BookSummaryCard";
import RentalTermsPanel from "./components/RentalTermsPanel";
import CheckoutForm from "./components/CheckoutForm";
import RentalSummary from "./components/RentalSummary";
import AvailabilityVerification from "./components/AvailabilityVerification";

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
      coverImage:
        "https://img.rocket.new/generatedImages/rocket_gen_img_14b25cd30-1764648854966.png",
      coverImageAlt:
        "Classic novel cover showing courthouse steps with warm sepia tones and vintage typography",
      rentalDays: 14,
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      coverImage:
        "https://img.rocket.new/generatedImages/rocket_gen_img_1fd29f48f-1764646532421.png",
      coverImageAlt:
        "Dystopian novel cover featuring dark surveillance imagery with bold red and black design elements",
      rentalDays: 14,
    },
    {
      id: 3,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      coverImage:
        "https://img.rocket.new/generatedImages/rocket_gen_img_1f9e2ac86-1765564429502.png",
      coverImageAlt:
        "Art deco style book cover with golden lights and elegant 1920s typography against dark blue background",
      rentalDays: 21,
    },
  ]);

  const [formData, setFormData] = useState({
    pickupPreference: "",
    specialInstructions: "",
    contactPhone: "",
    smsNotifications: false,
    termsAgreed: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    verifyAvailability();
  }, []);

  const verifyAvailability = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationStatus("success");
    }, 2000);
  };

  const handleRemoveBook = (bookId) => {
    setSelectedBooks((prev) => prev?.filter((book) => book?.id !== bookId));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.pickupPreference) {
      newErrors.pickupPreference = "Please select a pickup preference";
    }

    if (!formData?.contactPhone) {
      newErrors.contactPhone = "Contact phone number is required";
    } else if (!/^\(\d{3}\)\s\d{3}-\d{4}$/?.test(formData?.contactPhone)) {
      newErrors.contactPhone = "Please enter a valid phone number";
    }

    if (!formData?.termsAgreed) {
      newErrors.termsAgreed = "You must agree to the rental terms to proceed";
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
        navigate("/student-dashboard");
      }, 3000);
    }, 2000);
  };

  const handleContinueShopping = () => {
    navigate("/book-catalog");
  };

  const handleSaveForLater = () => {
    navigate("/student-dashboard");
  };

  if (selectedBooks?.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background pt-16">
          <div className="max-w-4xl mx-auto px-4 py-12 text-center">
            <div className="bg-card border border-border rounded-lg p-12">
              <ShoppingCart
                size={64}
                className="mx-auto mb-4 text-muted-foreground"
              />
              <h1 className="text-2xl font-bold text-foreground mb-2">
                A kosár üres
              </h1>
              <p className="text-muted-foreground mb-6">
                Tegyen néhány könyvet a kosárba, hogy folytathassa a fizetési
                folyamatot
              </p>
              <button
                onClick={handleContinueShopping}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Könyvek böngészése
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Pénztár</h1>
            <p className="text-muted-foreground">
              Ellenőrizze a kiválasztott termékeket, és fejezze be a bérlést
            </p>
          </div>

          <AvailabilityVerification
            isVerifying={isVerifying}
            verificationStatus={verificationStatus}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Kiválasztott könyvek
                </h2>
                <div className="space-y-3">
                  {selectedBooks?.map((book) => (
                    <BookSummaryCard
                      key={book?.id}
                      book={book}
                      onRemove={handleRemoveBook}
                    />
                  ))}
                </div>
              </div>

              <RentalTermsPanel />

              <CheckoutForm
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />
            </div>

            <div className="lg:col-span-1 space-y-6">
              <RentalSummary books={selectedBooks} />

              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Átvételi információk
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin
                      size={16}
                      className="text-primary mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <p className="font-medium text-foreground">
                        A könyvtár helye
                      </p>
                      <p className="text-muted-foreground">
                        Főépület, 2. emelet
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock
                      size={16}
                      className="text-primary mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <p className="font-medium text-foreground">
                        Nyitvatartási idő
                      </p>
                      <p className="text-muted-foreground">
                        Hétfő–péntek: 8:00–18:00
                      </p>
                      <p className="text-muted-foreground">
                        Szombat: 9:00–16:00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Smartphone
                      size={16}
                      className="text-primary mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <p className="font-medium text-foreground">
                        Digitális hozzáférés
                      </p>
                      <p className="text-muted-foreground">
                        Available immediately after checkout
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleConfirmRental}
                  disabled={isLoading}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full gap-2"
                >
                  {isLoading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <CheckCircle2 size={20} />
                  )}
                  Bérlés megerősítése
                </button>

                <button
                  onClick={handleContinueShopping}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full gap-2"
                >
                  <ShoppingCart size={20} />
                  Vásárlás folytatása
                </button>

                <button
                  onClick={handleSaveForLater}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full gap-2"
                >
                  <Bookmark size={20} />
                  Későbbre elmentés
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-lg p-8 max-w-md mx-4 text-center shadow-overlay">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-success" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              A bérlés megerősítve!
            </h2>
            <p className="text-muted-foreground mb-4">
              A könyveit sikeresen kikölcsönözte. Hamarosan megerősítő e-mailt
              fog kapni.
            </p>
            <p className="text-sm text-muted-foreground">
              Átirányítás a vezérlőpultra...
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default RentalCheckout;
