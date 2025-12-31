import { React, useState, useEffect } from "react";
import api from "../../axios_url/baseURL.js";
import { getAuthHeader } from "../../store/authStore.js";
import Header from "../../components/ui/Header";
import Button from "../../components/ui/Button";
import Carousel from "../../components/ui/Carousel";

import SectionHeader from "./components/SectionHeader";
import BookCard from "./components/BookCard";
import AuthorCard from "./components/AuthorCard";
import CategoryCard from "./components/CategoryCard";

const MainPage = () => {
  const [topBooks, setTopBooks] = useState([]);
  const [topAuthors, setTopAuthors] = useState([]);
  const [topByCategory, setTopCategory] = useState([]);
  const [topByStars, setTopStars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const GetData = async () => {
      setLoading(true);

      try {
        const [bookRes, authorRes, categoryRes, starsRes] = await Promise.all([
          api.get("/top-books", { headers: getAuthHeader() }),
          api.get("/top-author", { headers: getAuthHeader() }),
          api.get("/top-by-category", { headers: getAuthHeader() }),
          api.get("/top-by-stars", { headers: getAuthHeader() }),
        ]);

        setTopBooks(bookRes.data);
        setTopAuthors(authorRes.data);
        setTopCategory(categoryRes.data);
        setTopStars(starsRes.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    GetData();
  }, []);
  console.log(topByCategory);

  return (
    <div className="min-h-screen bg-background pb-12">
      <Header />

      {/* Hero Section */}
      <div className="bg-primary/5 pt-24 pb-12 px-4 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Fedezze fel a következő{" "}
              <span className="text-primary">Kedvenc Könyvét</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Böngésszen hatalmas könyv-, folyóirat- és kutatási
              anyag-gyűjteményünkben. Találja meg a keresett tudást digitális
              könyvtárunkban.
            </p>
            <div className="flex gap-4">
              <Button size="lg" icon="Search">
                Keresés
              </Button>
              <Button variant="outline" size="lg" icon="BookOpen">
                Katalógus
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Top Books Section */}
        <section>
          <SectionHeader title="Legtöbbet kölcsönzött könyvek" icon="Star" />
          <Carousel>
            {topBooks.map((book) => (
              <div key={book.id} className="min-w-[200px] md:min-w-[240px]">
                <BookCard {...book} />
              </div>
            ))}
          </Carousel>
        </section>

        {/* Top Categories Section */}
        <section>
          <SectionHeader title="Legolvasottabb kategóriák" icon="LayoutGrid" />
          <Carousel>
            {topByCategory.map((category) => (
              <div key={category.id} className="min-w-[200px]">
                <CategoryCard {...category} />
              </div>
            ))}
          </Carousel>
        </section>

        {/* Top Authors Section */}
        <section>
          <SectionHeader title="Legolvasottabb szerzők" icon="Users" />
          <Carousel>
            {topAuthors.map((author) => (
              <div key={author.id} className="min-w-[280px]">
                <AuthorCard {...author} />
              </div>
            ))}
          </Carousel>
        </section>

        {/* Top By Stars (Highest Rated) */}
        <section>
          <SectionHeader title="Legmagasabb értékelések" icon="Trophy" />
          <Carousel>
            {topByStars.map((book) => (
              <div
                key={`rated-${book.id}`}
                className="min-w-[200px] md:min-w-[240px]"
              >
                <BookCard {...book} />
              </div>
            ))}
          </Carousel>
        </section>
      </main>
    </div>
  );
};

export default MainPage;
