import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BookCover from './components/BookCover';
import BookHeader from './components/BookHeader';
import ActionPanel from './components/ActionPanel';
import SynopsisTab from './components/SynopsisTab';
import ReviewsTab from './components/ReviewsTab';
import RelatedBooksTab from './components/RelatedBooksTab';

const BookDetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('synopsis');

  const bookData = {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    publisher: "Harper Perennial Modern Classics",
    publicationYear: "2006",
    pages: 324,
    coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1f267bcef-1764692281132.png",
    coverImageAlt: "Classic book cover of To Kill a Mockingbird featuring vintage typography and muted color palette with courthouse imagery",
    rating: 4.8,
    totalReviews: 201,
    availableCopies: 3,
    totalCopies: 5,
    estimatedReturnDate: null,
    categories: ["Classic Literature", "Fiction", "Historical", "Coming of Age"],
    synopsis: `Set in the small Southern town of Maycomb, Alabama, during the Depression, To Kill a Mockingbird follows three years in the life of 8-year-old Scout Finch, her brother, Jem, and their father, Atticus--three years punctuated by the arrest and eventual trial of a young black man accused of raping a white woman.\n\nThough her story explores big themes, Harper Lee chooses to tell it through the eyes of a child. The result is a tough and tender novel of race, class, justice, and the pain of growing up.\n\nLike the slow-moving occupants of her fictional town, Lee takes her time getting to the heart of her tale; we first meet the Finches the summer before Scout's first year at school. She, her brother, and Dill Harris, a boy who spends the summers with his aunt in Maycomb, while away the hours reenacting scenes from Dracula and plotting ways to get a peek at the town bogeyman, Boo Radley.\n\nAt first the circumstances surrounding the alleged rape of Mayella Ewell, the daughter of a drunk and violent white farmer, barely penetrate the children's consciousness. Then Atticus is called on to defend the accused, Tom Robinson, and soon Scout and Jem find themselves caught up in events beyond their understanding.\n\nDuring the trial, the town exhibits its ugly side, but Lee offers plenty of counterbalance as well--in the form of a kindly neighbor, a soft-hearted landlady, a generous employer, and others who prove that bigotry doesn't run through every vein in the town. Lee masterfully portrays a world of great contrasts, one where the forces of good and evil are in constant conflict.`,
    language: "English",
    genre: "Fiction"
  };

  const reviewsData = [
  {
    id: 1,
    studentName: "Emily Rodriguez",
    studentAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1dfbfb501-1763296570605.png",
    studentAvatarAlt: "Professional headshot of young Hispanic woman with long dark hair wearing blue sweater smiling warmly at camera",
    rating: 5,
    date: "2025-12-10T10:30:00",
    comment: "This book completely changed my perspective on justice and empathy. Harper Lee's storytelling is masterful, and Scout's innocent yet profound observations make you think deeply about society. A must-read for everyone!",
    helpfulCount: 24
  },
  {
    id: 2,
    studentName: "Marcus Thompson",
    studentAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f23d9c3d-1763295425663.png",
    studentAvatarAlt: "Professional headshot of young African American man with short hair wearing gray hoodie with confident expression",
    rating: 5,
    date: "2025-12-08T14:20:00",
    comment: "One of the most powerful books I\'ve ever read. The way it addresses racism and moral courage through a child\'s eyes is brilliant. Atticus Finch is an incredible character who embodies integrity and compassion.",
    helpfulCount: 18
  },
  {
    id: 3,
    studentName: "Sarah Chen",
    studentAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c4d9a2fc-1763294922635.png",
    studentAvatarAlt: "Professional headshot of young Asian woman with straight black hair wearing white shirt with gentle smile",
    rating: 4,
    date: "2025-12-05T09:15:00",
    comment: "Beautiful writing and important themes. The character development is exceptional, especially Scout's growth throughout the story. Some parts felt slow, but overall it's a classic that deserves its reputation.",
    helpfulCount: 12
  },
  {
    id: 4,
    studentName: "David Martinez",
    studentAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19cd5c7f5-1763301663940.png",
    studentAvatarAlt: "Professional headshot of young Hispanic man with curly dark hair wearing red plaid shirt with friendly expression",
    rating: 5,
    date: "2025-12-02T16:45:00",
    comment: "This book should be required reading for everyone. It tackles difficult subjects with grace and wisdom. The courtroom scenes are particularly powerful and thought-provoking.",
    helpfulCount: 15
  },
  {
    id: 5,
    studentName: "Jessica Williams",
    studentAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18e031c2b-1763294898016.png",
    studentAvatarAlt: "Professional headshot of young Caucasian woman with blonde hair wearing green top with bright smile",
    rating: 5,
    date: "2025-11-28T11:30:00",
    comment: "Harper Lee created something truly timeless. The lessons about prejudice, courage, and standing up for what's right are as relevant today as they were when the book was written. Absolutely loved it!",
    helpfulCount: 21
  }];


  const relatedBooksData = [
  {
    id: 2,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_19d508c18-1765741266084.png",
    coverImageAlt: "Classic book cover of The Great Gatsby featuring art deco design with golden lights and dark blue background representing 1920s elegance",
    rating: 4.6,
    available: true
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1fd29f48f-1764646532421.png",
    coverImageAlt: "Dystopian book cover of 1984 featuring stark minimalist design with bold typography and surveillance imagery in dark tones",
    rating: 4.7,
    available: true
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_11089da79-1764646535427.png",
    coverImageAlt: "Romantic classic book cover of Pride and Prejudice featuring elegant Victorian-era design with floral patterns and soft pastel colors",
    rating: 4.5,
    available: false
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_141fa9da6-1764775317246.png",
    coverImageAlt: "Coming-of-age book cover of The Catcher in the Rye with vintage design featuring urban landscape and youthful rebellion themes",
    rating: 4.3,
    available: true
  },
  {
    id: 6,
    title: "Lord of the Flies",
    author: "William Golding",
    coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1e36a6f81-1765800433535.png",
    coverImageAlt: "Dramatic book cover of Lord of the Flies featuring tropical island imagery with dark undertones and symbolic conch shell design",
    rating: 4.4,
    available: true
  },
  {
    id: 7,
    title: "Animal Farm",
    author: "George Orwell",
    coverImage: "https://images.unsplash.com/photo-1593004647399-c7e9d4234e87",
    coverImageAlt: "Political allegory book cover of Animal Farm featuring farm animals in revolutionary poses with red and black color scheme",
    rating: 4.6,
    available: false
  }];


  const tabs = [
  { id: 'synopsis', label: 'Synopsis', icon: 'BookOpen' },
  { id: 'reviews', label: 'Reviews', icon: 'MessageSquare' },
  { id: 'related', label: 'Related Books', icon: 'Library' }];


  const handleBackToCatalog = () => {
    navigate('/book-catalog');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            iconName="ArrowLeft"
            iconPosition="left"
            onClick={handleBackToCatalog}
            className="mb-6">

            Back to Catalog
          </Button>

          <div className="flex flex-col lg:flex-row gap-8">
            <BookCover book={bookData} />

            <div className="flex-1">
              <BookHeader book={bookData} />

              <div className="hidden lg:block mb-6">
                <div className="flex gap-2 border-b border-border">
                  {tabs?.map((tab) =>
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${
                    activeTab === tab?.id ?
                    'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`
                    }>

                      <Icon name={tab?.icon} size={18} />
                      <span>{tab?.label}</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="lg:hidden mb-6">
                {tabs?.map((tab) =>
                <details
                  key={tab?.id}
                  className="mb-2 bg-card rounded-lg border border-border overflow-hidden"
                  open={activeTab === tab?.id}>

                    <summary
                    className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-muted transition-colors"
                    onClick={(e) => {
                      e?.preventDefault();
                      setActiveTab(tab?.id);
                    }}>

                      <div className="flex items-center gap-2">
                        <Icon name={tab?.icon} size={18} color="var(--color-primary)" />
                        <span className="font-medium text-foreground">{tab?.label}</span>
                      </div>
                      <Icon
                      name="ChevronDown"
                      size={20}
                      className={`transition-transform duration-200 ${
                      activeTab === tab?.id ? 'rotate-180' : ''}`
                      } />

                    </summary>
                    <div className="px-4 py-4 border-t border-border">
                      {tab?.id === 'synopsis' && <SynopsisTab synopsis={bookData?.synopsis} />}
                      {tab?.id === 'reviews' &&
                    <ReviewsTab
                      reviews={reviewsData}
                      overallRating={bookData?.rating}
                      totalReviews={bookData?.totalReviews} />

                    }
                      {tab?.id === 'related' && <RelatedBooksTab relatedBooks={relatedBooksData} />}
                    </div>
                  </details>
                )}
              </div>

              <div className="hidden lg:block bg-card rounded-lg shadow-card border border-border p-6">
                {activeTab === 'synopsis' && <SynopsisTab synopsis={bookData?.synopsis} />}
                {activeTab === 'reviews' &&
                <ReviewsTab
                  reviews={reviewsData}
                  overallRating={bookData?.rating}
                  totalReviews={bookData?.totalReviews} />

                }
                {activeTab === 'related' && <RelatedBooksTab relatedBooks={relatedBooksData} />}
              </div>
            </div>

            <div className="lg:w-80">
              <ActionPanel book={bookData} />
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default BookDetails;