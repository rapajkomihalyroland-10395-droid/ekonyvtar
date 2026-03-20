import { React, useState, useEffect, use } from "react";
import api from "../../axios_url/baseURL.js";
import Header from "../../components/ui/Header";
import Carousel from "../../components/ui/Carousel";
import { Search, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

import SectionHeader from "./components/SectionHeader";
import BookCard from "./components/BookCard";
import AuthorCard from "./components/AuthorCard";
import CategoryCard from "./components/CategoryCard";

const MainPage = () => {
  const [topBooks, setTopBooks] = useState([]);
  const [topAuthors, setTopAuthors] = useState([]);
  const [topByCategory, setTopCategory] = useState([]);
  const [topByStars, setTopStars] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const GetData = async () => {
      try {
        const [bookRes, authorRes, categoryRes, starsRes] = await Promise.all([
          api.get("/top-books"),
          api.get("/top-author"),
          api.get("/top-by-category"),
          api.get("/top-by-stars"),
        ]);
        setTopBooks(bookRes.data);
        setTopAuthors(authorRes.data);
        setTopCategory(categoryRes.data);
        setTopStars(starsRes.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    GetData();
  }, []);

  return (
    <div className="min-h-screen bg-background pb-12">
      <Header />

      {}
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
              <button
                onClick={() => navigate("/book-catalog")}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8 gap-2"
              >
                <BookOpen size={20} />
                Katalógus
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {}
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

        {}
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

        {}
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

        {}
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
